import { useState, useEffect, useCallback } from 'react';
import { notification } from 'antd';
import { getHierarchyGroupList, getWarehousesByHierarchyGroup } from './HierarchyGroupApi.jsx';

export const useHierarchyGroups = () => {
    const [flatHierarchyGroups, setFlatHierarchyGroups] = useState([]); // 드롭다운용 평탄화된 그룹
    const [selectedGroupId, setSelectedGroupId] = useState(null);

    // **트리 및 평탄화된 계층 그룹 데이터 생성 함수**
    const flattenGroups = (groups = []) => {
        return groups.flatMap((group) => [
            {
                id: group.id,
                code: group.hierarchyGroupCode,
                name: group.hierarchyGroupName,
            },
            ...flattenGroups(group.childGroups || []), // 하위 그룹 평탄화
        ]);
    };

    // **계층 그룹 목록 조회 및 설정**
    const fetchHierarchyGroups = useCallback(async () => {
        try {
            const groups = await getHierarchyGroupList();

            setFlatHierarchyGroups(flattenGroups(groups)); // 드롭다운용 데이터 설정

        } catch (error) {
            notification.error({
                message: '계층 그룹 조회 실패',
                description: '계층 그룹 목록 조회 중 오류가 발생했습니다.',
            });
        }
    }, []);

    // **창고 목록 조회 함수 정의 (반드시 확인!)**
    const fetchWarehousesByGroup = useCallback(async (groupId) => {
        try {
            const data = await getWarehousesByHierarchyGroup(groupId);
            return data;
        } catch (error) {
            console.error("창고 목록 조회 실패:", error);
            return [];
        }
    }, []);


    // **컴포넌트 마운트 시 계층 그룹 데이터 조회**
    useEffect(() => {
        fetchHierarchyGroups();
    }, [fetchHierarchyGroups]);

    return {
        flatHierarchyGroups, // 드롭다운용 평탄화된 데이터
        selectedGroupId, // 선택된 그룹 ID
        setSelectedGroupId, // 그룹 ID 설정 함수
        fetchWarehousesByGroup
    };
};
