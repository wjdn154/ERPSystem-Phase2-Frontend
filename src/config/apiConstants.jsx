import axios from "axios";
import Cookies from 'js-cookie';

export const API_BASE_URL = process.env.NODE_ENV === 'production'
    ? "https://omz.kro.kr" // 운영 환경
    : "http://localhost:8080"; // 개발 환경

// 공통
export const COMMON_API = {
    LOGIN_API: `${API_BASE_URL}/api/hr/auth/login`, // 로그인 API
    REFRESH_TOKEN_API: `${API_BASE_URL}/api/hr/auth/refresh-token`, // 토큰 갱신 API
    COMPANY_LIST_API: `${API_BASE_URL}/api/financial/company/`, // 회사 목록 조회 API
    COMPANY_SEARCH_API: `${API_BASE_URL}/api/financial/company/search`, // 회사 검색 API
    REGISTER_API: `${API_BASE_URL}/api/hr/auth/register`, // 회원가입 API
};

// 재무회계
export const FINANCIAL_API = {
    ACCOUNT_SUBJECTS_API: `${API_BASE_URL}/api/financial/accountSubjects/`, // 계정과목 목록 조회 API
    ACCOUNT_SUBJECTS_SEARCH_API: `${API_BASE_URL}/api/financial/accountSubjects/search`, // 계정과목 검색 API
    ACCOUNT_SUBJECT_DETAIL_API: (code) => `${API_BASE_URL}/api/financial/accountSubjects/${code}`, // 계정과목 상세 조회 API
    SAVE_MEMO_API: (code) => `${API_BASE_URL}/api/financial/accountSubjects/saveMemo/${code}`, // 적요 저장 API
    SAVE_ACCOUNT_SUBJECT_API: `${API_BASE_URL}/api/financial/accountSubjects/save`, // 계정과목 저장 API
    UPDATE_ACCOUNT_SUBJECT_API: (code) => `${API_BASE_URL}/api/financial/accountSubjects/update/${code}`, // 계정과목 수정 API
    DELETE_ACCOUNT_SUBJECT_API: (code) => `${API_BASE_URL}/api/financial/accountSubjects/delete/${code}`, // 계정과목 삭제 API
    CLIENT_SEARCH_API: `${API_BASE_URL}/api/financial/client/search`, // 거래처 검색 API
};

