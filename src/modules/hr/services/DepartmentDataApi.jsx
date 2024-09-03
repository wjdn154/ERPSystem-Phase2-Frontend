import axios from "axios";
import {Department_API, USERS_API} from "../../../config/apiConstants.jsx";

// 부서 기본 호출 함수
export const fetchDepartmentData = async () => {
    try{
        const response = await axios.post(DEPARTMENT_API.DEPARTMENT_DATA_API);
        return response.data;
    } catch(error){
        console.error("부서 정보를 가져오는 중 오류 발생 : " + error);
        throw error;
    }
}

export const fetchDepartmentDataDetail = async (id) => {}