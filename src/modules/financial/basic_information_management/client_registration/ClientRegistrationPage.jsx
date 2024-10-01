import React, {useEffect, useMemo, useState} from 'react';
import {Box, Grid, Grow, Paper} from '@mui/material';
import WelcomeSection from '../../../../components/WelcomeSection.jsx';
import { tabItems } from './ClientRegistrationUtil.jsx';
import { Typography } from '@mui/material';
import {Tag, Form, Table, Button, Col, Input, Row, Checkbox, Modal, DatePicker} from 'antd';
import TemporarySection from "../../../../components/TemporarySection.jsx";
import apiClient from "../../../../config/apiClient.jsx";
import {FINANCIAL_API} from "../../../../config/apiConstants.jsx";
import {useNotificationContext} from "../../../../config/NotificationContext.jsx";
import dayjs from 'dayjs';

const ClientRegistrationPage = ( {initialData} ) => {
    const notify = useNotificationContext();
    const [form] = Form.useForm();
    const [activeTabKey, setActiveTabKey] = useState('1');
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [editClient, setEditClient] = useState(false);
    const [fetchClientData, setFetchClientData] = useState(false);
    const [clientParam, setClientParam] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedStartDate, setSelectedStartDate] = useState(new Date())
    const [selectedEndDate, setSelectedEndDate] = useState(new Date());
    const showModal = () => setIsModalVisible(true);
    const handleModalOk = () => setIsModalVisible(false);
    const handleModalCancel = () => setIsModalVisible(false);
    const [isEndDate9999, setIsEndDate9999] = useState(false);


    // console.log(initialData);

    // 사업자등록번호, 주민등록번호, 전화번호, 팩스번호 포맷 함수
    const formatPhoneNumber = (value) => {
        if (!value) return '';
        const cleanValue = value.replace(/\D/g, ''); // 숫자 외의 모든 문자 제거
        if (cleanValue.length <= 3) return cleanValue;
        if (cleanValue.length <= 7) return `${cleanValue.slice(0, 3)}-${cleanValue.slice(3)}`;
        return `${cleanValue.slice(0, 3)}-${cleanValue.slice(3, 7)}-${cleanValue.slice(7)}`;
    };

