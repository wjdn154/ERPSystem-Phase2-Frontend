import React, {useEffect, useMemo, useState} from 'react';
import {Box, Grid, Grow, Paper} from '@mui/material';
import WelcomeSection from '../../../../components/WelcomeSection.jsx';
import { tabItems } from './ClientRegistrationUtil.jsx';
import { Typography } from '@mui/material';
import {Tag, Form, Table, Button, Col, Input, Row, Checkbox} from 'antd';
import TemporarySection from "../../../../components/TemporarySection.jsx";
import apiClient from "../../../../config/apiClient.jsx";
import {FINANCIAL_API} from "../../../../config/apiConstants.jsx";
import {useNotificationContext} from "../../../../config/NotificationContext.jsx";

const ClientRegistrationPage = ( {initialData} ) => {
    const notify = useNotificationContext();
    const [form] = Form.useForm();
    const [activeTabKey, setActiveTabKey] = useState('1');
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [editClient, setEditClient] = useState(false);
    const [fetchClientData, setFetchClientData] = useState(false);
    const [clientParam, setClientParam] = useState(false);

    // console.log(initialData);

    const handleValuesChange = (changedValues, allValues) => {
        setClientParam(allValues); // 값이 변경될 때 상태 업데이트
    };
    useEffect(() => {
        console.log(clientParam);
    }, [clientParam]);


    useEffect(() => {
        if (fetchClientData) {
            form.setFieldsValue(fetchClientData);
            setClientParam(fetchClientData);
        }
    }, [fetchClientData, form]);

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
                                        dataSource={initialData}
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
                                                render: (_, record) => <span style={{ fontSize: '0.7rem' }}>{`${record.address.roadAddress}, ${record.address.detailedAddress}`}</span>,
                                                width: '20%'
                                            },
                                            {
                                                title: <span style={{ fontSize: '0.8rem' }}>전화번호</span>,
                                                dataIndex: ['contactInfo', 'phoneNumber'],
                                                key: 'phoneNumber',
                                                align: 'center',
                                                render: (text) => <span style={{ fontSize: '0.7rem' }}>{text}</span>,
                                                width: '10%'
                                            },
                                            {
                                                title: <span style={{ fontSize: '0.8rem' }}>사업종류</span>,
                                                dataIndex: ['businessInfo', 'businessType'],
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
                                        rowKey={(record) => record.code}
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
                                                setSelectedRowKeys([record.code]); // 클릭한 행의 키로 상태 업데이트
                                                setFetchClientData(record);
                                                setEditClient(true); // 수정 모드로 전환
                                                notify('success', '거래처 조회', '거래처 정보 조회 성공.', 'bottomLeft')
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
                                        initialValues={clientParam}
                                        form={form}
                                        onValuesChange={handleValuesChange}
                                    >
                                        {/* 대표자 정보 및 사업자 등록번호 */}
                                        <Row gutter={16}>
                                            <Col span={6}>
                                                <Form.Item name="representativeName">
                                                    <Input addonBefore="대표자 이름" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={6}>
                                                <Form.Item name="businessRegistrationNumber">
                                                    <Input addonBefore="사업자 등록번호" />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        {/* 주소 정보 */}
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

                                        {/* 사업 정보 */}
                                        <Row gutter={16}>
                                            <Col span={12}>
                                                <Form.Item name={['businessInfo', 'businessType']}>
                                                    <Input addonBefore="사업 종류" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item name={['businessInfo', 'businessItem']}>
                                                    <Input addonBefore="사업 항목" />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        {/* 연락처 정보 */}
                                        <Row gutter={16}>
                                            <Col span={12}>
                                                <Form.Item name={['contactInfo', 'phoneNumber']}>
                                                    <Input addonBefore="전화번호" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item name={['contactInfo', 'faxNumber']}>
                                                    <Input addonBefore="팩스번호" />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        {/* 금융 정보 */}
                                        <Row gutter={16}>
                                            <Col span={12}>
                                                <Form.Item name={['financialInfo', 'collateralAmount']}>
                                                    <Input addonBefore="담보 금액" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item name={['financialInfo', 'creditLimit']}>
                                                    <Input addonBefore="신용 한도" />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        {/* 담당자 정보 */}
                                        <Row gutter={16}>
                                            <Col span={12}>
                                                <Form.Item name={['managerInfo', 'clientManagerPhoneNumber']}>
                                                    <Input addonBefore="담당자 전화번호" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item name={['managerInfo', 'clientManagerEmail']}>
                                                    <Input addonBefore="담당자 이메일" />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        {/* 은행 정보 */}
                                        <Row gutter={16}>
                                            <Col span={12}>
                                                <Form.Item name={['bankAccount', 'bank', 'name']}>
                                                    <Input addonBefore="은행명" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item name={['bankAccount', 'accountNumber']}>
                                                    <Input addonBefore="계좌번호" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item name={['bankAccount', 'accountHolder']}>
                                                    <Input addonBefore="예금주" />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        {/* 직원 정보 */}
                                        <Row gutter={16}>
                                            <Col span={6}>
                                                <Form.Item name={['employee', 'employeeNumber']}>
                                                    <Input addonBefore="사원 번호" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={6}>
                                                <Form.Item name={['employee', 'firstName']}>
                                                    <Input addonBefore="이름" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={6}>
                                                <Form.Item name={['employee', 'lastName']}>
                                                    <Input addonBefore="성" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={6}>
                                                <Form.Item name={['employee', 'phoneNumber']}>
                                                    <Input addonBefore="직원 전화번호" />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        {/* 거래 정보 */}
                                        <Row gutter={16}>
                                            <Col span={6}>
                                                <Form.Item name="transactionStartDate">
                                                    <Input addonBefore="거래 시작일" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={6}>
                                                <Form.Item name="transactionEndDate">
                                                    <Input addonBefore="거래 종료일" />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        {/* 비고 및 활성화 여부 */}
                                        <Row gutter={16}>
                                            <Col span={12}>
                                                <Form.Item name="remarks">
                                                    <Input addonBefore="비고" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item name="isActive" valuePropName="checked">
                                                    <Checkbox>활성 여부</Checkbox>
                                                </Form.Item>
                                            </Col>
                                        </Row>

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