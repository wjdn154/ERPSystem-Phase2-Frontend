import React, { useEffect, useState } from 'react';
import {Button, Checkbox, Input, notification, Space, Tag} from 'antd';
import {Box, Grid, Grow, Paper, Typography} from '@mui/material';
import WelcomeSection from '../../Common/components/WelcomeSection.jsx';
import { Table } from 'antd';
import { tabItems } from '../utils/UserPermission/UserPermissonUtil.jsx';
import {EMPLOYEE_API, USERS_API} from "../../../config/apiConstants.jsx";
import axios from "axios";
import {SearchOutlined} from "@ant-design/icons";
import {setAuth} from "../../Common/utils/redux/authSlice.jsx";
import {useDispatch, useSelector} from "react-redux";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";

const UserPermissionPage = ({ initialData }) => {
    console.log(initialData);

    const isAdmin = useSelector(state => state.auth.isAdmin);
    const isAdminPermission = useSelector(state => state.auth.permission);
    const dispatch = useDispatch();
    const [activeTabKey, setActiveTabKey] = useState('1');
    const [selectedUser, setSelectedUser] = useState(null);
    const [employee, setEmployee] = useState({});
    const [adminEmployee, setAdminEmployee] = useState({});
    const [permissions, setPermissions] = useState({});

    // 필터링 함수: NO_ACCESS가 아닌 값만 반환
    const filteredPermissions = Object.entries(initialData)
        .filter(([key, value]) => key !== 'id' && value !== 'NO_ACCESS' && value !== null)
        .map(([key, value]) => ({
            key,
            label: key,
            value,
        }));

    const personalPermissionColumns = [
        {
            title: '권한명',
            dataIndex: 'label',
            key: 'label',
            align: 'center',
        },
        {
            title: '상태',
            dataIndex: 'value',
            key: 'value',
            align: 'center',
        },
    ];


    const handleUserClick = (user) => {
        setSelectedUser(user);
        fetchUserPermissions(user.email);
    };

    const fetchAdminEmployee = async () => {
        try {
            const response = await axios.post(EMPLOYEE_API.EMPLOYEE_ADMIN_PERMISSION_API(jwtDecode(Cookies.get('jwt')).companyId));
            const data = response.data;
            setAdminEmployee(data);
            console.log(data);
        } catch (error) {
            console.error('관리자 직원 정보를 가져오지 못했습니다. :', error);
        }
    };

    const fetchEmployee = async () => {
        try {
            const response = await axios.post(EMPLOYEE_API.EMPLOYEE_DATA_API);
            const data = response.data;
            setEmployee(data);
        } catch (error) {
            console.error('직원 목록을 가져오지 못했습니다. :', error);
        }
    };

    const fetchUserPermissions = async (username) => {
        try {
            const response = await axios.post(USERS_API.USERS_PERMISSION_API(username));
            const data = response.data;
            setPermissions(data);
        } catch (error) {
            console.error('사용자 권한을 가져오지 못했습니다. :', error);
        }
    };

    const updateUserPermissions = async () => {
        try {
            const requestBody = {
                username: selectedUser.email,
                permissionDTO : permissions,
            };

            const response = await axios.post(USERS_API.UPDATE_USERS_PERMISSION_API, requestBody);
            const permission = response.data;
            const token = Cookies.get('jwt');

            dispatch(setAuth({ token, permission }));

            notification.success({
                message: '성공',
                description: '권한이 성공적으로 저장되었습니다.',
                placement: 'bottomLeft',
            });

        } catch (error) {
            notification.error({
                message: '실패',
                description: error.response ? error.response.data : error.message,
                placement: 'bottomLeft',
            });
        }
    };

    const handleRowSelection = {
        type: 'radio',
        selectedRowKeys: selectedUser ? [selectedUser.id] : [],
    };

    const handlePermissionChange = (permissionKey, value) => {
        setPermissions((prevPermissions) => ({
            ...prevPermissions,
            [permissionKey]: value,
        }));
    };

    // 탭 변경 함수
    const handleTabChange = (key) => {
        // 2번 탭으로 이동하려 할 때 관리자 권한을 체크
        if (key === '2') {
            if (!isAdmin && isAdminPermission.adminPermission !== "ADMIN") {
                notification.error({
                    message: '권한 오류',
                    description: '해당 페이지에 접근할 권한이 없습니다.',
                    placement: 'top',
                });
                return; // 권한이 없으면 탭 변경을 막음
            }
            fetchAdminEmployee();
            fetchEmployee();
        }
        // 권한이 있으면 탭을 변경
        setActiveTabKey(key);
    };

    const permissionData = [
        { key: 'adminPermission', label: '관리자 권한', value: permissions.adminPermission },
        { key: 'clientRegistrationPermission', label: '거래처 등록 권한', value: permissions.clientRegistrationPermission },
        { key: 'accountSubjectPermission', label: '계정과목 및 적요 등록 권한', value: permissions.accountSubjectPermission },
        { key: 'generalVoucherPermission', label: '일반전표 입력 권한', value: permissions.generalVoucherPermission },
        { key: 'taxInvoicePermission', label: '세금계산서(계산서) 현황 권한', value: permissions.taxInvoicePermission },
        { key: 'environmentPermission', label: '환경 등록 권한', value: permissions.environmentPermission },
        { key: 'companyCarPermission', label: '업무용 승용차 등록 권한', value: permissions.companyCarPermission },
        { key: 'salesPurchaseVoucherPermission', label: '매입매출 전표 입력 권한', value: permissions.salesPurchaseVoucherPermission },
        { key: 'electronicTaxPermission', label: '전자세금계산서 발행 권한', value: permissions.electronicTaxPermission },
        { key: 'clientLedgerPermission', label: '거래처 원장 권한', value: permissions.clientLedgerPermission },
        { key: 'clientAccountLedgerPermission', label: '거래처별 계정과목별 원장 권한', value: permissions.clientAccountLedgerPermission },
        { key: 'accountLedgerPermission', label: '계정별 원장 권한', value: permissions.accountLedgerPermission },
        { key: 'cashBookPermission', label: '현금 출납장 권한', value: permissions.cashBookPermission },
        { key: 'dailyMonthlyPermission', label: '일계표/월계표 권한', value: permissions.dailyMonthlyPermission },
        { key: 'journalPermission', label: '분개장 권한', value: permissions.journalPermission },
        { key: 'generalLedgerPermission', label: '총계정원장 권한', value: permissions.generalLedgerPermission },
        { key: 'salesPurchaseLedgerPermission', label: '매입매출장 권한', value: permissions.salesPurchaseLedgerPermission },
        { key: 'voucherPrintPermission', label: '전표 출력 권한', value: permissions.voucherPrintPermission },
        { key: 'closingDataPermission', label: '결산자료 입력 권한', value: permissions.closingDataPermission },
        { key: 'trialBalancePermission', label: '합계잔액시산표 권한', value: permissions.trialBalancePermission },
        { key: 'financialPositionPermission', label: '재무상태표 권한', value: permissions.financialPositionPermission },
        { key: 'incomeStatementPermission', label: '손익계산서 권한', value: permissions.incomeStatementPermission },
        { key: 'costStatementPermission', label: '제조원가명세서 권한', value: permissions.costStatementPermission },
        { key: 'profitDistributionPermission', label: '이익잉여금처분계산서 권한', value: permissions.profitDistributionPermission },
        { key: 'cashFlowPermission', label: '현금흐름표 권한', value: permissions.cashFlowPermission },
        { key: 'equityChangesPermission', label: '자본변동표 권한', value: permissions.equityChangesPermission },
        { key: 'closingAnnexPermission', label: '결산부속명세서 권한', value: permissions.closingAnnexPermission },
        { key: 'previousFinancialPositionPermission', label: '전기분 재무상태표 권한', value: permissions.previousFinancialPositionPermission },
        { key: 'previousIncomeStatementPermission', label: '전기분 손익계산서 권한', value: permissions.previousIncomeStatementPermission },
        { key: 'previousCostStatementPermission', label: '전기분 원가명세서 권한', value: permissions.previousCostStatementPermission },
        { key: 'previousProfitDistributionPermission', label: '전기분 이익잉여금처분계산서 권한', value: permissions.previousProfitDistributionPermission },
        { key: 'clientInitialPermission', label: '거래처별 초기이월 권한', value: permissions.clientInitialPermission },
        { key: 'closingCarryoverPermission', label: '마감후 이월 권한', value: permissions.closingCarryoverPermission },
        { key: 'fixedAssetRegisterPermission', label: '고정자산 등록 권한', value: permissions.fixedAssetRegisterPermission },
        { key: 'undepreciatedPermission', label: '미상각분 감가상각비 권한', value: permissions.undepreciatedPermission },
        { key: 'transferredDepreciationPermission', label: '양도자산 감가상각비 권한', value: permissions.transferredDepreciationPermission },
        { key: 'registerBookPermission', label: '고정자산관리대장 권한', value: permissions.registerBookPermission },
        { key: 'billsReceivablePermission', label: '받을어음 현황 권한', value: permissions.billsReceivablePermission },
        { key: 'billsPayablePermission', label: '지급어음 현황 권한', value: permissions.billsPayablePermission },
        { key: 'dailyFinancePermission', label: '일일자금명세 권한', value: permissions.dailyFinancePermission },
        { key: 'depositsStatusPermission', label: '예적금현황 권한', value: permissions.depositsStatusPermission },
        { key: 'employeeManagementPermission', label: '사원 관리 권한', value: permissions.employeeManagementPermission },
        { key: 'userManagementPermission', label: '사용자 관리 권한', value: permissions.userManagementPermission },
        { key: 'departmentManagementPermission', label: '부서 관리 권한', value: permissions.departmentManagementPermission },
        { key: 'assignmentManagementPermission', label: '발령 관리 권한', value: permissions.assignmentManagementPermission },
        { key: 'performanceEvaluationPermission', label: '성과 평가 관리 권한', value: permissions.performanceEvaluationPermission },
        { key: 'retirementManagementPermission', label: '퇴사자 관리 권한', value: permissions.retirementManagementPermission },
        { key: 'timeManagementPermission', label: '근태 관리 권한', value: permissions.timeManagementPermission },
        { key: 'leaveManagementPermission', label: '휴가 관리 권한', value: permissions.leaveManagementPermission },
        { key: 'overtimeManagementPermission', label: '초과근무 관리 권한', value: permissions.overtimeManagementPermission },
        { key: 'jobPostingsPermission', label: '채용 공고 관리 권한', value: permissions.jobPostingsPermission },
        { key: 'applicantManagementPermission', label: '지원자 관리 권한', value: permissions.applicantManagementPermission },
        { key: 'applicationManagementPermission', label: '지원서 관리 권한', value: permissions.applicationManagementPermission },
        { key: 'interviewManagementPermission', label: '인터뷰 관리 권한', value: permissions.interviewManagementPermission },
        { key: 'jobOffersPermission', label: '채용 제안 관리 권한', value: permissions.jobOffersPermission },
        { key: 'itemManagementPermission', label: '품목 관리 권한', value: permissions.itemManagementPermission },
        { key: 'itemGroupManagementPermission', label: '품목 그룹 관리 권한', value: permissions.itemGroupManagementPermission },
        { key: 'warehouseRegistrationPermission', label: '창고 등록 권한', value: permissions.warehouseRegistrationPermission },
        { key: 'quotationPermission', label: '견적서 권한', value: permissions.quotationPermission },
        { key: 'orderPermission', label: '주문서 권한', value: permissions.orderPermission },
        { key: 'salePermission', label: '판매 권한', value: permissions.salePermission },
        { key: 'shippingOrderPermission', label: '출하지시서 권한', value: permissions.shippingOrderPermission },
        { key: 'shipmentPermission', label: '출하 권한', value: permissions.shipmentPermission },
        { key: 'purchaseRequestPermission', label: '발주 요청 권한', value: permissions.purchaseRequestPermission },
        { key: 'purchasePlanPermission', label: '발주 계획 권한', value: permissions.purchasePlanPermission },
        { key: 'priceRequestPermission', label: '단가 요청 권한', value: permissions.priceRequestPermission },
        { key: 'purchaseOrderPermission', label: '발주서 권한', value: permissions.purchaseOrderPermission },
        { key: 'purchasePermission', label: '구매 권한', value: permissions.purchasePermission },
        { key: 'inboundOrderPermission', label: '입고지시서 권한', value: permissions.inboundOrderPermission },
        { key: 'returnsReceptionPermission', label: '반품 접수 권한', value: permissions.returnsReceptionPermission },
        { key: 'returnsStatusPermission', label: '반품 현황 권한', value: permissions.returnsStatusPermission },
        { key: 'shippingOrderViewPermission', label: '출하지시서 조회 권한', value: permissions.shippingOrderViewPermission },
        { key: 'shippingOrderInputPermission', label: '출하지시서 입력 권한', value: permissions.shippingOrderInputPermission },
        { key: 'shipmentViewPermission', label: '출하 조회 권한', value: permissions.shipmentViewPermission },
        { key: 'shipmentInputPermission', label: '출하 입력 권한', value: permissions.shipmentInputPermission },
        { key: 'shipmentStatusPermission', label: '출하 현황 권한', value: permissions.shipmentStatusPermission },
        { key: 'inboundExpectedPermission', label: '입고예정 권한', value: permissions.inboundExpectedPermission },
        { key: 'inboundProcessingPermission', label: '입고처리 권한', value: permissions.inboundProcessingPermission },
        { key: 'outboundExpectedPermission', label: '출고예정 권한', value: permissions.outboundExpectedPermission },
        { key: 'outboundExpectedStatusPermission', label: '출고예정현황 권한', value: permissions.outboundExpectedStatusPermission },
        { key: 'outboundProcessingPermission', label: '출고처리 권한', value: permissions.outboundProcessingPermission },
        { key: 'inventoryAdjustmentStepsPermission', label: '재고조정진행단계 권한', value: permissions.inventoryAdjustmentStepsPermission },
        { key: 'inventoryInspectionViewPermission', label: '재고실사조회 권한', value: permissions.inventoryInspectionViewPermission },
        { key: 'inventoryInspectionStatusPermission', label: '재고실사현황 권한', value: permissions.inventoryInspectionStatusPermission },
        { key: 'inventoryAdjustmentStatusPermission', label: '재고조정현황 권한', value: permissions.inventoryAdjustmentStatusPermission },
        { key: 'workcenterManagementPermission', label: '작업장 관리 권한', value: permissions.workcenterManagementPermission },
        { key: 'processDetailsPermission', label: '공정 세부정보 관리 권한', value: permissions.processDetailsPermission },
        { key: 'routingManagementPermission', label: 'Routing 관리 권한', value: permissions.routingManagementPermission },
        { key: 'bomManagementPermission', label: 'BOM 관리 권한', value: permissions.bomManagementPermission },
        { key: 'workerManagementPermission', label: '작업자 관리 권한', value: permissions.workerManagementPermission },
        { key: 'materialManagementPermission', label: '자재 정보 관리 권한', value: permissions.materialManagementPermission },
        { key: 'equipmentManagementPermission', label: '설비 정보 관리 권한', value: permissions.equipmentManagementPermission },
        { key: 'maintenanceHistoryPermission', label: '유지보수 이력 관리 권한', value: permissions.maintenanceHistoryPermission },
        { key: 'wasteManagementPermission', label: '폐기물 관리 권한', value: permissions.wasteManagementPermission },
    ];


    const userColumns = [
        {
            title: '사원번호',
            dataIndex: 'employeeNumber',
            align: 'center',
            render: (text, record) => <span style={{ fontSize: '0.7rem' }}>{record.employeeNumber}</span>,
        },
        {
            title: '이름',
            dataIndex: 'firstName',
            align: 'center',
            render: (text, record) => <span style={{ fontSize: '0.7rem' }}>{record.lastName}{record.firstName}</span>,
        },
        {
            title: '직위',
            dataIndex: 'positionName',
            align: 'center',
            render: (text, record) => <span style={{ fontSize: '0.7rem' }}>{record.positionName}</span>,
        },
        {
            title: '직책',
            dataIndex: 'jobTitleName',
            align: 'center',
            render: (text, record) => <span style={{ fontSize: '0.7rem' }}>{record.jobTitleName}</span>,
        },
        {
            title: '부서',
            dataIndex: 'departmentName',
            align: 'center',
            width: '20%',
            render: (text, record) => {
                let color;
                switch (record.departmentName) {
                    case '재무부':
                        color = 'red';
                        break;
                    case '인사부':
                        color = 'green';
                        break;
                    case '생산부':
                        color = 'blue';
                        break;
                    case '물류부':
                        color = 'orange';
                        break;
                    default:
                        color = 'gray'; // 기본 색상
                }
                return <Tag style={{ marginLeft: '5px' }} color={color}>{record.departmentName}</Tag>;
            }
        },
    ];

    const permissionColumns = [
        {
            title: '권한명',
            dataIndex: 'label',
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <div style={{ padding: 8 }}>
                    <Input
                        placeholder="권한명 검색"
                        value={selectedKeys[0]}
                        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={confirm}
                        style={{ marginBottom: 8, display: 'block' }}
                    />
                    <Space>
                        <Button
                            type="primary"
                            onClick={confirm}
                            icon={<SearchOutlined />}
                            size="small"
                            style={{ width: 90 }}
                        >
                            검색
                        </Button>
                        <Button
                            onClick={() => {
                                clearFilters(); // 필터 초기화
                                setSelectedKeys([]); // 필터 값 빈 배열로 설정
                                confirm(); // 테이블 재렌더링
                            }}
                            size="small"
                            style={{ width: 90 }}
                        >
                            초기화
                        </Button>
                    </Space>
                </div>
            ),
            filterIcon: <SearchOutlined style={{ color: '#000' }} />,
            onFilter: (value, record) => record.label.toLowerCase().includes(value.toLowerCase()),
        },
        {
            title: '사용자',
            align: 'center',
            width: '15%',
            render: (_, record) => (
                record.key === 'adminPermission' ? null : (  // adminPermission이면 아예 안보이게 처리
                    <Checkbox
                        checked={permissions[record.key] === 'GENERAL'}
                        onChange={(e) => handlePermissionChange(record.key, e.target.checked ? 'GENERAL' : 'NO_ACCESS')}
                        disabled={(selectedUser.email === jwtDecode(Cookies.get('jwt')).sub) && isAdmin || selectedUser.email === adminEmployee}  // 사용자가 자신이면 수정 불가
                    />
                )
            ),
        },
        {
            title: '관리자',
            align: 'center',
            width: '15%',
            render: (_, record) => (
                <Checkbox
                    checked={permissions[record.key] === 'ADMIN'}
                    onChange={(e) => handlePermissionChange(record.key, e.target.checked ? 'ADMIN' : 'NO_ACCESS')}
                    disabled={(selectedUser.email === jwtDecode(Cookies.get('jwt')).sub) && isAdmin || (record.key === 'adminPermission' && !isAdmin) || selectedUser.email === adminEmployee}  // 자신이거나 isAdmin이 false면 수정 불가
                />
            ),
        },
    ];

    return (
        <Box sx={{ margin: '20px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <WelcomeSection
                        title="사용자 권한 관리"
                        description={(
                            <Typography>
                                이 페이지는 <span>ERP 시스템의 사용자 권한을 관리</span>하고 설정하는 페이지임.<br/>
                                관리자는 사용자별로 적합한 권한을 부여하여, 각 사용자가 자신의 직무에 맞는 기능만을 사용할 수 있도록 제어할 수 있음.<br/>
                                이를 통해 <span>업무 효율성을 극대화</span>하고, 기업 내 시스템의 보안성을 강화할 수 있음.
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
                    <Grid item xs={12} md={6}>
                        <Grow in={true} timeout={300}>
                            <Paper elevation={3}>
                                <Typography variant="h6" sx={{ padding: '20px' }}>사용자 권한</Typography>
                                <Table
                                    style={{ padding: '20px' }}
                                    columns={personalPermissionColumns}
                                    dataSource={filteredPermissions}
                                    pagination={{ pageSize: 15, position: ['bottomCenter'], showSizeChanger: false }}
                                    size={'small'}
                                    rowKey="key"
                                />
                            </Paper>
                        </Grow>
                    </Grid>
                </Grid>
            )}

            {activeTabKey === '2' && (
                <Grid sx={{ padding: '0px 20px 0px 20px' }} container spacing={3}>
                    {/* 회원 목록 테이블 */}
                    <Grid item xs={12} md={5} sx={{ minWidth: '600px !important', maxWidth: '800px !important' }}>
                        <Grow in={true} timeout={300}>
                            <Paper elevation={3}>
                                <Typography variant="h6" sx={{ padding: '20px' }}>회원 목록</Typography>
                                <Table
                                    style={{ padding: '20px' }}
                                    columns={userColumns}
                                    dataSource={Array.isArray(employee) ? employee : []}
                                    pagination={{ pageSize: 15, position: ['bottomCenter'], showSizeChanger: false }}
                                    rowSelection={handleRowSelection}
                                    size={'small'}
                                    rowKey="id"
                                    onRow={(record) => ({
                                        onClick: () => handleUserClick(record),
                                        style: { cursor: 'pointer' },
                                    })}
                                />
                            </Paper>
                        </Grow>
                    </Grid>

                    {/* 권한 부여 또는 본인 권한 조회 */}
                    <Grid item xs={12} md={6} sx={{ minWidth: '500px !important', maxWidth: '700px !important' }}>
                        <Grow in={!!selectedUser} timeout={300}>
                            {selectedUser ? (
                                <Paper elevation={3} >
                                    <Typography variant="h6" sx={{ padding: '20px' }}>
                                        {`${selectedUser.lastName}${selectedUser.firstName} 님의 권한 관리`}
                                    </Typography>

                                    {/* 권한 관리 테이블 */}
                                    <Table
                                        style={{ padding: '20px' }}
                                        columns={permissionColumns}
                                        dataSource={permissionData}
                                        pagination={{ pageSize: 15, position: ['bottomCenter'], showSizeChanger: false }}
                                        size={'small'}
                                        rowKey="key"
                                    />

                                    <Box sx={{display: 'flex', justifyContent: 'flex-end', marginRight: '20px'}}>
                                        <Button onClick={updateUserPermissions} type="primary" style={{ marginBottom: '20px' }} >
                                            저장
                                        </Button>
                                    </Box>
                                </Paper>
                            ) : (
                                <></>
                            )}
                        </Grow>
                    </Grid>
                </Grid>
            )}
        </Box>
    );
};

export default UserPermissionPage;