// 금액 포맷 함수
    const formatNumberWithComma = (value) => {
        if (!value) return '';
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    const handleStartDateChange = (date) => {
        setClientParam((prevState) => ({
            ...prevState,
            transactionStartDate: dayjs(date),
        }));
    };
    const handleEndDateChange = (date) => {
        setClientParam((prevState) => ({
            ...prevState,
            transactionEndDate: dayjs(date),
        }));
    };




    useEffect(() => {
    }, [clientParam]);


    useEffect(() => {
        if (fetchClientData) {
            form.setFieldsValue(fetchClientData);
            setClientParam(fetchClientData);
        }
    }, [fetchClientData, form]);

    const handleTabChange = (key) => {
        setActiveTabKey(key);
    };

    return (
        <Box sx={{ margin: '20px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <WelcomeSection
                        title="거래처 등록 및 관리"
                        description={(
                            <Typography>
                                거래처등록 페이지는 <span>기업의 거래처 정보를 등록하고 관리</span>하는 기능을 제공함.<br/>
                                거래처의 기본 정보(회사명, 연락처, 주소 등)와 <span>계좌 정보를 등록하여</span> 효율적으로 거래처를 관리할 수 있음.<br/>
                                거래처를 분류하고 필요한 정보를 빠르게 검색할 수 있도록 설정 가능함. <span>정확한 거래처 정보 관리</span>는 재무 처리와 거래 내역 기록에 중요한 역할을 함.
                            </Typography>
                        )}
                        tabItems={tabItems()}
                        activeTabKey={activeTabKey}
                        handleTabChange={handleTabChange}
                    />
                </Grid>
            </Grid>

            {activeTabKey === '1' && (
                <Grid sx={{ padding: '0px 20px 0px 20px' }} container spacing={3}>
                    <Grid item xs={12} md={12} sx={{ minWidth: '1000px !important', maxWidth: '1500px !important' }}>
                        <Grow in={true} timeout={200}>
                            <Paper elevation={3} sx={{ height: '100%' }}>
                                <Typography variant="h6" sx={{ padding: '20px' }} >거래처 목록</Typography>
                                <Grid sx={{ padding: '0px 20px 0px 20px' }}>
                                    <Table
                                        dataSource={initialData}
                                        columns={[
                                            {
                                                title: <span style={{ fontSize: '0.8rem' }}>대표자명</span>,
                                                dataIndex: 'representativeName',
                                                key: 'representativeName',
                                                align: 'center',
                                                render: (text) => <span style={{ fontSize: '0.7rem' }}>{text}</span>,
                                                width: '10%'
                                            },
                                            {
                                                title: <span style={{ fontSize: '0.8rem' }}>상호명</span>,
                                                dataIndex: 'printClientName',
                                                key: 'printClientName',
                                                align: 'center',
                                                render: (text) => <span style={{ fontSize: '0.7rem' }}>{text}</span>,
                                                width: '15%'
                                            },
                                            {
                                                title: <span style={{ fontSize: '0.8rem' }}>주소</span>,
                                                key: 'address',
                                                align: 'center',
                                                render: (_, record) => <span style={{ fontSize: '0.7rem' }}>{`${record.roadAddress}, ${record.detailedAddress}`}</span>,
                                                width: '20%'
                                            },
                                            {
                                                title: <span style={{ fontSize: '0.8rem' }}>전화번호</span>,
                                                dataIndex: 'phoneNumber',
                                                key: 'phoneNumber',
                                                align: 'center',
                                                render: (text) => <span style={{ fontSize: '0.7rem' }}>{text}</span>,
                                                width: '10%'
                                            },
                                            {
                                                title: <span style={{ fontSize: '0.8rem' }}>사업종류</span>,
                                                dataIndex: 'businessType',
                                                key: 'businessType',
                                                align: 'center',
                                                render: (text, record) => {
                                                    let color;
                                                    switch (text) {
                                                        case '제조업':
                                                            color = 'red';
                                                            break;
                                                        case '도매업':
                                                            color = 'green';
                                                            break;
                                                        case '서비스업':
                                                            color = 'blue';
                                                            break;
                                                        default:
                                                            color = 'gray'; // 기본 색상
                                                    }
                                                    return <Tag style={{marginLeft: '5px'}} color={color}>{text}</Tag>;
                                                },
                                                width: '10%'
                                            },
                                            {
                                                title: <span style={{ fontSize: '0.8rem' }}>거래 시작일</span>,
                                                dataIndex: 'transactionStartDate',
                                                key: 'transactionStartDate',
                                                align: 'center',
                                                render: (text) => <span style={{ fontSize: '0.7rem' }}>{text}</span>,
                                                width: '10%'
                                            },
                                            {
                                                title: <span style={{ fontSize: '0.8rem' }}>거래 종료일</span>,
                                                dataIndex: 'transactionEndDate',
                                                key: 'transactionEndDate',
                                                align: 'center',
                                                render: (text) => <span style={{ fontSize: '0.7rem' }}>{text}</span>,
                                                width: '10%'
                                            },
                                            {
                                                title: <span style={{ fontSize: '0.8rem' }}>비고</span>,
                                                dataIndex: 'remarks',
                                                key: 'remarks',
                                                align: 'center',
                                                render: (text) => <span style={{ fontSize: '0.7rem' }}>{text}</span>,
                                                width: '20%'
                                            }
                                        ]}
                                        rowKey={(record) => record.id}
                                        pagination={{ pageSize: 15, position: ['bottomCenter'], showSizeChanger: false }}
                                        size="small"
                                        rowSelection={{
                                            type: 'radio',
                                            selectedRowKeys,
                                            onChange: (newSelectedRowKeys) => {
                                                setSelectedRowKeys(newSelectedRowKeys);
                                            }
                                        }}
                                        onRow={(record) => ({
                                            style: { cursor: 'pointer' },
                                            onClick: async () => {
                                                setSelectedRowKeys([record.id]); // 클릭한 행의 키로 상태 업데이트
                                                const id = record.id;
                                                try {
                                                    const response = await apiClient.post(FINANCIAL_API.FETCH_CLIENT_API(id));
                                                    setFetchClientData(response.data);
                                                    setEditClient(true);
                                                    notify('success', '거래처 조회', '거래처 정보 조회 성공.', 'bottomLeft')
                                                } catch (error) {
                                                    notify('error', '조회 오류', '데이터 조회 중 오류가 발생했습니다.', 'top');
                                                }


                                            },
                                        })}
                                    />
                                </Grid>
                            </Paper>
                        </Grow>
                    </Grid>
                    {editClient && (
                    <Grid item xs={12} md={12} sx={{ minWidth: '1000px !important', maxWidth: '1500px !important' }}>
                        <Grow in={true} timeout={200}>
                            <Paper elevation={3} sx={{ height: '100%' }}>
                                <Typography variant="h6" sx={{ padding: '20px' }} >거래처 등록 및 수정</Typography>
                                <Grid sx={{ padding: '0px 20px 0px 20px' }}>
                                    <Form
                                        layout="vertical"
                                        initialValues={fetchClientData}
                                        form={form}
                                        onFinish={(values) => {
                                            setClientParam((prevState) => ({
                                                ...prevState,
                                                ...values,
                                                transactionStartDate: clientParam.transactionStartDate
                                                    ? dayjs(clientParam.transactionStartDate).format('YYYY-MM-DD')
                                                    : null,
                                                transactionEndDate: clientParam.transactionEndDate
                                                    ? dayjs(clientParam.transactionEndDate).format('YYYY-MM-DD')
                                                    : null
                                            }));
                                            console.log(clientParam);
                                        }}
                                    >
                                        {/* 대표자 정보 및 사업자 등록번호 */}
                                        <Row gutter={16}>
                                            <Col span={6}>
                                                <Form.Item name="representativeName">
                                                    <Input addonBefore="대표자 이름" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={6}>
                                                <Form.Item name="businessRegistrationNumber">
                                                    <Input addonBefore="사업자 등록번호" maxLength={12} placeholder="123-45-67890" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={6}>
                                                <Form.Item name="idNumber">
                                                    <Input addonBefore="주민등록번호" maxLength={14} placeholder="123456-1234567" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={6}>
                                                <Form.Item name="printClientName">
                                                    <Input addonBefore="거래처 인쇄명" />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        {/* 주소 정보 */}
                                        <Row gutter={16}>
                                            <Col span={6}>
                                                <Form.Item name={['address', 'postalCode']}>
                                                    <Input addonBefore="우편번호" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item name={['address', 'roadAddress']}>
                                                    <Input addonBefore="도로명 주소" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={6}>
                                                <Form.Item name={['address', 'detailedAddress']}>
                                                    <Input addonBefore="상세 주소" />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        {/* 사업 정보 */}
                                        <Row gutter={16}>
                                            <Col span={12}>
                                                <Form.Item name={['businessInfo', 'businessType']}>
                                                    <Input addonBefore="사업 종류" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item name={['businessInfo', 'businessItem']}>
                                                    <Input addonBefore="사업 항목" />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        {/* 연락처 정보 */}
                                        <Row gutter={16}>
                                            <Col span={12}>
                                                <Form.Item name={['contactInfo', 'phoneNumber']}>
                                                    <Input addonBefore="전화번호" value={formatPhoneNumber(form.getFieldValue(['contactInfo', 'phoneNumber']))} />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item name={['contactInfo', 'faxNumber']}>
                                                    <Input addonBefore="팩스번호" value={formatPhoneNumber(form.getFieldValue(['contactInfo', 'faxNumber']))} />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        {/* 금융 정보 */}
                                        <Row gutter={16}>
                                            <Col span={12}>
                                                <Form.Item name={['financialInfo', 'collateralAmount']}>
                                                    <Input addonBefore="담보 금액" value={formatNumberWithComma(form.getFieldValue(['financialInfo', 'collateralAmount']))} />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item name={['financialInfo', 'creditLimit']}>
                                                    <Input addonBefore="신용 한도" value={formatNumberWithComma(form.getFieldValue(['financialInfo', 'creditLimit']))} />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        {/* 담당자 정보 */}
                                        <Row gutter={16}>
                                            <Col span={12}>
                                                <Form.Item name={['managerInfo', 'clientManagerPhoneNumber']}>
                                                    <Input addonBefore="담당자 전화번호" value={formatPhoneNumber(form.getFieldValue(['managerInfo', 'clientManagerPhoneNumber']))} />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item name={['managerInfo', 'clientManagerEmail']}>
                                                    <Input type="email" addonBefore="담당자 이메일" />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        {/* 은행 정보 */}
                                        <Row gutter={16}>
                                            <Col span={12}>
                                                <Form.Item name={['bankAccount', 'bank', 'name']}>
                                                    <Button onClick={showModal}>은행명 선택</Button>
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item name={['bankAccount', 'accountNumber']}>
                                                    <Input addonBefore="계좌번호" placeholder="123-4567-890123" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item name={['bankAccount', 'accountHolder']}>
                                                    <Input addonBefore="예금주" />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        {/* 직원 정보 */}
                                        <Row gutter={16}>
                                            <Col span={6}>
                                                <Form.Item name={['employee', 'employeeNumber']}>
                                                    <Button onClick={showModal}>사원 번호 선택</Button>
                                                </Form.Item>
                                            </Col>
                                            <Col span={6}>
                                                <Form.Item name={['employee', 'firstName']}>
                                                    <Input addonBefore="이름" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={6}>
                                                <Form.Item name={['employee', 'lastName']}>
                                                    <Input addonBefore="성" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={6}>
                                                <Form.Item name={['employee', 'phoneNumber']}>
                                                    <Input addonBefore="직원 전화번호" />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        {/* 거래 정보 */}
                                        <Row gutter={16}>
                                            <Col span={6}>
                                                <Form.Item >
                                                    <DatePicker
                                                        value={dayjs(clientParam.transactionStartDate)}
                                                        onChange={handleStartDateChange}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={6}>
                                                <Form.Item>
                                                    <DatePicker
                                                        value={dayjs(clientParam.transactionEndDate)}
                                                        onChange={handleEndDateChange}
                                                        disabled={isEndDate9999}
                                                    />
                                                </Form.Item>
                                                <Checkbox onChange={(e) => setIsEndDate9999(e.target.checked)}>
                                                    거래 종료일을 9999년으로 설정
                                                </Checkbox>
                                            </Col>
                                        </Row>

                                        {/* 주류 및 카테고리 정보 (모달 선택) */}
                                        <Row gutter={16}>
                                            <Col span={6}>
                                                <Form.Item name={['liquor', 'id']}>
                                                    <Button onClick={showModal}>주류 ID 선택</Button>
                                                </Form.Item>
                                            </Col>
                                            <Col span={6}>
                                                <Form.Item name={['liquor', 'code']}>
                                                    <Button onClick={showModal}>주류 코드 선택</Button>
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item name={['liquor', 'name']}>
                                                    <Button onClick={showModal}>주류 이름 선택</Button>
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Row gutter={16}>
                                            <Col span={6}>
                                                <Form.Item name={['category', 'id']}>
                                                    <Button onClick={showModal}>카테고리 ID 선택</Button>
                                                </Form.Item>
                                            </Col>
                                            <Col span={6}>
                                                <Form.Item name={['category', 'code']}>
                                                    <Button onClick={showModal}>카테고리 코드 선택</Button>
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item name={['category', 'name']}>
                                                    <Button onClick={showModal}>카테고리 이름 선택</Button>
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        {/* 비고 및 활성화 여부 */}
                                        <Row gutter={16}>
                                            <Col span={12}>
                                                <Form.Item name="remarks">
                                                    <Input addonBefore="비고" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item name="isActive" valuePropName="checked">
                                                    <Checkbox>활성 여부</Checkbox>
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                                            <Button type="primary" htmlType="submit">
                                                저장
                                            </Button>
                                        </Box>

                                        {/* 모달창 예시 */}
                                        <Modal title="선택" open={isModalVisible} onOk={handleModalOk} onCancel={handleModalCancel}>
                                            <p>선택할 항목이 여기에 나옵니다...</p>
                                        </Modal>
                                    </Form>
                                </Grid>
                            </Paper>
                        </Grow>
                    </Grid>
                    )}
                </Grid>
            )}

            {activeTabKey === '2' && (
                <Grid sx={{ padding: '0px 20px 0px 20px' }} container spacing={3}>
                    <Grid item xs={12} md={5} sx={{ minWidth: '500px !important', maxWidth: '700px !important' }}>
                        <Grow in={true} timeout={200}>
                            <div>
                                <TemporarySection />
                            </div>
                        </Grow>
                    </Grid>
                </Grid>
            )}

        </Box>
    );
};

export default ClientRegistrationPage;