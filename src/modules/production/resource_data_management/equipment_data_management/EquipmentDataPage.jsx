import React, {useEffect, useMemo, useState} from "react";
import {Box, Grid, Grow, Paper, Typography} from "@mui/material";
import {equipmentDataHook} from './EquipmentDataHook.jsx';
import EquipmentDataListSection from "./EquipmentDataListSection.jsx";
import {equipmentDataListColumn} from "./EquipmentDataListColumn.jsx";
import EquipmentDataDetailSection from "./EquipmentDataDetailSection.jsx";
import {tabItems} from "./EquipmentDataUtil.jsx"
import WelcomeSection from "../../../../components/WelcomeSection.jsx";
import {
    Button,
    Checkbox,
    Col,
    DatePicker,
    Divider,
    Form,
    Input,
    Modal,
    notification,
    Row,
    Select,
    Space,
    Spin,
    Table
} from "antd";
import dayjs from "dayjs";
import {useNotificationContext} from "../../../../config/NotificationContext.jsx";
import {PRODUCTION_API, LOGISTICS_API} from "../../../../config/apiConstants.jsx"
import apiClient from "../../../../config/apiClient.jsx";

const EquipmentDataPage = ({initialData}) => {

    const notify = useNotificationContext(); // 알림 컨텍스트 사용
    const [form] = Form.useForm(); // 폼 인스턴스 생성
    const [equipmentForm] = Form.useForm(); // 폼 인스턴스 생성
    const [fetchEquipmentData, setFetchEquipmentData] = useState(false); // 설비 조회한 정보 상태
    const [equipmentParam, setEquipmentParam] = useState(false); // 수정 할 설비 정보 상태
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태
    const [equipmentField, setEquipmentField] = useState(''); // 모달 분기 할 필드 상태
    const [modalData, setModalData] = useState(null); // 모달 데이터 상태
    const [isModalVisible, setIsModalVisible] = useState(false); // 모달 활성화 여부 상태
    const [displayValues, setDisplayValues] = useState({});
    const [activeTabKey, setActiveTabKey] = useState('1');

    const {
        data,
        showDetail,
        handleSelectedRow,
        handleRowSelection,
        equipmentDataDetail = {},
        setEquipmentDataDetail,
        handleInputChange,
        handleDelete,
        handleUpdate,
        showModal,
        handleInsertOk,
        handleUpdateCancel,
        insertEquipmentModal,
        handleUpdateOk,
        isInsertModalVisible,
        isUpdateModalVisible,
        handleInsertCancel,
        handleOpenInsertModal,
        handleCostInput,


    } = equipmentDataHook(initialData);

// 등록 탭으로 이동할 때 materialDataDetail 초기화
    const handleTabChangeWithReset = (key) => {
        setActiveTabKey(key);
        if (key === '2') {   // '2'는 등록 탭이라고 가정
            setEquipmentDataDetail({

            });  // 등록 탭으로 이동할 때 빈 값으로 초기화
        }
    };
    //모달창 열기 핸들러
    const handleInputClick = (fieldName) => {
        setEquipmentField(fieldName);
        setModalData(null);   //모달 열기 전에 데이터를 초괴화
        fetchModalData(fieldName);   //모달 데이터 가져오기 호출
        setIsModalVisible(true);  //모달창 열기
    };

    //모달창 닫기 햄들러
    const handleModalCancel = () => setIsModalVisible(false);

    //모달창 데이터 가져오기 함수
    const fetchModalData = async (fieldName) => {
        setIsLoading(true);
        let apiPath;
        if(fieldName === 'workcenter') apiPath = PRODUCTION_API.WORKER_LIST_API;
        //if(fieldName === 'factory') apiPath = LOGISTICS_API.FACTORY_LIST_API;
        try{
            const response = await apiClient.post(apiPath);
            setModalData(response.data);
        }catch (error){
            notify('error', '조회 오류', '데이터 조회 중 오류가 발생했습니다.', 'top');
        }finally {
            setIsLoading(false);
        }
    };

    //모달창 선택 핸들러
    const handleModalSelect = (record) => {

        switch (currentField) {
            case 'workcenter':
                setEquipmentParam((prevParams) => ({
                ...prevParams,
                equipmentDataDetail:{
                    workcenterCode: record.workcenterCode,
                    workcenterName: record.workcenterName,
                },
                }));
                setDisplayValues((prevValues) => ({
                    ...prevValues,
                    equipmentDataDetail: `[${record.workcenterCode}] ${record.workcenterName}`,
                }));
            break;
            case 'factory':
                setEquipmentParam((prevParams) => ({
                ...prevParams,
                equipmentDataDetail:{
                    factoryCode: record.factoryCode,
                    factoryName: record.factoryName,
                },
                }));
                setDisplayValues((prevValues) => ({
                    ...prevValues,
                    equipmentDataDetail: `[${record.factoryCode}] ${record.factoryName}`,
                }));
            break;
        }
        //모달창 닫기
        setIsModalVisible(false);
    };

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <WelcomeSection
                        title="설비 정보 관리"
                        description={(
                            <Typography>
                                설비 정보 관리 페이지는 <span>생산에 사용되는 각종 설비의 정보를 관리</span>하는 곳임. 이 페이지에서는 <span>설비 추가, 수정, 삭제</span>가 가능하며, 설비의 <span>모델명, 위치, 사용 가능 상태</span> 등을 관리할 수 있음. 또한, 설비별 <span>정비 일정</span>을 설정하여 설비의 효율성을 유지하고 <span>생산 공정의 안정성</span>을 높일 수 있음.
                            </Typography>
                        )}
                        tabItems={tabItems()}
                        activeTabKey={activeTabKey}
                        handleTabChange={handleTabChangeWithReset}
                    />
                </Grid>
            </Grid>
            {/* 설비정보 리스트 영역 */}
            {activeTabKey === '1' && (
                <Grid sx={{ padding: '0px 20px 0px 20px' }} container spacing={3}>
                    <Grid item xs={9} md={9}>
                        <Grow in={true} timeout={200}>
                            <div>
                                <EquipmentDataListSection
                                    columns={equipmentDataListColumn}
                                    data={data}
                                    equipmentDataDetail={equipmentDataDetail}
                                    setEquipmentDataDetail={setEquipmentDataDetail}
                                    handleRowSelection={handleRowSelection}
                                    handleSelectedRow={handleSelectedRow}
                                    insertEquipmentModal={insertEquipmentModal}
                                    handleInsertOk={handleInsertOk}
                                    handleInsertCancel={handleInsertCancel}
                                    isInsertModalVisible={isInsertModalVisible}
                                    handleInputChange={handleInputChange}
                                    handleOpenInsertModal={handleOpenInsertModal}

                                />
                            </div>
                        </Grow>
                    </Grid>
                 </Grid>
            )}
            <Grid sx={{ padding: '10px 20px 0px 20px' }} container spacing={3}>
                <Grid item xs={9} md={9}>
                    {equipmentDataDetail && (
                        <Grow in={showDetail} timeout={200} key={equipmentDataDetail.id}>
                            <div>
                                <EquipmentDataDetailSection
                                    data={data}
                                    equipmentDataDetail={equipmentDataDetail}
                                    handleInputChange={handleInputChange}
                                    setEquipmentDataDetail={setEquipmentDataDetail}
                                    handleDelete={handleDelete}
                                    isUpdateModalVisible={isUpdateModalVisible}
                                    showModal={showModal}
                                    handleUpdateOk={handleUpdateOk}
                                    handleUpdateCancel={handleUpdateCancel}
                                    handleCostInput={handleCostInput}
                                    handleUpdate={handleUpdate}
                                />
                            </div>
                        </Grow>
                    )}
                </Grid>
            </Grid>
            {activeTabKey === '2' && (
                <Grid sx={{ padding: '0px 20px 0px 20px' }} container spacing={3}>
                    <Grid item xs={12} md={8} sx={{ minWidth: '500px !important', maxWidth: '1500px !important' }}>
                        <Grow in={true} timeout={200}>
                            <Paper elevation={3} sx={{ height: '100%' }}>
                                <Typography variant="h6" sx={{ padding: '20px' }}>설비 상세 정보 등록</Typography>
                                <Grid sx={{ padding: '0px 20px 0px 20px' }}>
                                    <Form
                                        layout="vertical"
                                        onFinish={(values) => { handleFormSubmit(values, 'register') }}
                                        form={registrationForm}
                                    >
                                        {/* 기본 정보 */}
                                        <Divider orientation={'left'} orientationMargin="0" style={{ marginTop: '0px', fontWeight: 600 }}>설비 상세 정보 등록</Divider>
                                        <Row gutter={16}>
                                            <Col span={5}>
                                                <Form.Item>
                                                    <Input
                                                        addonBefore="설치된 작업장 코드"
                                                        onClick={() => handleInputClick('workcenterCode')}
                                                        value={displayValues.workcenterCode}
                                                        onFocus={(e) => e.target.blur()}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col span={5}>
                                                <Form.Item>
                                                    <Input
                                                        addonBefore="설치된 공장 코드"
                                                        onClick={() => handleInputClick('factoryCode')}
                                                        value={displayValues.factoryCode}
                                                        onFocus={(e) => e.target.blur()}
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Row gutter={16}>
                                            <Col span={12}>
                                                <Form.Item name={['contactInfo', 'faxNumber']} rules={[{ required: true, message: '설비 번호를 입력하세요.' }]}>
                                                    <Input addonBefore="설비 번호" onChange={(e) => registrationForm.setFieldValue(['contactInfo', 'faxNumber'], formatPhoneNumber(e.target.value))} />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Row gutter={16}>
                                            <Col span={6}>
                                                <Form.Item name={['businessInfo', 'businessType']} rules={[{ required: true, message: '설비 명을 입력하세요.' }]}>
                                                    <Input addonBefore="설비 명" />
                                                </Form.Item>
                                            </Col>
                                            <Col span={6}>
                                                <Form.Item name={['businessInfo', 'businessItem']} rules={[{ required: true, message: '모델명을 입력하세요.' }]}>
                                                    <Input addonBefore="모델 명" />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        <Row gutter={16}>
                                            <Col span={5}>
                                                <Form.Item name="equipmentType">
                                                    <Space.Compact>
                                                        <Input style={{ width: '40%', backgroundColor: '#FAFAFA', color: '#000', textAlign: 'center' }} defaultValue="거래유형" disabled />
                                                        <Select
                                                            style={{ width: '60%' }}
                                                            value={clientParam.equipmentType}
                                                            onChange={(value) => {
                                                                setClientParam((prevState) => ({
                                                                    ...prevState,
                                                                    equipmentType: value, // 선택된 값을 transactionType에 반영
                                                                }));
                                                            }}
                                                        >
                                                            <Option value="ASSEMBLY">조립 설비</Option>
                                                            <Option value="MACHINING">가공 설비</Option>
                                                            <Option value="INSPECTION">검사 설비</Option>
                                                            <Option value="PACKAGING">포장 설비</Option>
                                                        </Select>
                                                    </Space.Compact>
                                                </Form.Item>
                                            </Col>
                                            <Col span={5}>
                                                <Form.Item name={['financialInfo', 'creditLimit']} rules={[{ required: true, message: '제조사를 입력하세요.' }]}>
                                                    <Input addonBefore="제조사" onChange={(e) => registrationForm.setFieldValue(['financialInfo', 'creditLimit'], formatNumberWithComma(e.target.value))} />
                                                </Form.Item>
                                            </Col>
                                        </Row>

                                        {/* 담당자 정보 */}
                                        <Divider orientation={'left'} orientationMargin="0" style={{ marginTop: '0px', fontWeight:600 }}>담당자 정보</Divider>
                                        <Row gutter={16}>
                                            <Col>
                                                <Typography>구매 날짜</Typography>
                                            </Col>
                                            <Col>
                                                <Form.Item style={{ marginBottom: 0 }} rules={[{ required: true, message: '구매 날짜를 입력하세요.' }]}>
                                                    <DatePicker
                                                        value={dayjs(clientParam.purchaseDate)}
                                                        onChange={handleStartDateChange}
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col>
                                                <Typography>설치 날짜</Typography>
                                            </Col>
                                            <Col>
                                                <Form.Item style={{ marginBottom: 0 }} rules={[{ required: true, message: '설치 날짜를 입력하세요.' }]}>
                                                    <DatePicker
                                                        value={dayjs(clientParam.installDate)}
                                                        onChange={handleStartDateChange}
                                                    />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={16}>
                                            <Col span={5}>
                                                <Form.Item name="operationStatus">
                                                    <Space.Compact>
                                                        <Input style={{ width: '40%', backgroundColor: '#FAFAFA', color: '#000', textAlign: 'center' }} defaultValue="가동 상태" disabled />
                                                        <Select
                                                            style={{ width: '60%' }}
                                                            value={clientParam.operationStatus}
                                                            onChange={(value) => {
                                                                setClientParam((prevState) => ({
                                                                    ...prevState,
                                                                    operationStatus: value, // 선택된 값을 transactionType에 반영
                                                                }));
                                                            }}
                                                        >
                                                            <Option value="BEFORE_OPERATION">가동 전</Option>
                                                            <Option value="OPERATING">가동 중</Option>
                                                            <Option value="MAINTENANCE">유지보수 중</Option>
                                                            <Option value="FAILURE">고장</Option>
                                                            <Option value="REPAIRING">수리 중</Option>
                                                        </Select>
                                                    </Space.Compact>
                                                </Form.Item>
                                            </Col>
                                            <Col span={5}>
                                                <Form.Item name={['financialInfo', 'current']} rules={[{ required: true, message: '구매 비용을 입력하세요.' }]}>
                                                    <Input addonBefore="구매 비용" onChange={(e) => registrationForm.setFieldValue(['financialInfo', 'creditLimit'], formatNumberWithComma(e.target.value))} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row gutter={16}>
                                            <Col span={6}>
                                                <Form.Item name={['businessInfo', 'equipmentImg']} rules={[{ required: true, message: '설비 이미지를 입력하세요.' }]}>
                                                    <Input addonBefore="설비 이미지" />
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
                                                {currentField === 'workcenter' && (
                                                    <>
                                                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: '20px' }}>
                                                            작업장 코드 선택
                                                        </Typography>
                                                        {modalData && (
                                                            <Table
                                                                columns={[
                                                                    { title: '코드', dataIndex: 'workcenterCode', key: 'workcenterCode', align: 'center' },
                                                                    { title: '작업장 명', dataIndex: 'workcenterName', key: 'workcenterName', align: 'center' },
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
                                                {currentField === 'factory' && (
                                                    <>
                                                        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: '20px' }}>
                                                            공장 코드 선택
                                                        </Typography>
                                                        {modalData && (
                                                            <Table
                                                                columns={[
                                                                    { title: '코드', dataIndex: 'factoryCode', key: 'factoryCode', align: 'center' },
                                                                    { title: '공장 명', dataIndex: 'factoryName', key: 'factoryName', align: 'center' },
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

        </Box>
    );
};




export default EquipmentDataPage;