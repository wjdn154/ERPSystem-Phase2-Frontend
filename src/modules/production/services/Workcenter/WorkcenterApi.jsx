import axios from 'axios';
import { PRODUCTION_API } from '../../../../config/apiConstants.jsx';

// 작업장 목록 조회 함수
export const fetchWorkcenters = async () => {
    try {
        const response = await axios.post(PRODUCTION_API.WORKCENTER_API);
        console.log("API 응답 데이터:", response.data); // API 응답 데이터를 콘솔에 출력
        return response.data;
    } catch (error) {
        console.error("작업장 목록을 가져오는 중 오류 발생:", error);
        throw error;
    }
};

// 작업장 상세 정보 조회 함수
export const fetchWorkcenterDetails = async (code) => {
    try {
        const response = await axios.post(PRODUCTION_API.WORKCENTER_DETAILS_API.replace(code));
        return response.data; // 데이터를 반환
        console.log(data);

    } catch (error) {
        console.error("작업장 상세 정보를 가져오는 중 오류 발생:", error);
        throw error; // 호출한 곳에서 에러 처리
    }
};

// 작업장 이름 검색 함수
export const searchWorkcenterByName = async (name) => {
    try {
        const response = await axios.post(PRODUCTION_API.WORKCENTER_SEARCH_API, { name });
        return response.data;
    } catch (error) {
        console.error("검색한 키워드를 포함한 작업장명을 가져오는 중 오류 발생:", error);
        throw error;
    }
}

// 새 작업장 저장 함수
export const createWorkcenter = async (newWorkcenter) => {
    try {
        const response = await axios.post(PRODUCTION_API.SAVE_WORKCENTER_API, newWorkcenter);
        return response.data; // 생성된 작업장 데이터를 반환
    } catch (error) {
        console.error("작업장을 생성하는 중 오류 발생:", error);
        throw error; // 호출한 곳에서 에러 처리
    }
};

// 작업장 수정 함수
export const updateWorkcenter = async (code, updatedWorkcenter) => {
    try {
        const response = await axios.post(PRODUCTION_API.UPDATE_WORKCENTER_API.replace(code));
        return response.data; // 수정된 작업장 데이터를 반환
    } catch (error) {
        console.error("작업장을 수정하는 중 오류 발생:", error);
        throw error; // 호출한 곳에서 에러 처리
    }
};

// 작업장 삭제 함수
export const deleteWorkcenter = async (code) => {
    try {
        await axios.post(PRODUCTION_API.DELETE_WORKCENTER_API(code));
    } catch (error) {
        console.error("작업장을 삭제하는 중 오류 발생:", error);
        throw error; // 호출한 곳에서 에러 처리
    }
};
