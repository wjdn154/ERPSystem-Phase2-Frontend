import axios from "axios";
import {EMPLOYEE_API} from "../../../config/apiConstants.jsx";
import apiClient from "../../../config/apiClient.jsx";

// 사원정보 기본 호출 함수
export const fetchEmployeeData = async () => {
    try{
        const response = await apiClient.post(EMPLOYEE_API.EMPLOYEE_DATA_API);
        return response.data;
    }catch(error){
        console.error("사원 정보를 가져오는 중 오류 발생 : " + error);
        throw error;
    }
}

// 사원정보 상세 호출 함수
export const fetchEmployeeDataDetail = async (id) => {
    try{
        const response = await apiClient.get(EMPLOYEE_API.EMPLOYEE_DATA_DETAIL_API);
        return response.data;
    } catch (error){
        console.error("사원 상세 정보를 가져오는 중 오류 발생 : " + error);
        throw error;
    }
}