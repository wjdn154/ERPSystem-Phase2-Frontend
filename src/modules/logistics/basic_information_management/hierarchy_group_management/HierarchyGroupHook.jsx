import { useState, useEffect, useCallback } from 'react';
import { notification } from 'antd';
import { getHierarchyGroupList, getWarehousesByHierarchyGroup } from './HierarchyGroupApi.jsx';

export const useHierarchyGroups = () => {
    const [flatHierarchyGroups, setFlatHierarchyGroups] = useState([]);
    const [selectedGroupId, setSelectedGroupId] = useState(null);

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

    const fetchWarehousesByGroup = useCallback(async (groupId) => {
        try {
            const data = await getWarehousesByHierarchyGroup(groupId);
            return data;
        } catch (error) {
            console.error("창고 목록 조회 실패:", error);
            return [];
        }
    }, []);


    useEffect(() => {
        fetchHierarchyGroups();
    }, [fetchHierarchyGroups]);

    return {
        flatHierarchyGroups,
        selectedGroupId,
        setSelectedGroupId,
        fetchWarehousesByGroup
    };
};
