import React, { useEffect, useState } from 'react';
import { Box, Grid, Grow, Paper } from '@mui/material';
import WelcomeSection from '../../../../components/WelcomeSection.jsx';
import { Typography } from '@mui/material';
import { tabItems } from './DepartmentManagementUtil.jsx';
import { Space, Tag, Form, Table, Button, Col, Input, Row, Checkbox, Modal, DatePicker, Spin, Select, notification } from 'antd';
import apiClient from '../../../../config/apiClient.jsx';
import { EMPLOYEE_API } from '../../../../config/apiConstants.jsx';
import { useNotificationContext } from "../../../../config/NotificationContext.jsx";
const { Option } = Select;
const { confirm } = Modal;
import { Divider } from 'antd';


const DepartmentManagementPage = ({ initialData }) => {
    const notify = useNotificationContext(); // 알림 컨텍스트 사용
    const [form] = Form.useForm(); // 폼 인스턴스 생성
    const [registrationForm] = Form.useForm(); // 폼 인스턴스 생성
    const [departmentList, setDepartmentList] = useState(initialData); // 부서 목록 상태
    const [activeTabKey, setActiveTabKey] = useState('1'); // 활성 탭 키 상태
    const [selectedRowKeys, setSelectedRowKeys] = useState([]); // 선택된 행 키 상태
    const [editDepartment, setEditDepartment] = useState(false); // 부서 수정 탭 활성화 여부 상태
    const [fetchDepartmentData, setFetchDepartmentData] = useState(false); // 부서 조회한 정보 상태
    const [departmentParam, setDepartmentParam] = useState(false); // 수정할 부서 정보 상태
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
            //setDepartments(response.data); // 부서 목록 저장
            setDepartmentList(response.data)
            console.log("부서 API", response.data);
        } catch (error) {
            notification.error({
                message: ' 목록 조회 실패',
                description: '부서 목록을 불러오는 중 오류가 발생했습니다.',
            });
        }
    };

    // 페이지 로드 시 부서 목록 호출
    useEffect(() => {
        fetchDepartments();
    }, []);

    useEffect(() => {
        if (!fetchDepartmentData) return;
        console.log('Fetched Department Data:', fetchDepartmentData);

        // 선택된 부서 데이터를 수정 폼에 설정
        form.setFieldsValue(fetchDepartmentData);
    }, [fetchDepartmentData, form]);

    const handleInputClick = (fieldName) => {
        setCurrentField(fieldName);
        setModalData(null); // 모달 열기 전에 데이터를 초기화
        fetchModalData(fieldName); // 모달 데이터 가져오기 호출
        setIsModalVisible(true); // 모달창 열기
    };

    // 모달창 데이터 가져오기 함수
    const fetchModalData = async (fieldName) => {
        setIsLoading(true);
        let apiPath;
        if (fieldName === 'department') apiPath = EMPLOYEE_API.DEPARTMENT_DATA_API;
        if (fieldName === 'employee') apiPath = EMPLOYEE_API.EMPLOYEE_DATA_API

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
            setDepartmentParam((prevParams) => ({
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

    // 모달창 닫기 핸들러
    const handleModalCancel = () => setIsModalVisible(false);

    const handleFormSubmit = async (values, type) => {
        confirm({
            title: '저장 확인',
            content: '정말로 저장하시겠습니까?',
            okText: '확인',
            cancelText: '취소',
            onOk: async () => {
                setIsLoading(true);
                // 날짜 형식 변경 및 필요 데이터 구성
                const formattedValues = {
                    departmentCode: values.departmentCode,
                    departmentName: values.departmentName,
                    departmentLocation: values.location,
                    id: fetchDepartmentData?.id,
                    employeeid: departmentParam.employeeDepartmentDTOS?.employeeid,
                    employeeNumber: departmentParam.employeeDepartmentDTOS.employeeNumber,
                    firstName: departmentParam.employeeDepartmentDTOS.firstName,
                };
                console.log(values);
                console.log(formattedValues);

                try {
                    const API_PATH = type === 'update' ? EMPLOYEE_API.UPDATE_DEPARTMENT_DATA_API(departmentParam.id): EMPLOYEE_API.SAVE_DEPARTMENT_DATA_API;
                    const response = await apiClient.post(API_PATH, formattedValues);
                    const updatedData = response.data;

                    setDepartmentList((prevDepartmentList) =>
                        prevDepartmentList.map((department) =>
                            department.id === updatedData.id ? { ...department, ...updatedData } : department
                        )
                    );
                    // 성공 시 알림과 상태 초기화
                    notify('success', type === 'update' ? '부서 수정' : '부서 저장', '부서 정보 저장 성공.', 'bottomLeft');
                    setEditDepartment(false);
                    setFetchDepartmentData(null);
                    setDepartmentParam({});
                    setDisplayValues({});
                    form.resetFields(); // 폼 초기화

                } catch (error) {
                    console.error('Error details:', error);
                    notify('error', '저장 실패', '데이터 저장 중 오류가 발생했습니다.', 'top');
                } finally {
                    // 로딩 상태 비활성화
                    setIsLoading(false);
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
        setEditDepartment(false);
        setFetchDepartmentData(null);
        setDepartmentParam({});
        setDisplayValues({});
        setActiveTabKey(key);
        form.resetFields();
        registrationForm.resetFields(); // 2탭 폼 초기화
        registrationForm.setFieldValue('isActive', true);
    };

    const handleRowClick = (record) => {
        setFetchDepartmentData(record); // 클릭한 부서 데이터를 설정
        setEditDepartment(true); // 수정 모드 활성화
    };



    return (
        <Box sx={{ margin: '20px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <WelcomeSection
                        title="부서 관리"
                        description={(
                            <Typography>
                                부서 관리 페이지는 <span>기업 내 모든 부서를 체계적으로 관리</span>하는 기능을 제공함.
                                이 페이지에서는 <span>부서의 이름, 역할, 소속 직원</span> 등을 등록하고 수정할 수 있으며,
                                <span>부서별 인원과 조직도를 파악</span>할 수 있음. 부서 간 <span>인력 배치와 변경 사항</span>을
                                효율적으로 관리하여 기업의 인사 구조를 강화함.
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
                                <Typography variant="h6" sx={{ padding: '20px' }}>부서 목록</Typography>
                                <Grid sx={{ padding: '0px 20px 0px 20px' }}>
                                    <Table
                                        dataSource={departmentList}
                                        columns={[
                                            {
                                                title: <div className="title-text">부서코드</div>,
                                                dataIndex: 'departmentCode',
                                                key: 'departmentCode',
                                                align: 'center',
                                                render: (text) => <div className="small-text">{text}</div>,
                                            },
                                            {
                                                title: <div className="title-text">부서명</div>,
                                                dataIndex: 'departmentName',
                                                key: 'departmentName',
                                                align: 'center',
                                                render: (text) => <div className="small-text">{text}</div>,
                                            },
                                            {
                                                title: <div className="title-text">부서위치</div>,
                                                dataIndex: 'location',
                                                key: 'location',
                                                align: 'center',
                                                render: (text) => <div className="small-text">{text}</div>,
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
                                                    const response = await apiClient.post(EMPLOYEE_API.DEPARTMENT_DATA_API);
                                                    setDepartmentList(response.data);
                                                    setEditDepartment(true);
                                                    notify('success', '부서 조회', '부서 정보 조회 성공.', 'bottomRight');
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

            {editDepartment && (
                <Grid item xs={12} md={12} sx={{ minWidth: '1000px !important', maxWidth: '1500px !important' }}>
                    <Grow in={true} timeout={200}>
                        <Paper elevation={3} sx={{ height: '100%' }}>
                            <Typography variant="h6" sx={{ padding: '20px' }} >부서정보 수정</Typography>
                            <Grid sx={{ padding: '0px 20px 0px 20px' }}>
                                <Form
                                    initialValues={fetchDepartmentData}
                                    form={form}
                                    onFinish={(values) => { handleFormSubmit(values, 'update') }}
                                >
                                    <Row gutter={16}>
                                        <Col span={6}>
                                            <Form.Item name="departmentCode" rules={[{ required: true, message: '부서 코드를 입력하세요.' }]}>
                                                <Input addonBefore="부서 코드" />
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <Form.Item name="departmentName" rules={[{ required: true, message: '부서 이름을 입력하세요.' }]}>
                                                <Input addonBefore="부서 이름"/>
                                            </Form.Item>
                                        </Col>
                                        <Col span={6}>
                                            <Form.Item name="location" rules={[{ required: true, message: '부서 위치를 입력하세요.' }]}>
                                                <Input addonBefore="부서 위치" />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    {/* 저장 버튼 */}
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                                        <Button type="primary" htmlType="submit">
                                            저장
                                        </Button>
                                    </Box>
                                </Form>
                            </Grid>
                        </Paper>
                    </Grow>
                </Grid>
            )}
            {activeTabKey === '2' && (
                <Grid sx={{ padding: '0px 20px 0px 20px' }} container spacing={3}>
                    <Grid item xs={12} md={12} sx={{ minWidth: '500px !important', maxWidth: '1500px !important' }}>
                        <Grow in={true} timeout={200}>
                            <Paper elevation={3} sx={{ height: '100%' }}>
                                <Typography variant="h6" sx={{ padding: '20px' }}>부서 등록</Typography>
                                <Grid sx={{ padding: '0px 20px 0px 20px' }}>
                                    <Form
                                        layout="vertical"
                                        onFinish={(values) => { handleFormSubmit(values, 'register') }}
                                        form={registrationForm}
                                    >
                                {/* 부서 등록 폼 표시 */}
                                        <Row gutter={16}>
                                            <Col span={6}>
                                                <Form.Item name="departmentCode" rules={[{ required: true, message: '부서 코드를 입력하세요.' }]}>
                                                    <Input addonBefore="부서 코드" />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={16}>
                                            <Col span={6}>
                                                <Form.Item name="departmentName" rules={[{ required: true, message: '부서명을 입력하세요.' }]}>
                                                    <Input addonBefore="부서명" />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={16}>
                                            <Col span={6}>
                                                <Form.Item name="location" rules={[{ required: true, message: '부서 위치를 입력하세요.' }]}>
                                                    <Input addonBefore="부서 위치" />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        {/* 저장 버튼 */}
                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                                            <Button type="primary" htmlType="submit">
                                                저장
                                            </Button>
                                        </Box>
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

export default DepartmentManagementPage;
