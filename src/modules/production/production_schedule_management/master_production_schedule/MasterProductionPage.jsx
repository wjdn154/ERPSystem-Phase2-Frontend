import React, {useEffect, useMemo, useState} from 'react';
import {Box, Grid, Grow, Paper} from '@mui/material';
import WelcomeSection from '../../../../components/WelcomeSection.jsx';
import { tabItems } from './MasterProductionUtil.jsx';
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
} from 'antd';import TemporarySection from "../../../../components/TemporarySection.jsx";
import dayjs from "dayjs";
import {BookOutlined, DownSquareOutlined, InfoCircleOutlined, SearchOutlined} from "@ant-design/icons";
const { RangePicker } = DatePicker;
const { Option } = Select;
import apiClient from "../../../../config/apiClient.jsx";
import {useNotificationContext} from "../../../../config/NotificationContext.jsx";
import {LOGISTICS_API, PRODUCTION_API} from "../../../../config/apiConstants.jsx";

const MasterProductionPage = () => {
    const [mpsList, setMpsList] = useState([]);
    const [productList, setProductList] = useState([]);
    const [mpsDetail, setMpsDetail] = useState(null);
    const notify = useNotificationContext(); // 알림 컨텍스트 사용
    const [form] = Form.useForm();
    const [registrationForm] = Form.useForm(); // 폼 인스턴스 생성
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [activeTabKey, setActiveTabKey] = useState('1');
    const [isLoading, setIsLoading] = useState(false);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [initialModalData, setInitialModalData] = useState(null);
    const [selectedValue, setSelectedValue] = useState({});
    const [currentField, setCurrentField] = useState('');
    const [currentMps, setCurrentMps] = useState('');
    const [searchParams, setSearchParams] = useState({
    });


        useEffect(() => {
        fetchMpsList();
        fetchProductList();
    }, []); // 빈 배열은 컴포넌트가 처음 렌더링될 때만 실행되도록 보장

    const fetchProductList = async () => {
        try {
            const response = await apiClient.post(LOGISTICS_API.PRODUCT_LIST_API);
            setProductList(response.data); // 제품 목록 상태에 저장
            setModalData(response.data); // 모달 데이터에도 저장
            setInitialModalData(response.data); // 초기 데이터 저장
            notify('success', '조회 성공', '데이터 조회 성공.', 'bottomRight');
            console.log('응답 데이터:', response.data);
        } catch (error) {
            console.error('API 호출 오류:', error);
            notify('error', '조회 실패', '데이터를 불러오는 데 실패했습니다.', 'top');
        } finally {
            setIsLoading(false);
        }
    };

    const handleModalSelect = (record) => {
        setSelectedValue((prev) => ({ ...prev, [currentField]: record.name }));
        form.setFieldsValue({ [currentField]: record.name });
        setIsModalVisible(false);
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);
        setCurrentField(null);
        setCurrentRequest(null);
    }

    // 입력 필드 클릭 시 모달 열기
    const handleInputClick = (fieldName) => {
        setCurrentField(fieldName);
        setCurrentRequest(null);

        setModalData(null); // 모달 열기 전에 데이터를 초기화
        setInitialModalData(null);
        fetchModalData(fieldName);  // 모달 데이터 가져오기 호출
        fetchProductionRequests(fieldName);
        setIsModalVisible(true);  // 모달창 열기


    };

    const handleSearch = (values) => {
        const filters = {
            ...values,
            planDateRange: values.planDateRange?.map((date) => dayjs(date).format('YYYY-MM-DD')),
            startDateRange: values.startDateRange?.map((date) => dayjs(date).format('YYYY-MM-DD')),
            endDateRange: values.endDateRange?.map((date) => dayjs(date).format('YYYY-MM-DD')),
        };
        fetchMpsList(filters);
    };

    // 초기 데이터 조회 함수
    const fetchMpsList = async () => {
        try {
            const response = await apiClient.post(PRODUCTION_API.MPS_LIST_API, {
                searchDate: dayjs().format('YYYY-MM-DD'),
            });
            setMpsList(response.data);
            notify('success', '조회 성공', '데이터 조회 성공.', 'bottomRight');
            console.log('응답 데이터:', response.data);

        } catch (error) {
            console.error('API 호출 오류:', error);
            notify('error', '조회 실패', '데이터를 불러오는 데 실패했습니다.', 'top');
        } finally {
            setIsLoading(false);
        }
    };

    const fetchMpsDetail = async (mps_id) => {
        try {
            const response = await apiClient.post(PRODUCTION_API.MPS_LIST_API, { mps_id });
            notify('success', '조회 성공', '데이터 조회 성공.', 'bottomRight');
            console.log('상세조회 데이터:', response.data);

        } catch (error) {
            console.error('API 호출 오류:', error);
            notify('error', '조회 실패', '데이터를 불러오는 데 실패했습니다.', 'top');
        } finally {
            setIsLoading(false);
        }
    };


    // MPS 생성 함수
    const createMps = async (values) => {
        try {
            const response = await apiClient.post(PRODUCTION_API.MPS_CREATE, values);
            notify('success', '저장 성공', '데이터 저장 성공.', 'bottomRight');
            fetchMpsList(); // 목록 새로고침
            setIsModalVisible(false);
            form.resetFields();
        } catch (error) {
            notify('error', '저장 실패', '데이터를 저장하는 데 실패했습니다.', 'top');
        }
    };

    // MPS 업데이트 함수
    const updateMps = async (id, values) => {
        try {
            const response = await apiClient.post(PRODUCTION_API.MPS_UPDATE(id), values);
            notify('success', '저장 성공', '데이터 저장 성공.', 'bottomRight');
            fetchMpsList(); // 목록 새로고침
            setIsModalVisible(false);
            form.resetFields();
        } catch (error) {
            notify('error', '저장 실패', '데이터를 저장하는 데 실패했습니다.', 'top');
        }
    };

    // MPS 삭제 함수
    const deleteMps = async (id) => {
        try {
            await apiClient.post(PRODUCTION_API.MPS_DELETE(id));
            notify('success', '삭제 성공', '데이터 삭제 성공.', 'bottomRight');
            fetchMpsList(); // 목록 새로고침
        } catch (error) {
            notify('error', '삭제 실패', '데이터를 삭제하는 데 실패했습니다.', 'top');
        }
    };

    // MPS 완료 처리 함수
    const completeMps = async (id) => {
        try {
            await apiClient.post(PRODUCTION_API.MPS_COMPLETE(id));
            notify('success', '처리 성공', '데이터 완료 처리 성공.', 'bottomRight');
            fetchMpsList(); // 목록 새로고침
        } catch (error) {
            notify('error', '처리 실패', '데이터를 완료 처리하는 데 실패했습니다.', 'top');
        }
    };

    const handleTabChange = (key) => {
        setActiveTabKey(key);
    };

    const columns = [
        {
            title: <div className="title-text">계획명</div>,
            dataIndex: 'name',
            key: 'name',
            align:'center',
        },
        {
            title: <div className="title-text">계획수립일</div>,
            dataIndex: 'planDate',
            key: 'planDate',
            align:'center',
            render: (date) => dayjs(date).format('YYYY-MM-DD'),
        },
        {
            title: <div className="title-text">생산시작일</div>,
            dataIndex: 'startDate',
            key: 'startDate',
            align:'center',
            render: (date) => dayjs(date).format('YYYY-MM-DD'),
        },
        {
            title: <div className="title-text">완료예정일</div>,
            dataIndex: 'endDate',
            key: 'endDate',
            align:'center',
            render: (date) => dayjs(date).format('YYYY-MM-DD'),
        },
        {
            title: <div className="title-text">계획상태</div>,
            dataIndex: 'status',
            key: 'status',
            align:'center',
        },
        {
            title: <div className="title-text">생산수량</div>,
            dataIndex: 'quantity',
            key: 'quantity',
            align:'center',
        },
        // {
        //     title: <div className="title-text">비고</div>,
        //     dataIndex: 'remarks',
        //     key: 'remarks',
        // },
        // {
        //     title: '생산 의뢰 ID',
        //     dataIndex: 'productionRequestId',
        //     key: 'productionRequestId',
        // },
        // {
        //     title: '고객 주문 ID',
        //     dataIndex: 'ordersId',
        //     key: 'ordersId',
        // },
        // {
        //     title: '판매 계획 ID',
        //     dataIndex: 'saleId',
        //     key: 'saleId',
        // },
        {
            title: <div className="title-text">처리</div>,
            key: 'action',
            align:'center',
            render: (_, record) => (
                <Button type="default" onClick={() => completeMps(record.id)}>
                    확정
                </Button>
            ),
        },
    ];


    return (
        <Box sx={{ margin: '20px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <WelcomeSection
                        title="주생산계획(MPS)"
                        description={(
                            <Typography>
                                주생산계획 관리 페이지는 <span>전체 생산 흐름을 체계적으로 계획하고 관리</span>하는 곳임. 이 페이지에서는 <span>월별, 분기별 생산 목표</span>를 설정하고, 각 기간에 맞춘 생산 계획을 세울 수 있음. 주생산계획은 <span>전체적인 생산 용량과 자재 공급 상황</span>을 고려하여 수립되며, 이를 통해 <span>효율적인 생산 일정</span>을 유지할 수 있음.
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
                    <Grid item xs={12} md={10} sx={{ minWidth: '1000px !important', maxWidth: '1200px !important' }}>
                        <Grow in={true} timeout={200}>
                            <Paper elevation={3} sx={{ height: '100%' }}>
                                <Typography variant="h6" sx={{ padding: '20px' }} >주생산계획 목록</Typography>
                                <Grid sx={{ padding: '0px 20px 0px 20px' }}>
                                    <Form layout="vertical" onFinish={handleSearch}>
                                        <Row gutter={16}>
                                            <Col span={6}>
                                                <Form.Item label="제품 선택" name="productId">
                                                    <Select placeholder="제품 선택">
                                                        {productList.map((product) => (
                                                            <Option key={product.id} value={product.id}>
                                                                {product.name}
                                                            </Option>
                                                        ))}
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Col span={6}>
                                                <Form.Item label="확정 여부" tooltip="확정 여부를 선택하세요">
                                                    <Select
                                                        placeholder="확정 여부"
                                                        // value={searchParams.isConfirmed}
                                                        onChange={(value) => setSearchParams({ ...searchParams, isConfirmed: value })}
                                                    >
                                                        <Option value="true">확정됨</Option>
                                                        <Option value="false">미확정</Option>
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                            <Col span={6}>
                                                <Form.Item label="계획 상태" tooltip="검색할 진행 상태를 선택하세요">
                                                    <Select placeholder="계획 상태 선택">
                                                        <Option value="CREATED">등록</Option>
                                                        <Option value="IN_PROGRESS">진행 중</Option>
                                                        <Option value="COMPLETED">완료</Option>
                                                    </Select>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={16}>
                                            <Col span={6}>
                                                <Form.Item label="계획 수립일" name="planDateRange">
                                                    <RangePicker />
                                                </Form.Item>
                                            </Col>
                                            <Col span={6}>
                                                <Form.Item label="생산 시작일" name="startDateRange">
                                                    <RangePicker />
                                                </Form.Item>
                                            </Col>
                                            <Col span={6}>
                                                <Form.Item label="생산 완료 예정일" name="endDateRange">
                                                    <RangePicker />
                                                </Form.Item>
                                            </Col>
                                            <Col span={6} style={{ display: 'flex', alignItems: 'end' }}>
                                                <Form.Item>
                                                    <Button type="primary" onClick={handleSearch}  icon={<SearchOutlined />}>
                                                        검색
                                                    </Button>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Form>
                                    <Table
                                        columns={columns}
                                        dataSource={mpsList}
                                        rowKey="id"
                                        size="small" // TODO size small 인데 왜 다르지?
                                        pagination={{ pageSize: 15 }}
                                        rowSelection={{
                                            type: 'radio',
                                            selectedRowKeys,
                                            onChange: (newSelectedRowKeys) => setSelectedRowKeys(newSelectedRowKeys),
                                        }}
                                        onRow={(record) => ({
                                            style: { cursor: 'pointer' },
                                            onClick: () => {
                                                setSelectedRowKeys([record.id]);
                                                fetchMpsDetail(record.id);
                                            },
                                        })}
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
        </Box>
    );
};

export default MasterProductionPage;