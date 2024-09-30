import axios from "axios";
import {DEPARTMENT_API} from "../../../../../../config/apiConstants.jsx";
import apiClient from "../../../../../../config/apiClient.jsx";

// 부서 기본 호출 함수
export const fetchDepartmentData = async () => {
    try{
        const response = await apiClient.post(DEPARTMENT_API.DEPARTMENT_DATA_API);
        return response.data;
    } catch(error){
        console.error("부서 정보를 가져오는 중 오류 발생 : " + error);
        throw error;
    }
}

export const fetchDepartmentDataDetail = async (id) => {
    try{
        const response = await axios.get(DEPARTMENT_API.DEPARTMENT_DATA_DETAIL_API);
        return response.data;
    } catch(error){
        console.error("부서 상세정보를 가져오는 중 오류 발생 : " + error)
        throw error;
    }
}