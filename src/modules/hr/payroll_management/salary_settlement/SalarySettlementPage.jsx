import React, {useEffect, useMemo, useState} from 'react';
import { Box, Grid, Grow, Paper, Typography } from '@mui/material';
import {Select, Spin, Table, Button, DatePicker, Input, Modal, Tag, Row, Form, Space, Col, Divider} from 'antd';
import dayjs from 'dayjs';
import apiClient from "../../../../config/apiClient.jsx";
import WelcomeSection from '../../../../components/WelcomeSection.jsx';
import { tabItems } from './SalarySettlementUtil.jsx';
import TemporarySection from "../../../../components/TemporarySection.jsx";
import {DownSquareOutlined, SearchOutlined} from "@ant-design/icons";
import {useNotificationContext} from "../../../../config/NotificationContext.jsx";
import {EMPLOYEE_API} from "../../../../config/apiConstants.jsx";
const { RangePicker } = DatePicker;

const SalarySettlementPage = () => {
    const notify = useNotificationContext();
    const [form] = Form.useForm();
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [salaryDates, setSalaryDates] = useState([]);
    const [selectedDateId, setSelectedDateId] = useState(null);

    const [salaryLedgerData, setSalaryLedgerData] = useState(null);
    const [activeTabKey, setActiveTabKey] = useState('1');

    const [modalData, setModalData] = useState(null);
    const [initialModalData, setInitialModalData] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [displayValue, setDisplayValue] = useState('');
    const [searchData, setSearchData] = useState([]);

    const [searchParams, setSearchParams] = useState({
        startDate: null,
        endDate: null,
        setSelectedEmployee: '',
        setSalaryDateId: '',
    });

    useEffect(() => {
        setModalData(salaryDates);  // 초기 데이터 설정
    }, [salaryDates]);


    const handleTabChange = (key) => {
        setActiveTabKey(key);
    };

    useEffect(() => {
        fetchSalaryDates();
        // fetchEmployees();
    }, []);

    // 급여 지급일 데이터 가져오기
    const fetchSalaryDates = async () => {
        try {
            const response = await apiClient.post(EMPLOYEE_API.SALARY_LEDGER_DATE_API);
            console.log("급여지급일 목록:", response.data);  // API 응답 확인
            setSalaryDates(response.data);
        } catch (error) {
            console.error("급여지급일 조회 오류:", error);  // 자세한 오류 로그
            notify('error', '지급일 조회 실패', '지급일 정보를 불러오는 중 오류가 발생했습니다.', 'top');
        }
    };

    const fetchEmployees = async () => {
        try {
            console.log("Selected Date ID: ", selectedDateId); // 선택된 지급일 ID 확인

            // selectedDateId가 유효한지 확인
            if (!selectedDateId) {
                notify('warning', '입력 오류', '지급일을 선택해 주세요.', 'bottomRight');
                return;
            }

            const response = await apiClient.post(
                EMPLOYEE_API.EMPLOYEE_DATA_API,
                { salaryLedgerDateId: selectedDateId }, // 정확한 ID 전달
                { headers: { 'Content-Type': 'application/json' } }
            );

            console.log("Filtered Employees: ", response.data); // 로그 추가
            setEmployees(response.data);
        } catch (error) {
            console.error("fetchEmployees error: ", error);
            notify('error', '사원 조회 실패', '사원 목록을 불러오는 중 오류가 발생했습니다.', 'top');
        }
    };


    // 급여 조회
    const fetchSalaryLedger = async () => {
        if (!selectedEmployee || !selectedDateId) {
            notify('warning', '입력 오류', '사원과 지급일을 선택해 주세요.', 'bottomRight');
            return;
        }
        setIsLoading(true);
        try {
            const response = await apiClient.post(EMPLOYEE_API.SALARY_LEDGER_SHOW_API, {
                employeeId: selectedEmployee.id, // selectedEmployee.id vs selectedEmployee
                salaryLedgerDateId: salaryLedgerDateId,
            });
            setSalaryLedgerData(response.data);
        } catch (error) {
            notify('error', '조회 실패', '급여 정보를 조회하는 중 오류가 발생했습니다.', 'top');
            console.error("fetchSalaryLedger error: ", error);

        } finally {
            setIsLoading(false);
        }
    };

    const handleFormSubmit = async (values) => {
        try {
            await apiClient.post(EMPLOYEE_API.SALARY_LEDGER_UPDATE_API, values);
            notify('success', '수정 완료', '급여 정산 정보가 수정되었습니다.');
            fetchSalaryLedger(); // 수정 후 데이터 갱신
        } catch (error) {
            notify('error', '수정 실패', '급여 정산 정보 수정 중 오류가 발생했습니다.');
        }
    };

    // // 자동 계산
    // const calculateSalary = async () => {
    //     if (!salaryLedgerData?.ledgerId) return;
    //     try {
    //         const response = await apiClient.post(EMPLOYEE_API.SALARY_LEDGER_CALCULATION_API, {
    //             salaryLedgerId: salaryLedgerData.ledgerId,
    //         });
    //         setSalaryLedgerData(response.data);
    //         notify('success', '계산 완료', '급여 자동 계산이 완료되었습니다.', 'bottomRight');
    //     } catch (error) {
    //         notify('error', '계산 실패', '자동 계산 중 오류가 발생했습니다.', 'top');
    //     }
    // };

    const isFinalized = salaryLedgerData?.finalized;

    // // 마감 처리
    // const handleDeadline = async () => {
    //     if (!salaryLedgerData?.ledgerId) return;
    //     try {
    //         const response = await apiClient.post(EMPLOYEE_API.SALARY_LEDGER_DEADLINE_API, {
    //             salaryLedgerId: salaryLedgerData.ledgerId,
    //         });
    //         setSalaryLedgerData({ ...salaryLedgerData, finalized: response.data.finalized });
    //         notify('success', '마감 처리 완료', response.data.message, 'bottomRight');
    //     } catch (error) {
    //         notify('error', '마감 실패', '마감 처리 중 오류가 발생했습니다.', 'top');
    //     }
    // };
    //
    // // 마감 해제 핸들러
    // const handleDeadlineOff = async () => {
    //     if (!salaryLedgerData?.ledgerId) return;
    //     try {
    //         const response = await apiClient.post(EMPLOYEE_API.SALARY_LEDGER_DEADLINE_OFF_API, {
    //             salaryLedgerId: salaryLedgerData.ledgerId,
    //         });
    //         setSalaryLedgerData({ ...salaryLedgerData, finalized: response.data.finalized });
    //         notify('success', '마감 해제 완료', response.data.message, 'bottomRight');
    //     } catch (error) {
    //         notify('error', '마감 해제 실패', '마감 해제 중 오류가 발생했습니다.', 'top');
    //     }
    // };

    const handleSearch = async () => {

    }

    // 지급일 선택 모달 열기
    const handleInputClick = () => {
        setIsModalVisible(true);
    };

    // 사원 선택 시 급여 데이터 조회
    const handleEmployeeSelect = async (employee) => {
        setSelectedEmployee(employee);
        console.log("Selected Employee: ", employee); // 로그 추가


        try {
            const response = await apiClient.post(EMPLOYEE_API.SALARY_LEDGER_SHOW_API, {
                employeeId: employee.id,
                salaryLedgerDateId: selectedDateId,
            });
            setSalaryLedgerData(response.data);
            form.setFieldsValue(response.data);
        } catch (error) {
            notify('error', '조회 오류', '급여 정산 정보 조회 중 오류가 발생했습니다.');
            console.error("handleEmployeeSelect error: ", error)
        }
    };

    // 모달에서 지급일 코드 선택 시 처리
    const handleDateSelect = (record) => {
        setSelectedDateId(record.id);
        setDisplayValue(`[${record.code}] ${record.description}`); // Input에 표시할 값 설정
        setIsModalVisible(false);

        console.log("Selected Date ID: ", record.id); // 로그 추가

        // fetchEmployees(record.id); // 지급일에 맞는 사원 목록 조회
    };

    return (
        <Box sx={{ margin: '20px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <WelcomeSection
                        title="급여 정산"
                        description={(
                            <Typography>
                                급여 정산 페이지는 <span>사원의 근로 시간과 지급 항목</span>을 기반으로 매월 급여를 계산하는 기능을 제공함. 이 페이지에서는 <span>근로 시간, 연장 근무, 야근, 공제 항목</span> 등을 입력하여 <span>정확한 급여 계산</span>을 진행할 수 있으며, 자동으로 각종 <span>세금과 보험료</span>가 반영된 금액을 확인할 수 있음. 이를 통해 사원의 급여 정산을 효율적으로 관리할 수 있음.
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
                    <Grid item xs={12} md={3} sx={{ minWidth: '300px'}}>
                        <Grow in={true} timeout={200}>
                            <Paper elevation={3} sx={{ height: '100%' }}>
                                <Typography variant="h6" sx={{ padding: '20px' }} >급여정산 정보</Typography>
                                <Grid sx={{ padding: '0px 20px 0px 20px' }}>
                                    <Form layout="vertical">
                                        <Row gutter={16} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between'}}>
                                            <Col>
                                                <Form.Item
                                                    label="지급일 코드"
                                                    required
                                                    tooltip="검색할 급여지급일의 코드를 선택하세요"
                                                    >
                                                    <Form.Item
                                                        noStyle
                                                        rules={[{ required: true, message: '급여지급일 코드를 선택하세요' }]}
                                                    >
                                                        <Input
                                                            placeholder="급여지급일 코드"
                                                            value={displayValue} // 선택된 값 표시
                                                            onClick={handleInputClick} // Input 클릭 시 모달 열기
                                                            className="search-input"
                                                            style={{ width: '100%' }}
                                                            suffix={<DownSquareOutlined />}
                                                        />
                                                    </Form.Item>
                                                </Form.Item>
                                            </Col>
                                            <Col>
                                                <Form.Item>
                                                    <Button
                                                        style={{ width: '100px' }}
                                                        type="primary"
                                                        icon={<SearchOutlined />}
                                                        onClick={() => fetchEmployees()}  // 화살표 함수로 감싸기 : 화살표 함수를 사용하여 이벤트 객체가 전달되지 않도록 해야 원형 참조 오류
                                                        block
                                                    >
                                                        검색
                                                    </Button>
                                                </Form.Item>

                                            </Col>
                                        </Row>
                                    </Form>

                                    {/* 지급일 코드 선택 모달 */}
                                    <Modal
                                        open={isModalVisible}
                                        onCancel={() => setIsModalVisible(false)}
                                        width="40vw"
                                        footer={null}
                                    >
                                        {isLoading ? (
                                            <Spin />
                                        ) : (
                                            <>
                                                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: '20px' }}>
                                                    급여지급일 코드 선택
                                                </Typography>
                                                <Input
                                                    placeholder="검색"
                                                    prefix={<SearchOutlined />}
                                                    onChange={(e) => {
                                                        const value = e.target.value.toLowerCase(); // 입력값을 소문자로 변환
                                                        if (!value) {
                                                            setModalData(salaryDates);
                                                        } else {
                                                            const filtered = salaryDates.filter((item) => {
                                                                const startDate = dayjs(item.startDate).format('YYYY-MM-DD'); // 날짜 포맷 맞추기
                                                                const endDate = dayjs(item.endDate).format('YYYY-MM-DD'); // 날짜 포맷 맞추기

                                                                return (
                                                                    (item.description && item.description.toLowerCase().includes(value)) ||
                                                                    (item.code && item.code.toLowerCase().includes(value)) ||
                                                                    startDate.includes(value) || // 날짜 문자열 포함 여부 확인
                                                                    endDate.includes(value)
                                                                );
                                                            });
                                                            setModalData(filtered); // 필터링된 데이터 설정
                                                        }
                                                    }}

                                                    style={{ marginBottom: 16 }}
                                                />
                                                {modalData && (
                                                    <Table
                                                        columns={[
                                                            {
                                                                title: <div className="title-text">지급일코드</div>,
                                                                dataIndex: 'code',
                                                                key: 'code',
                                                                align: 'center',
                                                                width: '20%',
                                                                render: (text) => <div className="small-text">{text}</div>
                                                            },
                                                            {
                                                                title: <div className="title-text">설명</div>,
                                                                dataIndex: 'description',
                                                                key: 'description',
                                                                align: 'center',
                                                                render: (text) => <div className="small-text">{text}</div>
                                                            },
                                                            {
                                                                title: <div className="title-text">시작일</div>,
                                                                dataIndex: 'startDate',
                                                                key: 'startDate',
                                                                align: 'center',
                                                                render: (text) => <div className="small-text">{text}</div>
                                                            },
                                                            {
                                                                title: <div className="title-text">마감일</div>,
                                                                dataIndex: 'endDate',
                                                                key: 'endDate',
                                                                align: 'center',
                                                                render: (text) => <div className="small-text">{text}</div>
                                                            },
                                                        ]}
                                                        dataSource={salaryDates}
                                                        rowKey="id"
                                                        size={'small'}
                                                        pagination={{
                                                            pageSize: 15,
                                                            position: ['bottomCenter'],
                                                            showSizeChanger: false,
                                                            showTotal: (total) => `총 ${total}개`,
                                                        }}
                                                        onRow={(record) => ({
                                                            onClick: () => handleDateSelect(record),
                                                        })}
                                                    />
                                                )}
                                            </>
                                        )}
                                    </Modal>

                                    <Typography variant="h6" sx={{ padding: '20px' }} >사원 정보</Typography>
                                    <Grid sx={{ padding: '0px 20px 0px 20px' }}>
                                        <Table
                                            dataSource={employees} // 필터링된 사원 목록 사용
                                            columns={[
                                                {
                                                    title: <div className="title-text">사원 번호</div>,
                                                    dataIndex: 'employeeNumber',
                                                    key: 'employeeNumber',
                                                    align: 'center',
                                                    render: (text) => text ? <div className="small-text">{text}</div> : ''
                                                },
                                                {
                                                    title: <div className="title-text">사원명</div>,
                                                    dataIndex: 'firstName',
                                                    key: 'firstName',
                                                    align: 'center',
                                                    render: (text, record) => <div className="small-text">{record.lastName + record.firstName}</div>
                                                },
                                                {
                                                    title: <div className="title-text">부서명</div>,
                                                    dataIndex: 'departmentName',
                                                    key: 'departmentName',
                                                    align: 'center',
                                                    render: (text, record) => {
                                                        if (text) {
                                                            let color;
                                                            let value = text; // 기본적으로 text 값 사용

                                                            switch (text) {
                                                                case '재무부':
                                                                    color = 'red';
                                                                    value = '재무';
                                                                    break;
                                                                case '인사부':
                                                                    color = 'green';
                                                                    value = '인사';
                                                                    break;
                                                                case '생산부':
                                                                    color = 'blue';
                                                                    value = '생산';
                                                                    break;
                                                                case '물류부':
                                                                    color = 'orange';
                                                                    value = '물류';
                                                                    break;
                                                                default:
                                                                    color = 'gray'; // 기본 색상
                                                            }

                                                            return <Tag style={{ marginLeft: '5px' }} color={color}>{value}</Tag>;
                                                        }
                                                        return '';
                                                    }
                                                },
                                            ]}
                                            rowKey="id"
                                            pagination={{pageSize: 15, position: ['bottomCenter'], showSizeChanger: false}}
                                            size="small"
                                            style={{ marginBottom: '20px' }}
                                            rowSelection={{
                                                type: 'radio',
                                                selectedRowKeys,
                                                // onChange: async (newSelectedRowKeys, record) => {
                                                    // setEmployeeId(record[0].id);
                                                    // setPositionId(record[0].positionId);
                                                    // setSelectedRowKeys(newSelectedRowKeys);
                                                    //
                                                    // try {
                                                    //     const response = await apiClient.post(EMPLOYEE_API.SALARY_SHOW_API, {employeeId: record[0].id});
                                                    //     setSearchData2(response.data);
                                                    //
                                                    //     setDisplayValues({
                                                    //         salaryStep: response.data.salaryStepName,
                                                    //         longTermCareInsurancePensionCode: `[${response.data.longTermCareInsurancePensionCode}] ${response.data.longTermCareInsurancePensionDescription}`,
                                                    //     })
                                                    //     form.setFieldsValue({
                                                    //         ...response.data,
                                                    //         privateSchoolPensionAmount: '0',
                                                    //     });
                                                    //     setDisplayValues({
                                                    //         salaryStep: response.data.salaryStepName,
                                                    //         longTermCareInsurancePensionCode: `[${response.data.longTermCareInsurancePensionCode}] ${response.data.longTermCareInsurancePensionDescription}`,
                                                    //     })
                                                    //
                                                    //     notify('success', '급여정보 조회', '급여정보 조회 성공.', 'bottomRight');
                                                    // } catch (error) {
                                                    //     notify('error', '조회 오류', '데이터 조회 중 오류가 발생했습니다.', 'top');
                                                    // }
                                                // }
                                            }}
                                            onRow={(record) => ({
                                                style: { cursor: 'pointer' },
                                                onClick: async () => {
                                                    setEmployeeId(record.id);
                                                    console.log(record.id);
                                                    setSelectedRowKeys([record.id]);
                                                    // setPositionId(record.positionId);

                                                    // try {
                                                    //     const response = await apiClient.post(EMPLOYEE_API.SALARY_SHOW_API, { employeeId: record.id });
                                                    //     setSearchData2(response.data);
                                                    //
                                                    //     setDisplayValues({
                                                    //         salaryStep: response.data.salaryStepName,
                                                    //         longTermCareInsurancePensionCode: `[${response.data.longTermCareInsurancePensionCode}] ${response.data.longTermCareInsurancePensionDescription}`,
                                                    //     })
                                                    //     form.setFieldsValue({
                                                    //         ...response.data,
                                                    //         privateSchoolPensionAmount: '0',
                                                    //     });
                                                    //     setDisplayValues({
                                                    //         salaryStep: response.data.salaryStepName,
                                                    //         longTermCareInsurancePensionCode: `[${response.data.longTermCareInsurancePensionCode}] ${response.data.longTermCareInsurancePensionDescription}`,
                                                    //     })
                                                    //
                                                    //     notify('success', '급여정보 조회', '급여정보 조회 성공.', 'bottomRight');
                                                    // } catch (error) {
                                                    //     notify('error', '조회 오류', '데이터 조회 중 오류가 발생했습니다.', 'top');
                                                    // }
                                                },
                                            })}
                                        />
                                    </Grid>

                                    {salaryLedgerData && (
                                        <Form form={form} layout="vertical" onFinish={(values) => console.log(values)}>
                                            <Divider>급여 정보</Divider>
                                            <Grid container spacing={3}>
                                                <Grid item xs={6}>
                                                    <Form.Item name="nationalPensionAmount" label="국민연금">
                                                        <Input readOnly />
                                                    </Form.Item>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Form.Item name="privateSchoolPensionAmount" label="사학연금">
                                                        <Input readOnly />
                                                    </Form.Item>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Form.Item name="healthInsurancePensionAmount" label="건강보험">
                                                        <Input readOnly />
                                                    </Form.Item>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Form.Item name="employmentInsuranceAmount" label="고용보험">
                                                        <Input readOnly />
                                                    </Form.Item>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Form.Item name="incomeTaxAmount" label="소득세">
                                                        <Input readOnly />
                                                    </Form.Item>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Form.Item name="localIncomeTaxPensionAmount" label="지방소득세">
                                                        <Input readOnly />
                                                    </Form.Item>
                                                </Grid>
                                            </Grid>

                                            <Divider>총계 및 마감 상태</Divider>
                                            <Grid container spacing={3}>
                                                <Grid item xs={6}>
                                                    <Form.Item name="totalSalaryAmount" label="지급 총액">
                                                        <Input readOnly />
                                                    </Form.Item>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Form.Item name="netPayment" label="차인지급액">
                                                        <Input readOnly />
                                                    </Form.Item>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Form.Item name="finalized" label="마감 여부">
                                                        <Input readOnly />
                                                    </Form.Item>
                                                </Grid>
                                            </Grid>

                                            <Button type="primary" htmlType="submit">
                                                저장
                                            </Button>
                                        </Form>
                                    )}

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

export default SalarySettlementPage;