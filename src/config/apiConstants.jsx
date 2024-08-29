const API_BASE_URL = "http://localhost:8080";

// 재무회계
export const FINANCIAL_API = {
    ACCOUNT_SUBJECTS_API: `${API_BASE_URL}/api/financial/accountSubjects`, // 계정과목 목록 조회 API
    ACCOUNT_SUBJECT_DETAIL_API: (code) => `${API_BASE_URL}/api/financial/accountSubjects/${code}`, // 계정과목 상세 조회 API
    SAVE_MEMO_API: (code) => `${API_BASE_URL}/api/financial/accountSubjects/saveMemo/${code}`, // 적요 저장 API
    SAVE_ACCOUNT_SUBJECT_API: `${API_BASE_URL}/api/financial/accountSubjects/saveAccountSubject`, // 계정과목 저장 API
    UPDATE_ACCOUNT_SUBJECT_API: (code) => `${API_BASE_URL}/api/financial/accountSubjects/updateAccountSubject/${code}`, // 계정과목 수정 API
    DELETE_ACCOUNT_SUBJECT_API: (code) => `${API_BASE_URL}/api/financial/accountSubjects/deleteAccountSubject/${code}`, // 계정과목 삭제 API
};

// 인사관리
export const HR_API = {
    Employee_API: `${API_BASE_URL}/api/hr/employee/all`, // 사원 목록 조회 API
    EmployeeONE_API: `${API_BASE_URL}/api/employee/${id}`, // 사원 상세 조회 API
    CREATEEmployee_API: `${API_BASE_URL}/api/employee/createEmployee`, // 사원 등록 API
    UPDATEEmployee_API: `${API_BASE_URL}/employee/updateEmployee/${id}`, // 사원 수정 API
    DELETEEmployee_API: `${API_BASE_URL}/api/employee/del/${id}`,
};

// 물류관리
export const LOGISTICS_API = {
};

// 생산관리
export const PRODUCTION_API = {
    EQUIPMENT_DATA_API:`${API_BASE_URL}/api/production/equipmentDatas`,    //설비정보 목록 조회 API
    EQUIPMENT_DATA_DETAIL_API:(id) => `${API_BASE_URL}/api/production/equipmentData/${id}`,   //설비정보 상세 조회 API
    SAVE_EQUIPMENT_DATA_API: `${API_BASE_URL}/api/production/equipmentData/createEquipment`,         //설비정보 등록 API
    UPDATE_EQUIPMENT_DATA_API: (id) => `${API_BASE_URL}/api/production/equipmentData/updateEquipment/${id}`,  //설비정보 수정 API
    DELETE_EQUIPMENT_DATA_API: (id) => `${API_BASE_URL}/api/production/equipmentData/deleteEquipment/${id}`,  //설비정보 삭제 API

    MAINTENANCE_HISTORY_API: `${API_BASE_URL}/api/production/maintenanceHistory`,    //유지보수 이력 목록 조회 API
    MAINTENANCE_HISTORY_DETAIL_API:(id) => `${API_BASE_URL}/api/production/maintenanceHistory/${id}`,  //유지보수 이력 상세 조회 API
    SAVE_MAINTENANCE_HISTORY_API: `${API_BASE_URL}/api/production/maintenanceHistory/createMaintenance`,    //유지보수 이력 등록 API
    UPDATE_MAINTENANCE_HISTORY_API: (id) => `${API_BASE_URL}/api/production/maintenanceHistory/updateMaintenance/${id}`, //유지보수 이력 수정 API
    DELETE_MAINTENANCE_HISTORY_API:(id) => `${API_BASE_URL}/api/production/maintenanceHistory/deleteMaintenance/${id}`,  //유지보수 이력 삭제 API
};