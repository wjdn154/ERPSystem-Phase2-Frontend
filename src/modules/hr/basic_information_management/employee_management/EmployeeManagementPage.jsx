import React, { useEffect, useState } from 'react';
import { Box, Grid, Grow, Paper, Typography } from '@mui/material';
import WelcomeSection from '../../../../components/WelcomeSection.jsx';
import { tabItems } from './EmployeeManagementUti.jsx';
import { Space, Tag, Form, Table, Button, Col, Input, Row, Checkbox, Modal, DatePicker, Spin, Select, notification } from 'antd';
import apiClient from '../../../../config/apiClient.jsx';
import { EMPLOYEE_API } from '../../../../config/apiConstants.jsx';
import dayjs from 'dayjs';
import { Divider } from 'antd';
import { useNotificationContext } from "../../../../config/NotificationContext.jsx";

const { Option } = Select;
const { confirm } = Modal;

const EmployeeManagementPage = ({ initialData }) => {
    const notify = useNotificationContext(); // 알림 컨텍스트 사용
    const [form] = Form.useForm(); // 폼 인스턴스 생성
    const [registrationForm] = Form.useForm(); // 폼 인스턴스 생성
    const [employeeList, setEmployeeList] = useState(initialData); // 사원 목록 상태
    const [activeTabKey, setActiveTabKey] = useState('1'); // 활성 탭 키 상태
    const [selectedRowKeys, setSelectedRowKeys] = useState([]); // 선택된 행 키 상태
    const [editEmployee, setEditEmployee] = useState(false); // 사원 수정 탭 활성화 여부 상태
    const [fetchEmployeeData, setFetchEmployeeData] = useState(false); // 사원 조회한 정보 상태
    const [employeeParam, setEmployeeParam] = useState(false); // 수정할 사원 정보 상태
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태
    const [currentField, setCurrentField] = useState(''); // 모달 분기할 필드 상태
    const [modalData, setModalData] = useState(null); // 모달 데이터 상태
    const [departments, setDepartments] = useState([]); // 부서 데이터 상태
    const [isModalVisible, setIsModalVisible] = useState(false); // 모달 활성화 여부
    const [displayValues, setDisplayValues] = useState({});

    // 부서 목록 가져오는 함수
    const fetchDepartments = async () => {
        try {
            const response = await apiClient.post(EMPLOYEE_API.DEPARTMENT_DATA_API); // 부서 목록 API 호출
            setDepartments(response.data); // 부서 목록 저장
        } catch (error) {
            notification.error({
                message: '부서 목록 조회 실패',
                description: '부서 목록을 불러오는 중 오류가 발생했습니다.',
            });
        }
    };

    useEffect(() => {
        fetchDepartments(); // 컴포넌트 로드 시 부서 목록 가져오기
    }, []);

    useEffect(() => {
        if (!fetchEmployeeData) return; // 선택된 사원 데이터가 없으면 종료

        // firstName과 lastName을 조합해서 employeeName 필드에 설정
        form.setFieldsValue({
            ...fetchEmployeeData,
            employeeName: `${fetchEmployeeData.lastName}${fetchEmployeeData.firstName}`
        });
        setEmployeeParam(fetchEmployeeData);

        setDisplayValues({
            department: `[${fetchEmployeeData.departmentCode}] ${fetchEmployeeData.departmentName}`,
            employee: fetchEmployeeData.employmentStatus === 'ACTIVE' ? '재직 중' :
                fetchEmployeeData.employmentStatus === 'ON_LEAVE' ? '휴직 중' : '퇴직',
        });
    }, [fetchEmployeeData, form]);

    // 모달창 열기 핸들러
    const handleInputClick = (fieldName) => {
        setCurrentField(fieldName);
        setModalData(null); // 모달 열기 전에 데이터를 초기화
        fetchModalData(fieldName); // 모달 데이터 가져오기 호출
        setIsModalVisible(true); // 모달창 열기
    };

    // 모달창 닫기 핸들러
    const handleModalCancel = () => setIsModalVisible(false);

    // 모달창 데이터 가져오기 함수
    const fetchModalData = async (fieldName) => {
        setIsLoading(true);
        let apiPath;
        if (fieldName === 'department') apiPath = EMPLOYEE_API.DEPARTMENT_DATA_API;

        try {
            const response = await apiClient.post(apiPath);
            setModalData(response.data);
        } catch (error) {
            notify('error', '조회 오류', '데이터 조회 중 오류가 발생했습니다.', 'top');
        } finally {
            setIsLoading(false);
        }
    };

    // 모달창 선택 핸들러
    const handleModalSelect = (record) => {
        if (currentField === 'department') {
            setEmployeeParam((prevParams) => ({
                ...prevParams,
                department: {
                    id: record.id,
                    departmentCode: record.departmentCode,
                    departmentName: record.departmentName,
                },
            }));
            setDisplayValues((prevValues) => ({
                ...prevValues,
                department: `[${record.departmentCode}] ${record.departmentName}`,
            }));
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
                // 날짜 형식 변경 및 필요 데이터 구성
                const formattedValues = {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    dateOfBirth: dayjs(values.dateOfBirth).format('YYYY-MM-DD'),
                    phoneNumber: values.phoneNumber,
                    employmentStatus: values.employmentStatus,
                    employmentType: values.employmentType,
                    email: values.email,
                    address: values.address,
                    hireDate: dayjs(values.hireDate).format('YYYY-MM-DD'),
                    isHouseholdHead: values.isHouseholdHead || false, // 체크박스 값 처리
                    profilePicture: values.profilePicture, // 프로필 URL
                    departmentId: values.departmentId, // 부서 ID
                    positionId: values.positionId, // 직위 ID
                    jobTitleId: values.jobTitleId, // 직책 ID
                    bankAccountDTO: { // 금융 정보 객체
                        bank: values.bank,
                        accountNumber: values.bankAccountNumber
                    }
                };

                try {
                    const API_PATH = type === 'update' ? EMPLOYEE_API.UPDATE_EMPLOYEE_DATA_API : EMPLOYEE_API.SAVE_EMPLOYEE_DATA_API;
                    const response = await apiClient.post(API_PATH, formattedValues, {
                        headers: { 'Content-Type': 'application/json' },
                    });
                    const updatedData = response.data;

                    setEmployeeList((prevEmployeeList) =>
                        prevEmployeeList.map((employee) =>
                            employee.id === updatedData.id ? { ...employee, ...updatedData } : employee
                        )
                    );
                    setEditEmployee(false);
                    setFetchEmployeeData(null);
                    setEmployeeParam({
                        employmentStatus: 'BOTH',
                    });
                    setDisplayValues({});
                    type === 'update'
                        ? notify('success', '사원 수정', '사원 정보 수정 성공.', 'bottomLeft')
                        : (notify('success', '사원 저장', '사원 정보 저장 성공.', 'bottomLeft'), form.resetFields());
                } catch (error) {
                    notify('error', '저장 실패', '데이터 저장 중 오류가 발생했습니다.', 'top');
                }
            },
            onCancel() {
                notification.warning({
                    message: '저장 취소',
                    description: '저장이 취소되었습니다.',
                    placement: 'bottomLeft',
                });
            },
        });
    };
    // 탭 변경 핸들러
    const handleTabChange = (key) => {
        setEditEmployee(false);
        setFetchEmployeeData(null);
        setEmployeeParam({
            employmentStatus: "BOTH",
        });
        setDisplayValues({});
        setActiveTabKey(key);
        form.resetFields();
        registrationForm.resetFields(); // 2탭 폼 초기화
        registrationForm.setFieldValue('isActive', true);
    };

    return (
        <Box sx={{ margin: '20px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <WelcomeSection
                        title="사원 관리"
                        description={
                            <Typography>
                                사원 관리 페이지는 <span>기업의 모든 사원 정보를 체계적으로 관리</span>하는 기능을 제공함.<br />
                                이 페이지에서는 <span>사원의 인적 사항, 근무 이력, 직책, 부서 등</span>의 정보를 등록하고 조회할 수 있으며, <span>사원별로 세부 정보를 업데이트</span>할 수 있음.<br />
                                또한 사원의 <span>변경 사항을 기록</span>하고, <span>현재 인사 상태</span>를 정확히 파악할 수 있음.
                            </Typography>
                        }
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
                                <Typography variant="h6" sx={{ padding: '20px' }}>사원 목록</Typography>
                                <Grid sx={{ padding: '0px 20px 0px 20px' }}>
                                    <Table
                                        dataSource={employeeList}
                                        columns={[
                                            {
                                                title: <div className="title-text">입사일자</div>,
                                                dataIndex: 'hireDate',
                                                key: 'hireDate',
                                                align: 'center',
                                                render: (text) => <div className="small-text">{text}</div>,
                                                width: '10%'
                                            },
                                            {
                                                title: <div className="small-text">사원번호</div>,
                                                dataIndex: 'employeeNumber',
                                                key: 'employeeNumber',
                                                align: 'center',
                                                render: (text) => <div className="small-text">{text}</div>,
                                                width: '10%'
                                            },
                                            {
                                                title: <div className="small-text">사원 이름</div>,
                                                dataIndex: 'fullName',
                                                key: 'fullName',
                                                align: 'center',
                                                render: (text, record) => (
                                                    <div className="small-text">
                                                        {record.lastName}{record.firstName}
                                                    </div>
                                                ),
                                                width: '15%'
                                            },
                                            {
                                                title: <div className="small-text">부서번호</div>,
                                                dataIndex: 'departmentCode',
                                                key: 'departmentCode',
                                                align: 'center',
                                                render: (text) => <div className="small-text">{text}</div>,
                                                width: '10%'
                                            },
                                            {
                                                title: <div className="title-text">부서명</div>,
                                                dataIndex: 'departmentName',
                                                key: 'departmentName',
                                                align: 'center',
                                                render: (text) => {
                                                    let color;
                                                    switch (text) {
                                                        case '인사부':
                                                            color = 'purple';
                                                            break;
                                                        case '재무부':
                                                            color = 'green';
                                                            break;
                                                        case '생산부':
                                                            color = 'red';
                                                            break;
                                                        case '물류부':
                                                            color = 'blue';
                                                            break;
                                                        default:
                                                            color = 'gray'; // 기본 색상
                                                    }
                                                    return <Tag style={{ marginLeft: '5px' }} color={color}>{text}</Tag>;
                                                },
                                                width: '10%'
                                            },
                                            {
                                                title: <div className="small-text">고용 상태</div>,
                                                dataIndex: 'employmentStatus',
                                                key: 'employmentStatus',
                                                align: 'center',
                                                render: (text) => {
                                                    let color;
                                                    let value;
                                                    switch (text) {
                                                        case 'ACTIVE':
                                                            color = 'green';
                                                            value = '재직 중';
                                                            break;
                                                        case 'ON_LEAVE':
                                                            color = 'blue';
                                                            value = '휴직 중';
                                                            break;
                                                        case 'RESIGNED':
                                                            color = 'orange';
                                                            value = '퇴직';
                                                            break;
                                                        default:
                                                            color = 'gray'; // 기본 색상
                                                    }
                                                    return <Tag style={{ marginLeft: '5px' }} color={color}>{value}</Tag>;
                                                },
                                                width: '10%'
                                            },
                                            {
                                                title: <div className="small-text">고용 유형</div>,
                                                dataIndex: 'employmentType',
                                                key: 'employmentType',
                                                align: 'center',
                                                render: (text) => {
                                                    let color;
                                                    let value;
                                                    switch (text) {
                                                        case 'FULL_TIME':
                                                            color = 'green';
                                                            value = '정규직';
                                                            break;
                                                        case 'CONTRACT':
                                                            color = 'blue';
                                                            value = '계약직';
                                                            break;
                                                        case 'PART_TIME':
                                                            color = 'purple';
                                                            value = '파트타임';
                                                            break;
                                                        case 'TEMPORARY':
                                                            color = 'yellow';
                                                            value = '임시직';
                                                            break;
                                                        case 'INTERN':
                                                            color = 'pink';
                                                            value = '인턴';
                                                            break;
                                                        case 'CASUAL':
                                                            color = '#f1948a';
                                                            value = '일용직';
                                                            break;
                                                        case 'FREELANCE':
                                                            color = 'red';
                                                            value = '프리랜서';
                                                            break;
                                                        default:
                                                            color = 'gray'; // 기본 색상
                                                    }
                                                    return <Tag style={{ marginLeft: '5px' }} color={color}>{value}</Tag>;
                                                },
                                                width: '10%'
                                            },
                                            {
                                                title: <div className="small-text">직위</div>,
                                                dataIndex: 'positionName',
                                                key: 'positionName',
                                                align: 'center',
                                                render: (text) => {
                                                    let color;
                                                    switch (text) {
                                                        case '수습':
                                                            break;
                                                        case '인턴':
                                                            color = 'lightblue';
                                                            break;
                                                        case '사원':
                                                            color = '#a9dfbf';
                                                            break;
                                                        case '주임':
                                                            color = '#aed6f1';
                                                            break;
                                                        case '대리':
                                                            color = '#d2b4de';
                                                            break;
                                                        case '과장':
                                                            color = '#f5cba7';
                                                            break;
                                                        case '차장':
                                                            color = '#d7ccc8';
                                                            break;
                                                        case '부장':
                                                            color = '#f1948a';
                                                            break;
                                                        case '이사':
                                                            color = '#a9cce3';
                                                            break;
                                                        case '상무':
                                                            color = 'green';
                                                            break;
                                                        case '전무':
                                                            color = 'purple';
                                                            break;
                                                        case '부사장':
                                                            color = 'orange';
                                                            break;
                                                        case '사장':
                                                            break;
                                                        case '부회장':
                                                            color = '#d5dbdb';
                                                            break;
                                                        case '회장':
                                                            color = 'gold';
                                                            break;
                                                        default:
                                                            color = 'gray'; // 기본 색상
                                                    }
                                                    return <Tag style={{ marginLeft: '5px' }} color={color}>{text}</Tag>;
                                                },
                                                width: '10%'
                                            },
                                            {
                                                title: <div className="small-text">직책</div>,
                                                dataIndex: 'jobTitleName',
                                                key: 'jobTitleName',
                                                align: 'center',
                                                render: (text) => <div className="small-text">{text}</div>,
                                                width: '15%'
                                            },
                                            {
                                                title: <div className="small-text">이메일</div>,
                                                dataIndex: 'email',
                                                key: 'email',
                                                align: 'center',
                                                render: (text) => <div className="small-text">{text}</div>,
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
                                                    const response = await apiClient.get(EMPLOYEE_API.EMPLOYEE_DATA_DETAIL_API(id));
                                                    setFetchEmployeeData(response.data);
                                                    setEditEmployee(true);

                                                    notify('success', '사원 조회', '사원 정보 조회 성공.', 'bottomRight')
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
                    {editEmployee && (
                        <Grid item xs={12} md={12} sx={{ minWidth: '1000px !important', maxWidth: '1500px !important' }}>
                            <Grow in={true} timeout={200}>
                                <Paper elevation={3} sx={{ height: '100%' }}>
                                    <Typography variant="h6" sx={{ padding: '20px' }}>사원 수정</Typography>
                                    <Grid sx={{ padding: '0px 20px 0px 20px' }}>
                                        <Form
                                            initialValues={fetchEmployeeData}
                                            form={form}
                                            onFinish={(values) => { handleFormSubmit(values, 'update'); }}
                                        >
                                            {/* 기본 정보 */}
                                            <Divider orientation={'left'} orientationMargin="0" style={{ marginTop: '0px', fontWeight: 600 }}>
                                                기본 정보
                                            </Divider>
                                            <Row gutter={16}>
                                                <Col span={6}>
                                                    <Form.Item name="hireDate" rules={[{ required: true, message: '입사 일자를 입력하세요.' }]}>
                                                        <Input addonBefore="입사 일자" />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={6}>
                                                    <Form.Item name="employeeNumber" rules={[{ required: true, message: '사원번호를 입력하세요.' }]}>
                                                        <Input addonBefore="사원번호" />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={6}>
                                                    <Form.Item name="employeeName" rules={[{ required: true, message: '성명을 입력하세요.' }]}>
                                                        <Input addonBefore="성명" />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={6}>
                                                    <Form.Item name="dateOfBirth" rules={[{ required: true, message: '생년월일을 입력하세요.' }]}>
                                                        <Input addonBefore="생년월일" />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            {/* 연락처 정보 */}
                                            <Divider orientation={'left'} orientationMargin="0" style={{ marginTop: '0px', fontWeight: 600 }}>
                                                연락처 정보
                                            </Divider>
                                            <Row gutter={16}>
                                                <Col span={6}>
                                                    <Form.Item name="address" rules={[{ required: true, message: '주소를 입력하세요.' }]}>
                                                        <Input addonBefore="주소" />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item name="phoneNumber" rules={[{ required: true, message: '휴대폰 번호를 입력하세요.' }]}>
                                                        <Input addonBefore="휴대폰 번호" />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={6}>
                                                    <Form.Item name="email" rules={[{ required: true, message: '이메일을 입력하세요.' }]}>
                                                        <Input addonBefore="이메일" />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            {/* 고용 정보 */}
                                            <Divider orientation={'left'} orientationMargin="0" style={{ marginTop: '0px', fontWeight: 600 }}>
                                                고용 정보
                                            </Divider>
                                            <Row gutter={16}>
                                                <Col span={12}>
                                                    <Form.Item name="department">
                                                        <Space.Compact>
                                                            <Input
                                                                style={{ width: '40%', backgroundColor: '#FAFAFA', color: '#000', textAlign: 'center' }}
                                                                value="부서명"
                                                                disabled
                                                            />
                                                            <Select
                                                                style={{ width: '60%' }}
                                                                value={employeeParam.departmentCode}
                                                                onChange={(value, option) => {
                                                                    setEmployeeParam((prevState) => ({
                                                                        ...prevState,
                                                                        departmentCode: value, // 부서 코드 설정
                                                                        departmentName: option.children, // 부서명 설정
                                                                    }));
                                                                }}
                                                            >
                                                                {departments.map((dept) => (
                                                                    <Option key={dept.departmentCode} value={dept.departmentCode}>
                                                                        [{dept.departmentCode}] {dept.departmentName}
                                                                    </Option>
                                                                ))}
                                                            </Select>
                                                        </Space.Compact>
                                                    </Form.Item>

                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item name="positionName" rules={[{ required: true, message: '직위를 입력하세요.' }]}>
                                                        <Input addonBefore="직위" />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item name="jobTitleName" rules={[{ required: true, message: '직책을 입력하세요.' }]}>
                                                        <Input addonBefore="직책" />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Row gutter={16}>
                                                <Col span={12}>
                                                    <Form.Item name="employmentStatus">
                                                        <Space.Compact>
                                                            <Input style={{ width: '40%', backgroundColor: '#FAFAFA', color: '#000', textAlign: 'center' }} defaultValue="고용 상태" disabled />
                                                            <Select
                                                                style={{ width: '60%' }}
                                                                value={employeeParam.employmentStatus}
                                                                onChange={(value) => {
                                                                    setEmployeeParam((prevState) => ({
                                                                        ...prevState,
                                                                        employmentStatus: value,
                                                                    }));
                                                                }}
                                                            >
                                                                <Option value="ACTIVE">재직 중</Option>
                                                                <Option value="ON_LEAVE">휴직 중</Option>
                                                                <Option value="RESIGNED">퇴직</Option>
                                                            </Select>
                                                        </Space.Compact>
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item name="employmentType">
                                                        <Space.Compact>
                                                            <Input style={{ width: '40%', backgroundColor: '#FAFAFA', color: '#000', textAlign: 'center' }} defaultValue="고용 유형" disabled />
                                                            <Select
                                                                style={{ width: '60%' }}
                                                                value={employeeParam.employmentType}
                                                                onChange={(value) => {
                                                                    setEmployeeParam((prevState) => ({
                                                                        ...prevState,
                                                                        employmentType: value,
                                                                    }));
                                                                }}
                                                            >
                                                                <Option value="FULL_TIME">정규직</Option>
                                                                <Option value="CONTRACT">계약직</Option>
                                                                <Option value="PART_TIME">파트타임</Option>
                                                                <Option value="TEMPORARY">임시직</Option>
                                                                <Option value="INTERN">인턴</Option>
                                                                <Option value="CASUAL">일용직</Option>
                                                                <Option value="FREELANCE">프리랜서</Option>
                                                            </Select>
                                                        </Space.Compact>
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            {/* 금융 정보 */}
                                            <Divider orientation={'left'} orientationMargin="0" style={{ marginTop: '0px', fontWeight: 600 }}>
                                                금융 정보
                                            </Divider>
                                            <Row gutter={16}>
                                                <Col span={6}>
                                                    <Form.Item name="bankAccountName" rules={[{ required: true, message: '은행명을 입력하세요.' }]}>
                                                        <Input
                                                            addonBefore="은행명"
                                                        />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={6}>
                                                    <Form.Item name="bankAccountNumber" rules={[{ required: true, message: '계좌번호를 입력하세요.' }]}>
                                                        <Input addonBefore="계좌번호" />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={4}>
                                                    <Form.Item name="isActive" valuePropName="checked">
                                                        <Checkbox>세대주 여부</Checkbox>
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            {/* 저장 버튼 */}
                                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                                                <Button type="primary" htmlType="submit">
                                                    저장
                                                </Button>
                                            </Box>

                                            {/* 모달창 */}
                                            <Modal
                                                open={isModalVisible}
                                                onCancel={handleModalCancel}
                                                width="40vw"
                                                footer={null}
                                            >{isLoading ? (
                                                <Spin />  // 로딩 스피너
                                            ) : (
                                                <>
                                                    {currentField === 'department' && (
                                                        <>
                                                            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: '20px' }}>
                                                                부서 선택
                                                            </Typography>
                                                            {modalData && (
                                                                <Table
                                                                    columns={[
                                                                        { title: '부서코드', dataIndex: 'departmentCode', key: 'departmentCode', align: 'center', render: (text) => <div className="small-text">{text}</div> },
                                                                        { title: '부서명', dataIndex: 'departmentName', key: 'departmentName', align: 'center', render: (text) => <div className="small-text">{text}</div> },
                                                                    ]}
                                                                    dataSource={modalData}
                                                                    rowKey="departmentCode"
                                                                    size={'small'}
                                                                    pagination={{ pageSize: 15, position: ['bottomCenter'], showSizeChanger: false }}
                                                                    onRow={(record) => ({
                                                                        style: { cursor: 'pointer' },
                                                                        onClick: () => handleModalSelect(record), // 선택 시 처리
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
                    <Grid item xs={12} md={12} sx={{ minWidth: '500px !important', maxWidth: '1500px !important' }}>
                        <Grow in={true} timeout={200}>
                            <Paper elevation={3} sx={{ height: '100%' }}>
                                <Typography variant="h6" sx={{ padding: '20px' }}>사원 등록</Typography>
                                <Grid sx={{ padding: '0px 20px 0px 20px' }}>
                                    <Form
                                        layout="vertical"
                                        onFinish={(values) => { handleFormSubmit(values, 'register') }}
                                        form={registrationForm}
                                    >
                                        {/* 기본 정보 */}
                                        <Divider orientation={'left'} orientationMargin="0" style={{ marginTop: '0px', fontWeight: 600 }}>기본 정보</Divider>
                                        <Row gutter={16}>
                                            <Col span={6}>
                                                <Form.Item name="hireDate" rules={[{ required: true, message: '입사 일자를 입력하세요.' }]}>
                                                    <Input addonBefore="입사 일자" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={6}>
                                                <Form.Item name="firstName" rules={[{ required: true, message: '성을 입력하세요.' }]}>
                                                    <Input addonBefore="성" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={6}>
                                                <Form.Item name="lastName" rules={[{ required: true, message: '이름을 입력하세요.' }]}>
                                                    <Input addonBefore="이름" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={6}>
                                                <Form.Item name="dateOfBirth" rules={[{ required: true, message: '생년월일을 입력하세요.' }]}>
                                                    <Input addonBefore="생년월일" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={6}>
                                                <Form.Item name="profilePicture" rules={[{ required: true, message: '프로필 사진을 입력하세요.' }]}>
                                                    <Input addonBefore="프로필 사진" />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        {/* 연락처 정보 */}
                                        <Divider orientation={'left'} orientationMargin="0" style={{ marginTop: '0px', fontWeight: 600 }}>연락처 정보</Divider>
                                        <Row gutter={16}>
                                            <Col span={6}>
                                                <Form.Item name="address" rules={[{ required: true, message: '주소를 입력하세요.' }]}>
                                                    <Input addonBefore="주소" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item name="phoneNumber" rules={[{ required: true, message: '휴대폰 번호를 입력하세요.' }]}>
                                                    <Input addonBefore="휴대폰 번호" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={6}>
                                                <Form.Item name="email" rules={[{ required: true, message: '이메일을 입력하세요.' }]}>
                                                    <Input addonBefore="이메일" />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        {/* 고용 정보 */}
                                        <Divider orientation={'left'} orientationMargin="0" style={{ marginTop: '0px', fontWeight: 600 }}>고용 정보</Divider>
                                        <Row gutter={16}>
                                            <Col span={12}>
                                                <Form.Item name="department">
                                                    <Space.Compact>
                                                        <Input
                                                            style={{ width: '40%', backgroundColor: '#FAFAFA', color: '#000', textAlign: 'center' }}
                                                            value="부서명"
                                                            disabled
                                                        />
                                                        <Select
                                                            style={{ width: '60%' }}
                                                            value={employeeParam.departmentCode}
                                                            onChange={(value, option) => {
                                                                setEmployeeParam((prevState) => ({
                                                                    ...prevState,
                                                                    departmentCode: value, // 부서 코드 설정
                                                                    departmentName: option.children, // 부서명 설정
                                                                }));
                                                            }}
                                                        >
                                                            {departments.map((dept) => (
                                                                <Option key={dept.departmentCode} value={dept.departmentCode}>
                                                                    [{dept.departmentCode}] {dept.departmentName}
                                                                </Option>
                                                            ))}
                                                        </Select>
                                                    </Space.Compact>
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item name="positionName" rules={[{ required: true, message: '직위를 입력하세요.' }]}>
                                                    <Input addonBefore="직위" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item name="jobTitleName" rules={[{ required: true, message: '직책을 입력하세요.' }]}>
                                                    <Input addonBefore="직책" />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={16}>
                                            <Col span={12}>
                                                <Form.Item name="employmentStatus">
                                                    <Space.Compact>
                                                        <Input style={{ width: '40%', backgroundColor: '#FAFAFA', color: '#000', textAlign: 'center' }} defaultValue="고용 상태" disabled />
                                                        <Select
                                                            style={{ width: '60%' }}
                                                            value={employeeParam.employmentStatus}
                                                            onChange={(value) => {
                                                                setEmployeeParam((prevState) => ({
                                                                    ...prevState,
                                                                    employmentStatus: value,
                                                                }));
                                                            }}
                                                        >
                                                            <Option value="ACTIVE">재직 중</Option>
                                                            <Option value="ON_LEAVE">휴직 중</Option>
                                                            <Option value="RESIGNED">퇴직</Option>
                                                        </Select>
                                                    </Space.Compact>
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item name="employmentType">
                                                    <Space.Compact>
                                                        <Input style={{ width: '40%', backgroundColor: '#FAFAFA', color: '#000', textAlign: 'center' }} defaultValue="고용 유형" disabled />
                                                        <Select
                                                            style={{ width: '60%' }}
                                                            value={employeeParam.employmentType}
                                                            onChange={(value) => {
                                                                setEmployeeParam((prevState) => ({
                                                                    ...prevState,
                                                                    employmentType: value,
                                                                }));
                                                            }}
                                                        >
                                                            <Option value="FULL_TIME">정규직</Option>
                                                            <Option value="CONTRACT">계약직</Option>
                                                            <Option value="PART_TIME">파트타임</Option>
                                                            <Option value="TEMPORARY">임시직</Option>
                                                            <Option value="INTERN">인턴</Option>
                                                            <Option value="CASUAL">일용직</Option>
                                                            <Option value="FREELANCE">프리랜서</Option>
                                                        </Select>
                                                    </Space.Compact>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        {/* 금융 정보 */}
                                        <Divider orientation={'left'} orientationMargin="0" style={{ marginTop: '0px', fontWeight: 600 }}>금융 정보</Divider>
                                        <Row gutter={16}>
                                            <Col span={6}>
                                                <Form.Item name="bankAccountName" rules={[{ required: true, message: '은행명을 입력하세요.' }]}>
                                                    <Input
                                                        addonBefore="은행명"
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={6}>
                                                <Form.Item name="bankAccountNumber" rules={[{ required: true, message: '계좌번호를 입력하세요.' }]}>
                                                    <Input addonBefore="계좌번호" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={4}>
                                                <Form.Item name="isActive" valuePropName="checked">
                                                    <Checkbox>세대주 여부</Checkbox>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                                            <Button type="primary" htmlType="submit">
                                                저장
                                            </Button>
                                        </Box>

                                        {/* 모달창 */}
                                        <Modal
                                            open={isModalVisible}
                                            onCancel={handleModalCancel}
                                            width="40vw"
                                            footer={null}
                                        >{isLoading ? (
                                            <Spin />  // 로딩 스피너
                                        ) : (
                                            <>
                                                {currentField === 'department' && (
                                                    <>
                                                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: '20px' }}>
                                                            부서 선택
                                                        </Typography>
                                                        {modalData && (
                                                            <Table
                                                                columns={[
                                                                    { title: '부서코드', dataIndex: 'departmentCode', key: 'departmentCode', align: 'center', render: (text) => <div className="small-text">{text}</div> },
                                                                    { title: '부서명', dataIndex: 'departmentName', key: 'departmentName', align: 'center', render: (text) => <div className="small-text">{text}</div> },
                                                                ]}
                                                                dataSource={modalData}
                                                                rowKey="departmentCode"
                                                                size={'small'}
                                                                pagination={{ pageSize: 15, position: ['bottomCenter'], showSizeChanger: false }}
                                                                onRow={(record) => ({
                                                                    style: { cursor: 'pointer' },
                                                                    onClick: () => handleModalSelect(record), // 선택 시 처리
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
                                    </Form>
                                </Grid>
                            </Paper>
                        </Grow>
                    </Grid>
                </Grid>
            )}
        </Box>
    );
};

export default EmployeeManagementPage;
