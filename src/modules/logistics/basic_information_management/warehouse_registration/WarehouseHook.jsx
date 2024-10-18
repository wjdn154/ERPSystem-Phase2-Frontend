import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
    getWarehouseList,
    getWarehouseDetail,
    updateWarehouse,
    deleteWarehouse,
    registerWarehouse,
} from './WarehouseApi';
import { notification } from 'antd';

export const useWarehouse = () => {
    const [warehouseList, setWarehouseList] = useState([]);
    const [warehouseDetail, setWarehouseDetail] = useState(null);
    const [selectedWarehouseId, setSelectedWarehouseId] = useState(null);
    const [isCreating, setIsCreating] = useState(false);

    // **창고 목록 가져오기**
    const fetchWarehouseList = useCallback(async () => {
        try {
            const list = await getWarehouseList();
            setWarehouseList(list);
        } catch (error) {
            setWarehouseList([]); // 실패 시 초기화
            notification.error({
                message: '창고 목록 조회 실패',
                description: '목록 조회 중 오류가 발생했습니다.',
            });
        }
    }, []);

    // **창고 상세 정보 가져오기**
    const fetchWarehouseDetail = useCallback(async (id) => {
        let isMounted = true;
        try {
            const detail = await getWarehouseDetail(id);
            if (isMounted) setWarehouseDetail(detail);
        } catch (error) {
            if (isMounted) {
                notification.error({
                    message: '창고 상세 조회 실패',
                    description: '상세 정보 조회 중 오류가 발생했습니다.',
                });
            }
        }
        return () => {
            isMounted = false;
        };
    }, []);

    // **신규 창고 등록**
    const handleRegisterWarehouse = async (data) => {
        try {
            await registerWarehouse(data);
            notification.success({ message: '창고가 등록되었습니다.' });
            setIsCreating(false);
            await fetchWarehouseList(); // 목록 최신화
        } catch (error) {
            notification.error({
                message: '창고 등록 실패',
                description: '오류가 발생했습니다.',
            });
        }
    };

    // **창고 정보 수정**
    const handleUpdateWarehouse = async (id, data) => {
        try {
            await updateWarehouse(id, data);
            notification.success({ message: '창고가 수정되었습니다.' });
            await fetchWarehouseDetail(id); // 상세 정보 최신화
            await fetchWarehouseList(); // 목록 최신화
        } catch (error) {
            notification.error({
                message: '창고 수정 실패',
                description: '수정 중 오류가 발생했습니다.',
            });
        }
    };

    // **창고 삭제**
    const handleDeleteWarehouse = async (id) => {
        try {
            await deleteWarehouse(id);
            notification.success({ message: '창고가 삭제되었습니다.' });
            setSelectedWarehouseId(null); // 선택 초기화
            await fetchWarehouseList(); // 목록 최신화
        } catch (error) {
            notification.error({
                message: '창고 삭제 실패',
                description: '삭제 중 오류가 발생했습니다.',
            });
        }
    };

    useEffect(() => {
        fetchWarehouseList(); // 컴포넌트 마운트 시 목록 불러오기
    }, [fetchWarehouseList]);

    useEffect(() => {
        if (selectedWarehouseId && warehouseDetail?.id !== selectedWarehouseId) {
            fetchWarehouseDetail(selectedWarehouseId); // 선택된 창고 상세 조회
        }
    }, [selectedWarehouseId, fetchWarehouseDetail, warehouseDetail]);

    return useMemo(() => ({
        warehouseList,
        warehouseDetail,
        selectedWarehouseId,
        setSelectedWarehouseId,
        isCreating,
        setIsCreating,
        handleRegisterWarehouse,
        handleUpdateWarehouse,
        handleDeleteWarehouse,
    }), [warehouseList, warehouseDetail, selectedWarehouseId, isCreating]);
};
