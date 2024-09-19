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
import AccountSubjectPage from "../modules/financial/pages/AccountSubjectPage.jsx";
import EquipmentDataPage from "../modules/production/pages/resourceData/EquipmentDataPage.jsx";
import MaintenanceHistoryPage from "../modules/production/pages/resourceData/MaintenanceHistoryPage.jsx";
import WarehouseListPage from "../modules/logistics/pages/WarehouseListPage.jsx";
import EmployeeDataPage from "../modules/hr/pages/EmployeeDataPage.jsx";
import UsersDataPage from "../modules/hr/pages/UsersDataPage.jsx";
import WorkcenterPage from "../modules/production/pages/Workcenter/WorkcenterPage.jsx";
import ProductPage from "../modules/logistics/pages/ProductPage.jsx"
import ProcessDetailsPage from "../modules/production/pages/ProcessDetails/ProcessDetailsPage.jsx";
import DepartmentDataPage from "../modules/hr/pages/DepartmentDataPage.jsx";

// 메인 메뉴 아이템 배열을 정의, 각 메뉴는 텍스트와 아이콘으로 구성
export const menuItems = [
    { text: '그룹웨어', icon: <FeaturedPlayListIcon />, url: '/groupware' },
    { text: '재무회계', icon: <AttachMoneyIcon />, url: '/finance' },
    { text: '인사관리', icon: <GroupsIcon />, url: '/hr' },
    { text: '물류관리', icon: <LocalShippingIcon />, url: '/logistics' },
    { text: '생산관리', icon: <PrecisionManufacturingIcon />, url: '/production' },
];

