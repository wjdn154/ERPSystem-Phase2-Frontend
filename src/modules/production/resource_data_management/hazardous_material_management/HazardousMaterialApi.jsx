import axios from "axios";
import {PRODUCTION_API} from "../../../../config/apiConstants.jsx";

//유해물질 리스트 호출 함수
export const fetchHazardousMaterial = async () => {
    try {
        const response = await axios.post(PRODUCTION_API.HAZARDOUS_MATERIAL_LIST_API);
        return response.data;
    }catch (error){
        console.error("유해물질 리스트를 가져오는 중 오류 발생 : " + error);
        throw error;
    }
};

//유해물질 정보 등록 함수
export const saveHazardousMaterial = async (hazardousMaterialDetail) => {
    try {
        await axios.post(PRODUCTION_API.SAVE_HAZARDOUS_MATERIAL_API, hazardousMaterialDetail);
    }catch (error){
        if (error.response) {
            // 서버 응답 오류 처리
            console.error("서버 응답 오류:", error.response.status, error.response.data);
        } else if (error.request) {
            // 요청이 만들어졌으나 응답을 받지 못한 경우
            console.error("요청에 대한 응답이 없습니다:", error.request);
        } else {
            // 요청 설정 중 오류 발생
            console.error("유해물질 정보를 등록하는 중 오류 발생:", error.message);
        }
        throw error;
    }
};

//유해물질 정보 수정 함수
export const updateHazardousMaterial= async (id , hazardousMaterialDetail) => {
    console.log('api 정보 : ',id,hazardousMaterialDetail);
    try {
        // axios 요청의 결과를 response에 저장
        const response = await axios.put(
            PRODUCTION_API.UPDATE_HAZARDOUS_MATERIAL_API(id), hazardousMaterialDetail);

        // 응답 데이터 출력
        console.log('응답 데이터:', response.data);
    } catch (error) {
        console.error('유해물질 정보를 수정하는 중 오류 발생:', error);
        if (error.response) {
            console.error('서버 응답 오류:', error.response.status);
            console.error('서버 응답 데이터:', error.response.data);
        } else if (error.request) {
            console.error('응답이 없습니다. 요청 정보:', error.request);
        } else {
            console.error('오류 메시지:', error.message);
        }
        throw error;
    }
};

//유해물질 정보 삭제 함수
export const deleteHazardousMaterial = async (id) => {
    try {
        await axios.delete(PRODUCTION_API.DELETE_HAZARDOUS_MATERIAL_API(id));
    }catch (error){
        console.error("유해물질 정보를 삭제하는 중 오류 발생 : " + error);
        throw error;
    }
};