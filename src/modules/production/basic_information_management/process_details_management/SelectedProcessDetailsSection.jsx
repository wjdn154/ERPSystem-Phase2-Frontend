import React, {useEffect, useState} from 'react';
import { Space, Tag, Form, Table, Button, Col, Input, Row, Checkbox, Modal, DatePicker, Spin, Select, notification, Divider } from 'antd';

import { ActionButtons, showDeleteConfirm} from "../../common/commonActions.jsx";
import {Box, Grid, Grow, Paper, Typography} from "@mui/material";
import {useNotificationContext} from "../../../../config/NotificationContext.jsx";
import {SearchOutlined} from "@ant-design/icons";
import {LOGISTICS_API, PRODUCTION_API} from "../../../../config/apiConstants.jsx";
import apiClient from "../../../../config/apiClient.jsx";

const SelectedProcessDetailsSection = ({
                                           // processDetail,
                                           handleInputChange,
                                           handleSave,
                                           handleDeleteProcessDetail,
                                       }) => {

const [isModalVisible, setIsModalVisible] = useState(false); // 모달 활성화 여부 상태
const [isLoading, setIsLoading] = useState(false); // 로딩 상태
const [currentField, setCurrentField] = useState(''); // 모달 분기 할 필드 상태
const [modalData, setModalData] = useState(null); // 모달 데이터 상태
const [initialModalData, setInitialModalData] = useState(null);
const [isEndDateDisable, setIsEndDateDisable] = useState(false); // 거래 종료일 비활성화 여부 상태
const [displayValues, setDisplayValues] = useState({});
const [processDetail, setProcessDetail] = useState({});
const notify = useNotificationContext(); // 알림 컨텍스트 사용
const [form] = Form.useForm(); // 폼 인스턴스 생성
const [registrationForm] = Form.useForm(); // 폼 인스턴스 생성
const [processDetailParam, setProcessDetailParam] = useState(false);


    // 삭제 확인 다이얼로그 호출
    const handleDelete = () => {
        showDeleteConfirm(
            '이 작업은 되돌릴 수 없습니다. 정말로 삭제하시겠습니까?',
            () => handleDeleteProcessDetail(processDetail.code)
        );
    };

    // 선택된 공정이 변경될 때마다 `form`에 값을 반영
    useEffect(() => {
        if (processDetail) {
            form.setFieldsValue(processDetail); // 선택된 공정 데이터를 폼에 설정
        }
    }, [processDetail, form]);

    const handleFormSubmit = (values) => {
        console.log("handleFormSubmit", values);
    }

    const handleModalCancel = () => setIsModalVisible(false);

    // 모달창 데이터 가져오기 함수
    const fetchModalData = async (fieldName) => {
        setIsLoading(true);
        let apiPath;

        if (fieldName === 'workcenter') apiPath = PRODUCTION_API.WORKCENTER_LIST_API;
        if (fieldName === 'factory') apiPath = LOGISTICS_API.WAREHOUSE_LIST_API;

        try {
            const response = await apiClient.post(apiPath);
            setModalData(response.data);
            setInitialModalData(response.data);
            console.log('response.data:', response.data);
        } catch (error) {
            notify('error', '조회 오류', '데이터 조회 중 오류가 발생했습니다.', 'top');
        } finally {
            setIsLoading(false);
        }
    };

// 모달창 선택 핸들러
    const handleModalSelect = (record) => {
        switch (currentField) {
            case 'workcenter':
                setProcessDetail((prevDetail) => ({
                    ...prevDetail,
                    workcenter: {
                        code: record.code,
                        name: record.name,
                    },
                }));
                setDisplayValues((prevValues) => ({
                    ...prevValues,
                    workcenter: `[${record.code}] ${record.name}`,
                }));
                break;

            case 'factory':
                setProcessDetail((prevDetail) => ({
                    ...prevDetail,
                    factory: {
                        code: record.code,
                        name: record.name,
                    },
                }));
                setDisplayValues((prevValues) => ({
                    ...prevValues,
                    factory: `[${record.code}] ${record.name}`,
                }));
                break;

            default:
                console.warn('알 수 없는 필드:', currentField);
        }

        // 모달창 닫기
        setIsModalVisible(false);
    };

    return (
        <Grid item xs={12} md={12} sx={{ minWidth: '700px !important', maxWidth: '1200px !important',}}>
            <Grow in={true} timeout={200}>
                <Paper elevation={3} sx={{ height: '100%' }}>
                    <Typography variant="h6" sx={{ padding: '20px' }} >공정 등록 및 수정</Typography>
                    <Grow sx={{ padding: '0px 20px 0px 20px' }}>
                        {/* 공정 상세 정보를 표시하는 Form */}
                        <Form
                            form={form}
                            initialValues={processDetail}
                            onFinish={handleSave}
                            layout="vertical"
                        >
                            <Divider orientation="left" style={{ fontWeight: 600 }}>기초 정보</Divider>
                            <Row gutter={16}>
                                <Col span={8}>
                                    <Form.Item name="code" label="공정코드" rules={[{ required: true }]}>
                                        <Input readOnly />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item name="name" label="공정명" rules={[{ required: true }]}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item name="duration" label="소요시간" rules={[{ required: true }]}>
                                        <Input type="number" />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Divider orientation="left" style={{ fontWeight: 600 }}>추가 정보</Divider>
                            <Row gutter={16}>
                                <Col span={8}>
                                    <Form.Item name="cost" label="비용" rules={[{ required: true }]}>
                                        <Input type="number" />
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Form.Item name="isOutsourced" valuePropName="checked">
                                        <Checkbox>외주여부</Checkbox>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Space style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button type="primary" htmlType="submit">저장</Button>
                                <Button onClick={handleModalCancel}>취소</Button>
                            </Space>

                            <Modal
                                open={isModalVisible}
                                onCancel={handleModalCancel}
                                footer={null}
                            >
                                <Input
                                    placeholder="검색"
                                    prefix={<SearchOutlined />}
                                    onChange={(e) => fetchModalData(e.target.value)}
                                />
                                <Table
                                    dataSource={modalData}
                                    columns={[
                                        { title: '코드', dataIndex: 'code', key: 'code' },
                                        { title: '이름', dataIndex: 'name', key: 'name' },
                                    ]}
                                    rowKey="id"
                                    onRow={(record) => ({
                                        onClick: () => handleModalSelect(record),
                                    })}
                                />
                            </Modal>
                        </Form>

                    </Grow>
                </Paper>
            </Grow>
        </Grid>
    );
};



export default SelectedProcessDetailsSection;