// 서브 메뉴 아이템 객체를 정의, 메인 메뉴별로 다양한 서브 메뉴 항목들을 배열로 관리
export const subMenuItems = {
    '그룹웨어': [
        {
            text: '기초정보관리',
            items: [
                { text: '회사정보수정', component: null, apiPath: null, url: '/groupware/basic-info/company-edit' },
            ]
        }
    ],
    '재무회계': [
        {
            text: '기초정보관리',
            items: [
                { text: '거래처등록', component: 'ClientRegistrationPage', apiPath: null, url: '/finance/basic-info/client-registration' },
                { text: '계정과목및적요등록', component: 'AccountSubjectPage', apiPath: FINANCIAL_API.ACCOUNT_SUBJECTS_API, url: '/finance/basic-info/account-subject' },
                { text: '환경등록', component: null, apiPath: null, url: '/finance/basic-info/environment' },
                { text: '업무용승용차등록', component: null, apiPath: null, url: '/finance/basic-info/company-car' },
            ]
        },
        {
            text: '전표입력',
            items: [
                { text: '일반전표입력', component: null, apiPath: null, url: '/finance/voucher-input/general' },
                { text: '매입매출전표입력', component: null, apiPath: null, url: '/finance/voucher-input/sales-purchase' },
                { text: '전자세금계산서발행', component: null, apiPath: null, url: '/finance/voucher-input/electronic-tax' },
            ]
        },
        {
            text: '장부관리',
            items: [
                { text: '거래처원장', component: null, apiPath: null, url: '/finance/ledger-management/client-ledger' },
                { text: '거래처별계정과목별원장', component: null, apiPath: null, url: '/finance/ledger-management/client-account-ledger' },
                { text: '계정별원장', component: null, apiPath: null, url: '/finance/ledger-management/account-ledger' },
                { text: '현금출납장', component: null, apiPath: null, url: '/finance/ledger-management/cash-book' },
                { text: '일계표(월계표)', component: null, apiPath: null, url: '/finance/ledger-management/daily-monthly' },
                { text: '분개장', component: null, apiPath: null, url: '/finance/ledger-management/journal' },
                { text: '총계정원장', component: null, apiPath: null, url: '/finance/ledger-management/general-ledger' },
                { text: '매입매출장', component: null, apiPath: null, url: '/finance/ledger-management/sales-purchase' },
                { text: '세금계산서(계산서)현황', component: null, apiPath: null, url: '/finance/ledger-management/tax-invoice' },
                { text: '전표출력', component: null, apiPath: null, url: '/finance/ledger-management/voucher-print' },
            ]
        },
        {
            text: '결산/재무제표',
            items: [
                { text: '결산자료입력', component: null, apiPath: null, url: '/finance/financial-statements/closing-data' },
                { text: '합계잔액시산표', component: null, apiPath: null, url: '/finance/financial-statements/trial-balance' },
                { text: '재무상태표', component: null, apiPath: null, url: '/finance/financial-statements/financial-position' },
                { text: '손익계산서', component: null, apiPath: null, url: '/finance/financial-statements/income-statement' },
                { text: '제조원가명세서', component: null, apiPath: null, url: '/finance/financial-statements/cost-statement' },
                { text: '이익잉여금처분계산서', component: null, apiPath: null, url: '/finance/financial-statements/profit-distribution' },
                { text: '현금흐름표', component: null, apiPath: null, url: '/finance/financial-statements/cash-flow' },
                { text: '자본변동표', component: null, apiPath: null, url: '/finance/financial-statements/equity-changes' },
                { text: '결산부속명세서', component: null, apiPath: null, url: '/finance/financial-statements/closing-annex' },
            ]
        },
        {
            text: '전기분재무제표',
            items: [
                { text: '전기분재무상태표', component: null, apiPath: null, url: '/finance/previous-financial-statements/financial-position' },
                { text: '전기분손익계산서', component: null, apiPath: null, url: '/finance/previous-financial-statements/income-statement' },
                { text: '전기분원가명세서', component: null, apiPath: null, url: '/finance/previous-financial-statements/cost-statement' },
                { text: '전기분잉여금처분계산서', component: null, apiPath: null, url: '/finance/previous-financial-statements/profit-distribution' },
                { text: '거래처별초기이월', component: null, apiPath: null, url: '/finance/previous-financial-statements/client-initial' },
                { text: '마감후이월', component: null, apiPath: null, url: '/finance/previous-financial-statements/closing-carryover' },
            ]
        },
        {
            text: '고정자산및감가상각',
            items: [
                { text: '고정자산등록', component: null, apiPath: null, url: '/finance/fixed-assets/register' },
                { text: '미상각분감가상각비', component: null, apiPath: null, url: '/finance/fixed-assets/undepreciated' },
                { text: '양도자산감가상각비', component: null, apiPath: null, url: '/finance/fixed-assets/transferred' },
                { text: '고정자산관리대장', component: null, apiPath: null, url: '/finance/fixed-assets/register-book' },
            ]
        },
        {
            text: '자금관리',
            items: [
                { text: '받을어음현황', component: null, apiPath: null, url: '/finance/funds/bills-receivable' },
                { text: '지급어음현황', component: null, apiPath: null, url: '/finance/funds/bills-payable' },
                { text: '일일자금명세(경리일보)', component: null, apiPath: null, url: '/finance/funds/daily-finance' },
                { text: '예적금현황', component: null, apiPath: null, url: '/finance/funds/deposits-status' },
            ]
        },
    ],
    '인사관리': [
        {
            text: '기초 정보 관리',
            items: [
                { text: '사원 관리', component: 'EmployeeDataPage', apiPath: EMPLOYEE_API.EMPLOYEE_DATA_API, url: '/hr/basic-info/employee-management' },
                { text: '사용자 관리', component: 'UsersDataPage', apiPath: USERS_API.USERS_DATA_API, url: '/hr/basic-info/user-management' },
                { text: '부서 관리', component: 'DepartmentDataPage', apiPath: DEPARTMENT_API.DEPARTMENT_DATA_API, url: '/hr/basic-info/department-management' },
                { text: '발령 관리', component: null, apiPath: null, url: '/hr/basic-info/assignment-management' },
                { text: '성과 평가 관리', component: null, apiPath: null, url: '/hr/basic-info/performance-evaluation' },
                { text: '퇴사자 관리', component: null, apiPath: null, url: '/hr/basic-info/retirement-management' },
            ]
        },
        {
            text: '출결 관리',
            items: [
                { text: '근태 관리', component: null, apiPath: null, url: '/hr/attendance/time-management' },
                { text: '휴가 관리', component: null, apiPath: null, url: '/hr/attendance/leave-management' },
                { text: '초과근무 관리', component: null, apiPath: null, url: '/hr/attendance/overtime-management' },
            ]
        },
        {
            text: '채용 관리',
            items: [
                { text: '채용 공고 관리', component: null, apiPath: null, url: '/hr/recruitment/job-postings' },
                { text: '지원자 관리', component: null, apiPath: null, url: '/hr/recruitment/applicant-management' },
                { text: '지원서 관리', component: null, apiPath: null, url: '/hr/recruitment/application-management' },
                { text: '인터뷰 관리', component: null, apiPath: null, url: '/hr/recruitment/interview-management' },
                { text: '채용 제안 관리', component: null, apiPath: null, url: '/hr/recruitment/job-offers' },
            ]
        }
    ],
    '물류관리': [
        {
            text: '기초정보관리',
            items: [
                { text: '품목 관리', component: 'ProductPage', apiPath: null, url: '/logistics/basic-info/item-management' },
                { text: '품목 그룹 관리', component: null, apiPath: null, url: '/logistics/basic-info/item-group-management' },
                { text: '창고등록', component: 'WarehouseListPage', apiPath: LOGISTICS_API.WAREHOUSE_LIST_API, url: '/logistics/basic-info/warehouse-registration' },
            ]
        },
        {
            text: '영업 관리',
            items: [
                { text: '견적서', component: null, apiPath: null, url: '/logistics/sales/quotation' },
                { text: '주문서', component: null, apiPath: null, url: '/logistics/sales/order' },
                { text: '판매', component: null, apiPath: null, url: '/logistics/sales/sale' },
                { text: '출하지시서', component: null, apiPath: null, url: '/logistics/sales/shipping-order' },
                { text: '출하', component: null, apiPath: null, url: '/logistics/sales/shipment' },
            ]
        },
        {
            text: '구매 관리',
            items: [
                { text: '발주 요청', component: null, apiPath: null, url: '/logistics/purchase/purchase-request' },
                { text: '발주 계획', component: null, apiPath: null, url: '/logistics/purchase/purchase-plan' },
                { text: '단가 요청', component: null, apiPath: null, url: '/logistics/purchase/price-request' },
                { text: '발주서', component: null, apiPath: null, url: '/logistics/purchase/purchase-order' },
                { text: '구매', component: null, apiPath: null, url: '/logistics/purchase/purchase' },
                { text: '입고지시서', component: null, apiPath: null, url: '/logistics/purchase/inbound-order' },
            ]
        },
        {
            text: '반품 관리',
            items: [
                { text: '반품 접수', component: null, apiPath: null, url: '/logistics/returns/returns-reception' },
                { text: '반품 현황', component: null, apiPath: null, url: '/logistics/returns/returns-status' },
            ]
        },
        {
            text: '출하지시서',
            items: [
                { text: '출하지시서조회', component: null, apiPath: null, url: '/logistics/shipping-orders/view' },
                { text: '출하지시서입력', component: null, apiPath: null, url: '/logistics/shipping-orders/input' },
            ]
        },
        {
            text: '출하',
            items: [
                { text: '출하조회', component: null, apiPath: null, url: '/logistics/shipment/view' },
                { text: '출하입력', component: null, apiPath: null, url: '/logistics/shipment/input' },
                { text: '출하현황', component: null, apiPath: null, url: '/logistics/shipment/status' },
            ]
        },
        {
            text: '입고관리',
            items: [
                { text: '입고예정', component: null, apiPath: null, url: '/logistics/inbound-management/expected' },
                { text: '입고처리', component: null, apiPath: null, url: '/logistics/inbound-management/processing' },
            ]
        },
        {
            text: '출고관리',
            items: [
                { text: '출고예정', component: null, apiPath: null, url: '/logistics/outbound-management/expected' },
                { text: '출고예정현황', component: null, apiPath: null, url: '/logistics/outbound-management/expected-status' },
                { text: '출고처리', component: null, apiPath: null, url: '/logistics/outbound-management/processing' },
            ]
        },
        {
            text: '재고조정',
            items: [
                { text: '재고조정진행단계', component: null, apiPath: null, url: '/logistics/inventory-adjustment/steps' },
                { text: '재고실사조회', component: null, apiPath: null, url: '/logistics/inventory-adjustment/inspection-view' },
                { text: '재고실사현황', component: null, apiPath: null, url: '/logistics/inventory-adjustment/inspection-status' },
                { text: '재고조정현황', component: null, apiPath: null, url: '/logistics/inventory-adjustment/adjustment-status' },
            ]
        }
    ],
    '생산관리': [
        {
            text: '기초정보관리',
            items: [
                { text: '작업장 관리', component: 'WorkcenterPage', apiPath: PRODUCTION_API.WORKCENTER_LIST_API, url: '/production/basic-info/workcenter-management' },
                { text: 'LOT 관리', component: null, apiPath: null, url: '/production/basic-info/lot-management' },
                { text: 'Serial No 관리', component: null, apiPath: null, url: '/production/basic-info/serial-management' },
            ]
        },
        {
            text: '자원관리',
            items: [
                { text: '작업자 관리', component: null, apiPath: null, url: '/production/resource-management/worker-management' },
                { text: '자재 정보 관리', component: null, apiPath: null, url: '/production/resource-management/material-management' },
                { text: '설비 정보 관리', component: 'EquipmentDataPage', apiPath: PRODUCTION_API.EQUIPMENT_DATA_API, url: '/production/resource-management/equipment-management' },
                { text: '유지보수 이력 관리', component: 'MaintenanceHistoryPage', apiPath: PRODUCTION_API.MAINTENANCE_HISTORY_API, url: '/production/resource-management/maintenance-history' },
            ]
        },
        {
            text: '공정 경로 관리',
            items: [
                { text: "공정세부정보 관리", component: ProcessDetailsPage, apiPath: PRODUCTION_API.PROCESS_LIST_API, url: '/production/process-management/details' },
                { text: 'Routing 관리', component: null, apiPath: null, url: '/production/process-management/routing' },
            ]
        },
        {
            text: '자재 소요 관리',
            items: [
                { text: 'BOM 관리', component: null, apiPath: null, url: '/production/material-requirement/bom' },
                { text: '자재소요량 계획 관리', component: null, apiPath: null, url: '/production/material-requirement/material-plan' },
                { text: '실자재 투입 현황 관리', component: null, apiPath: null, url: '/production/material-requirement/material-input-status' },
            ]
        },
        {
            text: '생산 계획 관리',
            items: [
                { text: '생산 의뢰 관리', component: null, apiPath: null, url: '/production/production-planning/request' },
                { text: '주문 생산 계획 관리', component: null, apiPath: null, url: '/production/production-planning/order' },
                { text: '재고 생산 계획 관리', component: null, apiPath: null, url: '/production/production-planning/inventory' },
                { text: '작업 지시 관리', component: null, apiPath: null, url: '/production/production-planning/work-order' },
            ]
        },
        {
            text: '생산 실적 관리',
            items: [
                { text: '작업 실적 관리', component: null, apiPath: null, url: '/production/performance-management/work-performance' },
                { text: '불량군 관리', component: null, apiPath: null, url: '/production/performance-management/defect-group' },
                { text: '불량 유형 관리', component: null, apiPath: null, url: '/production/performance-management/defect-type' },
                { text: '품질 검사 관리', component: null, apiPath: null, url: '/production/performance-management/quality-inspection' },
                { text: '생산품 입고 처리', component: null, apiPath: null, url: '/production/performance-management/product-receiving' },
                { text: '생산 일/월보 처리', component: null, apiPath: null, url: '/production/performance-management/daily-monthly-report' },
            ]
        },
        {
            text: '외주/계약 관리',
            items: [
                { text: '외주 단가 관리', component: null, apiPath: null, url: '/production/outsourcing-management/price' },
                { text: '외주 발주 관리', component: null, apiPath: null, url: '/production/outsourcing-management/order' },
                { text: '외주 검사 관리', component: null, apiPath: null, url: '/production/outsourcing-management/inspection' },
                { text: '외주 실적 관리', component: null, apiPath: null, url: '/production/outsourcing-management/performance' },
            ]
        }
    ],
}