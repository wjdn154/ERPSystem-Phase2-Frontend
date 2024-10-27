import React, { useEffect, useState } from 'react';
import { Box, Grid, Grow, Paper, Typography } from '@mui/material';
import WelcomeSection from '../../../../components/WelcomeSection.jsx';
import { tabItems } from './AssignmentManagementUtil.jsx';
import {Space, Tag, Form, Table, Button, Col, Input, Row, Checkbox, Modal, Spin, Select, notification, Upload} from 'antd';
import apiClient from '../../../../config/apiClient.jsx';
import {EMPLOYEE_API, FINANCIAL_API} from '../../../../config/apiConstants.jsx';
import { Divider } from 'antd';
import { useNotificationContext } from "../../../../config/NotificationContext.jsx";
import {DownSquareOutlined, SearchOutlined} from "@ant-design/icons";

const { Option } = Select;
const { confirm } = Modal;

const AssignmentManagementPage = ({ initialData }) => {
    const notify = useNotificationContext(); // 알림 컨텍스트 사용
    const [form] = Form.useForm(); // 폼 인스턴스 생성
    const [registrationForm] = Form.useForm(); // 폼 인스턴스 생성
    const [transferList, setTransferList] = useState(initialData);
    const [activeTabKey, setActiveTabKey] = useState('1'); // 활성 탭 키 상태
    const [selectedRowKeys, setSelectedRowKeys] = useState([]); // 선택된 행 키 상태
    const [editTransfer, setEditTransfer] = useState(false);
    const [fetchTransferData, setFetchTransferData] = useState(false);
    const [transferParam, setTransferParam] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태
    const [currentField, setCurrentField] = useState(''); // 모달 분기할 필드 상태
    const [modalData, setModalData] = useState(null); // 모달 데이터 상태
    const [isModalVisible, setIsModalVisible] = useState(false); // 모달 활성화 여부
    const [displayValues, setDisplayValues] = useState({});
    const [initialModalData, setInitialModalData] = useState(null);
    const [transfer, setTransfer] = useState([]); // 부서 데이터 상태


    const fetchTransfer = async () => {
        try{
            const response = await apiClient.post(EMPLOYEE_API.TRANSFER_DATA_API);
            setTransfer(response.data);
        } catch(error){
            notification.error({
                message: '직책 목록 조회 실패',
                description: '직책 목록을 불러오는 중 오류가 발생했습니다.',
            });
        }
    };

    useEffect(()=>{
        fetchTransfer();
    }, []);

    useEffect(() => {
        if (!fetchTransferData) return;
        console.log('Fetched Transfer Data:', fetchTransferData);

        form.setFieldsValue({
            ...fetchTransferData,
            employeeName: `${fetchTransferData.lastName}${fetchTransferData.firstName}`
        });
        setTransferParam(fetchTransferData);

        setDisplayValues();
    }, [fetchTransferData, form]);

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
        if(fieldName === 'transfer') apiPath = EMPLOYEE_API.TRANSFER_DATA_API;

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
    // const handleModalSelect = (record) => {
    //     switch (currentField) {
    //         case 'department':
    //             setEmployeeParam((prevParams) => ({
    //                 ...prevParams,
    //                 department: {
    //                     id: record.id,
    //                     departmentCode: record.departmentCode,
    //                     departmentName: record.departmentName,
    //                 },
    //             }));
    //             setDisplayValues((prevValues) => ({
    //                 ...prevValues,
    //                 department: `[${record.departmentCode}] ${record.departmentName}`,
    //             }));
    //             break;
    //         case 'position':
    //             setEmployeeParam((prevParams) => ({
    //                 ...prevParams,
    //                 position: {
    //                     id: record.id,
    //                     positionCode: record.positionCode || '',
    //                     positionName: record.positionName || '',
    //                 },
    //             }));
    //             setDisplayValues((prevValues) => ({
    //                 ...prevValues,
    //                 position:`[${record.positionCode}] ${record.positionName}`,
    //             }));
    //             break;
    //         case 'jobTitle':
    //             setEmployeeParam((prevParams)=>({
    //                 ...prevParams,
    //                 jobTitle: {
    //                     id: record.id,
    //                     titleCode: record.titleCode || '',
    //                     titleName: record.titleName || '',
    //                 },
    //             }));
    //             setDisplayValues((prevValues)=> ({
    //                 ...prevValues,
    //                 jobTitle: `[${record.titleCode}] ${record.titleName}`,
    //             }));
    //             break;
    //         case 'bank':
    //             setEmployeeParam((prevParams) => ({
    //                 ...prevParams,
    //                 bankAccountDTO: { // 금융 정보 객체
    //                     bankId: record.id,
    //                     name: prevParams.bankAccountDTO?.name || '',
    //                     code: prevParams.bankAccountDTO?.code || '',
    //                     accountNumber: prevParams.bankAccountDTO?.accountNumber || '',
    //                 },
    //             }));
    //             setDisplayValues((prevValues) => ({
    //                 ...prevValues,
    //                 bank: `[${record.code.toString().padStart(5, '0')}] ${record.name}`,
    //             }));
    //             break;
    //     }
    //     // 모달창 닫기
    //     setIsModalVisible(false);
    // };

    // 탭 변경 핸들러
    const handleTabChange = (key) => {
        setEditTransfer(false);
        setFetchTransferData(null);
        setTransferParam({});
        setDisplayValues({});
        form.resetFields();
        registrationForm.resetFields(); // 2탭 폼 초기화
        registrationForm.setFieldValue(true);
        setActiveTabKey(key);
    };

    return (
        <Box sx={{ margin: '20px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <WelcomeSection
                        title="발령 관리"
                        description={(
                            <Typography>
                                발령 관리 페이지는 <span>사원의 부서 이동이나 직책 변경과 같은 발령 사항을 관리</span>하는 기능을 제공함. 이 페이지에서는 <span>발령 내역을 기록하고 이력을 관리</span>할 수 있으며, 사원의 <span>현재 직책 및 근무 위치</span>를 쉽게 파악할 수 있음. 이를 통해 <span>조직 내 인사 이동 사항을 효율적으로 관리</span>하고 기록할 수 있음.
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
                            <div>
                                <TemporarySection />
                            </div>
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

export default AssignmentManagementPage;