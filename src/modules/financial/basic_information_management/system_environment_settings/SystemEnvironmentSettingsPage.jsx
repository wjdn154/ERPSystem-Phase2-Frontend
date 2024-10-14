import React, {useMemo, useState} from 'react';
import {Box, Grid, Grow, Paper} from '@mui/material';
import WelcomeSection from '../../../../components/WelcomeSection.jsx';
import { tabItems } from './SystemEnvironmentSettingsUitl.jsx';
import {Typography} from '@mui/material';
import {Button, Checkbox, Col, DatePicker, Divider, Form, Input, Modal, Row, Select, Space, Spin, Table} from 'antd';
import TemporarySection from "../../../../components/TemporarySection.jsx";
import dayjs from "dayjs";
import {useNotificationContext} from "../../../../config/NotificationContext.jsx";

const SystemEnvironmentSettingsPage = ({initialData}) => {
    const notify = useNotificationContext();
    const [form] = Form.useForm();
    const [activeTabKey, setActiveTabKey] = useState('1');
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [searchData, setSearchData] = useState(initialData);
    const [settingParam, setSettingParam] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [currentField, setCurrentField] = useState('');
    const [modalData, setModalData] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [displayValues, setDisplayValues] = useState({});

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
                                환경등록 페이지는 <span>시스템의 기본 설정과 환경을 관리</span>하는 기능을 제공함.<br/>
                                회사 정보, 회계 기간, 세금 설정 등을 관리할 수 있으며, 이러한 설정은 시스템 전반에 걸쳐 재무 처리를 정확하고 일관되게 유지하는 데 도움을 줌.<br/>
                                <span>환경 설정</span>을 통해 시스템의 효율성과 정확성을 높일 수 있음.<br/>
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
                    <Grid item xs={12} md={5} sx={{ minWidth: '500px !important', maxWidth: '700px !important' }}>
                        <Grow in={true} timeout={200}>
                            <Paper elevation={3} sx={{ height: '100%' }}>
                                <Typography variant="h6" sx={{ padding: '20px' }} >거래처 등록 및 수정</Typography>
                                <Grid sx={{ padding: '0px 20px 0px 20px' }}>
                                    <Form
                                        initialValues={fetchClientData}
                                        form={form}
                                        onFinish={(values) => { handleFormSubmit(values, 'update') }}
                                    >
                                        <Divider orientation={'left'} orientationMargin="0" style={{ marginTop: '0px', fontWeight:600 }}>기초 정보</Divider>
                                        <Row gutter={16}>
                                            <Col span={6}>
                                                <Form.Item name="representativeName" rules={[{ required: true, message: '대표자 이름을 입력하세요.' }]}>
                                                    <Input addonBefore="대표자 이름" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={6}>
                                                <Form.Item name="businessRegistrationNumber" rules={[{ required: true, message: '사업자 등록번호를 입력하세요.' }]}>
                                                    <Input addonBefore="사업자 등록번호" maxLength={12} onChange={(e) => form.setFieldValue('businessRegistrationNumber', formatBusinessRegistrationNumber(e.target.value))} />
                                                </Form.Item>
                                            </Col>
                                            <Col span={6}>
                                                <Form.Item name="idNumber" rules={[{ required: true, message: '주민등록번호를 입력하세요.' }]}>
                                                    <Input addonBefore="주민등록번호" maxLength={14} onChange={(e) => form.setFieldValue('idNumber', formatIdNumber(e.target.value))} />
                                                </Form.Item>
                                            </Col>
                                            <Col span={6}>
                                                <Form.Item name="printClientName" rules={[{ required: true, message: '거래처 인쇄명을 입력하세요.' }]}>
                                                    <Input addonBefore="거래처 인쇄명" />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={16}>
                                            <Col span={6}>
                                                <Form.Item name={['address', 'postalCode']} rules={[{ required: true, message: '우편번호를 입력하세요.' }]}>
                                                    <Input addonBefore="우편번호" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item name={['address', 'roadAddress']} rules={[{ required: true, message: '도로명 주소를 입력하세요.' }]}>
                                                    <Input addonBefore="도로명 주소" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={6}>
                                                <Form.Item name={['address', 'detailedAddress']} rules={[{ required: true, message: '상세 주소를 입력하세요.' }]}>
                                                    <Input addonBefore="상세 주소" />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={16}>
                                            <Col span={12}>
                                                <Form.Item name={['contactInfo', 'phoneNumber']} rules={[{ required: true, message: '전화번호를 입력하세요.' }]}>
                                                    <Input addonBefore="전화번호" onChange={(e) => form.setFieldValue(['contactInfo', 'phoneNumber'], formatPhoneNumber(e.target.value))} />
                                                </Form.Item>
                                            </Col>
                                            <Col span={12}>
                                                <Form.Item name={['contactInfo', 'faxNumber']} rules={[{ required: true, message: '팩스번호를 입력하세요.' }]}>
                                                    <Input addonBefore="팩스번호" onChange={(e) => form.setFieldValue(['contactInfo', 'faxNumber'], formatPhoneNumber(e.target.value))} />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        {/* 사업 정보 */}
                                        <Divider orientation={'left'} orientationMargin="0" style={{ marginTop: '0px', fontWeight:600 }}>사업 정보</Divider>
                                        <Row gutter={16}>
                                            <Col span={6}>
                                                <Form.Item name={['businessInfo', 'businessType']} rules={[{ required: true, message: '업태를 입력하세요.' }]}>
                                                    <Input addonBefore="업태" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={6}>
                                                <Form.Item name={['businessInfo', 'businessItem']} rules={[{ required: true, message: '종목을 입력하세요.' }]}>
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
                                                        onFocus={(e) => e.target.blur()}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={5}>
                                                <Form.Item name={['bankAccount', 'accountNumber']} rules={[{ required: true, message: '계좌번호를 입력하세요.' }]}>
                                                    <Input addonBefore="계좌번호" placeholder="123-4567-890123" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={5}>
                                                <Form.Item name={['bankAccount', 'accountHolder']} rules={[{ required: true, message: '예금주를 입력하세요.' }]}>
                                                    <Input addonBefore="예금주" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={5}>
                                                <Form.Item name={['financialInfo', 'collateralAmount']} rules={[{ required: true, message: '담보 금액을 입력하세요.' }]}>
                                                    <Input addonBefore="담보 금액" onChange={(e) => form.setFieldValue(['financialInfo', 'collateralAmount'], formatNumberWithComma(e.target.value))} />
                                                </Form.Item>
                                            </Col>
                                            <Col span={5}>
                                                <Form.Item name={['financialInfo', 'creditLimit']} rules={[{ required: true, message: '신용 한도를 입력하세요.' }]}>
                                                    <Input addonBefore="신용 한도" onChange={(e) => form.setFieldValue(['financialInfo', 'creditLimit'], formatNumberWithComma(e.target.value))} />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Divider orientation={'left'} orientationMargin="0" style={{ marginTop: '0px', fontWeight:600 }}>담당자 정보</Divider>
                                        <Row gutter={16}>
                                            <Col span={8}>
                                                <Form.Item name={['managerInfo', 'clientManagerPhoneNumber']} rules={[{ required: true, message: '거래처 담당자 전화번호를 입력하세요.' }]}>
                                                    <Input addonBefore="거래처 담당자 전화번호" onChange={(e) => form.setFieldValue(['managerInfo', 'clientManagerPhoneNumber'], formatPhoneNumber(e.target.value))} />
                                                </Form.Item>
                                            </Col>
                                            <Col span={8}>
                                                <Form.Item name={['managerInfo', 'clientManagerEmail']} rules={[{ required: true, message: '거래처 담당자 이메일을 입력하세요.' }]}>
                                                    <Input type="email" addonBefore="거래처 담당자 이메일" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={8}>
                                                <Form.Item>
                                                    <Input
                                                        addonBefore="자사 담당자 정보"
                                                        onClick={() => handleInputClick('employee')}
                                                        value={displayValues.employee}
                                                        onFocus={(e) => e.target.blur()}
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
                                                <Form.Item style={{ marginBottom: 0 }} rules={[{ required: true, message: '거래 시작일을 입력하세요.' }]}>
                                                    <DatePicker
                                                        disabledDate={(current) => current && current.year() !== 2024}
                                                        value={clientParam.transactionStartDate && dayjs(clientParam.transactionStartDate).isValid() ? dayjs(clientParam.transactionStartDate) : null}
                                                        onChange={(date) => {
                                                            if (date) {
                                                                handleStartDateChange();
                                                            } else {
                                                                handleStartDateChange(null);
                                                            }
                                                        }}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col>
                                                <Typography>거래종료일</Typography>
                                            </Col>
                                            <Col span={4}>
                                                <Form.Item style={{ marginBottom: 0 }} rules={[{ required: true, message: '거래 종료일을 입력하세요.' }]}>
                                                    <DatePicker
                                                        disabledDate={(current) => current && current.year() !== 2024}
                                                        value={clientParam.transactionEndDate && dayjs(clientParam.transactionEndDate).isValid() ? dayjs(clientParam.transactionEndDate) : null}
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
                                                        onFocus={(e) => e.target.blur()}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={5}>
                                                <Form.Item>
                                                    <Input
                                                        addonBefore="카테고리"
                                                        onClick={() => handleInputClick('category')}
                                                        value={displayValues.category}
                                                        onFocus={(e) => e.target.blur()}
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
                                                        <Select
                                                            style={{ width: '60%' }}
                                                            value={clientParam.transactionType}
                                                            onChange={(value) => {
                                                                setClientParam((prevState) => ({
                                                                    ...prevState,
                                                                    transactionType: value, // 선택된 값을 transactionType에 반영
                                                                }));
                                                            }}
                                                        >
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
                                        <Divider />

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

export default SystemEnvironmentSettingsPage;