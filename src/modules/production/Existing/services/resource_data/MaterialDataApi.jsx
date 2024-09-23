import axios from "axios";
import {PRODUCTION_API} from "../../../../config/apiConstants.jsx";

//자재 리스트 호출 함수
export const fetchMaterialDataList = async () => {
    try {
        const response = await axios.post(PRODUCTION_API.MATERIAL_LIST_API);
        return response.data;
    }catch (error){
        console.error("자재 정보를 가져오는 중 오류 발생 : " + error);
        throw error;
    }
};


//자재 정보 등록 함수
export const saveMaterialData = async (materialDataDetail) => {
    try {
        await axios.post(PRODUCTION_API.SAVE_WORKCENTER_API, materialDataDetail);
    }catch (error){
        if (error.response) {
            // 서버 응답 오류 처리
            console.error("서버 응답 오류:", error.response.status, error.response.data);
        } else if (error.request) {
            // 요청이 만들어졌으나 응답을 받지 못한 경우
            console.error("요청에 대한 응답이 없습니다:", error.request);
        } else {
            // 요청 설정 중 오류 발생
            console.error("자재 정보를 등록하는 중 오류 발생:", error.message);
        }
        throw error;
    }
};

//자재 정보 수정 함수
export const updateMaterialData= async (id , materialDataDetail) => {
    console.log('api 정보 : ',id,materialDataDetail);
    try {
        // axios 요청의 결과를 response에 저장
        const response = await axios.put(
            PRODUCTION_API.UPDATE_MATERIAL_API(id),
            materialDataDetail
        );

        // 응답 데이터 출력
        console.log('응답 데이터:', response.data);
    } catch (error) {
        console.error('API에서 데이터를 수정하는 중 오류 발생:', error);
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

//자재 정보 삭제 함수
export const deleteMaterialData = async (id) => {
    try {
        await axios.delete(PRODUCTION_API.DELETE_MATERIAL_API(id));
    }catch (error){
        console.error("자재 정보를 삭제하는 중 오류 발생 : " + error);
        throw error;
    }
};

//해당 자재 유해물질 목록 조회 함수
export const fetchHazardousMaterialList = async (id) => {
    try {
        const response = await axios.post(PRODUCTION_API.HAZARDOUS_MATERIAL_LIST_API(id));
        return response.data;
    }catch (error){
        console.error("해당 자재의 유해물질 정보를 가져오는 중 오류 발생 : " + error);
        throw error;
    }
};

//해당 자재 품목 목록 조회 함수
export const fetchProductMaterialList = async (id) => {
    try {
        const response = await axios.post(PRODUCTION_API.PRODUCT_MATERIAL_LIST_API(id));
        return response.data;
    }catch (error){
        console.error("해당 자재의 품목 정보를 가져오는 중 오류 발생 : " + error);
        throw error;
    }
};