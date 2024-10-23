import React, {useMemo, useEffect, useState} from 'react';
import {Box, Grid, Grow, Paper, Typography} from '@mui/material';
import WelcomeSection from '../../../../components/WelcomeSection.jsx';
import { tabItems } from './PurchaseOrderUtil.jsx';
import {Space, Tag, Form, Table, Button, Col, Input, Row, Checkbox, Modal, DatePicker, Spin, Select, notification, Upload, Divider} from 'antd';
import dayjs from 'dayjs';
import TemporarySection from "../../../../components/TemporarySection.jsx";
import {DownSquareOutlined, SearchOutlined} from "@ant-design/icons";
import {useNotificationContext} from "../../../../config/NotificationContext.jsx";
import {FINANCIAL_API, LOGISTICS_API} from "../../../../config/apiConstants.jsx";
import apiClient from "../../../../config/apiClient.jsx";

const { RangePicker } = DatePicker;

const PurchaseOrderPage = ({initialData}) => {
    const notify = useNotificationContext(); // 알림 컨텍스트 사용
    const [activeTabKey, setActiveTabKey] = useState('1');
    const [isLoading, setIsLoading] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [currentField, setCurrentField] = useState('');
    const [modalData, setModalData] = useState(null);
    const [initialModalData, setInitialModalData] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const [searchParams, setSearchParams] = useState({
        startDate: null,
        endDate: null,
        clientId: null,
        state: null,
    });
    const [displayValues, setDisplayValues] = useState({
        clientCode: '',
        clientName: '',
    });

    const [searchData, setSearchData] = useState(null);

    // 입력 필드 클릭 시 모달 열기
    const handleInputClick = (fieldName) => {
        setCurrentField(fieldName);
        setModalData(null); // 모달 열기 전에 데이터를 초기화
        setInitialModalData(null); // 모달 열기 전에 데이터를 초기화
        fetchModalData(fieldName);  // 모달 데이터 가져오기 호출
        setIsModalVisible(true);  // 모달창 열기
    };

    // 날짜 선택 처리
    const handleDateChange = (dates) => {
        if (dates) {
            setSearchParams({
                ...searchParams,
                startDate: dates[0].format('YYYY-MM-DD'),
                endDate: dates[1].format('YYYY-MM-DD'),
            });
        }
    };

    // 등록 일자 변경 핸들러
    const handleRegiDateChange = (date) => {
        setPurchaseRequestParam((prevState) => ({
            ...prevState,
            date: dayjs(date),
        }));
    };

    // 납기 일자 변경 핸들러
    const handleDeliveryDateChange = (date) => {
        setPurchaseRequestParam((prevState) => ({
            ...prevState,
            date: dayjs(date),
        }));
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);  // 모달창 닫기
    };

    // 모달에서 선택한 값 searchParams에 반영
    const handleModalSelect = (record) => {
        // 모달 창 마다가 formattedvalue, setclient param 설정 값이 다름
        switch (currentField) {
            case 'client':
                setSearchParams((prevParams) => ({
                    ...prevParams,
                    clientId: record.id,
                }));
                setDisplayValues((prevValues) => ({
                    ...prevValues,
                    client: `[${record.id}] ${record.printClientName}`,
                }));
                break;
        }

        // 모달창 닫기
        setIsModalVisible(false);
    };

    const handleSearch = async () => {
        const { startDate, endDate, clientCode, state } = searchParams;

        try {
            const response = await apiClient.post(LOGISTICS_API.PURCHASE_ORDER_LIST_API, searchParams);
            const data = response.data;
            setSearchData(data);
            console.log(data)

            notify('success', '조회 성공', '발주서 조회 성공.', 'bottomRight');
        } catch (error) {
            notify('error', '조회 오류', '발주서 조회 중 오류가 발생했습니다.', 'top');
        }
    };

    // 모달 데이터 가져오기
    const fetchModalData = async (fieldName) => {
        setIsLoading(true);
        let apiPath;

        if(fieldName === 'client') apiPath = FINANCIAL_API.FETCH_CLIENT_LIST_API;
        try {
            const response = await apiClient.post(apiPath);

            // 데이터가 문자열이고 JSON 배열 형식일 경우 파싱, 아니면 그대로 배열로 처리
            let data = response.data;
            if (typeof data === 'string' && data.startsWith('[') && data.endsWith(']')) {
                data = JSON.parse(data);
            }

            const modalData = Array.isArray(data) ? data : [data];

            setModalData(modalData);
            setInitialModalData(modalData);
        } catch (error) {
            notify('error', '조회 오류', '데이터 조회 중 오류가 발생했습니다.', 'top');
        } finally {
            setIsLoading(false);
        }
    };

    const handleTabChange = (key) => {
        setActiveTabKey(key);
    };
    const columns = [
        {
            title: <div className="title-text">상태</div>,
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            render: (text, record) => {
                let color;
                let value;
                switch (text) {
                    case 'WAITING_FOR_PURCHASE':
                        color = 'orange';
                        value = '발주대기';
                        break;
                    case 'PURCHASE_COMPLETED':
                        color = 'green';
                        value = '발주완료';
                        break;
                    default:
                        color = 'gray'; // 기본 색상
                        value = '상태 알 수 없음';
                }
                return <Tag style={{ marginLeft: '5px' }} color={color}>{value}</Tag>;
            },
            width: '10%',
        },
        {
            title: <div className="title-text">발주 요청 일자</div>,
            dataIndex: 'date',
            key: 'date',
            align: 'center',
            render: (text) => (text ? dayjs(text).format('YYYY-MM-DD') : ''),
            width: '10%',
        },
        {
            title: <div className="title-text">거래처명</div>,
            dataIndex: 'clientName',
            key: 'clientName',
            align: 'center',
            width: '20%',
        },
        {
            title: <div className="title-text">품목명</div>,
            dataIndex: 'productName',
            key: 'productName',
            align: 'center',
            width: '25%',
        },
        {
            title: <div className="title-text">총 수량</div>,
            dataIndex: 'totalQuantity',
            key: 'totalQuantity',
            align: 'center',
            width: '10%',
        },
        {
            title: <div className="title-text">총 가격</div>,
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            align: 'center',
            render: (text) => text ? `${text.toLocaleString()}` : '', // 가격을 포맷하여 표시
            width: '15%',
        },
        {
            title: <div className="title-text">납기 일자</div>,
            dataIndex: 'deliveryDate',
            key: 'deliveryDate',
            align: 'center',
            render: (text) => (text ? dayjs(text).format('YYYY-MM-DD') : ''),
            width: '20%',
        },
    ];

    return (
        <Box sx={{ margin: '20px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <WelcomeSection
                        title="발주서"
                        description={(
                            <Typography>
                                발주서 페이지는 <span>구매 결정을 내린 후 공급업체에 발주를 요청하는 문서</span>를 관리함. 이 페이지에서는 <span>발주서를 생성, 수정, 삭제</span>할 수 있으며, 발주 내용에는 <span>물품명, 수량, 가격</span> 등이 포함됨. 발주서는 <span>공급업체와 계약</span>을 진행하기 위한 중요한 문서임.
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
                            <Paper elevation={3} sx={{ height: '100%'}}>
                                <Typography variant="h6" sx={{ padding: '20px' }}>발주서 목록</Typography>
                                <Grid sx={{ padding: '0px 20px 0px 20px' }}>
                                    <Form layout="vertical">
                                        <Row gutter={16} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                                            <Col>
                                                <Form.Item
                                                    label="조회 기간"
                                                    required
                                                    tooltip="검색할 기간의 시작일과 종료일을 선택하세요"
                                                >
                                                    <RangePicker
                                                        disabledDate={(current) => current && current.year() !== 2024}
                                                        onChange={handleDateChange}
                                                        defaultValue={[
                                                            searchParams.startDate ? dayjs(searchParams.startDate, 'YYYY-MM-DD') : null,
                                                            searchParams.endDate ? dayjs(searchParams.endDate, 'YYYY-MM-DD') : null,
                                                        ]}
                                                        format="YYYY-MM-DD"
                                                        style={{ width: '250px' }}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col flex="1">
                                                <Form.Item
                                                    label="거래처"
                                                    required
                                                    tooltip="검색할 거래처를 선택하세요"
                                                >
                                                    <Form.Item
                                                        noStyle
                                                        rules={[{ required: true, message: '거래처를 선택하세요' }]}
                                                    >
                                                        <Input
                                                            placeholder="거래처"
                                                            value={displayValues.client}
                                                            onClick={() => handleInputClick('client')}
                                                            className="search-input"
                                                            style={{ width: '30%' }}
                                                            suffix={<DownSquareOutlined />}
                                                        />
                                                    </Form.Item>
                                                </Form.Item>
                                            </Col>
                                            <Col>
                                                <Form.Item>
                                                    <Button style={{ width: '100px' }} type="primary" onClick={handleSearch} icon={<SearchOutlined />} block>
                                                        검색
                                                    </Button>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Form>

                                    <Table
                                        dataSource={searchData} // 발주서 리스트 데이터
                                        columns={columns} // 테이블 컬럼 정의
                                        rowKey={(record) => record.id}
                                        pagination={{ pageSize: 10, position: ['bottomCenter'], showSizeChanger: false }}
                                        size="small"
                                        rowSelection={{
                                            type: 'radio',
                                            selectedRowKeys,
                                            onChange: (newSelectedRowKeys) => {
                                                setSelectedRowKeys(newSelectedRowKeys);
                                            }
                                        }}
                                    />
                                </Grid>

                            </Paper>
                        </Grow>
                    </Grid>
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

            {/* 모달창 */}
            <Modal
                open={isModalVisible}
                onCancel={handleModalCancel}
                footer={null}
                width="40vw"
            >
                {isLoading ? (
                    <Spin />  // 로딩 스피너
                ) : (
                    <>
                        {/* 거래처 선택 모달 */}
                        {currentField === 'client' && (
                            <>
                                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: '20px' }}>
                                    거래처 선택
                                </Typography>
                                <Input
                                    placeholder="검색"
                                    prefix={<SearchOutlined />}
                                    onChange={(e) => {
                                        const value = e.target.value.toLowerCase(); // 입력값을 소문자로 변환
                                        if (!value) {
                                            setModalData(initialModalData);
                                        } else {
                                            const filtered = initialModalData.filter((item) => {
                                                return (
                                                    (item.id && item.id.toString().toLowerCase().includes(value)) ||
                                                    (item.printClientName && item.printClientName.toLowerCase().includes(value))
                                                );
                                            });
                                            setModalData(filtered);
                                        }
                                    }}
                                    style={{ marginBottom: 16 }}
                                />
                                {modalData && (

                                    <Table
                                        columns={[
                                            { title: '코드', dataIndex: 'id', key: 'id', align: 'center' },
                                            { title: '거래처명', dataIndex: 'printClientName', key: 'printClientName', align: 'center' }
                                        ]}
                                        dataSource={modalData}
                                        rowKey="id"
                                        size="small"
                                        pagination={{
                                            pageSize: 15,
                                            position: ['bottomCenter'],
                                            showSizeChanger: false,
                                            showTotal: (total) => `총 ${total}개`,
                                        }}
                                        onRow={(record) => ({
                                            style: { cursor: 'pointer' },
                                            onClick: () => handleModalSelect(record) // 선택 시 처리
                                        })}
                                    />
                                )}
                            </>
                        )}

                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                            <Button onClick={handleModalCancel} variant="contained" type="danger" sx={{ mr: 1 }}>
                                닫기
                            </Button>
                        </Box>
                    </>
                )}
            </Modal>
        </Box>
    );
};

export default PurchaseOrderPage;