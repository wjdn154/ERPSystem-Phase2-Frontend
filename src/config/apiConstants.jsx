import axios from "axios";
import Cookies from 'js-cookie';


const API_BASE_URL = "http://localhost:8080";
// const API_BASE_URL = "https://omz.kro.kr";


axios.interceptors.request.use((config) => {
    const token = Cookies.get('jwt');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// 공통
export const COMMON_API = {
    LOGIN_API: `${API_BASE_URL}/api/hr/auth/login`, // 로그인 API
    COMPANY_LIST_API: `${API_BASE_URL}/api/financial/company/`, // 회사 목록 조회 API
    COMPANY_SEARCH_API: `${API_BASE_URL}/api/financial/company/search`, // 회사 검색 API
    REGISTER_API: `${API_BASE_URL}/api/hr/auth/register`, // 회원가입 API
};

// 재무회계
export const FINANCIAL_API = {
    ACCOUNT_SUBJECTS_API: `${API_BASE_URL}/api/financial/accountSubjects/`, // 계정과목 목록 조회 API
    ACCOUNT_SUBJECT_DETAIL_API: (code) => `${API_BASE_URL}/api/financial/accountSubjects/${code}`, // 계정과목 상세 조회 API
    SAVE_MEMO_API: (code) => `${API_BASE_URL}/api/financial/accountSubjects/saveMemo/${code}`, // 적요 저장 API
    SAVE_ACCOUNT_SUBJECT_API: `${API_BASE_URL}/api/financial/accountSubjects/save`, // 계정과목 저장 API
    UPDATE_ACCOUNT_SUBJECT_API: (code) => `${API_BASE_URL}/api/financial/accountSubjects/update/${code}`, // 계정과목 수정 API
    DELETE_ACCOUNT_SUBJECT_API: (code) => `${API_BASE_URL}/api/financial/accountSubjects/delete/${code}`, // 계정과목 삭제 API
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

    WORKCENTER_LIST_API: `${API_BASE_URL}/api/production/workcenters/`, // 작업장 목록 조회 API
    WORKCENTER_DETAILS_API: (code) => `${API_BASE_URL}/api/production/workcenters/details/${code}/`, // 작업장 세부정보 조회 API
    WORKCENTER_SEARCH_API: (name) => `${API_BASE_URL}/api/production/workcenters/search?name=${name}/`, // 작업장 이름검색 API
    SAVE_WORKCENTER_API: `${API_BASE_URL}/api/production/workcenters/create`, // 새 작업장 저장 API
    UPDATE_WORKCENTER_API: (code) =>`${API_BASE_URL}/api/production/workcenters/update/${code}/`, // 작업장 수정 API
    DELETE_WORKCENTER_API: (code) => `${API_BASE_URL}/api/production/workcenters/delete?code=${code}/`, // 작업장 삭제 API

    PROCESS_LIST_API: `${API_BASE_URL}/api/production/processDetails/`, // 생산공정 목록 조회 API
    PROCESS_DETAILS_API: (code) => `${API_BASE_URL}/api/production/processDetails/details/${code}/`, // 생산공정 세부정보 조회 API
    PROCESS_SEARCH_API: (name) => `${API_BASE_URL}/api/production/processDetails/search?name=${name}/`, // 생산공정 이름검색 API
    SAVE_PROCESS_API: `${API_BASE_URL}/api/production/processDetails/create/`, // 새 생산공정 저장 API
    UPDATE_PROCESS_API: (code) => `${API_BASE_URL}/api/production/processDetails/update/${code}/`, // 생산공정 수정 API
    DELETE_PROCESS_API: (code) =>`${API_BASE_URL}/api/production/processDetails/delete?code=${code}/`, // 생산공정 삭제 API

    WORKER_LIST_API: `${API_BASE_URL}/api/production/workers`,    //작업자 목록 조회 API
    WORKER_DETAIL_API:(id) => `${API_BASE_URL}/api/production/worker/${id}`,  //작업자 상세 조회 API
    UPDATE_WORKER_DETAIL_API: (id) => `${API_BASE_URL}/api/production/worker/updateWorker/${id}`, //작업자 상세 수정 API
    WORKER_ATTENDANCE_ASSIGNMENT_LIST_API: (id) => `${API_BASE_URL}/api/production/worker/attendance/${id}` //작업자 근태,작업배치 목록 조회 API

    // BOM

    // Routing

    // 생산계획

    // 작업지시

    // 생산실적

    // 품질관리

    // 외주/계약관리

    // 기타 메뉴구조도순으로 정렬
};