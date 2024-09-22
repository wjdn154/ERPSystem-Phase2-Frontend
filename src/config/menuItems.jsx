// MUI 아이콘 모듈에서 필요한 아이콘들을 임포트
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import GroupsIcon from '@mui/icons-material/Groups';
import {
    DEPARTMENT_API,
    EMPLOYEE_API,
    FINANCIAL_API,
    LOGISTICS_API,
    PRODUCTION_API,
    USERS_API
} from "./apiConstants.jsx";
import AccountSubjectPage from "../modules/financial/pages/basic_information_management/account_subject/AccountSubjectPage.jsx";
import EquipmentDataPage from "../modules/production/pages/resource_data/EquipmentDataPage.jsx";
import MaintenanceHistoryPage from "../modules/production/pages/resource_data/MaintenanceHistoryPage.jsx";
import EmployeeDataPage from "../modules/hr/pages/EmployeeDataPage.jsx";
import UsersDataPage from "../modules/hr/pages/UsersDataPage.jsx";
import WorkcenterPage from "../modules/production/pages/basic_data/Workcenter/WorkcenterPage.jsx";
import ProcessDetailsPage from "../modules/production/pages/basic_data/ProcessDetails/ProcessDetailsPage.jsx";
import DepartmentDataPage from "../modules/hr/pages/DepartmentDataPage.jsx";
import {jwtDecode} from "jwt-decode";
import Cookies from "js-cookie";

// 메인 메뉴 아이템 배열을 정의, 각 메뉴는 텍스트와 아이콘으로 구성
export const menuItems = [
    { text: '통합관리', icon: <FeaturedPlayListIcon /> },
    { text: '재무회계', icon: <AttachMoneyIcon /> },
    { text: '인사관리', icon: <GroupsIcon /> },
    { text: '물류관리', icon: <LocalShippingIcon /> },
    { text: '생산관리', icon: <PrecisionManufacturingIcon /> },
];

