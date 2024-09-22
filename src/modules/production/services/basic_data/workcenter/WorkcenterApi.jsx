import axios from 'axios';
import { PRODUCTION_API } from '../../../../../config/apiConstants.jsx';
import apiClient from "../../../../../config/apiClient.jsx";

// 작업장 목록 조회 함수
export const fetchWorkcenters = async () => {
    console.log("fetchWorkcenters 호출됨"); // 추가된 로그
    console.log("API 요청 URL:", PRODUCTION_API.WORKCENTER_LIST_API); // API URL 확인 로그

    try {
        const response = await apiClient.post(PRODUCTION_API.WORKCENTER_LIST_API);
        console.log("응답 데이터:", response.data); // 응답 데이터 확인용 로그
        return response.data;
    } catch (error) {
        console.error("작업장 정보를 가져오는 중 오류 발생:", error);
        throw error;
    }
};

// 특정 ID로 작업장 상세 정보 조회 함수
export const fetchWorkcenter = async (code) => {
    try {
        const response = await apiClient.post(PRODUCTION_API.WORKCENTER_DETAILS_API(code));
        console.log("ID로 상세 정보 조회 데이터 로그: ", response.data)
        return response.data;
    } catch (error) {
        console.error("작업장 상세 정보를 가져오는 중 오류 발생:", error);
        throw error;
    }
};

// 작업장 정보 생성 함수
export const createWorkcenter = async (workcenter) => {
    try {
        const response = await apiClient.post(PRODUCTION_API.SAVE_WORKCENTER_API, workcenter);
        return response.data;
    } catch (error) {
        console.error("작업장 정보를 생성하는 중 오류 발생:", error);
        throw error;
    }
};

// 작업장 정보 수정 함수
export const updateWorkcenter = async (code, workcenter) => {
    try {
        const response = await apiClient.post(PRODUCTION_API.UPDATE_WORKCENTER_API(code), workcenter);
        return response.data;
    } catch (error) {
        console.error("작업장 정보를 업데이트 하는 중 오류 발생:", error);
        throw error;
    }
};

// 작업장 정보 삭제 함수
export const deleteWorkcenter = async (code) => {
    try {
        const response = await apiClient.post(PRODUCTION_API.DELETE_WORKCENTER_API(code));
        return response.data;
    } catch (error) {
        // 백엔드에서 반환된 오류 메시지 추출
        const errorMessage = error.response?.data?.message || '삭제 중 오류가 발생했습니다.';
        throw new Error(errorMessage);
    }
};
