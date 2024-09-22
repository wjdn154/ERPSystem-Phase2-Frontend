import axios from 'axios';
import { LOGISTICS_API } from '../../../config/apiConstants.jsx';
import apiClient from "../../../config/apiClient.jsx";

export const fetchWarehouseList = async () => {
    try {
        const response = await apiClient.post(LOGISTICS_API.WAREHOUSE_LIST_API);
        return response.data;
    } catch (error) {
        console.error("창고 리스트를 가져오는 중 오류 발생:", error);
        throw error;
    }
};

// 창고 상세 정보 불러오기
export const fetchWarehouseDetail = async (warehouseId) => {
    const response = await apiClient.post(LOGISTICS_API.WAREHOUSE_DETAIL_API(warehouseId));
    return response.data;  // 서버에서 받은 창고 상세 정보 반환
};

// 창고 정보 업데이트
export const updateWarehouse = async (warehouseId, updatedData) => {
    try {
        const response = await apiClient.post(
            LOGISTICS_API.WAREHOUSE_UPDATE_API(warehouseId),
            {
                ...updatedData,
                hierarchyGroupList: updatedData.hierarchyGroupList.map(id => ({ id })),  // 계층 그룹 리스트 변환
            }
        );
        return response.data;
    } catch (error) {
        console.error("창고 정보를 업데이트하는 중 오류 발생:", error);
        throw error;
    }
};