// 인사관리 - 사원
export const EMPLOYEE_API = {
    EMPLOYEE_DATA_API: `${API_BASE_URL}/api/hr/employee/all`, // 사원 목록 조회 API
    EMPLOYEE_ADMIN_PERMISSION_API:(companyId) => `${API_BASE_URL}/api/hr/employee/permission/admin/${companyId}`, // 관리자 권한 직원 조회
    EMPLOYEE_DATA_DETAIL_API:(id) =>`${API_BASE_URL}/api/hr/employee/${id}`, // 사원 상세 조회 API
    SAVE_EMPLOYEE_DATA_API: `${API_BASE_URL}/api/hr/employee/createEmployee`, // 사원 등록 API
    UPDATE_EMPLOYEE_DATA_API:(id)=> `${API_BASE_URL}/api/hr/employee/updateEmployee/${id}`, // 사원 수정 API
    DELETE_EMPLOYEE_DATA_API:(id)=> `${API_BASE_URL}/api/hr/employee/del/${id}`,
};
// 인사관리 - 사용자
export const USERS_API = {
    USERS_PERMISSION_API: (username) => `${API_BASE_URL}/api/hr/users/permission/${username}`, // 사용자 권한 조회 API
    UPDATE_USERS_PERMISSION_API: `${API_BASE_URL}/api/hr/users/permission/update`,
    USERS_DATA_API: `${API_BASE_URL}/api/hr/users/all`,
    USERS_DATA_DETAIL_API: (id) => `${API_BASE_URL}/api/hr/users/${id}`,
    SAVE_USERS_DATA_API: `${API_BASE_URL}/api/hr/users/create`,
    UPDATE_USERS_DATA_API: (id)=> `${API_BASE_URL}/api/hr/users/put/${id}`,
    DELETE_USERS_DATA_API: (id) =>`${API_BASE_URL}/api/hr/users/del/${id}`,
}
// 인사관리 - 부서
export const DEPARTMENT_API = {
    DEPARTMENT_DATA_API: `${API_BASE_URL}/api/hr/department/all`,
}
// 물류관리
export const LOGISTICS_API = {
    WAREHOUSE_LIST_API: `${API_BASE_URL}/api/logistics/warehouse`, // 창고 목록 조회 API
    WAREHOUSE_DETAIL_API: (id) => `${API_BASE_URL}/api/logistics/warehouse/${id}`, // 창고 상세 조회 API
    WAREHOUSE_UPDATE_API: (id) => `${API_BASE_URL}/api/logistics//warehouse/updateWarehouse/${id}`
};
// 생산관리
export const PRODUCTION_API = {
    // 기초정보
    WORKCENTER_LIST_API: `${API_BASE_URL}/api/production/workcenters`, // 작업장 목록 조회 API
    WORKCENTER_DETAILS_API: (code) => `${API_BASE_URL}/api/production/workcenters/details/${code}`, // 작업장 세부정보 조회 API
    WORKCENTER_SEARCH_API: (name) => `${API_BASE_URL}/api/production/workcenters/search?name=${name}`, // 작업장 이름검색 API
    SAVE_WORKCENTER_API: `${API_BASE_URL}/api/production/workcenters/new`, // 새 작업장 저장 API
    UPDATE_WORKCENTER_API: (code) =>`${API_BASE_URL}/api/production/workcenters/update/${code}`, // 작업장 수정 API
    DELETE_WORKCENTER_API: (code) => `${API_BASE_URL}/api/production/workcenters/delete?code=${code}`, // 작업장 삭제 API
    SEARCH_FACTORIES_API: `${API_BASE_URL}/api/production/workcenters/factories`,

    PROCESS_LIST_API: `${API_BASE_URL}/api/production/processDetails`, // 생산공정 목록 조회 API
    PROCESS_DETAILS_API: (code) => `${API_BASE_URL}/api/production/processDetails/details/${code}`, // 생산공정 세부정보 조회 API
    PROCESS_SEARCH_API: (name) => `${API_BASE_URL}/api/production/processDetails/search?name=${name}`, // 생산공정 이름검색 API
    SAVE_PROCESS_API: `${API_BASE_URL}/api/production/processDetails/new`, // 새 생산공정 저장 API
    UPDATE_PROCESS_API: (code) => `${API_BASE_URL}/api/production/processDetails/update/${code}`, // 생산공정 수정 API
    DELETE_PROCESS_API: (code) =>`${API_BASE_URL}/api/production/processDetails/delete?code=${code}`, // 생산공정 삭제 API

    ROUTING_LIST_API: `${API_BASE_URL}/api/production/processRouting`, // 전체 processRouting 목록 조회 API
    ROUTING_DETAIL_API: (id) => `${API_BASE_URL}/api/production/processRouting/${id}`, // 특정 processRouting 조회 API
    ROUTING_CREATE_API: `${API_BASE_URL}/api/production/processRouting/new`, // processRouting 생성 API
    ROUTING_UPDATE_API: (id) => `${API_BASE_URL}/api/production/processRouting/update/${id}`, // processRouting 수정 API
    ROUTING_DELETE_API: (id) => `${API_BASE_URL}/api/production/processRouting/delete/${id}`, // processRouting 삭제 API
    ROUTING_SEARCH_PROCESS_DETAILS_API: `${API_BASE_URL}/api/production/processRouting/searchProcessDetails`, // 생산공정 검색 API
    ROUTING_SEARCH_PRODUCTS_API: `${API_BASE_URL}/api/production/processRouting/searchProducts`, // 제품 검색 API
    ROUTING_PREVIEW_PROCESS_DETAILS_API: (id) => `${API_BASE_URL}/api/production/processRouting/previewProcessDetails/${id}`, // 공정 상세조회 API
    ROUTING_PREVIEW_PRODUCT_API: (id) => `${API_BASE_URL}/api/production/processRouting/previewProduct/${id}`, // 제품 상세조회 API

    S_BOM_LIST_API: `${API_BASE_URL}/api/production/standardBoms`, // 표준 자재명세서 목록 조회 API
    S_BOM_DETAIL_API: (id) => `${API_BASE_URL}/api/production/standardBoms/${id}`, // 특정 표준 자재명세서 조회 API
    S_BOM_CREATE_API: `${API_BASE_URL}/api/production/standardBoms/new`, // 표준 자재명세서 생성 API
    S_BOM_UPDATE_API: (id) => `${API_BASE_URL}/api/production/standardBoms/update/${id}`, // 표준 자재명세서 업데이트 API
    S_BOM_DELETE_API: (id) => `${API_BASE_URL}/api/production/standardBoms/delete/${id}`, // 표준 자재명세서 삭제 API
    S_BOM_FORWARD_EXPLOSION_API: (parentProductId) => `${API_BASE_URL}/api/production/standardBoms/forward-explosion/${parentProductId}`, // 하위 BOM 조회 API
    S_BOM_BACKWARD_EXPLOSION_API: (childProductId) => `${API_BASE_URL}/api/production/standardBoms/backward-explosion/${childProductId}`, // 상위 BOM 조회 API

    // 자원
    WORKER_LIST_API: `${API_BASE_URL}/api/production/workers`,    //작업자 목록 조회 API
    WORKER_DETAIL_API:(id) => `${API_BASE_URL}/api/production/worker/${id}`,  //작업자 상세 조회 API
    UPDATE_WORKER_DETAIL_API: (id) => `${API_BASE_URL}/api/production/worker/updateWorker/${id}`, //작업자 상세 수정 API
    WORKER_ATTENDANCE_ASSIGNMENT_LIST_API: (id) => `${API_BASE_URL}/api/production/worker/attendance/${id}`, //작업자 근태,작업배치 목록 조회 API

    EQUIPMENT_DATA_API: `${API_BASE_URL}/api/production/equipmentDatas`,    //설비정보 목록 조회 API
    EQUIPMENT_DATA_DETAIL_API:(id) => `${API_BASE_URL}/api/production/equipmentData/${id}`,   //설비정보 상세 조회 API
    SAVE_EQUIPMENT_DATA_API: `${API_BASE_URL}/api/production/equipmentData/createEquipment`,         //설비정보 등록 API
    UPDATE_EQUIPMENT_DATA_API: (id) => `${API_BASE_URL}/api/production/equipmentData/updateEquipment/${id}`,  //설비정보 수정 API
    DELETE_EQUIPMENT_DATA_API: (id) => `${API_BASE_URL}/api/production/equipmentData/deleteEquipment/${id}`,  //설비정보 삭제 API

    MAINTENANCE_HISTORY_API: `${API_BASE_URL}/api/production/maintenanceHistorys`,    //유지보수 이력 목록 조회 API
    MAINTENANCE_HISTORY_DETAIL_API:(id) => `${API_BASE_URL}/api/production/maintenanceHistory/${id}`,  //유지보수 이력 상세 조회 API
    SAVE_MAINTENANCE_HISTORY_API: `${API_BASE_URL}/api/production/maintenanceHistory/createMaintenance`,    //유지보수 이력 등록 API
    UPDATE_MAINTENANCE_HISTORY_API: (id) => `${API_BASE_URL}/api/production/maintenanceHistory/updateMaintenance/${id}`, //유지보수 이력 수정 API
    DELETE_MAINTENANCE_HISTORY_API:(id) => `${API_BASE_URL}/api/production/maintenanceHistory/deleteMaintenance/${id}`,  //유지보수 이력 삭제 API

    // 생산운영 및 계획
    PRODUCTION_REQUEST_LIST_API: `${API_BASE_URL}/api/production/productionRequest`, // 전체 생산 요청 목록 조회 API
    PRODUCTION_REQUEST_DETAIL_API: (id) => `${API_BASE_URL}/api/production/productionRequest/${id}`, // 특정 생산 요청 조회 API
    PRODUCTION_REQUEST_CREATE_API: `${API_BASE_URL}/api/production/productionRequest/create`, // 생산 요청 생성 API
    PRODUCTION_REQUEST_UPDATE_API: (id) => `${API_BASE_URL}/api/production/productionRequest/update/${id}`, // 생산 요청 수정 API
    PRODUCTION_REQUEST_DELETE_API: (id) => `${API_BASE_URL}/api/production/productionRequest/delete/${id}`, // 생산 요청 삭제 API

    // 작업지시
    SHIFT_TYPE_LIST_API: `${API_BASE_URL}/api/production/shiftType/`, // 전체 교대유형 목록 조회 API
    SHIFT_TYPE_DETAIL_API: (id) => `${API_BASE_URL}/api/production/shiftType/${id}/`, // 특정 교대유형 조회 API
    SHIFT_TYPE_CREATE_API: `${API_BASE_URL}/api/production/shiftType/new/`, // 교대유형 생성 API
    SHIFT_TYPE_UPDATE_API: `${API_BASE_URL}/api/production/shiftType/update/`, // 교대유형 수정 API
    SHIFT_TYPE_DELETE_API: (id) => `${API_BASE_URL}/api/production/shiftType/delete/${id}`, // 교대유형 삭제 API

    WORKER_ASSIGNMENT_WORKCENTER_COUNT_API: `${API_BASE_URL}/api/production/workerAssignment/workcenters/count`, // 전체 작업장별 배정된 인원수 조회 API
    WORKER_ASSIGNMENT_WORKCENTER_DETAIL_API: (workcenterCode) => `${API_BASE_URL}/api/production/workerAssignment/workcenter/${workcenterCode}`, // 특정 작업장 배정된 작업자 명단 조회 API
    WORKER_ASSIGNMENT_CHECK_API: `${API_BASE_URL}/api/production/workerAssignment/check`, // 특정 날짜에 작업자 배정 상태 확인 API
    WORKER_ASSIGNMENT_DAILY_API: `${API_BASE_URL}/api/production/workerAssignment/daily`, // 일별 모든 작업장의 작업자 배정 이력 조회 API
    WORKER_ASSIGNMENT_MONTHLY_API: `${API_BASE_URL}/api/production/workerAssignment/monthly`, // 월별 모든 작업장의 작업자 배정 이력 조회 API
    WORKER_ASSIGNMENT_TODAY_SUMMARY_API: `${API_BASE_URL}/api/production/workerAssignment/today/summary`, // 오늘의 작업장별 배정인원 상세명단 조회 API
    WORKER_ASSIGNMENT_PRODUCTION_ORDER_SUMMARY_API: (productionOrderId) => `${API_BASE_URL}/api/production/workerAssignment/productionOrder/${productionOrderId}/summary`, // 작업지시별 작업자 명단 조회 API
    WORKER_ASSIGNMENT_WORKER_HISTORY_API: (workerId) => `${API_BASE_URL}/api/production/workerAssignment/worker/${workerId}/assignments`, // 작업자별 배치이력 조회 API

    PRODUCTION_ORDER_LIST_API: `${API_BASE_URL}/api/production/productionOrder`, // 전체 작업 지시 목록 조회 API
    PRODUCTION_ORDER_DETAIL_API: (id) => `${API_BASE_URL}/api/production/productionOrder/${id}`, // 특정 작업 지시 조회 API
    PRODUCTION_ORDER_CREATE_API: `${API_BASE_URL}/api/production/productionOrder/create`, // 작업 지시 생성 API
    PRODUCTION_ORDER_ASSIGN_WORKERS_API: (id) => `${API_BASE_URL}/api/production/productionOrder/${id}/assignWorkers`, // 작업 지시 작업자 배정 API
    PRODUCTION_ORDER_UPDATE_API: (id) => `${API_BASE_URL}/api/production/productionOrder/update/${id}`, // 작업 지시 수정 API
    PRODUCTION_ORDER_DELETE_API: (id) => `${API_BASE_URL}/api/production/productionOrder/delete/${id}`, // 작업 지시 삭제 API

    // 생산실적

    // 품질관리

    // 외주/계약관리

    // 기타 메뉴구조도순으로 정렬
};