import React, { useState, useEffect } from 'react';
import { workerAssignmentColumns } from './WorkerAssignmentColumns.jsx'; // 컬럼 설정
import {Modal, Select, Table, Input, DatePicker, Button, Typography, Col, Row, Form, Spin} from 'antd';
import apiClient from "../../../../../config/apiClient.jsx";
import { PRODUCTION_API } from "../../../../../config/apiConstants.jsx"
import {useNotificationContext} from "../../../../../config/NotificationContext.jsx";
import dayjs from 'dayjs';
import {Grid, Box } from "@mui/material";
import {DownSquareOutlined, PrinterOutlined, SearchOutlined} from "@ant-design/icons";

const { RangePicker } = DatePicker;

const WorkerAssignmentPage = () => {
    const today = dayjs(); // 오늘 날짜 설정
    const [searchParams, setSearchParams] = useState({
        startDate: null,
        endDate: null,
        factoryCode: '',
        workcenterCode: ''
    });
    const [searchDetailParams, setSearchDetailParams] = useState({
        startDate : null,
        endDate : null,
        factoryCode : '',
        workcenterCode : '',
    });
    const [isFactoryModalVisible, setIsFactoryModalVisible] = useState(false); // 공장 모달 상태
    const [isWorkcenterModalVisible, setIsWorkcenterModalVisible] = useState(false); // 작업장 모달 상태

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentField, setCurrentField] = useState(null); // 현재 선택된 필드 (공장 or 작업장)
    const [modalData, setModalData] = useState([]);
    const [initialModalData, setInitialModalData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [workerAssignments, setWorkerAssignments] = useState([]);
    const [selectedFactory, setSelectedFactory] = useState(null);  // 공장 선택 상태
    const [selectedWorkcenter, setSelectedWorkcenter] = useState(null);  // 작업장 선택 상태

    const [filteredFactoryList, setFilteredFactoryList] = useState([]); // 공장 검색 결과
    const [filteredWorkcenterList, setFilteredWorkcenterList] = useState([]); // 작업장 검색 결과


    const [factoryList, setFactoryList] = useState([]);  // 공장 목록 상태
    const [workcenterList, setWorkcenterList] = useState([]); // 작업장 목록 상태
    const [displayValues, setDisplayValues] = useState({
        factory: '',
        workcenter: ''
    });

    const [selectedWorkerAssignment, setSelectedWorkerAssignment] = useState(null);
    const [loading, setLoading] = useState(true);  // 로딩 상태 관리
    const [selectedDate, setSelectedDate] = useState(today.toDate()); // 기본값: 오늘
    const [dateRange, setDateRange] = useState([today, today]); // 기본값: 오늘
    const notify = useNotificationContext(); // 알림 컨텍스트 사용

    // 오늘의 작업자 배정 데이터 조회
    useEffect(() => {
        fetchWorkerAssignments(today, today); // 페이지 로드 시 오늘의 배정 정보 조회
    }, []);

    useEffect(() => {
        console.log('선택된 공장:', selectedFactory);
        console.log('선택된 작업장:', selectedWorkcenter);
        console.log('Display Values:', displayValues);
    }, [selectedFactory, selectedWorkcenter, displayValues]);

    // 날짜 선택 처리
    const handleDateChange = (dates) => {
        if (dates) {
            setSearchParams({
                ...searchParams,
                startDate: dates[0].format('YYYY-MM-DD'),
                endDate: dates[1].format('YYYY-MM-DD'),
            });
            setSearchDetailParams({
                ...searchDetailParams,
                startDate: dates[0].format('YYYY-MM-DD'),
                endDate: dates[1].format('YYYY-MM-DD'),
            });
        }
    };

    // API 호출 함수
    const fetchWorkerAssignments = async () => {
        setLoading(true);
        const { startDate, endDate, factoryCode, workcenterCode } = searchParams; // searchParams에서 필요한 값들을 가져옴

        try {
            const response = await apiClient.post(
                PRODUCTION_API.WORKER_ASSIGNMENT_DATES_API,
                null, // POST 요청 본문은 필요하지 않음
                {
                    params: {
                        includeShiftType: false,
                        startDate: startDate ? dayjs(startDate).format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD'),
                        endDate: endDate ? dayjs(endDate).format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD'),
                        factoryCode: selectedFactory?.code || '',
                        workcenterCode: selectedWorkcenter?.code || '',
                    },
                }
            );
            console.log("fetchWorkerAssignments API 응답:", response.data); // 응답 확인

            setWorkerAssignments(response.data); // workerAssignments 필드가 아닌 리스트 자체로 설정
            setLoading(false);
        } catch (error) {
            console.error("작업자 배정 데이터를 불러오는데 실패했습니다.", error);
            notify('error', '조회 오류', '데이터 조회 중 오류가 발생했습니다.', 'top');
        } finally {
            setIsLoading(false);
        }
    };

    // 공장 목록 불러오기
    const fetchFactories = async () => {
        try {
            const response = await apiClient.post(PRODUCTION_API.SEARCH_FACTORIES_API);
            setInitialModalData(response.data);
            setModalData(response.data);
            setFactoryList(response.data);
            setFilteredFactoryList(response.data);
        } catch (error) {
            console.error('공장 목록을 불러오는데 실패했습니다.', error);
            notify('error', '조회 오류', '공장목록을 불러오는 중 오류가 발생했습니다.')
        } finally {
            setIsLoading(false);
        }
    };

    // 작업장 목록 불러오기
    const fetchWorkcentersByFactory = async (factoryCode) => {
        try {
            let response;
            if (selectedFactory) {
                response = await apiClient.post(PRODUCTION_API.WORKCENTER_LIST_API, {
                    factoryCode: selectedFactory
                });
            } else {
                response = await apiClient.post(PRODUCTION_API.WORKCENTER_LIST_API);
            }
            // setInitialModalData(filteredWorkcenters);
            setWorkcenterList(response.data);
            setFilteredWorkcenterList(response.data);
        } catch (error) {
            console.error('작업장 목록을 불러오는데 실패했습니다.', error);
            notify('error', '조회 오류', '작업장 목록을 불러오는 중 오류가 발생했습니다.')
        } finally {
            setIsLoading(false);
        }
    };

    // 기간 조회 버튼 클릭 핸들러
    const handleSearchByDate = () => {
        if (dateRange && dateRange.length === 2) {
            const [startDate, endDate] = dateRange; // 날짜 범위의 시작일과 종료일을 분리
            setSearchParams((prevParams) => ({
                ...prevParams,
                startDate: startDate.format('YYYY-MM-DD'),
                endDate:endDate.format('YYYY-MM-DD')
            }))

            fetchWorkerAssignments(startDate, endDate); // 날짜 범위를 fetchWorkerAssignments로 전달
        } else {
            notify('warning', '오류', '유효한 날짜 범위를 선택하세요.');
        }
    };

    const handleSelectedRow = (record) => {
        setSelectedWorkerAssignment(record);
        console.log('선택된 작업자 배정:', record);
    };

    // 모달 열기
    const openModal = (field) => {
        setCurrentField(field);
        setIsModalVisible(true);

        if (field === 'factory') {
            fetchFactories();  // 모달 열릴 때 전체 공장 목록 조회
            // setFilteredFactoryList(factoryList); // 초기 데이터 설정
        }
        if (field === 'workcenter') {
            fetchWorkcentersByFactory(selectedFactory);  // 모달 열릴 때 전체 작업장 목록 조회
            // setFilteredWorkcenterList(workcenterList); // 초기 데이터 설정
        }
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);  // 모달창 닫기
    };
    //
    // // **모달에서 선택한 값 처리**
    // const handleModalSelect = (field, record) => {
    //     setDisplayValues((prev) => ({
    //         ...prev,
    //         [field]: `[${record.code}] ${record.name}`
    //     }));
    //     field === 'factory'
    //         ? fetchWorkcentersByFactory(record.code)
    //         : setIsWorkcenterModalVisible(false);
    //     setIsFactoryModalVisible(false);
    // };

    // 모달 검색 핸들러
    const handleSearch = (value, field) => {
        const normalizedValue = value.toLowerCase().trim();

        if (!normalizedValue) {
            if (field === 'factory') {
                setFilteredFactoryList(factoryList);
            } else if (field === 'workcenter') {
                setFilteredWorkcenterList(workcenterList);
            }
            return;
        }

        const filteredData = (field === 'factory' ? factoryList : workcenterList).filter(
            (item) =>
                item.code.toLowerCase().includes(normalizedValue) ||
                item.name.toLowerCase().includes(normalizedValue)
        );

        if (field === 'factory') {
            setFilteredFactoryList(filteredData);
        } else if (field === 'workcenter') {
            setFilteredWorkcenterList(filteredData);
        }
    };

    const handleFactorySelect = (record) => {
        setSelectedFactory(record); // 선택된 공장 정보 저장
        // displayValues에 선택된 값 설정
        setDisplayValues((prevValues) => ({
            ...prevValues,
            factory: `[${record.code}] ${record.name}`, // 공장 이름과 코드 포맷팅
        }));

        // searchParams에도 선택된 공장 정보 반영
        setSearchParams((prevParams) => ({
            ...prevParams,
            factoryCode: record.code,
        }));

        setIsFactoryModalVisible(false); // 모달 닫기
        // setFilteredWorkcenterList([]); // 공장 선택 시 작업장 목록 초기화
        fetchWorkcentersByFactory(record.code); // 해당 공장의 작업장 목록 불러오기
        console.log('선택된 공장:', record); // 디버깅용 로그
    };

    const handleWorkcenterSelect = (record) => {
        setSelectedWorkcenter(record); // 선택된 작업장 정보 저장
        // displayValues에 선택된 값 설정
        setDisplayValues((prevValues) => ({
            ...prevValues,
            workcenter: `[${record.code}] ${record.name}`, // 작업장 이름과 코드 포맷팅
        }));

        setIsWorkcenterModalVisible(false); // 모달 닫기
        console.log('선택된 작업장:', record); // 디버깅용 로그
    };

    return (
        <Grid>
            <Form layout="vertical">
                <Row gutter={16} style={{ marginBottom: '16px' }}>
                    <Col span={6}>
                        <Form.Item label="공장 선택" tooltip="찾으시는 공장을 검색하세요.">
                            <Input
                                value={displayValues.factory}
                                placeholder="공장 선택"
                                onClick={() => {
                                    setIsFactoryModalVisible(true);
                                    fetchFactories();
                                }}
                                className={displayValues.factory ? 'selected-input' : 'placeholder-input'}
                                style={{ caretColor: 'transparent', cursor: 'pointer' }}
                                suffix={<DownSquareOutlined />}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item label="작업장 선택" tooltip="찾으시는 작업장을 검색하세요.">
                            <Input
                                value={displayValues.workcenter}
                                placeholder="작업장 선택"
                                onClick={() => {
                                    setIsWorkcenterModalVisible(true);
                                    fetchWorkcentersByFactory(selectedFactory);
                            }}
                                className={displayValues.workcenter ? 'selected-input' : 'placeholder-input'}
                                style={{ caretColor: 'transparent', cursor: 'pointer' }}
                                suffix={<DownSquareOutlined />}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item label="조회 기간" tooltip="찾으시는 날짜를 선택하세요.">
                            <RangePicker
                                value={dateRange}
                                onChange={(dates) => setDateRange(dates)}
                                style={{ width: '100%' }}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item label=" ">
                            <Button
                                style={{ width: '100px' }}
                                type="primary"
                                icon={<SearchOutlined />}
                                onClick={handleSearchByDate}
                                block
                            >
                                검색
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>

                {/* 공장 선택 모달 */}
                <Modal
                    open={isFactoryModalVisible}
                    onCancel={() => setIsFactoryModalVisible(false)}
                    // onCancel={handleModalCancel}
                    footer={null}
                    width="40vw"
                >
                    {isLoading ? (
                        <Spin />  // 로딩 스피너
                    ) : (
                    <>
                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: '20px' }}>
                            공장 선택
                        </Typography>
                        <Input
                            placeholder="공장 코드 또는 이름 검색"
                            prefix={<SearchOutlined />}
                            onChange={(e) => handleSearch(e.target.value, 'factory')}
                            style={{ marginBottom: 16 }}
                        />
                        <Table
                            dataSource={filteredFactoryList}
                            columns={[
                                {
                                    title: <div className="title-text">코드</div>,
                                    dataIndex: 'code',
                                    key: 'code',
                                    align: 'center',
                                    render: (text) => <div className="small-text">{text}</div>
                                },
                                {
                                    title: <div className="title-text">이름</div>,
                                    dataIndex: 'name',
                                    key: 'name',
                                    align: 'center',
                                    render: (text) => <div className="small-text">{text}</div>
                                },
                            ]}
                            rowKey="code"
                            size={'small'}
                            pagination={{
                                pageSize: 15,
                                position: ['bottomCenter'],
                                showSizeChanger: false,
                                showTotal: (total) => `총 ${total}개`,
                            }}
                            onRow={(record) => ({
                                style: { cursor: 'pointer' },
                                onClick: () => handleFactorySelect(record),
                                // onClick: () => handleModalSelect(record), // 선택 핸들러 연결
                            })}
                        />
                    </>)}
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button onClick={() => setIsFactoryModalVisible(false)} variant="contained" type="danger" sx={{ mr: 1 }}>
                            닫기
                        </Button>
                    </Box>
                </Modal>

                {/* 작업장 선택 모달 */}
                <Modal
                    open={isWorkcenterModalVisible}
                    onCancel={() => setIsWorkcenterModalVisible(false)}
                    footer={null}
                    width="40vw"
                >
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: '20px' }}>
                        작업장 선택
                    </Typography>
                    <Input
                        placeholder="작업장 코드 또는 이름 검색"
                        prefix={<SearchOutlined />}
                        onChange={(e) => handleSearch(e.target.value, 'workcenter')}
                        style={{ marginBottom: '16px' }}
                    />
                    <Table
                        dataSource={filteredWorkcenterList}
                        columns={[
                            {
                                title: <div className="title-text">코드</div>,
                                dataIndex: 'code',
                                key: 'code',
                                align: 'center',
                                render: (text) => <div className="small-text">{text}</div>
                            },
                            {
                                title: <div className="title-text">이름</div>,
                                dataIndex: 'name',
                                key: 'name',
                                align: 'center',
                                render: (text) => <div className="small-text">{text}</div>
                            },
                        ]}
                        rowKey="code"
                        size={'small'}
                        pagination={{
                            pageSize: 15,
                            position: ['bottomCenter'],
                            showSizeChanger: false,
                            showTotal: (total) => `총 ${total}개`,
                        }}
                        onRow={(record) => ({
                            style: { cursor: 'pointer' },
                            onClick: () => handleWorkcenterSelect(record),
                            // onClick: () => handleModalSelect(record), // 선택 핸들러 연결
                        })}
                    />
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button onClick={() => setIsWorkcenterModalVisible(false)} variant="contained" type="danger" sx={{ mr: 1 }}>
                            닫기
                        </Button>
                    </Box>
                </Modal>
            </Form>
            {/* 작업자 배정 리스트 */}
            <Grid>
                <Table
                    columns={workerAssignmentColumns}
                    dataSource={workerAssignments}
                    pagination={{ pageSize: 15, position: ['bottomCenter'], showSizeChanger: false }}
                    size="small"
                    rowKey="id" // WorkerAssignment에서 id 필드를 사용
                    onRow={(record) => ({
                        onClick: () => handleSelectedRow(record), // 행 클릭 시 해당 배정이력 선택
                        style: { cursor: 'pointer' },
                    })}
                    rowClassName={(record) => (record.id === selectedDate?.id ? 'selected-row' : '')}
                />
                {/*{tableData.length === 0 && (*/}
                {/*    <Typography style={{ marginTop: '16px', textAlign: 'center' }}>*/}
                {/*        배정된 작업자 명단이 없습니다.*/}
                {/*    </Typography>*/}
                {/*)}*/}
            </Grid>



            {/*<WorkerAssignmentPerWorkcenterList*/}
            {/*    columns={workerAssignmentColumns}*/}
            {/*    data={workerAssignments}*/}
            {/*    loading={loading}*/}
            {/*    rowClassName={(record) => (record.id === selectedDate?.id ? 'selected-row' : '')}*/}
            {/*/>*/}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end', // 버튼을 오른쪽 끝으로 정렬
                    marginTop: '16px',
                    marginBottom: '16px',
                }}
            >
                <Button
                    type="primary"
                    icon={<PrinterOutlined />}
                    onClick={() => window.print()} // 버튼 클릭 시 인쇄
                >
                    출력
                </Button>
            </Box>
        </Grid>
    );
};

export default WorkerAssignmentPage;
