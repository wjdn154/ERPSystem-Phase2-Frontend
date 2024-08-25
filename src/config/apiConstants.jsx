const API_BASE_URL = "http://localhost:8080";

// 재무회계
export const FINANCIAL_API = {
  ACCOUNT_SUBJECTS_API: `${API_BASE_URL}/api/financial/accountSubjects`, // 계정과목 목록 조회 API
  ACCOUNT_SUBJECT_DETAIL_API: (code) =>
    `${API_BASE_URL}/api/financial/accountSubjects/${code}`, // 계정과목 상세 조회 API
  SAVE_MEMO_API: (code) =>
    `${API_BASE_URL}/api/financial/accountSubjects/saveMemo/${code}`, // 적요 저장 API
  SAVE_ACCOUNT_SUBJECT_API: `${API_BASE_URL}/api/financial/accountSubjects/saveAccountSubject`, // 계정과목 저장 API
  UPDATE_ACCOUNT_SUBJECT_API: (code) =>
    `${API_BASE_URL}/api/financial/accountSubjects/updateAccountSubject/${code}`, // 계정과목 수정 API
  DELETE_ACCOUNT_SUBJECT_API: (code) =>
    `${API_BASE_URL}/api/financial/accountSubjects/deleteAccountSubject/${code}`, // 계정과목 삭제 API
};

// 인사관리
export const HR_API = {};

// 물류관리
export const LOGISTICS_API = {};

// 생산관리
export const PRODUCTION_API = {
  WORKCENTER_API: `${API_BASE_URL}/api/production/workcenters`, // 작업장 목록 조회 API
  WORKCENTER_DETAILS_API: (code) => 
    `${API_BASE_URL}/api/production/workcenters/${code}`, // 작업장 상세 조회 API
  CREATE_WORKCENTER_API: `${API_BASE_URL}/api/production/workcenters/create`,   // 작업장 생성 API
  UPDATE_WORKCENTER_API: (code) => 
    `${API_BASE_URL}/api/production/workcenters/${code}`, // 작업장 수정 API
  DELETE_WORKCENTER_API: (id) =>
    `${API_BASE_URL}/api/production/workcenters/${id}`, // 작업장 삭제 API

  PROCESS_DETAILS_API: `${API_BASE_URL}/api/production/productionDetails`, // 생산공정 목록 조회 API
  PRODUCTION_ROUTING_API: `${API_BASE_URL}/api/production/productionRouting`, // 생산공정경로 목록 조회 API
};