// 서브 메뉴 아이템 객체를 정의, 메인 메뉴별로 다양한 서브 메뉴 항목들을 배열로 관리
export const subMenuItems = {
    '통합관리': [
        {
            text: '대시보드',
            items: [
                { text: '대시보드', component: 'IntegrationDashboardPage', apiPath: undefined, url: '/integration' },  // 관리자 권한
            ]
        },
        {
            text: '기초정보관리',
            items: [
                { text: '회사정보수정', component: null, apiPath: undefined, url: '/integration/basic-info/company-edit', requiredPermission: 'adminPermission', permissionLevel: 'ADMIN' }, // 관리자 권한
                { text: '사용자권한관리', component: 'UserPermissionPage', apiPath: USERS_API.USERS_PERMISSION_API(Cookies.get('jwt') ? jwtDecode(Cookies.get('jwt')).sub : null), url: '/integration/basic-info/user-management' }, // 사용자 관리 권한
            ]
        }
    ],
    '재무회계': [
        {
            text: '대시보드',
            items: [
                { text: '대시보드', component: 'FinanceDashboardPage', apiPath: undefined, url: '/finance', requiredPermission: 'accountSubjectPermission', permissionLevel: 'GENERAL' },  // 계정과목 및 적요 등록 권한
            ]
        },
        {
            text: '기초정보관리',
            items: [
                { text: '거래처등록', component: 'ClientRegistrationPage', apiPath: undefined, url: '/finance/basic-info/client-registration', requiredPermission: 'clientRegistrationPermission', permissionLevel: 'GENERAL' },  // 거래처등록 권한
                { text: '계정과목및적요등록', component: 'AccountSubjectPage', apiPath: FINANCIAL_API.ACCOUNT_SUBJECTS_API, url: '/finance/basic-info/account-subject', requiredPermission: 'accountSubjectPermission', permissionLevel: 'GENERAL' },  // 계정과목 및 적요 등록 권한
                { text: '환경등록', component: 'SystemEnvironmentSettingsPage', apiPath: undefined, url: '/finance/basic-info/environment', requiredPermission: 'environmentPermission', permissionLevel: 'GENERAL' },  // 환경등록 권한
            ]
        },
        {
            text: '전표관리',
            items: [
                { text: '미결전표입력', component: 'PendingVoucherInputPage', apiPath: undefined, url: '/finance/voucher-management/pending-entry', requiredPermission: 'generalVoucherPermission', permissionLevel: 'GENERAL' },  // 일반전표입력 권한
                { text: '미결전표승인', component: 'PendingVoucherApprovalPage', apiPath: undefined, url: '/finance/voucher-management/pending-approval', requiredPermission: 'generalVoucherPermission', permissionLevel: 'ADMIN' },
                { text: '전표조회', component: 'VoucherInquiryPage', apiPath: undefined, url: '/finance/voucher-management/search', requiredPermission: 'generalVoucherPermission', permissionLevel: 'GENERAL' },  // 일반전표입력 권한
                { text: '매입매출전표입력', component: 'PurchaseSalesVoucherInputPage', apiPath: undefined, url: '/finance/voucher-management/sales-purchase', requiredPermission: 'salesPurchaseVoucherPermission', permissionLevel: 'GENERAL' },  // 매입매출전표입력 권한
                { text: '전자세금계산서발행', component: 'EInvoiceIssuancePage', apiPath: undefined, url: '/finance/voucher-management/electronic-tax', requiredPermission: 'electronicTaxPermission', permissionLevel: 'GENERAL' },  // 전자세금계산서발행 권한
            ]
        },
        {
            text: '장부관리',
            items: [
                { text: '거래처원장', component: null, apiPath: undefined, url: '/finance/ledger-management/client-ledger', requiredPermission: 'clientLedgerPermission', permissionLevel: 'GENERAL' },  // 거래처원장 권한
                { text: '거래처별계정과목별원장', component: null, apiPath: undefined, url: '/finance/ledger-management/client-account-ledger', requiredPermission: 'clientAccountLedgerPermission', permissionLevel: 'GENERAL' },  // 거래처별계정과목별원장 권한
                { text: '계정별원장', component: null, apiPath: undefined, url: '/finance/ledger-management/account-ledger', requiredPermission: 'accountLedgerPermission', permissionLevel: 'GENERAL' },  // 계정별원장 권한
                { text: '현금출납장', component: null, apiPath: undefined, url: '/finance/ledger-management/cash-book', requiredPermission: 'cashBookPermission', permissionLevel: 'GENERAL' },  // 현금출납장 권한
                { text: '일계표(월계표)', component: null, apiPath: undefined, url: '/finance/ledger-management/daily-monthly', requiredPermission: 'dailyMonthlyPermission', permissionLevel: 'GENERAL' },  // 일계표(월계표) 권한
                { text: '분개장', component: null, apiPath: undefined, url: '/finance/ledger-management/journal', requiredPermission: 'journalPermission', permissionLevel: 'GENERAL' },  // 분개장 권한
                { text: '총계정원장', component: null, apiPath: undefined, url: '/finance/ledger-management/general-ledger', requiredPermission: 'generalLedgerPermission', permissionLevel: 'GENERAL' },  // 총계정원장 권한
                { text: '매입매출장', component: null, apiPath: undefined, url: '/finance/ledger-management/sales-purchase', requiredPermission: 'salesPurchaseLedgerPermission', permissionLevel: 'GENERAL' },  // 매입매출장 권한
                { text: '세금계산서(계산서)현황', component: null, apiPath: undefined, url: '/finance/ledger-management/tax-invoice', requiredPermission: 'taxInvoicePermission', permissionLevel: 'GENERAL' },  // 세금계산서(계산서)현황 권한
                { text: '전표출력', component: null, apiPath: undefined, url: '/finance/ledger-management/voucher-print', requiredPermission: 'voucherPrintPermission', permissionLevel: 'GENERAL' },  // 전표출력 권한
            ]
        },
        {
            text: '결산/재무제표',
            items: [
                { text: '결산자료입력', component: null, apiPath: undefined, url: '/finance/financial-statements/closing-data', requiredPermission: 'closingDataPermission', permissionLevel: 'GENERAL' },  // 결산자료입력 권한
                { text: '합계잔액시산표', component: null, apiPath: undefined, url: '/finance/financial-statements/trial-balance', requiredPermission: 'trialBalancePermission', permissionLevel: 'GENERAL' },  // 합계잔액시산표 권한
                { text: '재무상태표', component: null, apiPath: undefined, url: '/finance/financial-statements/financial-position', requiredPermission: 'financialPositionPermission', permissionLevel: 'GENERAL' },  // 재무상태표 권한
                { text: '손익계산서', component: null, apiPath: undefined, url: '/finance/financial-statements/income-statement', requiredPermission: 'incomeStatementPermission', permissionLevel: 'GENERAL' },  // 손익계산서 권한
                { text: '제조원가명세서', component: null, apiPath: undefined, url: '/finance/financial-statements/cost-statement', requiredPermission: 'costStatementPermission', permissionLevel: 'GENERAL' },  // 제조원가명세서 권한
                { text: '이익잉여금처분계산서', component: null, apiPath: undefined, url: '/finance/financial-statements/profit-distribution', requiredPermission: 'profitDistributionPermission', permissionLevel: 'GENERAL' },  // 이익잉여금처분계산서 권한
                { text: '현금흐름표', component: null, apiPath: undefined, url: '/finance/financial-statements/cash-flow', requiredPermission: 'cashFlowPermission', permissionLevel: 'GENERAL' },  // 현금흐름표 권한
                { text: '자본변동표', component: null, apiPath: undefined, url: '/finance/financial-statements/equity-changes', requiredPermission: 'equityChangesPermission', permissionLevel: 'GENERAL' },  // 자본변동표 권한
                { text: '결산부속명세서', component: null, apiPath: undefined, url: '/finance/financial-statements/closing-annex', requiredPermission: 'closingAnnexPermission', permissionLevel: 'GENERAL' },  // 결산부속명세서 권한
            ]
        },
        {
            text: '전기분재무제표',
            items: [
                { text: '전기분재무상태표', component: null, apiPath: undefined, url: '/finance/previous-financial-statements/financial-position', requiredPermission: 'previousFinancialPositionPermission', permissionLevel: 'GENERAL' },  // 전기분재무상태표 권한
                { text: '전기분손익계산서', component: null, apiPath: undefined, url: '/finance/previous-financial-statements/income-statement', requiredPermission: 'previousIncomeStatementPermission', permissionLevel: 'GENERAL' },  // 전기분손익계산서 권한
                { text: '전기분원가명세서', component: null, apiPath: undefined, url: '/finance/previous-financial-statements/cost-statement', requiredPermission: 'previousCostStatementPermission', permissionLevel: 'GENERAL' },  // 전기분원가명세서 권한
                { text: '전기분잉여금처분계산서', component: null, apiPath: undefined, url: '/finance/previous-financial-statements/profit-distribution', requiredPermission: 'previousProfitDistributionPermission', permissionLevel: 'GENERAL' },  // 전기분잉여금처분계산서 권한
                { text: '거래처별초기이월', component: null, apiPath: undefined, url: '/finance/previous-financial-statements/client-initial', requiredPermission: 'clientInitialPermission', permissionLevel: 'GENERAL' },  // 거래처별초기이월 권한
                { text: '마감후이월', component: null, apiPath: undefined, url: '/finance/previous-financial-statements/closing-carryover', requiredPermission: 'closingCarryoverPermission', permissionLevel: 'GENERAL' },  // 마감후이월 권한
            ]
        },
        {
            text: '고정자산및감가상각',
            items: [
                { text: '고정자산등록', component: null, apiPath: undefined, url: '/finance/fixed-assets/register', requiredPermission: 'fixedAssetRegisterPermission', permissionLevel: 'GENERAL' },  // 고정자산등록 권한
                { text: '미상각분감가상각비', component: null, apiPath: undefined, url: '/finance/fixed-assets/undepreciated', requiredPermission: 'undepreciatedPermission', permissionLevel: 'GENERAL' },  // 미상각분감가상각비 권한
                { text: '양도자산감가상각비', component: null, apiPath: undefined, url: '/finance/fixed-assets/transferred', requiredPermission: 'transferredDepreciationPermission', permissionLevel: 'GENERAL' },  // 양도자산감가상각비 권한
                { text: '고정자산관리대장', component: null, apiPath: undefined, url: '/finance/fixed-assets/register-book', requiredPermission: 'registerBookPermission', permissionLevel: 'GENERAL' },  // 고정자산관리대장 권한
            ]
        },
        {
            text: '자금관리',
            items: [
                { text: '받을어음현황', component: null, apiPath: undefined, url: '/finance/funds/bills-receivable', requiredPermission: 'billsReceivablePermission', permissionLevel: 'GENERAL' },  // 받을어음현황 권한
                { text: '지급어음현황', component: null, apiPath: undefined, url: '/finance/funds/bills-payable', requiredPermission: 'billsPayablePermission', permissionLevel: 'GENERAL' },  // 지급어음현황 권한
                { text: '일일자금명세(경리일보)', component: null, apiPath: undefined, url: '/finance/funds/daily-finance', requiredPermission: 'dailyFinancePermission', permissionLevel: 'GENERAL' },  // 일일자금명세 권한
                { text: '예적금현황', component: null, apiPath: undefined, url: '/finance/funds/deposits-status', requiredPermission: 'depositsStatusPermission', permissionLevel: 'GENERAL' },  // 예적금현황 권한
            ]
        },
    ],
    '인사관리': [
        {
            text: '대시보드',
            items: [
                { text: '대시보드', component: 'HRDashboardPage', apiPath: undefined, url: '/hr', requiredPermission: 'employeeManagementPermission', permissionLevel: 'GENERAL' },  // 사원 관리 권한
            ]
        },
        {
            text: '기초 정보 관리',
            items: [
                { text: '사원 관리', component: 'EmployeeDataPage', apiPath: EMPLOYEE_API.EMPLOYEE_DATA_API, url: '/hr/basic-info/employee-management', requiredPermission: 'employeeManagementPermission', permissionLevel: 'GENERAL' },  // 사원 관리 권한
                { text: '사용자 관리', component: 'UsersDataPage', apiPath: USERS_API.USERS_DATA_API, url: '/hr/basic-info/user-management', requiredPermission: 'userManagementPermission', permissionLevel: 'GENERAL' },  // 사용자 관리 권한
                { text: '부서 관리', component: 'DepartmentDataPage', apiPath: DEPARTMENT_API.DEPARTMENT_DATA_API, url: '/hr/basic-info/department-management', requiredPermission: 'departmentManagementPermission', permissionLevel: 'GENERAL' },  // 부서 관리 권한
                { text: '발령 관리', component: null, apiPath: undefined, url: '/hr/basic-info/assignment-management', requiredPermission: 'assignmentManagementPermission', permissionLevel: 'GENERAL' },  // 발령 관리 권한
                { text: '성과 평가 관리', component: null, apiPath: undefined, url: '/hr/basic-info/performance-evaluation', requiredPermission: 'performanceEvaluationPermission', permissionLevel: 'GENERAL' },  // 성과 평가 관리 권한
                { text: '퇴사자 관리', component: null, apiPath: undefined, url: '/hr/basic-info/retirement-management', requiredPermission: 'retirementManagementPermission', permissionLevel: 'GENERAL' },  // 퇴사자 관리 권한
            ]
        },
        {
            text: '출결 관리',
            items: [
                { text: '근태 관리', component: null, apiPath: undefined, url: '/hr/attendance/time-management', requiredPermission: 'timeManagementPermission', permissionLevel: 'GENERAL' },  // 근태 관리 권한
                { text: '휴가 관리', component: null, apiPath: undefined, url: '/hr/attendance/leave-management', requiredPermission: 'leaveManagementPermission', permissionLevel: 'GENERAL' },  // 휴가 관리 권한
                { text: '초과근무 관리', component: null, apiPath: undefined, url: '/hr/attendance/overtime-management', requiredPermission: 'overtimeManagementPermission', permissionLevel: 'GENERAL' },  // 초과근무 관리 권한
            ]
        },
        {
            text: '채용 관리',
            items: [
                { text: '채용 공고 관리', component: null, apiPath: undefined, url: '/hr/recruitment/job-postings', requiredPermission: 'jobPostingsPermission', permissionLevel: 'GENERAL' },  // 채용 공고 관리 권한
                { text: '지원자 관리', component: null, apiPath: undefined, url: '/hr/recruitment/applicant-management', requiredPermission: 'applicantManagementPermission', permissionLevel: 'GENERAL' },  // 지원자 관리 권한
                { text: '지원서 관리', component: null, apiPath: undefined, url: '/hr/recruitment/application-management', requiredPermission: 'applicationManagementPermission', permissionLevel: 'GENERAL' },  // 지원서 관리 권한
                { text: '인터뷰 관리', component: null, apiPath: undefined, url: '/hr/recruitment/interview-management', requiredPermission: 'interviewManagementPermission', permissionLevel: 'GENERAL' },  // 인터뷰 관리 권한
                { text: '채용 제안 관리', component: null, apiPath: undefined, url: '/hr/recruitment/job-offers', requiredPermission: 'jobOffersPermission', permissionLevel: 'GENERAL' },  // 채용 제안 관리 권한
            ]
        }
    ],
    '물류관리': [
        {
            text: '대시보드',
            items: [
                { text: '대시보드', component: 'LogisticsDashboardPage', apiPath: undefined, url: '/logistics', requiredPermission: 'itemManagementPermission', permissionLevel: 'GENERAL' },  // 품목 관리 권한
            ]
        },
        {
            text: '기초정보관리',
            items: [
                { text: '품목 관리', component: null, apiPath: undefined, url: '/logistics/basic-info/item-management', requiredPermission: 'itemManagementPermission', permissionLevel: 'GENERAL' },  // 품목 관리 권한
                { text: '품목 그룹 관리', component: null, apiPath: undefined, url: '/logistics/basic-info/item-group-management', requiredPermission: 'itemGroupManagementPermission', permissionLevel: 'GENERAL' },  // 품목 그룹 관리 권한
                { text: '창고등록', component: 'WarehouseListPage', apiPath: LOGISTICS_API.WAREHOUSE_LIST_API, url: '/logistics/basic-info/warehouse-registration', requiredPermission: 'warehouseRegistrationPermission', permissionLevel: 'GENERAL' },  // 창고등록 권한
            ]
        },
        {
            text: '영업 관리',
            items: [
                { text: '견적서', component: null, apiPath: undefined, url: '/logistics/sales/quotation', requiredPermission: 'quotationPermission', permissionLevel: 'GENERAL' },  // 견적서 권한
                { text: '주문서', component: null, apiPath: undefined, url: '/logistics/sales/order', requiredPermission: 'orderPermission', permissionLevel: 'GENERAL' },  // 주문서 권한
                { text: '판매', component: null, apiPath: undefined, url: '/logistics/sales/sale', requiredPermission: 'salePermission', permissionLevel: 'GENERAL' },  // 판매 권한
                { text: '출하지시서', component: null, apiPath: undefined, url: '/logistics/sales/shipping-order', requiredPermission: 'shippingOrderPermission', permissionLevel: 'GENERAL' },  // 출하지시서 권한
                { text: '출하', component: null, apiPath: undefined, url: '/logistics/sales/shipment', requiredPermission: 'shipmentPermission', permissionLevel: 'GENERAL' },  // 출하 권한
            ]
        },
        {
            text: '구매 관리',
            items: [
                { text: '발주 요청', component: null, apiPath: undefined, url: '/logistics/purchase/purchase-request', requiredPermission: 'purchaseRequestPermission', permissionLevel: 'GENERAL' },  // 발주 요청 권한
                { text: '발주 계획', component: null, apiPath: undefined, url: '/logistics/purchase/purchase-plan', requiredPermission: 'purchasePlanPermission', permissionLevel: 'GENERAL' },  // 발주 계획 권한
                { text: '단가 요청', component: null, apiPath: undefined, url: '/logistics/purchase/price-request', requiredPermission: 'priceRequestPermission', permissionLevel: 'GENERAL' },  // 단가 요청 권한
                { text: '발주서', component: null, apiPath: undefined, url: '/logistics/purchase/purchase-order', requiredPermission: 'purchaseOrderPermission', permissionLevel: 'GENERAL' },  // 발주서 권한
                { text: '구매', component: null, apiPath: undefined, url: '/logistics/purchase/purchase', requiredPermission: 'purchasePermission', permissionLevel: 'GENERAL' },  // 구매 권한
                { text: '입고지시서', component: null, apiPath: undefined, url: '/logistics/purchase/inbound-order', requiredPermission: 'inboundOrderPermission', permissionLevel: 'GENERAL' },  // 입고지시서 권한
            ]
        },
        {
            text: '반품 관리',
            items: [
                { text: '반품 접수', component: null, apiPath: undefined, url: '/logistics/returns/returns-reception', requiredPermission: 'returnsReceptionPermission', permissionLevel: 'GENERAL' },  // 반품 접수 권한
                { text: '반품 현황', component: null, apiPath: undefined, url: '/logistics/returns/returns-status', requiredPermission: 'returnsStatusPermission', permissionLevel: 'GENERAL' },  // 반품 현황 권한
            ]
        },
        {
            text: '출하지시서',
            items: [
                { text: '출하지시서조회', component: null, apiPath: undefined, url: '/logistics/shipping-orders/view', requiredPermission: 'shippingOrderViewPermission', permissionLevel: 'GENERAL' },  // 출하지시서조회 권한
                { text: '출하지시서입력', component: null, apiPath: undefined, url: '/logistics/shipping-orders/input', requiredPermission: 'shippingOrderInputPermission', permissionLevel: 'GENERAL' },  // 출하지시서입력 권한
            ]
        },
        {
            text: '출하',
            items: [
                { text: '출하조회', component: null, apiPath: undefined, url: '/logistics/shipment/view', requiredPermission: 'shipmentViewPermission', permissionLevel: 'GENERAL' },  // 출하조회 권한
                { text: '출하입력', component: null, apiPath: undefined, url: '/logistics/shipment/input', requiredPermission: 'shipmentInputPermission', permissionLevel: 'GENERAL' },  // 출하입력 권한
                { text: '출하현황', component: null, apiPath: undefined, url: '/logistics/shipment/status', requiredPermission: 'shipmentStatusPermission', permissionLevel: 'GENERAL' },  // 출하현황 권한
            ]
        },
        {
            text: '입고관리',
            items: [
                { text: '입고예정', component: null, apiPath: undefined, url: '/logistics/inbound-management/expected', requiredPermission: 'inboundExpectedPermission', permissionLevel: 'GENERAL' },  // 입고예정 권한
                { text: '입고처리', component: null, apiPath: undefined, url: '/logistics/inbound-management/processing', requiredPermission: 'inboundProcessingPermission', permissionLevel: 'GENERAL' },  // 입고처리 권한
            ]
        },
        {
            text: '출고관리',
            items: [
                { text: '출고예정', component: null, apiPath: undefined, url: '/logistics/outbound-management/expected', requiredPermission: 'outboundExpectedPermission', permissionLevel: 'GENERAL' },  // 출고예정 권한
                { text: '출고예정현황', component: null, apiPath: undefined, url: '/logistics/outbound-management/expected-status', requiredPermission: 'outboundExpectedStatusPermission', permissionLevel: 'GENERAL' },  // 출고예정현황 권한
                { text: '출고처리', component: null, apiPath: undefined, url: '/logistics/outbound-management/processing', requiredPermission: 'outboundProcessingPermission', permissionLevel: 'GENERAL' },  // 출고처리 권한
            ]
        },
        {
            text: '재고조정',
            items: [
                { text: '재고조정진행단계', component: null, apiPath: undefined, url: '/logistics/inventory-adjustment/steps', requiredPermission: 'inventoryAdjustmentStepsPermission', permissionLevel: 'GENERAL' },  // 재고조정진행단계 권한
                { text: '재고실사조회', component: null, apiPath: undefined, url: '/logistics/inventory-adjustment/inspection-view', requiredPermission: 'inventoryInspectionViewPermission', permissionLevel: 'GENERAL' },  // 재고실사조회 권한
                { text: '재고실사현황', component: null, apiPath: undefined, url: '/logistics/inventory-adjustment/inspection-status', requiredPermission: 'inventoryInspectionStatusPermission', permissionLevel: 'GENERAL' },  // 재고실사현황 권한
                { text: '재고조정현황', component: null, apiPath: undefined, url: '/logistics/inventory-adjustment/adjustment-status', requiredPermission: 'inventoryAdjustmentStatusPermission', permissionLevel: 'GENERAL' },  // 재고조정현황 권한
            ]
        }
    ],
    '생산관리': [
        {
            text: '대시보드',
            items: [
                { text: '대시보드', component: 'ProductionDashboardPage', apiPath: undefined, url: '/production', requiredPermission: 'mpsPermission', permissionLevel: 'GENERAL' },  // 주생산 계획 관리 권한
            ]
        },
        {
            text: '기초정보 관리',
            items: [
                { text: '작업장 관리', component: 'WorkcenterPage', apiPath: PRODUCTION_API.WORKCENTER_LIST_API, url: '/production/basic-data/workcenter', requiredPermission: 'workcenterManagementPermission', permissionLevel: 'GENERAL' },  // 작업장 관리 권한
                { text: '공정세부정보 관리', component: 'ProcessDetailsPage', apiPath: PRODUCTION_API.PROCESS_LIST_API, url: '/production/basic-data/process-management/details', requiredPermission: 'processDetailsPermission', permissionLevel: 'GENERAL' },  // 공정세부정보 관리 권한
                { text: 'Routing 관리', component: 'ProcessRoutingPage', apiPath: PRODUCTION_API.ROUTING_LIST_API, url: '/production/basic-data/process-management/routing', requiredPermission: 'routingManagementPermission', permissionLevel: 'GENERAL' },  // Routing 관리 권한
                { text: 'BOM 관리', component: 'SBomPage', apiPath: PRODUCTION_API.S_BOM_LIST_API, url: '/production/basic-data/bom', requiredPermission: 'bomManagementPermission', permissionLevel: 'GENERAL' },  // BOM 관리 권한
            ]
        },
        {
            text: '자원 관리',
            items: [
                { text: '작업자 관리', component: 'WorkerPage', apiPath: PRODUCTION_API.WORKER_LIST_API, url: '/production/resource-management/worker-management', requiredPermission: 'workerManagementPermission', permissionLevel: 'GENERAL' },  // 작업자 관리 권한
                { text: '자재 정보 관리', component: null, apiPath: undefined, url: '/production/resource-management/material-management', requiredPermission: 'materialManagementPermission', permissionLevel: 'GENERAL' },  // 자재 정보 관리 권한
                { text: '설비 정보 관리', component: 'EquipmentDataPage', apiPath: PRODUCTION_API.EQUIPMENT_DATA_API, url: '/production/resource-management/equipment-management', requiredPermission: 'equipmentManagementPermission', permissionLevel: 'GENERAL' },  // 설비 정보 관리 권한
                { text: '유지보수 이력 관리', component: 'MaintenanceHistoryPage', apiPath: PRODUCTION_API.MAINTENANCE_HISTORY_API, url: '/production/resource-management/maintenance-history', requiredPermission: 'maintenanceHistoryPermission', permissionLevel: 'GENERAL' },  // 유지보수 이력 관리 권한
                { text: '폐기물 관리', component: null, apiPath: undefined, url: '/production/resource-management/waste-management', requiredPermission: 'wasteManagementPermission', permissionLevel: 'GENERAL' },  // 폐기물 관리 권한
            ]
        },
        {
            text: '생산 운영 및 계획',
            items: [
                { text: '생산 의뢰 관리', component: null, apiPath: PRODUCTION_API.PRODUCTION_REQUEST_LIST_API, url: '/production/common-scheduling/request', requiredPermission: 'productionRequestPermission', permissionLevel: 'GENERAL' },  // 생산 의뢰 관리 권한
                { text: '주생산계획 관리', component: null, apiPath: undefined, url: '/production/planning/mps', requiredPermission: 'mpsPermission', permissionLevel: 'GENERAL' },  // 주생산 계획 관리 권한
                // { text: '가용생산능력 계획 관리', component: null, apiPath: undefined, url: '/production/planning/crp' },
                { text: '실자재 투입 현황 관리', component: null, apiPath: undefined, url: '/production/planning/material-input-status', requiredPermission: 'materialInputStatusPermission', permissionLevel: 'GENERAL' },  // 실자재 투입 현황 권한
                { text: '자재소요량 계획 관리', component: null, apiPath: undefined, url: '/production/planning/mrp', requiredPermission: 'mrpPermission', permissionLevel: 'GENERAL' },  // 자재소요량 계획 관리 권한
                { text: '주문 생산 계획 관리', component: null, apiPath: undefined, url: '/production/strategy/plan-of-mto', requiredPermission: 'planOfMakeToOrderPermission', permissionLevel: 'GENERAL' },  // 주문 생산 계획 관리 권한
                { text: '재고 생산 계획 관리', component: null, apiPath: undefined, url: '/production/strategy/plan-of-mts', requiredPermission: 'planOfMakeToStockPermission', permissionLevel: 'GENERAL' },  // 재고 생산 계획 관리 권한
            ]
        },
        {
            text: '작업 지시 관리',
            items: [
                { text: '교대 유형 관리', component: null, apiPath: PRODUCTION_API.SHIFT_TYPE_LIST_API, url: '/production/common-scheduling/shift-type', requiredPermission: 'shiftTypePermission', permissionLevel: 'GENERAL' },  // 교대유형 관리 권한
                { text: '작업 지시 관리', component: null, apiPath: PRODUCTION_API.PRODUCTION_ORDER_LIST_API, url: '/production/common-scheduling/production-order', requiredPermission: 'productionOrderPermission', permissionLevel: 'GENERAL' },  // 작업 지시 관리 권한
                { text: '작업배정이력 관리', component: null, apiPath: PRODUCTION_API.WORKER_ASSIGNMENT_PRODUCTION_ORDER_SUMMARY_API, url: '/production/common-scheduling/worker-assignment', requiredPermission: 'workerAssignmentPermission', permissionLevel: 'GENERAL' },  // 작업배정이력 관리 권한
            ]
        },
        {
            text: '생산 실적 관리',
            items: [
                { text: '작업 실적 관리', component: null, apiPath: undefined, url: '/production/performance-management/work-performance', requiredPermission: 'workPerformancePermission', permissionLevel: 'GENERAL' },  // 작업 실적 관리 권한
                { text: '생산 일보 등록', component: null, apiPath: undefined, url: '/production/performance-management/daily-report', requiredPermission: 'dailyReportPermission', permissionLevel: 'GENERAL' },  // 생산 일보 등록 권한
                { text: '생산 월보 등록', component: null, apiPath: undefined, url: '/production/performance-management/monthly-report', requiredPermission: 'monthlyReportPermission', permissionLevel: 'GENERAL' },  // 생산 월보 등록 권한
            ]
        },
        {
            text: '품질 관리',
            items: [
                { text: '불량군/유형 관리', component: null, apiPath: undefined, url: '/production/quality-control/defect-group-type', requiredPermission: 'defectGroupAndTypePermission', permissionLevel: 'GENERAL' },  // 불량군/유형 관리 권한
                { text: '품질 검사 관리', component: null, apiPath: undefined, url: '/production/quality-control/quality-inspection', requiredPermission: 'qualityInspectionPermission', permissionLevel: 'GENERAL' },  // 품질 검사 관리 권한
                { text: 'LOT 관리', component: null, apiPath: undefined, url: '/production/quality-control/lot-management', requiredPermission: 'lotManagementPermission', permissionLevel: 'GENERAL' },  // LOT 관리 권한
                { text: 'Serial No. 관리', component: null, apiPath: undefined, url: '/production/quality-control/serial-management', requiredPermission: 'serialManagementPermission', permissionLevel: 'GENERAL' },  // Serial No 관리 권한
                { text: '생산품 입고 처리', component: null, apiPath: undefined, url: '/production/quality-control/goods-receipt', requiredPermission: 'goodsReceiptPermission', permissionLevel: 'GENERAL' },  // 생산품 입고 처리 권한
            ]
        },
        {
            text: '외주/계약 관리',
            items: [
                { text: '외주 단가 관리', component: null, apiPath: undefined, url: '/production/outsourcing-management/price', requiredPermission: 'outsourcingPricePermission', permissionLevel: 'GENERAL' },  // 외주 단가 관리 권한
                { text: '외주 발주 관리', component: null, apiPath: undefined, url: '/production/outsourcing-management/order', requiredPermission: 'outsourcingOrderPermission', permissionLevel: 'GENERAL' },  // 외주 발주 관리 권한
                { text: '외주 검사 관리', component: null, apiPath: undefined, url: '/production/outsourcing-management/inspection', requiredPermission: 'outsourcingInspectionPermission', permissionLevel: 'GENERAL' },  // 외주 검사 관리 권한
                { text: '외주 실적 관리', component: null, apiPath: undefined, url: '/production/outsourcing-management/performance', requiredPermission: 'outsourcingPerformancePermission', permissionLevel: 'GENERAL' },  // 외주 실적 관리 권한
            ]
        }
    ],
}