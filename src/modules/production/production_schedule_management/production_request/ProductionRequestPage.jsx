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
import {
    EMPLOYEE_API,
    FINANCIAL_API as HUMAN_API,
    FINANCIAL_API, LOGISTICS_API,
    PRODUCTION_API
} from "../../../../config/apiConstants.jsx";
import apiClient from "../../../../config/apiClient.jsx";
import {useNotificationContext} from "../../../../config/NotificationContext.jsx";
import dayjs from "dayjs";
import {BookOutlined, DownSquareOutlined, InfoCircleOutlined, SearchOutlined} from "@ant-design/icons";
const { RangePicker } = DatePicker;
const { Option } = Select;

const ProductionRequestPage = () => {
    const notify = useNotificationContext(); // 알림 컨텍스트 사용
    const [form] = Form.useForm(); // 폼 인스턴스 생성
    const [registrationForm] = Form.useForm(); // 폼 인스턴스 생성
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
    const [selectedValue, setSelectedValue] = useState({});

    const [productionRequests, setProductionRequests] = useState(null);
    const [productionRequestDetail, setProductionRequestDetail] = useState(null);
    const [productionRequestParam, setProductionRequestParam] = useState(false); //

    const handleTabChange = (key) => {
        setActiveTabKey(key);
    };

    // 모달 데이터 가져오기
    const fetchModalData = async (fieldName) => {
        setIsLoading(true);
        let apiPath;
        if (fieldName === 'client') apiPath = FINANCIAL_API.FETCH_CLIENT_LIST_API;
        if (fieldName === 'department') apiPath = EMPLOYEE_API.DEPARTMENT_DATA_API;
        if (fieldName === 'requester') apiPath = EMPLOYEE_API.EMPLOYEE_DATA_API;
        if (fieldName === 'product') apiPath = LOGISTICS_API.PRODUCT_LIST_API;

        try {
            const response = await apiClient.get(apiPath);
            setModalData(response.data);
        } catch (error) {
            notify('error', '조회 실패', '데이터를 불러오는 데 실패했습니다.', 'top');
        }
    };

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

    const handleModalCancel = () => {
        setIsModalVisible(false);
        setCurrentField(null);
        setCurrentRequest(null);
    }

    const handleModalSelect = (record) => {
        setSelectedValue((prev) => ({ ...prev, [currentField]: record.name }));
        form.setFieldsValue({ [currentField]: record.name });
        setIsModalVisible(false);
    };

    // 폼 제출 핸들러
    const handleFormSubmit = async (values, type) => {
        confirm({
            title: '저장 확인',
            content: '정말로 저장하시겠습니까?',
            okText: '확인',
            cancelText: '취소',
            onOk:async () => {
                // 확인 버튼 클릭 시 실행되는 저장 로직
                values.id = productionRequestParam.id;
            }
        })
    }

    const fetchProductionRequests = async () => {
        setIsLoading(true);
        try {
            const response = await apiClient.post(PRODUCTION_API.PRODUCTION_REQUEST_LIST_API);
            console.log("응답 데이터:", response.data); // 응답 데이터 확인
            if (response.data && response.data.length > 0) {
                setProductionRequests(response.data); // 응답 데이터가 있으면 상태 갱신
            } else {
                console.warn("데이터가 없습니다.");
                setProductionRequests([]); // 빈 배열로 설정
            }
        } catch (error) {
            console.error("조회 오류:", error);
            notify('error', '조회 오류', '데이터 조회 중 오류가 발생했습니다.', 'top');
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        fetchProductionRequests()
    }, []);


    // 생산 의뢰 상세 조회
    const fetchProductionRequestDetail = async (id) => {
        setIsLoading(true);
        try {
            const response = await apiClient.post(PRODUCTION_API.PRODUCTION_REQUEST_DETAIL_API(id));
            setCurrentRequest(response.data);
            notify('success', '조회 성공', '상세 데이터가 조회되었습니다.', 'bottomRight')
        } catch (error) {
            notify('error', '조회 실패', '데이터 상세 조회 중 오류가 발생했습니다.', 'top')
        }
    }

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
            width: '10%',
            align: 'center',
            render: (text) => (
                <Tag color="gold">  {/* 모든 의뢰 구분에 동일한 색상 적용 */}
                    {{
                        'Mass Production': '양산',
                        'Pilot Production': '시험양산',
                        'Urgent Order': '특급수주',
                        'Sample': '샘플',
                        'PMS': 'PMS',
                    }[text] || text}
                </Tag>
            ),
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
            render: (text) => (
                <Tag color={{
                    Created: 'geekblue',
                    'In Progress': 'geekblue',
                    'Not Started': 'geekblue',
                    'Halted': 'volcano',
                    'Completed': 'green',
                    'Incomplete': 'red',
                }[text] || 'default'}>
                    {{
                        Created: '등록',
                        'In Progress': '진행중',
                        'Not Started': '미진행',
                        'Halted': '진행중단',
                        'Completed': '완료',
                        'Incomplete': '미완료',
                    }[text] || text}
                </Tag>
            ),
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
        {
            title: <div className="title-text">확정여부</div>,
            dataIndex: 'isConfirmed',
            key: 'isConfirmed',
            align: 'center',
            width: '5%',
            render: (value) => (
                <Tag color={value ? 'green' : 'volcano'}>
                    {value ? '확정됨' : '미확정'}
                </Tag>
            ),
        },
        // {
        //     title: '거래처',
        //     dataIndex: 'clientId',
        //     key: 'clientId',
        //     width: '10%',
        //     render: (id, record) => (
        //         <Tooltip title={record.client?.name || '미지정'}>
        //             <Tag color="blue">{record.client?.name || '미지정'}</Tag>
        //         </Tooltip>
        //     ),
        // },
        // {
        //     title: '부서',
        //     dataIndex: 'departmentId',
        //     key: 'departmentId',
        //     width: '10%',
        //     render: (id, record) => (
        //         <Tooltip title={record.productionDepartment?.name || '미지정'}>
        //             <Tag color="purple">{record.productionDepartment?.name || '미지정'}</Tag>
        //         </Tooltip>
        //     ),
        // },
        // {
        //     title: '제품',
        //     dataIndex: 'productId',
        //     key: 'productId',
        //     width: '10%',
        //     render: (id, record) => (
        //         <Tooltip title={record.product?.name || '미지정'}>
        //             <Tag color="gold">{record.product?.name || '미지정'}</Tag>
        //         </Tooltip>
        //     ),
        // },
        // {
        //     title: '요청자',
        //     dataIndex: 'requesterId',
        //     key: 'requesterId',
        //     width: '10%',
        //     render: (id, record) => (
        //         <Tooltip title={record.requester?.name || '미지정'}>
        //             <Tag color="volcano">{record.requester?.name || '미지정'}</Tag>
        //         </Tooltip>
        //     ),
        // },
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
                    <Grid item xs={12} md={10} sx={{ minWidth: '1000px !important', maxWidth: '1200px !important' }}>
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
                                                        value={searchParams.requestType || undefined}
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
                                                        value={searchParams.progressType || undefined}
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
                                                    // ID를 API 경로에 포함해 호출
                                                    const response = await apiClient.post(PRODUCTION_API.PRODUCTION_REQUEST_DETAIL_API(record.id));
                                                    setProductionRequestDetail(response.data); // 상세 정보 상태에 저장
                                                    console.log("setProductionRequestDetail(response.data); ", response.data )
                                                    notify('success', '조회 성공', '데이터를 성공적으로 조회했습니다.', 'bottomRight');
                                                } catch (error) {
                                                    console.error('API 호출 오류:', error);
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
                        <Grid item xs={12} md={10} sx={{ minWidth: '1000px !important', maxWidth: '1200px !important' }}>
                            <Grow in={true} timeout={200}>
                                <Paper elevation={3} sx={{ height: '100%' }}>
                                    <Typography variant="h6" sx={{ padding: '20px' }}>생산의뢰 등록 및 수정</Typography>
                                    <Grid sx={{ padding: '0px 20px 0px 20px' }}>
                                        <Form
                                            form={form}
                                            layout="vertical"
                                            onFinish={(values) => handleFormSubmit(values, 'update')}
                                            style={{ padding: '20px' }}
                                        >
                                            <Row gutter={16}>
                                                <Col span={12}>
                                                    <Form.Item
                                                        name="requestType"
                                                        label="의뢰 구분"
                                                        rules={[{ required: true, message: '의뢰 구분을 선택하세요.' }]}
                                                    >
                                                        <Select placeholder="의뢰 구분 선택">
                                                            <Option value="MASS_PRODUCTION">양산</Option>
                                                            <Option value="PILOT_PRODUCTION">시험양산</Option>
                                                            <Option value="URGENT_ORDER">특급수주</Option>
                                                            <Option value="SAMPLE">샘플</Option>
                                                            <Option value="PMS">PMS</Option>
                                                        </Select>
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item
                                                        name="progressType"
                                                        label="진행 상태"
                                                        rules={[{ required: true, message: '진행 상태를 선택하세요.' }]}
                                                    >
                                                        <Select placeholder="진행 상태 선택">
                                                            <Option value="CREATED">등록</Option>
                                                            <Option value="IN_PROGRESS">진행 중</Option>
                                                            <Option value="NOT_STARTED">미진행</Option>
                                                            <Option value="HALTED">진행중단</Option>
                                                            <Option value="COMPLETED">완료</Option>
                                                            <Option value="INCOMPLETE">미완료</Option>
                                                        </Select>

                                                    </Form.Item>
                                                </Col>
                                            </Row>

                                            <Row gutter={16}>
                                                <Col span={12}>
                                                    <Form.Item
                                                        name="name"
                                                        label="의뢰명"
                                                        rules={[{ required: true, message: '의뢰명을 입력하세요.' }]}
                                                    >
                                                        <Input placeholder="의뢰명 입력" />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item name="isConfirmed" label="확정 여부">
                                                        <Select placeholder="확정 여부 선택">
                                                            <Option value={true}>확정됨</Option>
                                                            <Option value={false}>미확정</Option>
                                                        </Select>
                                                    </Form.Item>
                                                </Col>
                                            </Row>

                                            <Row gutter={16}>
                                                <Col span={12}>
                                                    <Form.Item name="requestDate" label="요청일">
                                                        <DatePicker style={{ width: '100%' }} />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item name="deadlineOfCompletion" label="완료 요청일">
                                                        <DatePicker style={{ width: '100%' }} />
                                                    </Form.Item>
                                                </Col>
                                            </Row>

                                            <Row gutter={16}>
                                                <Col span={12}>
                                                    <Form.Item name="dueDateToProvide" label="납기일">
                                                        <DatePicker style={{ width: '100%' }} />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item name="requestQuantity" label="요청 수량">
                                                        <Input type="number" placeholder="요청 수량 입력" />
                                                    </Form.Item>
                                                </Col>
                                            </Row>

                                            <Row gutter={16}>
                                                <Col span={12}>
                                                    <Form.Item name="confirmedQuantity" label="확정 수량">
                                                        <Input type="number" placeholder="확정 수량 입력" />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item name="remarks" label="특이사항">
                                                        <Input.TextArea placeholder="특이사항 입력" />
                                                    </Form.Item>
                                                </Col>
                                            </Row>

                                            <Row gutter={16}>
                                                <Col span={8}>
                                                    <Form.Item name="client" label="거래처">
                                                        <Input
                                                            placeholder="거래처 선택"
                                                            readOnly
                                                            onClick={() => handleInputClick('client')}
                                                            suffix={<DownSquareOutlined />}
                                                        />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item name="department" label="부서">
                                                        <Input
                                                            placeholder="부서 선택"
                                                            readOnly
                                                            onClick={() => handleInputClick('department')}
                                                            suffix={<DownSquareOutlined />}
                                                        />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={8}>
                                                    <Form.Item name="product" label="제품">
                                                        <Input
                                                            placeholder="제품 선택"
                                                            readOnly
                                                            onClick={() => handleInputClick('product')}
                                                            suffix={<DownSquareOutlined />}
                                                        />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Row gutter={16}>
                                                <Col span={8}>
                                                    <Form.Item name="requester" label="요청자">
                                                        <Input
                                                            placeholder="요청자 선택"
                                                            readOnly
                                                            onClick={() => handleInputClick('requester')}
                                                            suffix={<DownSquareOutlined />}
                                                        />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                                                <Button type="primary" htmlType="submit">
                                                    저장
                                                </Button>
                                                <Button type="default" onClick={handleDelete} style={{ marginLeft: '10px' }} danger>
                                                    삭제
                                                </Button>
                                            </Box>
                                            <Modal
                                                title="검색"
                                                open={isModalVisible}
                                                footer={null}
                                                onCancel={() => setIsModalVisible(false)}
                                            >
                                                <Input
                                                    placeholder="검색"
                                                    prefix={<SearchOutlined />}
                                                    onChange={(e) => {
                                                        const value = e.target.value.toLowerCase();
                                                        const filtered = modalData.filter((item) =>
                                                            item.name.toLowerCase().includes(value)
                                                        );
                                                        setModalData(filtered);
                                                    }}
                                                    style={{ marginBottom: 16 }}
                                                />
                                                <Table
                                                    dataSource={modalData}
                                                    columns={[
                                                        { title: 'ID', dataIndex: 'id', key: 'id' },
                                                        { title: '이름', dataIndex: 'name', key: 'name' },
                                                    ]}
                                                    rowKey="id"
                                                    onRow={(record) => ({
                                                        onClick: () => handleModalSelect(record),
                                                    })}
                                                />
                                            </Modal>
                                        </Form>

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