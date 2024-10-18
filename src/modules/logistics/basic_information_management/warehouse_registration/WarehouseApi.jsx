import { LOGISTICS_API } from "../../../../config/apiConstants.jsx";
import apiClient from "../../../../config/apiClient.jsx";

// 창고 목록 조회
export const getWarehouseList = async () => {
  try {
    const response = await apiClient.post(LOGISTICS_API.WAREHOUSE_LIST_API);
    return response.data;
  } catch (error) {
    console.error("창고 목록을 가져오는 중 오류 발생:", error);
    throw error;
  }
}

// 창고 상세 조회
export const getWarehouseDetail = async (id) => {
    try {
        const response = await apiClient.post(LOGISTICS_API.WAREHOUSE_DETAIL_API(id));
        return response.data;
    } catch (error) {
        console.error("창고 상세 정보를 가져오는 중 오류 발생:", error);
        throw error;
    }
}

// 창고 등록
export const registerWarehouse = async (warehouse) => {
    try {
        await apiClient.post(LOGISTICS_API.WAREHOUSE_CREATE_API, warehouse);
    } catch (error) {
        console.error("창고 정보를 등록하는 중 오류 발생:", error);
        throw error;
    }
}

// 창고 수정
export const updateWarehouse = async (id, warehouse) => {
    try {
        await apiClient.put(LOGISTICS_API.WAREHOUSE_UPDATE_API(id), warehouse);
    } catch (error) {
        console.error("창고 정보를 수정하는 중 오류 발생:", error);
        throw error;
    }
}

// 창고 삭제
export const deleteWarehouse = async (id) => {
    try {
        await apiClient.delete(LOGISTICS_API.WAREHOUSE_DELETE_API(id));
    } catch (error) {
        console.error("창고 정보를 삭제하는 중 오류 발생:", error);
        throw error;
    }
}

