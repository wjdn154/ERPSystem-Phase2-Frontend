import React, {useEffect, useMemo, useState} from 'react';
import {Box, Grid, Grow, Paper} from '@mui/material';
import WelcomeSection from '../../../../components/WelcomeSection.jsx';
import { tabItems } from './ClientRegistrationUtil.jsx';
import { Typography } from '@mui/material';
import { Space, Tag, Form, Table, Button, Col, Input, Row, Checkbox, Modal, DatePicker, Spin, Select} from 'antd';
import TemporarySection from "../../../../components/TemporarySection.jsx";
import apiClient from "../../../../config/apiClient.jsx";
import {EMPLOYEE_API, FINANCIAL_API} from "../../../../config/apiConstants.jsx";
import {useNotificationContext} from "../../../../config/NotificationContext.jsx";
import dayjs from 'dayjs';
import { Divider } from 'antd';
const { Option } = Select;

const ClientRegistrationPage = ( {initialData} ) => {
    const notify = useNotificationContext(); // 알림 컨텍스트 사용
    const [form] = Form.useForm(); // 폼 인스턴스 생성
    const [clientList, setClientList] = useState(initialData); // 활성 탭 키 상태
    const [activeTabKey, setActiveTabKey] = useState('1'); // 활성 탭 키 상태
    const [selectedRowKeys, setSelectedRowKeys] = useState([]); // 선택된 행 키 상태
    const [editClient, setEditClient] = useState(false); // 거래처 등록 수정 탭 활성화 여부 상태
    const [fetchClientData, setFetchClientData] = useState(false); // 거래처 조회한 정보 상태
    const [clientParam, setClientParam] = useState(false); // 수정 할 거래처 정보 상태
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태
    const [currentField, setCurrentField] = useState(''); // 모달 분기 할 필드 상태
    const [modalData, setModalData] = useState(null); // 모달 데이터 상태
    const [isModalVisible, setIsModalVisible] = useState(false); // 모달 활성화 여부 상태
    const [isEndDateDisable, setIsEndDateDisable] = useState(false); // 거래 종료일 비활성화 여부 상태
    const [displayValues, setDisplayValues] = useState({});

    console.log(initialData);

    // 거래처 조회 데이터가 있을 경우 폼에 데이터 셋팅
    useEffect(() => {

        if (!fetchClientData) return;

        form.setFieldsValue(fetchClientData);
        setClientParam(fetchClientData);

        setDisplayValues({
            bank: `[${fetchClientData.bankAccount.bank.code}] ${fetchClientData.bankAccount.bank.name}`,
            employee: `[${fetchClientData.employee.employeeNumber}] ${fetchClientData.employee.lastName}${fetchClientData.employee.firstName}`,
            liquor: `[${fetchClientData.liquor.id}] ${fetchClientData.liquor.name}`,
            category: `[${fetchClientData.category.code}] ${fetchClientData.category.name}`,
        });

    }, [fetchClientData, form]);

    // 모달창 열기 핸들러
    const handleInputClick = (fieldName) => {
        setCurrentField(fieldName);
        setModalData(null); // 모달 열기 전에 데이터를 초기화
        fetchModalData(fieldName);  // 모달 데이터 가져오기 호출
        setIsModalVisible(true);  // 모달창 열기
    };

    // 모달창 닫기 핸들러
    const handleModalCancel = () => setIsModalVisible(false);

    // 모달창 데이터 가져오기 함수
    const fetchModalData = async (fieldName) => {
        setIsLoading(true);
        let apiPath;
        if(fieldName === 'bank') apiPath = FINANCIAL_API.FETCH_BANK_LIST_API;
        if(fieldName === 'employee') apiPath = EMPLOYEE_API.EMPLOYEE_DATA_API;
        if(fieldName === 'liquor') apiPath = FINANCIAL_API.FETCH_LIQUOR_LIST_API;
        if(fieldName === 'category') apiPath = FINANCIAL_API.FETCH_CATEGORY_LIST_API;

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

        // 모달 창 마다가 formattedvalue, setclient param 설정 값이 다름
        switch (currentField) {
            case 'bank':
                setClientParam((prevParams) => ({
                    ...prevParams,
                    bankAccount: {
                        bank: {
                            id: record.id,
                            code: record.code,
                            name: record.name,
                            businessNumber: record.businessNumber,
                        },
                    },
                }));
                setDisplayValues((prevValues) => ({
                    ...prevValues,
                    bank: `[${record.code}] ${record.name}`,
                }));
            break;
            case 'employee':
                setClientParam((prevParams) => ({
                    ...prevParams,
                    employee: {
                        id: record.id,
                        firstName: record.firstName,
                        lastName: record.lastName,
                        employeeNumber: record.employeeNumber,
                    },
                }));
                setDisplayValues((prevValues) => ({
                    ...prevValues,
                    employee: `[${record.employeeNumber}] ${record.lastName}${record.firstName}`,
                }));
            break;
            case 'liquor':
                setClientParam((prevParams) => ({
                    ...prevParams,
                    liquor: {
                        id: record.id,
                        code: record.code,
                        name: record.name,
                    },
                }));
                setDisplayValues((prevValues) => ({
                    ...prevValues,
                    liquor: `[${record.id}] ${record.name}`,
                }));
            break;
            case 'category':
                setClientParam((prevParams) => ({
                    ...prevParams,
                    category: {
                        id: record.id,
                        code: record.code,
                        name: record.name,
                    },
                }));
                setDisplayValues((prevValues) => ({
                    ...prevValues,
                    category: `[${record.id}] ${record.name}`,
                }));
            break;
        }


        // 모달창 닫기
        setIsModalVisible(false);
    };

    // 폼 제출 핸들러
    const handleFormSubmit = async (values) => {

        values.id = fetchClientData.id;
        values.code = fetchClientData.code;
        values.transactionStartDate = dayjs(fetchClientData.transactionStartDate).format('YYYY-MM-DD');
        values.transactionEndDate = dayjs(fetchClientData.transactionEndDate).format('YYYY-MM-DD');
        values.bankAccount.bank = {
            id: fetchClientData.bankAccount.bank.id,
            code: fetchClientData.bankAccount.bank.code,
            name: fetchClientData.bankAccount.bank.name,
            businessNumber: fetchClientData.bankAccount.bank.businessNumber,
        };
        values.employee = {
            id: fetchClientData.employee.id,
            firstName: fetchClientData.employee.firstName,
            lastName: fetchClientData.employee.lastName,
            employeeNumber: fetchClientData.employee.employeeNumber,
        };
        values.liquor = {
            id: fetchClientData.liquor.id,
            code: fetchClientData.liquor.code,
            name: fetchClientData.liquor.name,
        };
        values.category = {
            id: fetchClientData.category.id,
            code: fetchClientData.category.code,
            name: fetchClientData.category.name,
        };

        try {
            const response = await apiClient.put(FINANCIAL_API.UPDATE_CLIENT_API(values.id), values);
            const updatedData = response.data;
            console.log(updatedData);
            setClientList((prevClientList) =>
                prevClientList.map((client) =>
                    client.id === updatedData.id ? {
                        ...client,
                        id: updatedData.id,
                        representativeName: updatedData.representativeName,
                        printClientName: updatedData.printClientName,
                        roadAddress: updatedData.address.roadAddress,
                        detailedAddress: updatedData.address.detailedAddress,
                        phoneNumber: updatedData.contactInfo.phoneNumber,
                        businessType: updatedData.businessInfo.businessType,
                        transactionStartDate: updatedData.transactionStartDate,
                        transactionEndDate: updatedData.transactionEndDate,
                        remarks: updatedData.remarks,
                    } : client
                )
            );
            notify('success', '거래처 저장', '거래처 정보 저장 성공.', 'bottomLeft')
        } catch (error) {
            notify('error', '조회 오류', '데이터 조회 중 오류가 발생했습니다.', 'top');
        }

    };

    // 사업자등록번호, 주민등록번호, 전화번호, 팩스번호 포맷 함수
    const formatPhoneNumber = (value) => {
        if (!value) return '';
        const cleanValue = value.replace(/\D/g, ''); // 숫자 외의 모든 문자 제거
        if (cleanValue.length <= 3) return cleanValue;
        if (cleanValue.length <= 7) return `${cleanValue.slice(0, 3)}-${cleanValue.slice(3)}`;
        return `${cleanValue.slice(0, 3)}-${cleanValue.slice(3, 7)}-${cleanValue.slice(7)}`;
    };

    // 금액 포맷 함수
    const formatNumberWithComma = (value) => {
        if (!value) return '';
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    // 거래 시작일 변경 핸들러
    const handleStartDateChange = (date) => {
        setClientParam((prevState) => ({
            ...prevState,
            transactionStartDate: dayjs(date),
        }));
    };

    // 거래 종료일 변경 핸들러
    const handleEndDateChange = (date) => {
        setClientParam((prevState) => ({
            ...prevState,
            transactionEndDate: dayjs(date),
        }));
    };

    const handleEndDateDisableChange = (e) => {
        if (e.target.checked) {
            setIsEndDateDisable(true);
            setClientParam((prevState) => ({
                ...prevState,
                transactionEndDate: "9999-12-31",
            }));
        }else {
            setIsEndDateDisable(false);
            setClientParam((prevState) => ({
                ...prevState,
                transactionEndDate: dayjs(),
            }));
        }
    }

    // 탭 변경 핸들러
    const handleTabChange = (key) => {
        setActiveTabKey(key);
    };

    return (
        <Box sx={{ margin: '20px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <WelcomeSection
                        title="거래처 등록 및 관리"
                        description={(
                            <Typography>
                                거래처등록 페이지는 <span>기업의 거래처 정보를 등록하고 관리</span>하는 기능을 제공함.<br/>
                                거래처의 기본 정보(회사명, 연락처, 주소 등)와 <span>계좌 정보를 등록하여</span> 효율적으로 거래처를 관리할 수 있음.<br/>
                                거래처를 분류하고 필요한 정보를 빠르게 검색할 수 있도록 설정 가능함. <span>정확한 거래처 정보 관리</span>는 재무 처리와 거래 내역 기록에 중요한 역할을 함.
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
                                <Typography variant="h6" sx={{ padding: '20px' }} >거래처 목록</Typography>
                                <Grid sx={{ padding: '0px 20px 0px 20px' }}>
                                    <Table
                                        dataSource={clientList}
                                        columns={[
                                            {
                                                title: <span style={{ fontSize: '0.8rem' }}>대표자명</span>,
                                                dataIndex: 'representativeName',
                                                key: 'representativeName',
                                                align: 'center',
                                                render: (text) => <span style={{ fontSize: '0.7rem' }}>{text}</span>,
                                                width: '10%'
                                            },
                                            {
                                                title: <span style={{ fontSize: '0.8rem' }}>상호명</span>,
                                                dataIndex: 'printClientName',
                                                key: 'printClientName',
                                                align: 'center',
                                                render: (text) => <span style={{ fontSize: '0.7rem' }}>{text}</span>,
                                                width: '15%'
                                            },
                                            {
                                                title: <span style={{ fontSize: '0.8rem' }}>주소</span>,
                                                key: 'address',
                                                align: 'center',
                                                render: (_, record) => <span style={{ fontSize: '0.7rem' }}>{`${record.roadAddress}, ${record.detailedAddress}`}</span>,
                                                width: '20%'
                                            },
                                            {
                                                title: <span style={{ fontSize: '0.8rem' }}>전화번호</span>,
                                                dataIndex: 'phoneNumber',
                                                key: 'phoneNumber',
                                                align: 'center',
                                                render: (text) => <span style={{ fontSize: '0.7rem' }}>{text}</span>,
                                                width: '10%'
                                            },
                                            {
                                                title: <span style={{ fontSize: '0.8rem' }}>사업종류</span>,
                                                dataIndex: 'businessType',
                                                key: 'businessType',
                                                align: 'center',
                                                render: (text, record) => {
                                                    let color;
                                                    switch (text) {
                                                        case '제조업':
                                                            color = 'red';
                                                            break;
                                                        case '도매업':
                                                            color = 'green';
                                                            break;
                                                        case '서비스업':
                                                            color = 'blue';
                                                            break;
                                                        default:
                                                            color = 'gray'; // 기본 색상
                                                    }
                                                    return <Tag style={{marginLeft: '5px'}} color={color}>{text}</Tag>;
                                                },
                                                width: '10%'
                                            },
                                            {
                                                title: <span style={{ fontSize: '0.8rem' }}>거래 시작일</span>,
                                                dataIndex: 'transactionStartDate',
                                                key: 'transactionStartDate',
                                                align: 'center',
                                                render: (text) => <span style={{ fontSize: '0.7rem' }}>{text}</span>,
                                                width: '10%'
                                            },
                                            {
                                                title: <span style={{ fontSize: '0.8rem' }}>거래 종료일</span>,
                                                dataIndex: 'transactionEndDate',
                                                key: 'transactionEndDate',
                                                align: 'center',
                                                render: (text) => <span style={{ fontSize: '0.7rem' }}>{text}</span>,
                                                width: '10%'
                                            },
                                            {
                                                title: <span style={{ fontSize: '0.8rem' }}>비고</span>,
                                                dataIndex: 'remarks',
                                                key: 'remarks',
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
                                            onClick: async () => {
                                                setSelectedRowKeys([record.id]); // 클릭한 행의 키로 상태 업데이트
                                                const id = record.id;
                                                try {
                                                    const response = await apiClient.post(FINANCIAL_API.FETCH_CLIENT_API(id));
                                                    setFetchClientData(response.data);
                                                    setEditClient(true);

                                                    notify('success', '거래처 조회', '거래처 정보 조회 성공.', 'bottomLeft')
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
                    {editClient && (
                    <Grid item xs={12} md={12} sx={{ minWidth: '1000px !important', maxWidth: '1500px !important' }}>
                        <Grow in={true} timeout={200}>
                            <Paper elevation={3} sx={{ height: '100%' }}>
                                <Typography variant="h6" sx={{ padding: '20px' }} >거래처 등록 및 수정</Typography>
                                <Grid sx={{ padding: '0px 20px 0px 20px' }}>
                                    <Form
                                        layout="vertical"
                                        initialValues={fetchClientData}
                                        form={form}
                                        onFinish={(values) => { handleFormSubmit(values) }}
                                    >
                                        <Divider orientation={'left'} orientationMargin="0" style={{ marginTop: '0px', fontWeight:600 }}>기초 정보</Divider>
                                        <Row gutter={16}>
                                            <Col span={6}>
                                                <Form.Item name="representativeName">
                                                    <Input addonBefore="대표자 이름" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={6}>
                                                <Form.Item name="businessRegistrationNumber">
                                                    <Input addonBefore="사업자 등록번호" maxLength={12} />
                                                </Form.Item>
                                            </Col>
                                            <Col span={6}>
                                                <Form.Item name="idNumber">
                                                    <Input addonBefore="주민등록번호" maxLength={14} />
                                                </Form.Item>
                                            </Col>
                                            <Col span={6}>
                                                <Form.Item name="printClientName">
                                                    <Input addonBefore="거래처 인쇄명" />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={16}>
                                            <Col span={6}>
                                                <Form.Item name={['address', 'postalCode']}>
                                                    <Input addonBefore="우편번호" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item name={['address', 'roadAddress']}>
                                                    <Input addonBefore="도로명 주소" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={6}>
                                                <Form.Item name={['address', 'detailedAddress']}>
                                                    <Input addonBefore="상세 주소" />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={16}>
                                            <Col span={12}>
                                                <Form.Item name={['contactInfo', 'phoneNumber']}>
                                                    <Input addonBefore="전화번호" value={formatPhoneNumber(form.getFieldValue(['contactInfo', 'phoneNumber']))} />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item name={['contactInfo', 'faxNumber']}>
                                                    <Input addonBefore="팩스번호" value={formatPhoneNumber(form.getFieldValue(['contactInfo', 'faxNumber']))} />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Divider orientation={'left'} orientationMargin="0" style={{ marginTop: '0px', fontWeight:600 }}>사업 정보</Divider>
                                        <Row gutter={16}>
                                            <Col span={6}>
                                                <Form.Item name={['businessInfo', 'businessType']}>
                                                    <Input addonBefore="업태" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={6}>
                                                <Form.Item name={['businessInfo', 'businessItem']}>
                                                    <Input addonBefore="종목" />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Divider orientation={'left'} orientationMargin="0" style={{ marginTop: '0px', fontWeight:600 }}>금융 정보</Divider>
                                        <Row gutter={16}>
                                            <Col span={4}>
                                                <Form.Item>
                                                    <Input
                                                        addonBefore="은행명"
                                                        value={displayValues.bank}
                                                        onClick={() => handleInputClick('bank')}
                                                        style={{
                                                            caretColor: 'transparent',
                                                        }}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={5}>
                                                <Form.Item name={['bankAccount', 'accountNumber']}>
                                                    <Input addonBefore="계좌번호" placeholder="123-4567-890123" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={5}>
                                                <Form.Item name={['bankAccount', 'accountHolder']}>
                                                    <Input addonBefore="예금주" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={5}>
                                                <Form.Item name={['financialInfo', 'collateralAmount']}>
                                                    <Input addonBefore="담보 금액" value={formatNumberWithComma(form.getFieldValue(['financialInfo', 'collateralAmount']))} />
                                                </Form.Item>
                                            </Col>
                                            <Col span={5}>
                                                <Form.Item name={['financialInfo', 'creditLimit']}>
                                                    <Input addonBefore="신용 한도" value={formatNumberWithComma(form.getFieldValue(['financialInfo', 'creditLimit']))} />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Divider orientation={'left'} orientationMargin="0" style={{ marginTop: '0px', fontWeight:600 }}>담당자 정보</Divider>
                                        <Row gutter={16}>
                                            <Col span={8}>
                                                <Form.Item name={['managerInfo', 'clientManagerPhoneNumber']}>
                                                    <Input
                                                        addonBefore="거래처 담당자 전화번호"
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={8}>
                                                <Form.Item name={['managerInfo', 'clientManagerEmail']}>
                                                    <Input type="email" addonBefore="거래처 담당자 이메일" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={8}>
                                                <Form.Item>
                                                    <Input
                                                        addonBefore="자사 담당자 정보"
                                                        onClick={() => handleInputClick('employee')}
                                                        value={displayValues.employee}
                                                        style={{
                                                            caretColor: 'transparent',
                                                        }}
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Divider orientation={'left'} orientationMargin="0" style={{ marginTop: '0px', fontWeight:600 }}>추가 정보</Divider>
                                        <Row align="middle" gutter={16} style={{ marginBottom: '16px' }}>
                                            <Col>
                                                <Typography>거래시작일</Typography>
                                            </Col>
                                            <Col>
                                                <Form.Item style={{ marginBottom: 0 }}>
                                                    <DatePicker
                                                        value={dayjs(clientParam.transactionStartDate)}
                                                        onChange={handleStartDateChange}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col>
                                                <Typography>거래종료일</Typography>
                                            </Col>
                                            <Col span={4}>
                                                <Form.Item style={{ marginBottom: 0 }}>
                                                    <DatePicker
                                                        value={dayjs(clientParam.transactionEndDate)}
                                                        onChange={handleEndDateChange}
                                                        disabled={isEndDateDisable}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={5}>
                                                <Checkbox onChange={handleEndDateDisableChange}>
                                                    거래종료일 비활성화
                                                </Checkbox>
                                            </Col>
                                        </Row>

                                        {/* 주류 및 카테고리 정보 (모달 선택) */}
                                        <Row gutter={16}>
                                            <Col span={5}>
                                                <Form.Item>
                                                    <Input
                                                        addonBefore="주류코드"
                                                        onClick={() => handleInputClick('liquor')}
                                                        value={displayValues.liquor}
                                                        style={{
                                                            caretColor: 'transparent',
                                                        }}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={5}>
                                                <Form.Item>
                                                    <Input
                                                        addonBefore="카테고리"
                                                        onClick={() => handleInputClick('category')}
                                                        value={displayValues.category}
                                                        style={{
                                                            caretColor: 'transparent',
                                                        }}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={5}>
                                                <Form.Item name="remarks">
                                                    <Input addonBefore="비고" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={5}>
                                                <Form.Item name="transactionType">
                                                    <Space.Compact>
                                                        <Input style={{ width: '40%', backgroundColor: '#FAFAFA', color: '#000', textAlign: 'center' }} defaultValue="거래유형" disabled />
                                                        <Select style={{ width: '60%' }}>
                                                            <Option value="SALES">매출</Option>
                                                            <Option value="PURCHASE">매입</Option>
                                                            <Option value="BOTH">동시</Option>
                                                        </Select>
                                                    </Space.Compact>
                                                </Form.Item>
                                            </Col>
                                            <Col span={4}>
                                                <Form.Item name="isActive" valuePropName="checked">
                                                    <Checkbox>거래처 활성화 여부</Checkbox>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Divider/>

                                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                                            <Button type="primary" htmlType="submit">
                                                저장
                                            </Button>
                                        </Box>

                                        {/* 모달창 예시 */}
                                        <Modal
                                               open={isModalVisible}
                                               onCancel={handleModalCancel}
                                               width="40vw"
                                               footer={null}
                                        >{isLoading ? (
                                            <Spin />  // 로딩 스피너
                                        ) : (
                                            <>
                                                {currentField === 'bank' && (
                                                    <>
                                                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: '20px' }}>
                                                            은행 선택
                                                        </Typography>
                                                        {modalData && (
                                                            <Table
                                                                columns={[
                                                                    { title: '코드', dataIndex: 'code', key: 'code', align: 'center' },
                                                                    { title: '은행명', dataIndex: 'name', key: 'name', align: 'center' },
                                                                    { title: '사업자번호', dataIndex: 'businessNumber', key: 'businessNumber', align: 'center' },
                                                                ]}
                                                                dataSource={modalData}
                                                                rowKey="code"
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
                                                {currentField === 'employee' && (
                                                    <>
                                                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: '20px' }}>
                                                            자사 담당자 선택
                                                        </Typography>
                                                        {modalData && (
                                                            <Table
                                                                columns={[
                                                                    { title: '사원번호', dataIndex: 'employeeNumber', key: 'employeeNumber', align: 'center' },
                                                                    {
                                                                        title: '이름',
                                                                        key: 'name',
                                                                        align: 'center',
                                                                        render: (text, record) => `${record.lastName}${record.firstName}`, // firstName과 lastName을 합쳐서 출력
                                                                    },
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
                                                {currentField === 'liquor' && (
                                                    <>
                                                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: '20px' }}>
                                                            주류코드 선택
                                                        </Typography>
                                                        {modalData && (
                                                            <Table
                                                                columns={[
                                                                    { title: '코드', dataIndex: 'code', key: 'code', align: 'center' },
                                                                    { title: '이름', dataIndex: 'name', key: 'name', align: 'center' },
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
                                                {currentField === 'category' && (
                                                    <>
                                                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: '20px' }}>
                                                            카테고리 선택
                                                        </Typography>
                                                        {modalData && (
                                                            <Table
                                                                columns={[
                                                                    { title: '코드', dataIndex: 'code', key: 'code', align: 'center' },
                                                                    { title: '이름', dataIndex: 'name', key: 'name', align: 'center' },
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

export default ClientRegistrationPage;