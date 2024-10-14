import { LOGISTICS_API } from "../../../../config/apiConstants.jsx";
import apiClient from "../../../../config/apiClient.jsx";

// 계층 그룹 목록 조회
export const getHierarchyGroupList = async () => {
    try {
        const response = await apiClient.post(LOGISTICS_API.HIERARCHY_GROUP_LIST_API);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("계층 그룹 목록을 가져오는 중 오류 발생:", error);
        throw error;
    }
}

// 계층 그룹 저장
export const registerHierarchyGroup = async (data) => {
    try {
        await apiClient.post(LOGISTICS_API.HIERARCHY_GROUP_SAVE_API, data);
    } catch (error) {
        console.error("계층 그룹 등록 중 오류 발생:", error);
        throw error;
    }
};

// 계층 그룹 수정
export const updateHierarchyGroup = async (id, data) => {
    try {
        await apiClient.put(LOGISTICS_API.HIERARCHY_GROUP_UPDATE_API(id), data);
    } catch (error) {
        console.error("계층 그룹 수정 중 오류 발생:", error);
        throw error;
    }
};

// 계층 그룹 삭제
export const deleteHierarchyGroup = async (id) => {
    try {
        await apiClient.delete(LOGISTICS_API.HIERARCHY_GROUP_DELETE_API(id));
    } catch (error) {
        console.error("계층 그룹 삭제 중 오류 발생:", error);
        throw error;
    }
};

// 특정 계층 그룹에 속한 창고 목록 조회
export const getWarehousesByHierarchyGroup = async (groupId) => {
    try {
        const response = await apiClient.post(LOGISTICS_API.HIERARCHY_GROUP_WAREHOUSES_API(groupId));
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("계층 그룹의 창고 목록 조회 중 오류 발생:", error);
        throw error;
    }
};