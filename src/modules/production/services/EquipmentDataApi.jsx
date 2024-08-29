import axios from "axios";
import {PRODUCTION_API} from "../../../config/apiConstants.jsx";

//설비정보 기본 호출 함수
export const fetchEquipmentData = async () => {
    try {
        const response = await axios.post(PRODUCTION_API.EQUIPMENT_DATA_API);
        return response.data;
    }catch (error){
        console.error("설비 정보를 가져오는 중 오류 발생 : " + error);
        throw error;
    }
};

//설비정보 상세 호출 함수
export const fetchEquipmentDataDetail = async (id) => {
    try {
        const response = await axios.post(PRODUCTION_API.EQUIPMENT_DATA_DETAIL_API);
        return response.data;
    } catch (error){
        console.error("설비 상세 정보를 가져오는 중 오류 발생 : " + error);
        throw error;
    }
};

//설비정보 등록 함수
export const saveEquipmentDataDetail = async (equipmentDataDetail) => {
    try {
        await axios.post(PRODUCTION_API.SAVE_EQUIPMENT_DATA_API);
    }catch (error){
        console.error("설비정보를 등록하는 중 오류 발생 : " + error);
        throw error;
    }
}

//설비정보 수정 함수
export const updateEquipmentDataDetail = async (id , equipmentDataDetail) => {
    try {
        await axios.put(PRODUCTION_API.UPDATE_EQUIPMENT_DATA_API(id),
            equipmentDataDetail
            );
    } catch (error){
        console.error("설비정보를 업데이트 하는 중 오류 발생 : " + error);
        throw error;
    }
};

//설비정보 삭제 함수
export const deleteEquipmentDataDetail = async (id) => {
    try {
        await axios.delete(PRODUCTION_API.DELETE_EQUIPMENT_DATA_API(id));
    }catch (error){
        console.error("설비정보를 삭제하는 중 오류 발생 : " + error);
        throw error;
    }
}