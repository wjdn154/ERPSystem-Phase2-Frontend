import axios from 'axios';
import { PRODUCTION_API } from '../../../../config/apiConstants';

// 작업장 목록 조회 함수
export const fetchWorkcenters = async () => {
    try {
        const response = await axios.get(PRODUCTION_API.WORKCENTER_API);
        return response.data; // 데이터를 반환
    } catch (error) {
        console.error("작업장 목록을 가져오는 중 오류 발생:", error);
        throw error; // 호출한 곳에서 에러 처리
    }
};

// 작업장 상세 정보 조회 함수
export const fetchWorkcenterDetails = async (id) => {
    try {
        const response = await axios.get(`${PRODUCTION_API.WORKCENTER_API}/${id}`);
        return response.data; // 데이터를 반환
    } catch (error) {
        console.error("작업장 상세 정보를 가져오는 중 오류 발생:", error);
        throw error; // 호출한 곳에서 에러 처리
    }
};

// 작업장 생성 함수
export const createWorkcenter = async (newWorkcenter) => {
    try {
        const response = await axios.post(PRODUCTION_API.WORKCENTER_API, newWorkcenter);
        return response.data; // 생성된 작업장 데이터를 반환
    } catch (error) {
        console.error("작업장을 생성하는 중 오류 발생:", error);
        throw error; // 호출한 곳에서 에러 처리
    }
};

// 작업장 수정 함수
export const updateWorkcenter = async (id, updatedWorkcenter) => {
    try {
        const response = await axios.put(`${PRODUCTION_API.WORKCENTER_API}/${id}`, updatedWorkcenter);
        return response.data; // 수정된 작업장 데이터를 반환
    } catch (error) {
        console.error("작업장을 수정하는 중 오류 발생:", error);
        throw error; // 호출한 곳에서 에러 처리
    }
};

// 작업장 삭제 함수
export const deleteWorkcenter = async (id) => {
    try {
        await axios.delete(`${PRODUCTION_API.WORKCENTER_API}/${id}`);
    } catch (error) {
        console.error("작업장을 삭제하는 중 오류 발생:", error);
        throw error; // 호출한 곳에서 에러 처리
    }
};
