import { useState, useEffect } from 'react';
import { fetchWarehouseList } from '../services/WarehouseApi'; // API 호출 함수들

const WarehouseManagerHook = () => {
    const [data, setData] = useState([]); // 창고 목록 데이터
    const [loading, setLoading] = useState(true); // 로딩 상태 관리
    const [isModalVisible, setIsModalVisible] = useState(false); // 모달 보이기 상태
    const [isSubmitting, setIsSubmitting] = useState(false); // 제출 로딩 상태
    const [selectedWarehouse, setSelectedWarehouse] = useState(null); // 선택한 창고
    const [error, setError] = useState(null); // 에러 상태 관리

    // 창고 목록 불러오기
    const loadWarehouseList = async () => {
        setLoading(true);
        try {
            const warehouseData = await fetchWarehouseList();
            setData(warehouseData);
        } catch (error) {
            setError('창고 목록을 불러오는 데 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadWarehouseList();
    }, []);


    return {
        data,
        loading,
        isModalVisible,
        isSubmitting,
        selectedWarehouse,
        error,
    };
};

export default WarehouseManagerHook;
