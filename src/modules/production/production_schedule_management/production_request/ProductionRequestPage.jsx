import React, {useEffect, useMemo, useState} from 'react';
import {Box, Grid, Grow, Paper} from '@mui/material';
import WelcomeSection from '../../../../components/WelcomeSection.jsx';
import { tabItems } from './ProductionRequestUtil.jsx';
import {Typography} from '@mui/material';
import {
    Space,
    Button,
    DatePicker,
    Form,
    Input,
    Modal,
    Spin,
    Table,
    Tag,
    Tooltip,
    Col,
    Row,
    Divider,
    Select
} from 'antd';
import TemporarySection from "../../../../components/TemporarySection.jsx";
import { PRODUCTION_API } from "../../../../config/apiConstants.jsx";
import apiClient from "../../../../config/apiClient.jsx";
import {useNotificationContext} from "../../../../config/NotificationContext.jsx";
import dayjs from "dayjs";
import {BookOutlined, DownSquareOutlined, InfoCircleOutlined, SearchOutlined} from "@ant-design/icons";
const { RangePicker } = DatePicker;
const { Option } = Select;

const ProductionRequestPage = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [activeTabKey, setActiveTabKey] = useState('1');
    const [isLoading, setIsLoading] = useState(false);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentField, setCurrentField] = useState('');
    const [currentRequest, setCurrentRequest] = useState('');
    const [searchParams, setSearchParams] = useState({
        startRequestDate: null,
        endRequestDate: null,
        requestName: '',
        requestType: '',
        progressType: '',
        isConfirmed: '',
    });
    const [searchDetailParams, setSearchDetailParams] = useState({
        startRequestDate: null,
        endRequestDate: null,
        requestName: '',
        requestType: '',
        progressType: '',
        isConfirmed: '',
    });
    const [modalData, setModalData] = useState(null);
    const [initialModalData, setInitialModalData] = useState(null);
    const [productionRequests, setProductionRequests] = useState(null);
    const [productionRequestDetail, setProductionRequestDetail] = useState(null);

    const handleTabChange = (key) => {
        setActiveTabKey(key);
    };

    // 모달 데이터 가져오기
    const fetchModalData = async (fieldName) => {
        setIsLoading(true);
        const apiPath = fieldName === 'requestName' ? PRODUCTION_API.PRODUCTION_REQUEST_LIST_API : null;
        try {
            const response = await apiClient.post(apiPath, { searchText: '' });
            setModalData(response.data);
            setInitialModalData(response.data);
        } catch (error) {
            notify('error', '오류 발생', '데이터 조회 중 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    // 입력 필드 클릭 시 모달 열기
    const handleInputClick = (fieldName) => {
        setCurrentField(fieldName);
        setCurrentRequest(null);

        setModalData(null); // 모달 열기 전에 데이터를 초기화
        setInitialModalData(null);
        // fetchModalData(fieldName);  // 모달 데이터 가져오기 호출
        fetchProductionRequests(fieldName);
        setIsModalVisible(true);  // 모달창 열기
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
        setCurrentField(null);
        setCurrentRequest(null);
    }

    // 생산 의뢰 리스트 조회
    const fetchProductionRequests = async () => {
        setIsLoading(true);
        try {
            const response = await apiClient.post(PRODUCTION_API.PRODUCTION_REQUEST_LIST_API);
            setProductionRequests(response.data);
        } catch (error) {
            notify('error', '조회 오류', '데이터 조회 중 오류가 발생했습니다.', 'top');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProductionRequests()
    }, []);


    // 생산 의뢰 상세 조회

    // 생산 요청 생성 및 업데이트
    const handleSave = async (values) => {
        setIsLoading(true);
        try {
            if (currentRequest) {
                await apiClient.post(PRODUCTION_API.PRODUCTION_REQUEST_UPDATE_API, values);
                notify('success', '성공', '수정이 성공적으로 완료되었습니다.');
            } else {
                await apiClient.post(PRODUCTION_API.PRODUCTION_REQUEST_CREATE_API, values);
                notify('success', '성공', '등록이 성공적으로 완료되었습니다.');
            }
            fetchProductionRequests();
            handleModalCancel();
        } catch (error) {
            notify('error', '오류 발생', '데이터 처리 중 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    }

    // 생산 의뢰 삭제
    const handleDelete = async (id) => {
        setIsLoading(true);
        try {
            await apiClient.post(PRODUCTION_API.PRODUCTION_REQUEST_DELETE_API);
            notify('success', '성공', '삭제 작업이 성공적으로 완료되었습니다.');
            fetchProductionRequests();
        } catch (error) {
            notify('error', '오류 발생', '데이터 삭제 중 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    // 검색 처리
    const handleSearch = async () => {
        const { startRequestDate, endRequestDate, requestName, requestType, progressType, isConfirmed } = searchParams;
        if (!startRequestDate || !endRequestDate) {
            notify('warning', '검색 오류', '데이터 조회 중 오류가 발생했습니다.');
            return;
        }
        try {
            setIsLoading(true);
            const response = await apiClient.post(PRODUCTION_API.PRODUCTION_REQUEST_LIST_API, searchParams);
            setProductionRequests(response.data);
        } catch (error) {
            notify('error', '조회 오류', '데이터 조회 중 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    const productionRequestColumns = [
        {
            title: <div className="title-text">의뢰구분</div>,
            dataIndex: 'requestType',
            key: 'requestType',
            align: 'center',
            width: '10%',
            render: (text) => <div className="small-text">{
                {
                    'MASS_PRODUCTION': '양산',
                    'PILOT_PRODUCTION': '시험양산',
                    'URGENT_ORDER': '특급수주',
                    'SAMPLE': '샘플',
                    'PMS': 'PMS'
                }[text] || text
            }</div>,
        },
        {
            title: <div className="title-text">의뢰명</div>,
            dataIndex: 'name',
            key: 'name',
            align: 'center',
            width: '15%',
            render: (text) => <div className="small-text">{text}</div>,
        },
        {
            title: <div className="title-text">진행상태</div>,
            dataIndex: 'progressType',
            key: 'progressType',
            align: 'center',
            width: '5%',
            render: (text) => <div className="small-text">{
                {
                    'PENDING': '대기 중',
                    'IN_PROGRESS': '진행 중',
                    'COMPLETED': '완료됨'
                }[text] || text
            }</div>,
        },
        {
            title: <div className="title-text">확정여부</div>,
            dataIndex: 'isConfirmed',
            key: 'isConfirmed',
            align: 'center',
            width: '5%',
            render: (value) => <div className="small-text">{value ? '확정됨' : '미확정'}</div>,
        },
        {
            title: <div className="title-text">생산 요청일자</div>,
            dataIndex: 'requestDate',
            key: 'requestDate',
            align: 'center',
            width: '15%',
            render: (text) => <div className="small-text">{text}</div>,
        },
        {
            title: <div className="title-text">완료 요청일자</div>,
            dataIndex: 'deadlineOfCompletion',
            key: 'deadlineOfCompletion',
            align: 'center',
            width: '15%',
            render: (text) => <div className="small-text">{text}</div>,
        },
        {
            title: <div className="title-text">납기일</div>,
            dataIndex: 'dueDateToProvide',
            key: 'dueDateToProvide',
            align: 'center',
            width: '15%',
            render: (text) => <div className="small-text">{text}</div>,
        },
        {
            title: <div className="title-text">요청 수량</div>,
            dataIndex: 'requestQuantity',
            key: 'requestQuantity',
            align: 'center',
            width: '10%',
            render: (text) => <div className="small-text">{text}</div>,
        },
        {
            title: <div className="title-text">확정 수량</div>,
            dataIndex: 'confirmedQuantity',
            key: 'confirmedQuantity',
            align: 'center',
            width: '10%',
            render: (text) => <div className="small-text">{text}</div>,
        },
    ];

    return (
        <Box sx={{ margin: '20px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <WelcomeSection
                        title="생산의뢰"
                        description={(
                            <Typography>
                                생산 의뢰 관리 페이지는 <span>생산 공정을 시작하기 위한 의뢰 정보를 관리</span>하는 곳임. 이 페이지에서는 <span>생산 의뢰의 추가, 수정, 삭제</span>가 가능하며, 각 의뢰에 대한 <span>요청 제품, 수량, 납기일</span>을 기록할 수 있음. 생산 의뢰는 <span>고객의 주문이나 내부 요구</span>에 따라 생성되며, 이를 통해 생산 계획이 수립됨.
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
                    <Grid item xs={12} md={10} sx={{ minWidth: '500px !important', maxWidth: '1500px !important' }}>
                        <Grow in={true} timeout={200}>
                            <Paper elevation={3} sx={{ height: '100%' }}>
                                <Typography variant="h6" sx={{ padding: '20px' }} >생산의뢰 목록</Typography>
                                <Grid sx={{ padding: '0px 20px 0px 20px' }}>
                                    <Form layout="vertical">
                                        <Row gutter={16} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between'}}>
                                            <Col flex="1">
                                                <Form.Item label="의뢰 구분" tooltip="검색할 의뢰 구분을 선택하세요">
                                                    <Select
                                                        placeholder="의뢰 구분"
                                                        value={searchParams.requestType}
                                                        onChange={(value) => setSearchParams({ ...searchParams, requestType: value })}
                                                    >
                                                        <Option value="MASS_PRODUCTION">양산</Option>
                                                        <Option value="PILOT_PRODUCTION">시험양산</Option>
                                                        <Option value="URGENT_ORDER">특급수주</Option>
                                                        <Option value="SAMPLE">샘플</Option>
                                                        <Option value="PMS">PMS</Option>
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Col flex="1">
                                                <Form.Item name="name" label="의뢰명" tooltip="검색할 생산 의뢰명을 입력하세요">
                                                    <Space.Compact style={{ width: '100%' }}>
                                                        <Input
                                                            placeholder="의뢰명"
                                                            value={searchParams.requestName}
                                                            onChange={(e) => setSearchParams({ ...searchParams, requestName: e.target.value })}
                                                            // onClick={() => fetchModalData('requestName')}
                                                        />
                                                    </Space.Compact>
                                                </Form.Item>
                                            </Col>
                                            <Col flex="1">
                                                <Form.Item label="진행 상태" tooltip="검색할 진행 상태를 선택하세요">
                                                    <Select
                                                        placeholder="진행 상태"
                                                        value={searchParams.progressType}
                                                        onChange={(value) => setSearchParams({ ...searchParams, progressType: value })}
                                                    >
                                                        <Option value="PENDING">대기 중</Option>
                                                        <Option value="IN_PROGRESS">진행 중</Option>
                                                        <Option value="COMPLETED">완료됨</Option>
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Col flex="1">
                                                <Form.Item label="확정 여부" tooltip="확정 여부를 선택하세요">
                                                    <Select
                                                        placeholder="확정 여부"
                                                        value={searchParams.isConfirmed}
                                                        onChange={(value) => setSearchParams({ ...searchParams, isConfirmed: value })}
                                                    >
                                                        <Option value="true">확정됨</Option>
                                                        <Option value="false">미확정</Option>
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Row gutter={16} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between'}}>
                                                <Col flex="1">
                                                    <Form.Item label="조회 기간" required tooltip="검색할 기간의 시작일과 종료일을 선택하세요">
                                                        <RangePicker
                                                            onChange={(dates) => {
                                                                if (dates) {
                                                                    setSearchParams({
                                                                        ...searchParams,
                                                                        startRequestDate: dates[0].format('YYYY-MM-DD'),
                                                                        endRequestDate: dates[1].format('YYYY-MM-DD'),
                                                                    });
                                                                }
                                                            }}
                                                        />
                                                    </Form.Item>
                                                </Col>
                                                <Col>
                                                    <Form.Item>
                                                        <Button type="primary" onClick={handleSearch} icon={<SearchOutlined />}>검색</Button>
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Row>
                                    </Form>
                                </Grid>
                                <Grid sx={{ padding: '0px 20px 0px 20px' }}>
                                    <Table
                                        dataSource={productionRequests}
                                        columns={productionRequestColumns}
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
                                                // 행 클릭 시 상태 업데이트 및 API 호출
                                                setSelectedRowKeys([record.id]); // 클릭한 행의 키로 상태 업데이트

                                                try {
                                                    const updatedParams = {
                                                        ...searchDetailParams,
                                                        clientId: record.clientId,
                                                    };
                                                    // API 호출 시 updatedParams 사용
                                                    const response = await apiClient.post(PRODUCTION_API.PRODUCTION_REQUEST_DETAIL_API, {...updatedParams});
                                                    setProductionRequestDetail(response.data);
                                                    notify('success', '조회 성공', '데이터를 성공적으로 조회했습니다.', 'bottomRight');
                                                } catch (error) {
                                                    notify('error', '조회 오류', '데이터 조회 중 오류가 발생했습니다.', 'top');
                                                }
                                            }
                                        })}
                                    />
                                </Grid>
                            </Paper>
                        </Grow>
                    </Grid>
                    { setProductionRequestDetail ? (
                        <Grid item xs={12} md={6} sx={{ minWidth: '610x' }}>
                            <Grow in={true} timeout={200}>
                                <Paper elevation={3} sx={{ height: '100%' }}>
                                    <Typography variant="h6" sx={{ padding: '20px' }}>생산의뢰 상세 조회</Typography>
                                    <Grid sx={{ padding: '0px 20px 0px 20px' }}>
                                        <Table
                                            dataSource={productionRequestDetail?.detailList}
                                            columns={[
                                                {
                                                    title: <div className="title-text">의뢰구분</div>,
                                                    dataIndex: 'requestType',
                                                    key: 'requestType',
                                                    align: 'center',
                                                    width: '10%',
                                                    render: (text) => <div className="small-text">{
                                                        {
                                                            'MASS_PRODUCTION': '양산',
                                                            'PILOT_PRODUCTION': '시험양산',
                                                            'URGENT_ORDER': '특급수주',
                                                            'SAMPLE': '샘플',
                                                            'PMS': 'PMS'
                                                        }[text] || text
                                                    }</div>,
                                                },
                                                {
                                                    title: <div className="title-text">의뢰명</div>,
                                                    dataIndex: 'name',
                                                    key: 'name',
                                                    align: 'center',
                                                    width: '15%',
                                                    render: (text) => <div className="small-text">{text}</div>,
                                                },
                                                {
                                                    title: <div className="title-text">진행상태</div>,
                                                    dataIndex: 'progressType',
                                                    key: 'progressType',
                                                    align: 'center',
                                                    width: '5%',
                                                    render: (text) => <div className="small-text">{
                                                        {
                                                            'PENDING': '대기 중',
                                                            'IN_PROGRESS': '진행 중',
                                                            'COMPLETED': '완료됨'
                                                        }[text] || text
                                                    }</div>,
                                                },
                                                {
                                                    title: <div className="title-text">확정여부</div>,
                                                    dataIndex: 'isConfirmed',
                                                    key: 'isConfirmed',
                                                    align: 'center',
                                                    width: '5%',
                                                    render: (value) => <div className="small-text">{value ? '확정됨' : '미확정'}</div>,
                                                },
                                                {
                                                    title: <div className="title-text">생산 요청일자</div>,
                                                    dataIndex: 'requestDate',
                                                    key: 'requestDate',
                                                    align: 'center',
                                                    width: '15%',
                                                    render: (text) => <div className="small-text">{text}</div>,
                                                },
                                                {
                                                    title: <div className="title-text">완료 요청일자</div>,
                                                    dataIndex: 'deadlineOfCompletion',
                                                    key: 'deadlineOfCompletion',
                                                    align: 'center',
                                                    width: '15%',
                                                    render: (text) => <div className="small-text">{text}</div>,
                                                },
                                                {
                                                    title: <div className="title-text">납기일</div>,
                                                    dataIndex: 'dueDateToProvide',
                                                    key: 'dueDateToProvide',
                                                    align: 'center',
                                                    width: '15%',
                                                    render: (text) => <div className="small-text">{text}</div>,
                                                },
                                                {
                                                    title: <div className="title-text">요청 수량</div>,
                                                    dataIndex: 'requestQuantity',
                                                    key: 'requestQuantity',
                                                    align: 'center',
                                                    width: '10%',
                                                    render: (text) => <div className="small-text">{text}</div>,
                                                },
                                                {
                                                    title: <div className="title-text">확정 수량</div>,
                                                    dataIndex: 'confirmedQuantity',
                                                    key: 'confirmedQuantity',
                                                    align: 'center',
                                                    width: '10%',
                                                    render: (text) => <div className="small-text">{text}</div>,
                                                },
                                            ]}
                                        />
                                    </Grid>
                                </Paper>
                            </Grow>
                        </Grid>
                    ) : (<></>)
                    }
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

export default ProductionRequestPage;