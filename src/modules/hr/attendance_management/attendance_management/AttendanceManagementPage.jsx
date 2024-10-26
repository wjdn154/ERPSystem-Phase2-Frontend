import React, { useEffect, useState } from 'react';
import { Box, Grid, Grow, Paper, Typography } from '@mui/material';
import WelcomeSection from '../../../../components/WelcomeSection.jsx';
import { tabItems } from './AttendanceManagementUtil.jsx';
import {Space, Tag, Form, Table, Button, Col, Input, Row, Checkbox, Modal, Spin, Select, notification, Upload} from 'antd';
import apiClient from '../../../../config/apiClient.jsx';
import {EMPLOYEE_API} from '../../../../config/apiConstants.jsx';
import { Divider } from 'antd';
import { useNotificationContext } from "../../../../config/NotificationContext.jsx";
import {DownSquareOutlined, SearchOutlined} from "@ant-design/icons";
import api from "js-cookie";
const { Option } = Select;
const { confirm } = Modal;




const AttendanceManagementPage = ({initialData}) => {
    const notify = useNotificationContext(); // 알림 컨텍스트 사용
    const [form] = Form.useForm(); // 폼 인스턴스 생성
    const [registrationForm] = Form.useForm(); // 폼 인스턴스 생성
    const [attendanceList, setAttendanceList] = useState(initialData);
    const [activeTabKey, setActiveTabKey] = useState('1'); // 활성 탭 키 상태
    const [selectedRowKeys, setSelectedRowKeys] = useState([]); // 선택된 행 키 상태
    const [editAttendance, setEditAttendance] = useState(false);
    const [fetchAttendanceData, setFetchAttendanceData] = useState(false);
    const [attendanceParam, setAttendanceParam] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태
    const [currentField, setCurrentField] = useState(''); // 모달 분기할 필드 상태
    const [modalData, setModalData] = useState(null); // 모달 데이터 상태
    const [attendances, setAttendance] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false); // 모달 활성화 여부
    const [displayValues, setDisplayValues] = useState({});
    const [initialModalData, setInitialModalData] = useState(null);

    const fetchAttendance = async () => {
        try{
            const response = await apiClient.post(EMPLOYEE_API.ATTENDANCE_DATA_API);
            const attendanceData = response.data.map(item => ({
                ...item,
                fullName: `${item.lastName || ''}${item.firstName || ''}`,  // 성과 이름을 결합하여 fullName 필드로 설정
            }));
            setAttendanceList(attendanceData);
            console.log("근태 데이터:", response.data);
        } catch(error){
            notification.error({
                message: '근태 목록 조회 실패',
                description: '근태 목록을 불러오는 중 오류가 발생했습니다.',
            });
        }
    };

    useEffect(()=>{
        fetchAttendance();
    }, []);



    useEffect(() => {
        if(!fetchAttendanceData) return;
        console.log('Fetched Employee Data:', fetchAttendanceData);
        form.setFieldsValue({
            ...fetchAttendanceData,
            fullName: `${fetchAttendanceData.lastName}${fetchAttendanceData.firstName}`
        });
        setAttendanceParam(fetchAttendanceData);

        setDisplayValues({});}, [fetchAttendanceData, form]);

    const handleTabChange = (key) => {
        setEditAttendance(false);
        setFetchAttendanceData(null);
        setAttendanceParam({});
        setDisplayValues({});
        form.resetFields();
        registrationForm.resetFields(); // 2탭 폼 초기화
        registrationForm.setFieldValue(true);
        setActiveTabKey(key);
    };

    // 모달창 열기 핸들러
    const handleInputClick = (fieldName) => {
        setCurrentField(fieldName);
        setModalData(null); // 모달 열기 전에 데이터를 초기화
        setInitialModalData(null);
        fetchModalData(fieldName); // 모달 데이터 가져오기 호출
        setIsModalVisible(true); // 모달창 열기
    };

    // 모달창 닫기 핸들러
    const handleModalCancel = () => setIsModalVisible(false);

    // 모달창 데이터 가져오기 함수
    const fetchModalData = async (fieldName) => {
        setIsLoading(true);
        let apiPath;
        if(fieldName === 'attendance') apiPath = EMPLOYEE_API.ATTENDANCE_DATA_API;
        if(fieldName === 'employee') apiPath = EMPLOYEE_API.EMPLOYEE_DATA_API;

        try {
            const response = await apiClient.post(apiPath);
            setModalData(response.data);
            setInitialModalData(response.data);
        } catch (error) {
            notify('error', '조회 오류', '데이터 조회 중 오류가 발생했습니다.', 'top');
        } finally {
            setIsLoading(false);
        }
    };

    // 모달창 선택 핸들러
    const handleModalSelect = (record) => {
        switch (currentField) {
            case 'attendance':
                setEmployeeParam((prevParams) => (prevParams));
                setDisplayValues((prevValues) => ({prevValues}));
                break;
        }
        // 모달창 닫기
        setIsModalVisible(false);
    };

    const handleFormSubmit = async (values, type) => {
        confirm({
            title: '저장 확인',
            content: '정말로 저장하시겠습니까?',
            okText: '확인',
            cancelText: '취소',
            onOk: async () => {
                const fullName = values.employeeName || '';

                const formattedValues = {
                    id: values.id,
                    employeeName:values.employeeName,
                    employeeNumber: attendanceParam.employeeNumber,
                    attendancesCode: values.attendancesCode,
                    positionName: values.positionName,
                    date: attendanceParam.date,
                    checkInTime: attendanceParam.checkInTime,
                    checkOutTime:attendanceParam.checkOutTime,
                    status:values.status,
                };

                try {
                    //console.log(formattedValues);
                    const API_PATH = type === 'update' ? EMPLOYEE_API.UPDATE_ATTENDANCE_API(attendanceParam.id)  : EMPLOYEE_API.SAVE_ATTENDANCE_API;
                    const response = await apiClient.post(API_PATH,formattedValues);
                    const updatedData = response.data;

                    if (type === 'update') {
                        setAttendanceList((prevList) =>
                            prevList.map((attendacne) => attendances.id === updatedData.id ? updatedData : attendacne)
                        );
                    } else {
                        setAttendanceList((prevList) => [...prevList, updatedData]);
                        registrationForm.resetFields();
                    }
                    setEditAttendance(false);
                    setFetchAttendanceData(null);
                    setAttendanceParam({});
                    setDisplayValues({});

                    type === 'update'
                        ? notify('success', '근태 수정', '근태 기록 수정 성공.', 'bottomRight')
                        : (notify('success', '근태 저장', '근태 기록 저장 성공.', 'bottomRight'), registrationForm.resetFields());
                } catch (error) {
                    notify('error', '저장 실패', '데이터 저장 중 오류가 발생했습니다.', 'top');
                }
            },
            onCancel() {
                notification.warning({
                    message: '저장 취소',
                    description: '저장이 취소되었습니다.',
                    placement: 'bottomRight',
                });
            },
        });
    };

    return (
        <Box sx={{ margin: '20px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <WelcomeSection
                        title="근태 관리"
                        description={(
                            <Typography>
                                근태 관리 페이지는 <span>사원의 출퇴근 기록 및 근무 현황</span>을 체계적으로 관리하는 기능을 제공함. 이 페이지에서는 사원의 <span>출근, 퇴근 시간과 근무 시간</span>을 기록하고, 이를 통해 <span>정확한 근태 관리</span>가 가능함. 또한 <span>결근, 지각, 조퇴</span> 등의 정보를 함께 기록하여 <span>근무 상태를 종합적으로 파악</span>하고 인사 평가 자료로 활용할 수 있음.
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
                                <Typography variant="h6" sx={{ padding: '20px' }}>근태 목록</Typography>
                                <Grid sx={{ padding: '0px 20px 0px 20px' }}>
                                    <Table
                                        dataSource={attendanceList}
                                        columns={[
                                            {
                                                title: <div className="title-text">근태코드</div>,
                                                dataIndex: 'attendanceCode',
                                                key: 'attendanceCode',
                                                align: 'center',
                                                render: (text) => <div className="small-text">{text}</div>,
                                            },
                                            {
                                                title: <div className="title-text">사원번호</div>,
                                                dataIndex: 'employeeNumber',
                                                key: 'employeeNumber',
                                                align: 'center',
                                                render: (text) => <div className="small-text">{text}</div>,
                                            },
                                            {
                                                title: <div className="title-text">사원이름</div>,
                                                dataIndex: 'employeeName',
                                                key: 'employeeName',
                                                align: 'center',
                                                render: (text) => <div className="small-text">{text}</div>,
                                            },
                                            {
                                                title: <div className="title-text">직위</div>,
                                                dataIndex: 'positionName',
                                                key: 'positionName',
                                                align: 'center',
                                                render: (text) => <div className="small-text">{text}</div>,
                                            },
                                            {
                                                title: <div className="title-text">날짜</div>,
                                                dataIndex: 'date',
                                                key: 'date',
                                                align: 'center',
                                                render: (text) => <div className="small-text">{text}</div>,
                                            },
                                            {
                                                title: <div className="title-text">출근시간</div>,
                                                dataIndex: 'checkInTime',
                                                key: 'checkInTime',
                                                align: 'center',
                                                render: (text) => {
                                                    const formattedTime = text ? new Date(text).toLocaleTimeString('ko-KR', {
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    }) : '';
                                                    return <div className="small-text">{formattedTime}</div>;
                                                },
                                            },
                                            {
                                                title: <div className="title-text">퇴근시간</div>,
                                                dataIndex: 'checkOutTime',
                                                key: 'checkOutTime',
                                                align: 'center',
                                                render: (text) => {
                                                    const formattedTime = text ? new Date(text).toLocaleTimeString('ko-KR', {
                                                        hour: '2-digit',
                                                        minute: '2-digit',
                                                    }) : '';
                                                    return <div className="small-text">{formattedTime}</div>;
                                                },
                                            },
                                            {
                                                title: <div className="title-text">근무상태</div>,
                                                dataIndex: 'status',
                                                key: 'status',
                                                align: 'center',
                                                render: (text) => {
                                                    let value;
                                                    switch (text) {
                                                        case 'PRESENT':
                                                            value = '출근';
                                                            break;
                                                        case 'ABSENT':
                                                            value = '결근';
                                                            break;
                                                        case 'LEAVE':
                                                            value = '휴가';
                                                            break;
                                                        case 'PUBLIC_HOLIDAY':
                                                            value = '공휴일';
                                                            break;
                                                        case 'EARLY_LEAVE':
                                                            value = '조퇴';
                                                            break;
                                                        case 'LATE':
                                                            value = '지각';
                                                            break;
                                                        case 'BUSINESS_TRIP':
                                                            value = '출장';
                                                            break;
                                                        case 'TRAINING':
                                                            value = '교육';
                                                            break;
                                                        case 'SABBATICAL':
                                                            value = '휴직';
                                                            break;
                                                        case 'SICK_LEAVE':
                                                            value = '병가';
                                                            break;
                                                        case 'REMOTE_WORK':
                                                            value = '자택 근무';
                                                            break;
                                                        case 'ON_DUTY':
                                                            value = '근무';
                                                            break;
                                                        case 'OVERTIME':
                                                            value = '야근';
                                                            break;
                                                        case 'SHIFT_WORK':
                                                            value = '교대 근무';
                                                            break;
                                                        case 'LATE_AND_EARLY_LEAVE':
                                                            value = '지각 및 조퇴';
                                                            break;
                                                    }
                                                    return <div className="small-text">{value}</div>;
                                                },
                                            },
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
                                                    const response = await apiClient.get(EMPLOYEE_API.ATTENDANCE_DETAIL_DATA_API(id));
                                                    setFetchAttendanceData(response.data);
                                                    setEditAttendance(true);
                                                    notify('success', '근태 조회', '근태 정보 조회 성공.', 'bottomRight')
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
                </Grid>
                    )}

            {/*{editAttendance &&(*/}
            {/*    <Grid item xs={12} md={12} sx={{ minWidth: '1000px !important', maxWidth: '1500px !important' }}>*/}
            {/*        <Grow in={true} timeout={200}>*/}
            {/*            <Paper elevation={3} sx={{ height: '100%' }}>*/}
            {/*                <Typography variant="h6" sx={{ padding: '20px' }}>근태 수정</Typography>*/}
            {/*                <Grid sx={{ padding: '0px 20px 0px 20px' }}>*/}
            {/*                    <Form*/}
            {/*                        initialValues={fetchAttendanceData}*/}
            {/*                        form={form}*/}
            {/*                        onFinish={(values) => { handleFormSubmit(values, 'update'); }}*/}
            {/*                    >*/}
            {/*)}*/}

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

export default AttendanceManagementPage;