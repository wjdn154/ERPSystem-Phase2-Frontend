import React, { useEffect, useMemo ,useState } from 'react';
import { Box, Grid, Grow, Paper, Typography } from '@mui/material';
import WelcomeSection from '../../../../components/WelcomeSection.jsx';
import { tabItems } from './EmployeeManagementUti.jsx';
import { Space, Tag, Form, Table, Button, Col, Input, Row, Checkbox, Modal, DatePicker, Spin, Select, notification } from 'antd';
import apiClient from '../../../../config/apiClient.jsx';
import { EMPLOYEE_API } from '../../../../config/apiConstants.jsx';
import dayjs from 'dayjs';
import { Divider } from 'antd';
import {useNotificationContext} from "../../../../config/NotificationContext.jsx";

const { Option } = Select;
const { confirm } = Modal;

const EmployeeManagementPage = ({ initialData }) => {
    const notify = useNotificationContext(); // 알림 컨텍스트 사용
    const [form] = Form.useForm(); // 폼 인스턴스 생성
    const [employeeList, setEmployeeList] = useState(initialData); // 사원 목록 상태
    const [activeTabKey, setActiveTabKey] = useState('1'); // 활성 탭 키 상태
    const [selectedRowKeys, setSelectedRowKeys] = useState([]); // 선택된 행 키 상태
    const [editEmployee, setEditEmployee] = useState(false); // 사원 수정 탭 활성화 여부 상태
    const [detailEmployeeData, setDetailEmployeeData] = useState(false);
    const [employeeParam, setEmployeeParam] = useState(false); // 수정 할 사원 정보 상태
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태
    const [currentField, setCurrentField] = useState(''); // 모달 분기 할 필드 상태
    const [modalData, setModalData] = useState(null); // 모달 데이터 상태
    const [isModalVisible, setIsModalVisible] = useState(false); // 모달 활성화 여부
    const [displayValues, setDisplayValues] = useState({
        department: '',
    });

    const [registrationForm] = Form.useForm(); // 폼 인스턴스 생성
    const [selectedEmployee, setSelectedEmployee] = useState(null); // 선택된 사원 정보 상태


    useEffect(() => {
        if (!selectedEmployee) return; // 선택된 사원 데이터가 없으면 종료

        // firstName과 lastName을 조합해서 employeeName 필드에 설정
        form.setFieldsValue({
            ...selectedEmployee,
            employeeName: `${selectedEmployee.lastName}${selectedEmployee.firstName}`
        });

        setDisplayValues({
            department: `[${selectedEmployee.departmentCode}] ${selectedEmployee.departmentName}`,
        });


        setEmployeeParam(selectedEmployee);

    }, [selectedEmployee, form]);

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
        if(fieldName === 'bank') apiPath = EMPLOYEE_API.EMPLOYEE_DATA_API;
        if(fieldName === 'department') apiPath = EMPLOYEE_API.DEPARTMENT_DATA_API;
        if(fieldName === 'position') apiPath = EMPLOYEE_API.EMPLOYEE_DATA_API;
        if(fieldName === 'jobTitle') apiPath = EMPLOYEE_API.EMPLOYEE_DATA_API;

        try {
            const response = await apiClient.post(apiPath);
            let data = response.data;
            if (typeof data === 'string' && data.startsWith('[') && data.endsWith(']')) {
                data = JSON.parse(data);
            }

            const modalData = Array.isArray(data) ? data : [data];

            setModalData(modalData);
        } catch (error) {
            notify('error', '조회 오류', '데이터 조회 중 오류가 발생했습니다.', 'top');
        } finally {
            setIsLoading(false);
        }
    };

    // 모달창 선택 핸들러
    const handleModalSelect = (record) => {
        switch (currentField) {
            case 'department':
                console.log(currentField)
                setEmployeeParam((prevEmployee) => ({
                    ...prevEmployee,
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
                console.log(displayValues)
                break;
        }
        // 모달창 닫기
        setIsModalVisible(false);
    };

    // 폼 제출 핸들러
    // const handleFormSubmit = async (values, type) => {
    //     const id = employeeParam.id;
    //     Modal.confirm({
    //         title: '저장 확인',
    //         content: '정말로 저장하시겠습니까?',
    //         okText: '확인',
    //         cancelText: '취소',
    //         onOk: async () => {
    //             console.log(detailEmployeeData);
    //             console.log(employeeParam);
    //             values.id = employeeParam.id;
    //             values.hireDate = dayjs(values.hireDate).format('YYYY-MM-DD');
    //             values.dateOfBirth = dayjs(values.dateOfBirth).format('YYYY-MM-DD');
    //
    //             try {
    //                 const API_PATH =
    //                     type === 'update'
    //                         ? EMPLOYEE_API.UPDATE_EMPLOYEE_DATA_API(id)
    //                         : EMPLOYEE_API.SAVE_EMPLOYEE_DATA_API;
    //
    //                 const response = await apiClient.post(API_PATH, values);
    //                 const updatedData = response.data;
    //
    //                 setEmployeeList((prevEmployeeList) =>
    //                     prevEmployeeList.map((employee) =>
    //                         employee.id === updatedData.id ? { ...employee, ...values } : employee
    //                     )
    //                 );
    //
    //                 setEditEmployee(false);
    //                 setSelectedEmployee(null);
    //                 setDisplayValues({});
    //
    //                 type === 'update'
    //                     ? notify('success', '사원 수정', '사원 정보 수정 성공.', 'bottomLeft')
    //                     : notify('success', '사원 저장', '사원 정보 저장 성공.', 'bottomLeft');
    //                 form.resetFields();
    //             } catch (error) {
    //                 notify('error', '저장 실패', '데이터 저장 중 오류가 발생했습니다.', 'top');
    //             }
    //         },
    //         onCancel() {
    //             notification.warning({
    //                 message: '저장 취소',
    //                 description: '저장이 취소되었습니다.',
    //                 placement: 'bottomLeft',
    //             });
    //         },
    //     });
    // };
    const handleFormSubmit = async (values, type) => {
        const id = employeeParam.id;
        confirm({
            title: '저장 확인',
            content: '정말로 저장하시겠습니까?',
            okText: '확인',
            cancelText: '취소',
            onOk: async () => {
                console.log(detailEmployeeData);
                console.log(employeeParam);
                // employeeParam의 데이터로 values 객체 업데이트
                values.id = employeeParam.id;
                values.name = employeeParam.name;
                values.position = employeeParam.position;
                values.department = employeeParam.department;
                values.salary = employeeParam.salary;
                values.hireDate = dayjs(values.hireDate).format('YYYY-MM-DD');
                values.dateOfBirth = dayjs(values.dateOfBirth).format('YYYY-MM-DD');
                values.remarks = employeeParam.remarks;

                // FormData 객체 생성
                const formData = new FormData();
                formData.append("employeeData", JSON.stringify(values));

                try {
                    const API_PATH = type === 'update' ? EMPLOYEE_API.UPDATE_EMPLOYEE_DATA_API(id) : EMPLOYEE_API.SAVE_EMPLOYEE_DATA_API;
                    const response = await apiClient.post(API_PATH, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });

                    const updatedData = response.data;
                    console.log("updatedData: ", updatedData);

                    setEmployeeList((prevEmployeeList) =>
                        prevEmployeeList.map((employee) =>
                            employee.id === updatedData.id
                                ? {
                                    ...employee,
                                    name: values.name,
                                    position: values.position,
                                    department: values.department,
                                    hireDate: values.hireDate,
                                    dateOfBirth: values.dateOfBirth,
                                    salary: values.salary,
                                    remarks: values.remarks,
                                }
                                : employee
                        )
                    );

                    setEditEmployee(false);
                    setSelectedEmployee(null);
                    setDisplayValues({});

                    type === 'update'
                        ? notify('success', '사원 수정', '사원 정보 수정 성공.', 'bottomLeft')
                        : notify('success', '사원 저장', '사원 정보 저장 성공.', 'bottomLeft');
                    form.resetFields();
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
    // API에서 사원 데이터를 가져오는 함수
    const fetchEmployeeData = async () => {
        setIsLoading(true);
        try {
            const response = await apiClient.post(EMPLOYEE_API.EMPLOYEE_DATA_API);
            setEmployeeList(response.data); // 사원 목록 상태 업데이트
        } catch (error) {
            notification.error({
                message: '오류 발생',
                description: '사원 목록을 불러오는 중 오류가 발생했습니다.',
            });
        } finally {
            setIsLoading(false);
        }
    };

    // 페이지 로드 시 사원 목록 호출
    useEffect(() => {
        fetchEmployeeData();
    }, []);

    const handleRowClick = async (record) => {
        setSelectedRowKeys([record.id]); // 선택된 행 업데이트
        try {
            const response = await apiClient.get(EMPLOYEE_API.EMPLOYEE_DATA_DETAIL_API(record.id));
            console.log(response.data)
            setSelectedEmployee(response.data); // 선택된 사원 상세 정보 업데이트
            setEditEmployee(true);
            notify('success', '사원 조회', '사원 정보 조회 성공.', 'bottomRight');
        } catch (error) {
            notify('error', '조회 오류', '데이터 조회 중 오류가 발생했습니다.', 'top');
        }
    };

    const handleTabChange = (key) => {
        setEditEmployee(false);
        setSelectedEmployee(null);
        setDisplayValues({});
        setActiveTabKey(key);
        form.resetFields();
    };

    return (
        <Grid sx={{ margin: '20px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <WelcomeSection
                        title="사원 관리"
                        description={
                            <Typography>
                                사원 관리 페이지는 <span>기업의 모든 사원 정보를 체계적으로 관리</span>하는 기능을 제공함. 이 페이지에서는 <span>사원의 인적 사항, 근무 이력, 직책, 부서 등</span>의 정보를 등록하고 조회할 수 있으며, <span>사원별로 세부 정보를 업데이트</span>할 수 있음. 또한 사원의 <span>변경 사항을 기록</span>하고, <span>현재 인사 상태</span>를 정확히 파악할 수 있음.
                            </Typography>
                        }
                        tabItems={tabItems()}
                        activeTabKey={activeTabKey}
                        handleTabChange={setActiveTabKey}
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
                                                title: <span style={{ fontSize: '0.8rem' }}>입사일자</span>,
                                                dataIndex: 'hireDate',
                                                key: 'hireDate',
                                                align: 'center',
                                                render: (text) => <span style={{ fontSize: '0.7rem' }}>{text}</span>,
                                                width: '10%'
                                            },
                                            {
                                                title: <span style={{ fontSize: '0.8rem' }}>사원번호</span>,
                                                dataIndex: 'employeeNumber',
                                                key: 'employeeNumber',
                                                align: 'center',
                                                render: (text) => <span style={{ fontSize: '0.7rem' }}>{text}</span>,
                                                width: '10%'
                                            },
                                            {
                                                title: <span style={{ fontSize: '0.8rem' }}>사원 이름</span>,
                                                dataIndex: 'fullName',
                                                key: 'fullName',
                                                align: 'center',
                                                render: (text, record) => (
                                                    <span style={{ fontSize: '0.7rem' }}>
                            {record.lastName}{record.firstName}
                          </span>
                                                ),
                                                width: '15%'
                                            },
                                            {
                                                title: <span style={{ fontSize: '0.8rem' }}>부서번호</span>,
                                                dataIndex: 'departmentCode',
                                                key: 'departmentCode',
                                                align: 'center',
                                                render: (text) => <span style={{ fontSize: '0.7rem' }}>{text}</span>,
                                                width: '10%'
                                            },
                                            {
                                                title: <span style={{ fontSize: '0.8rem' }}>부서명</span>,
                                                dataIndex: 'departmentName',
                                                key: 'departmentName',
                                                align: 'center',
                                                render: (text) => <span style={{ fontSize: '0.7rem' }}>{text}</span>,
                                                width: '15%'
                                            },
                                            {
                                                title: <span style={{ fontSize: '0.8rem' }}>고용 상태</span>,
                                                dataIndex: 'employmentStatus',
                                                key: 'employmentStatus',
                                                align: 'center',
                                                render: (text) => <span style={{ fontSize: '0.7rem' }}>{text}</span>,
                                                width: '10%'
                                            },
                                            {
                                                title: <span style={{ fontSize: '0.8rem' }}>고용 유형</span>,
                                                dataIndex: 'employmentType',
                                                key: 'employmentType',
                                                align: 'center',
                                                render: (text) => <span style={{ fontSize: '0.7rem' }}>{text}</span>,
                                                width: '10%'
                                            },
                                            {
                                                title: <span style={{ fontSize: '0.8rem' }}>직위</span>,
                                                dataIndex: 'positionName',
                                                key: 'positionName',
                                                align: 'center',
                                                render: (text) => <span style={{ fontSize: '0.7rem' }}>{text}</span>,
                                                width: '15%'
                                            },
                                            {
                                                title: <span style={{ fontSize: '0.8rem' }}>직책</span>,
                                                dataIndex: 'jobTitleName',
                                                key: 'jobTitleName',
                                                align: 'center',
                                                render: (text) => <span style={{ fontSize: '0.7rem' }}>{text}</span>,
                                                width: '15%'
                                            },
                                            {
                                                title: <span style={{ fontSize: '0.8rem' }}>이메일</span>,
                                                dataIndex: 'email',
                                                key: 'email',
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
                                            onClick: () => handleRowClick(record)
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
                                    <Typography variant="h6" sx={{ padding: '20px' }}>
                                        사원 수정
                                    </Typography>
                                    <Grid sx={{ padding: '0px 20px 0px 20px' }}>
                                        <Form
                                            form={form}
                                            onFinish={(values) => {
                                                handleFormSubmit(values, 'update');
                                            }}
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
                                                    <Form.Item name= 'phoneNumber' rules={[{ required: true, message: '휴대폰 번호를 입력하세요.' }]}>
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
                                                    <Input addonBefore="부서명"
                                                           value={displayValues.department}
                                                           onClick={() => handleInputClick('department')}
                                                           onFocus={(e) => e.target.blur()}
                                                    />
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
                                                    <Form.Item name="employmentStatus" rules={[{ required: true, message: '고용 상태를 입력하세요.' }]}>
                                                        <Input addonBefore="고용 상태" />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item name="employmentType" rules={[{ required: true, message: '고용유형을 입력하세요.' }]}>
                                                        <Input addonBefore="고용유형" />
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
                                                            value={displayValues.bank}
                                                            onClick={() => handleInputClick('bank')}
                                                            onFocus={(e) => e.target.blur()}
                                                        />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={6}>
                                                    <Form.Item name="bankAccountNumber" rules={[{ required: true, message: '계좌번호를 입력하세요.' }]}>
                                                        <Input addonBefore="계좌번호" />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={6}>
                                                    <Form.Item name="householdHead" rules={[{ required: true, message: '세대주 여부를 입력하세요.' }]}>
                                                        <Input addonBefore="세대주 여부" />
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
                                                {/*{currentField === 'bank' && (*/}
                                                {/*    <>*/}
                                                {/*        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: '20px' }}>*/}
                                                {/*            은행 선택*/}
                                                {/*        </Typography>*/}
                                                {/*        {modalData && (*/}
                                                {/*            <Table*/}
                                                {/*                columns={[*/}
                                                {/*                    { title: '은행명', dataIndex: 'name', key: 'name', align: 'center' }*/}
                                                {/*                ]}*/}
                                                {/*                dataSource={modalData}*/}
                                                {/*                rowKey="code"*/}
                                                {/*                size={'small'}*/}
                                                {/*                pagination={{ pageSize: 15, position: ['bottomCenter'], showSizeChanger: false }}*/}
                                                {/*                onRow={(record) => ({*/}
                                                {/*                    style: { cursor: 'pointer' },*/}
                                                {/*                    onClick: () => handleModalSelect(record), // 선택 시 처리*/}
                                                {/*                })}*/}
                                                {/*            />*/}
                                                {/*        )}*/}
                                                {/*    </>*/}
                                                {/*)}*/}
                                                    {currentField === 'department' && (
                                                        <>
                                                            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: '20px' }}>
                                                                부서 선택
                                                            </Typography>
                                                            {modalData && (
                                                                <Table
                                                                    columns={[
                                                                        { title: '부서코드', dataIndex: 'departmentCode', key: 'departmentCode', align: 'center'},
                                                                        { title: '부서명', dataIndex: 'departmentName', key: 'departmentName', align: 'center',},

                                                                    ]}
                                                                    dataSource={modalData}
                                                                    rowKey="id"
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
        </Grid>
    );
};



export default EmployeeManagementPage;