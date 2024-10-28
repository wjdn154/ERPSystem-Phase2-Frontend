import React, {useEffect, useMemo, useState} from 'react';
import {Box, Grid, Grow, Paper} from '@mui/material';
import WelcomeSection from '../../../../components/WelcomeSection.jsx';
import { tabItems } from './SalaryRegistrationUtil.jsx';
import {Typography} from '@mui/material';
import {
    Space,
    Button,
    Checkbox,
    Col,
    Divider,
    Form,
    Input,
    Modal,
    Row,
    Select,
    Spin,
    Table,
    Tag,
    notification
} from 'antd';
import TemporarySection from "../../../../components/TemporarySection.jsx";
import {useNotificationContext} from "../../../../config/NotificationContext.jsx";
import apiClient from "../../../../config/apiClient.jsx";
import {EMPLOYEE_API, FINANCIAL_API} from "../../../../config/apiConstants.jsx";
import {DownSquareOutlined, SearchOutlined} from "@ant-design/icons";
import dayjs from "dayjs";
const { confirm } = Modal;

const SalaryRegistrationPage = ({ initialData }) => {
    const notify = useNotificationContext();
    const [form] = Form.useForm();
    const [activeTabKey, setActiveTabKey] = useState('1');
    const [searchData, setSearchData] = useState(null);
    const [searchData2, setSearchData2] = useState(null);
    const [modalData, setModalData] = useState(null);
    const [initialModalData, setInitialModalData] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [positionId, setPositionId] = useState();
    const [employeeId, setEmployeeId] = useState();
    const [currentField, setCurrentField] = useState('');
    const [isStudentLoanDisabled, setIsStudentLoanDisabled] = useState(true);
    const [salaryParam, setSalaryParam] = useState({
        employeeId: null,
        salaryStepId: null,
        salaryType: null,
        incomeTaxType: null,// 국외소득유무
        studentLoanRepaymentStatus: null,// 학자금상환여부
        studentLoanRepaymentAmount: null,// 합자금 상환통지액
        pensionType: null,// 연금유형 : 국민연금 or 사학연금
        nationalPensionAmount: null,// 국민연금 금액
        healthInsurancePensionAmount: null,// 건강보험 금액
        healthInsuranceNumber: null,// 건강보험 번호
        longTermCareInsurancePensionCode: null,// 장기요양보험 코드
        employmentInsuranceAmount: null,// 고용보험 금액
        unionMembershipStatus: null,// 노조가입여부
    });
    const [displayValues, setDisplayValues] = useState({
        salaryStep: '',
        longTermCareInsurancePensionCode: '',
    });

    const handleCheckboxChange = (e) => {
        const isChecked = e.target.checked;
        form.setFieldsValue({ studentLoanRepaymentStatus: isChecked });
        form.setFieldsValue({ studentLoanRepaymentAmount: '' });
        setIsStudentLoanDisabled(!isChecked);
    };

    useEffect(() => {
        setSearchData(initialData);
        const fetchData = async () => {
            try {
                const response = await apiClient.post(EMPLOYEE_API.SALARY_SHOW_API, { employeeId: 1 });
                setSearchData2(response.data);
                setPositionId(initialData[0].positionId);
                form.setFieldsValue({
                    ...response.data,
                });
                setDisplayValues({
                    salaryStep: response.data.salaryStepName,
                    longTermCareInsurancePensionCode: `[${response.data.longTermCareInsurancePensionCode.padStart(5, '0')}] ${response.data.longTermCareInsurancePensionDescription}`,
                })
            } catch (error) {
                console.error('급여 데이터를 불러오는 중 오류 발생', error);
            }
        };

        fetchData();
    }, []);

    const handleTabChange = (key) => {
        setActiveTabKey(key);
    };

    const handleInputClick = (fieldName) => {
        setCurrentField(fieldName);
        setModalData(null);
        setInitialModalData(null);
        fetchModalData(fieldName);
        setIsModalVisible(true);
    };

    const fetchModalData = async (fieldName) => {
        setIsLoading(true);
        let apiPath;
        if(fieldName === 'salaryStep') apiPath = EMPLOYEE_API.SALARY_STEP_API;
        if(fieldName === 'longTermCareInsurancePensionCode') apiPath = EMPLOYEE_API.LONG_TERM_CARE_INSURANCE_PENSION_API;

        try {
            const response = await apiClient.post(apiPath);
            console.log(response.data);
            setModalData(response.data);
            setInitialModalData(response.data);
        } catch (error) {
            notify('error', '조회 오류', '데이터 조회 중 오류가 발생했습니다.', 'top');
        } finally {
            setIsLoading(false);
        }
    };
    const handleModalSelect = async (record) => {

        // 모달 창 마다가 formattedvalue, setclient param 설정 값이 다름
        switch (currentField) {
            case 'salaryStep':
                setSalaryParam((prevParams) => ({
                    ...prevParams,
                    salaryStepId: record.id,
                }));
                setDisplayValues((prevValues) => ({
                    ...prevValues,
                    salaryStep: record.name,
                }));

                try {
                    const nationalPension = await apiClient.post(EMPLOYEE_API.NATIONAL_PENSION_CALCULATOR_API, {
                        salaryStepId: record.id,
                        positionId: positionId,
                    });
                    const employmentInsurance = await apiClient.post(EMPLOYEE_API.EMPLOYMENT_INSURANCE_PENSION_CALCULATOR_API, {
                        salaryStepId: record.id,
                        positionId: positionId,
                    });
                    const healthInsurance = await apiClient.post(EMPLOYEE_API.HEALTH_INSURANCE_PENSION_CALCULATOR_API, {
                        salaryStepId: record.id,
                        positionId: positionId,
                    });

                    form.setFieldsValue({
                        nationalPensionAmount: nationalPension.data,
                        employmentInsuranceAmount: employmentInsurance.data,
                        healthInsurancePensionAmount: healthInsurance.data,
                    });

                } catch (error) {
                    console.error('급여 데이터를 불러오는 중 오류 발생', error);
                }

                break;
            case 'longTermCareInsurancePensionCode':
                setSalaryParam((prevParams) => ({
                    ...prevParams,
                    longTermCareInsurancePensionCode: record.code,
                }));
                setDisplayValues((prevValues) => ({
                    ...prevValues,
                    longTermCareInsurancePensionCode: `[${record.code.toString().padStart(5, '0')}] ${record.description}`,
                }));
                break;
        }
        // 모달창 닫기
        setIsModalVisible(false);
    };

    // 금액 포맷 함수
    const formatNumberWithComma = (value) => {
        if (!value) return '';
        const cleanValue = value.toString().replace(/[^\d]/g, '');
        return cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    const handleFormSubmit = async (values, type) => {
        confirm({
            title: '저장 확인',
            content: '정말로 저장하시겠습니까?',
            okText: '확인',
            cancelText: '취소',
            onOk: async () => {
                // 확인 버튼 클릭 시 실행되는 저장 로직
                values.employeeId = employeeId;
                values.salaryStepId = searchData2.salaryStepId;
                values.longTermCareInsurancePensionCode = searchData2.longTermCareInsurancePensionCode;

                console.log(values);
                console.log(searchData2);

                try {
                    const API_PATH = type === 'update' ? FINANCIAL_API.UPDATE_CLIENT_API : FINANCIAL_API.SAVE_CLIENT_API;
                    const response = await apiClient.post(API_PATH, values);
                    const updatedData = response.data;
                    setClientList((prevClientList) =>
                        prevClientList.map((client) =>
                            client.id === updatedData.id
                                ? {
                                    ...client,
                                    id: values.id,
                                    representativeName: values.representativeName,
                                    printClientName: values.printClientName,
                                    roadAddress: values.address.roadAddress,
                                    detailedAddress: values.address.detailedAddress,
                                    phoneNumber: values.contactInfo.phoneNumber,
                                    businessType: values.businessInfo.businessType,
                                    transactionStartDate: values.transactionStartDate,
                                    transactionEndDate: values.transactionEndDate,
                                    remarks: values.remarks,
                                }
                                : client
                        )
                    );
                    setEditClient(false);
                    setFetchClientData(null);
                    setClientParam({
                        transactionStartDate: dayjs(),  // 현재 날짜로 설정
                        transactionEndDate: "9999-12-31",  // 종료일을 9999-12-31로 설정
                        transactionType: 'BOTH',
                    });
                    setDisplayValues({});
                    type === 'update'
                        ? notify('success', '거래처 수정', '거래처 정보 수정 성공.', 'bottomRight')
                        : (notify('success', '거래처 저장', '거래처 정보 저장 성공.', 'bottomRight'), registrationForm.resetFields());

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
                        title="급여 등록"
                        description={(
                            <Typography>
                                급여 등록 페이지는 <span>사원의 근로 시간과 지급 항목</span>을 기반으로 매월 급여를 계산하는 기능을 제공함. 이 페이지에서는 <span>근로 시간, 연장 근무, 야근, 공제 항목</span> 등을 입력하여 <span>정확한 급여 계산</span>을 진행할 수 있으며, 자동으로 각종 <span>세금과 보험료</span>가 반영된 금액을 확인할 수 있음. 이를 통해 사원의 급여 등록을 효율적으로 관리할 수 있음.
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
                                <Typography variant="h6" sx={{ padding: '20px' }} >사원 정보</Typography>
                                <Grid sx={{ padding: '0px 20px 0px 20px' }}>
                                    <Table
                                        dataSource={searchData ? searchData : []}
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
                                        pagination={false}
                                        size="small"
                                        style={{ marginBottom: '20px' }}
                                        rowSelection={{
                                            type: 'radio',
                                            selectedRowKeys,
                                            onChange: async (newSelectedRowKeys, record) => {
                                                setEmployeeId(record[0].id);
                                                setPositionId(record[0].positionId);
                                                setSelectedRowKeys(newSelectedRowKeys);

                                                try {
                                                    const response = await apiClient.post(EMPLOYEE_API.SALARY_SHOW_API, {employeeId: record[0].id});
                                                    setSearchData2(response.data);

                                                    setDisplayValues({
                                                        salaryStep: response.data.salaryStepName,
                                                        longTermCareInsurancePensionCode: `[${response.data.longTermCareInsurancePensionCode}] ${response.data.longTermCareInsurancePensionDescription}`,
                                                    })
                                                    form.setFieldsValue({
                                                        ...response.data,
                                                    });
                                                    setDisplayValues({
                                                        salaryStep: response.data.salaryStepName,
                                                        longTermCareInsurancePensionCode: `[${response.data.longTermCareInsurancePensionCode}] ${response.data.longTermCareInsurancePensionDescription}`,
                                                    })

                                                    notify('success', '급여정보 조회', '급여정보 조회 성공.', 'bottomRight');
                                                } catch (error) {
                                                    notify('error', '조회 오류', '데이터 조회 중 오류가 발생했습니다.', 'top');
                                                }
                                            }
                                        }}
                                        onRow={(record) => ({
                                            style: { cursor: 'pointer' },
                                            onClick: async () => {
                                                setEmployeeId(record.id);
                                                setSelectedRowKeys([record.id]);
                                                setPositionId(record.positionId);

                                                try {
                                                    const response = await apiClient.post(EMPLOYEE_API.SALARY_SHOW_API, { employeeId: record.id });
                                                    setSearchData2(response.data);

                                                    setDisplayValues({
                                                        salaryStep: response.data.salaryStepName,
                                                        longTermCareInsurancePensionCode: `[${response.data.longTermCareInsurancePensionCode}] ${response.data.longTermCareInsurancePensionDescription}`,
                                                    })
                                                    form.setFieldsValue({
                                                        ...response.data,
                                                    });
                                                    setDisplayValues({
                                                        salaryStep: response.data.salaryStepName,
                                                        longTermCareInsurancePensionCode: `[${response.data.longTermCareInsurancePensionCode}] ${response.data.longTermCareInsurancePensionDescription}`,
                                                    })

                                                    notify('success', '급여정보 조회', '급여정보 조회 성공.', 'bottomRight');
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
                    <Grid item xs={12} md={9} sx={{ minWidth: '400px'}}>
                        <Grow in={true} timeout={200}>
                            <Paper elevation={3} sx={{ height: '100%' }}>
                                <Typography variant="h6" sx={{ padding: '20px' }}>급여 등록 및 수정</Typography>
                                <Grid sx={{ padding: '0px 20px 20px 20px' }}>
                                    <Form
                                        initialValues={searchData2}
                                        form={form}
                                        onFinish={(values) => handleFormSubmit(values, 'update')}
                                    >
                                        <Divider orientation={'left'} orientationMargin="0" style={{ marginTop: '0px', fontWeight: 600 }}>기본 정보</Divider>
                                        <Row gutter={16}>
                                            <Col span={6}>
                                                <Form.Item>
                                                    <Input
                                                        addonBefore="호봉"
                                                        onClick={() => handleInputClick('salaryStep')}
                                                        value={displayValues.salaryStep}
                                                        onFocus={(e) => e.target.blur()}
                                                        suffix={<DownSquareOutlined />}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={6}>
                                                <Form.Item name="salaryType">
                                                    <Space.Compact>
                                                        <Input style={{ width: '60%', backgroundColor: '#FAFAFA', color: '#000', textAlign: 'center' }} value="급여유형" disabled />
                                                        <Select onChange={(value) => form.setFieldValue('salaryType', value)}>
                                                            <Select.Option value="MONTHLYSALARY">월급</Select.Option>
                                                            <Select.Option value="ANNUALSALARY">연봉</Select.Option>
                                                        </Select>
                                                    </Space.Compact>
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Divider orientation={'left'} orientationMargin="0" style={{ marginTop: '0px', fontWeight: 600 }}>기타 정보</Divider>
                                        <Row gutter={16}>
                                            <Col span={6}>
                                                <Form.Item name="incomeTaxType" valuePropName="checked">
                                                    <Checkbox>국외소득 여부</Checkbox>
                                                </Form.Item>
                                            </Col>
                                            <Col span={6}>
                                                <Form.Item name="studentLoanRepaymentStatus" valuePropName="checked">
                                                    <Checkbox onChange={handleCheckboxChange}>학자금 상환 여부</Checkbox>
                                                </Form.Item>
                                            </Col>
                                            <Col span={6}>
                                                <Form.Item name="studentLoanRepaymentAmount" >
                                                    <Input
                                                        addonBefore="학자금 상환 금액"
                                                        disabled={isStudentLoanDisabled}
                                                        onChange={(e) => form.setFieldsValue({ studentLoanRepaymentAmount: e.target.value })}
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Divider orientation={'left'} orientationMargin="0" style={{ marginTop: '0px', fontWeight: 600 }}>연금 및 보험</Divider>
                                        <Row gutter={16}>
                                            <Col span={6}>
                                                <Form.Item name="nationalPensionAmount" rules={[{ required: true, message: '국민연금 금액을 입력하세요.' }]}>
                                                    <Space.Compact>
                                                        <Input style={{ width: '100%', backgroundColor: '#FAFAFA', color: '#000', textAlign: 'center' }} defaultValue="국민연금 금액" disabled />
                                                        <Input disabled value={formatNumberWithComma(form.getFieldValue('nationalPensionAmount'))} />
                                                    </Space.Compact>
                                                </Form.Item>
                                            </Col>
                                            <Col span={6}>
                                                <Form.Item name="healthInsurancePensionAmount" initialValue={0}>
                                                    <Space.Compact>
                                                        <Input style={{ width: '100%', backgroundColor: '#FAFAFA', color: '#000', textAlign: 'center' }} defaultValue="건강보험 금액" disabled />
                                                        <Input disabled value={formatNumberWithComma(form.getFieldValue('healthInsurancePensionAmount'))} />
                                                    </Space.Compact>
                                                </Form.Item>
                                            </Col>
                                            <Col span={6}>
                                                <Form.Item name="employmentInsuranceAmount" initialValue={0}>
                                                    <Space.Compact>
                                                        <Input style={{ width: '100%', backgroundColor: '#FAFAFA', color: '#000', textAlign: 'center' }} defaultValue="고용보험 금액" disabled />
                                                        <Input disabled value={formatNumberWithComma(form.getFieldValue('employmentInsuranceAmount'))} />
                                                    </Space.Compact>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={16}>
                                            <Col span={6}>
                                                <Form.Item name="pensionType">
                                                    <Space.Compact>
                                                        <Input style={{ width: '60%', backgroundColor: '#FAFAFA', color: '#000', textAlign: 'center' }} defaultValue="연금유형" disabled />
                                                        <Select defaultValue="NATIONALPENSION" disabled >
                                                            <Select.Option value="NATIONALPENSION">국민연금</Select.Option>
                                                            <Select.Option value="PRIVATESCHOOLPENSION">사학연금</Select.Option>
                                                        </Select>
                                                    </Space.Compact>
                                                </Form.Item>
                                            </Col>
                                            <Col span={6}>
                                                <Form.Item name="healthInsuranceNumber" rules={[{ required: true, message: '건강보험 번호를 입력하세요.' }]}>
                                                    <Input addonBefore="건강보험 번호" maxLength={10} placeholder="10자리 번호 입력" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={6}>
                                                <Form.Item>
                                                    <Input
                                                        addonBefore="장기요양보험"
                                                        onClick={() => handleInputClick('longTermCareInsurancePensionCode')}
                                                        value={displayValues.longTermCareInsurancePensionCode}
                                                        onFocus={(e) => e.target.blur()}
                                                        suffix={<DownSquareOutlined />}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={6}>
                                                <Form.Item name="unionMembershipStatus" valuePropName="checked">
                                                    <Checkbox>노조 가입 여부</Checkbox>
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                                            <Button type="primary" htmlType="submit">
                                                저장
                                            </Button>
                                        </Box>

                                        {/* 모달 창 */}
                                        <Modal
                                            open={isModalVisible}
                                            onCancel={() => {setIsModalVisible(false)}}
                                            width="40vw"
                                            footer={null}
                                        >
                                            {isLoading ? (
                                                <Spin />
                                            ) : (
                                                <>
                                                    {currentField === 'salaryStep' && (
                                                        <>
                                                            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: '20px' }}>
                                                                호봉 선택
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
                                                                                (item.name && item.name.toLowerCase().includes(value))
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
                                                                        {
                                                                            title: <div className="title-text">호봉명</div>,
                                                                            dataIndex: 'name',
                                                                            key: 'name',
                                                                            align: 'center',
                                                                            render: (text) => <div className="small-text">{text}</div>
                                                                        },
                                                                    ]}
                                                                    dataSource={modalData}
                                                                    rowKey="name"
                                                                    size={'small'}
                                                                    pagination={{
                                                                        pageSize: 15,
                                                                        position: ['bottomCenter'],
                                                                        showSizeChanger: false,
                                                                        showTotal: (total) => `총 ${total}개`,
                                                                    }}
                                                                    onRow={(record) => ({
                                                                        style: { cursor: 'pointer' },
                                                                        onClick: () => handleModalSelect(record), // 선택 시 처리
                                                                    })}
                                                                />
                                                            )}
                                                        </>
                                                    )}
                                                    {currentField === 'longTermCareInsurancePensionCode' && (
                                                        <>
                                                            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: '20px' }}>
                                                                장기요양보험 선택
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
                                                                                (item.code && item.code.toLowerCase().includes(value)) ||
                                                                                (item.description && item.description.toLowerCase().includes(value))
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
                                                                        {
                                                                            title: <div className="title-text">코드번호</div>,
                                                                            dataIndex: 'code',
                                                                            key: 'code',
                                                                            align: 'center',
                                                                            render: (text) => <div className="small-text">{text}</div>
                                                                        },
                                                                        {
                                                                            title: <div className="title-text">설명</div>,
                                                                            dataIndex: 'description',
                                                                            key: 'description',
                                                                            align: 'center',
                                                                            render: (text) => <div className="small-text">{text}</div>
                                                                        },
                                                                    ]}
                                                                    dataSource={modalData}
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
                                                                        onClick: () => handleModalSelect(record), // 선택 시 처리
                                                                    })}
                                                                />
                                                            )}
                                                        </>
                                                    )}
                                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                                                        <Button onClick={() => {setIsModalVisible(false)}} type="primary">
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

export default SalaryRegistrationPage;