import { useState, useEffect } from 'react';
import { fetchWarehouseDetail, updateWarehouse } from '../services/WarehouseApi';

const useWarehouseDetail = (initialData) => {
    const [data, setData] = useState(initialData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [warehouse, setWarehouse] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    // 창고 상세 정보 불러오기
    const loadWarehouseDetail = async (id) => {
        setLoading(true);
        try {
            const data = await fetchWarehouseDetail(id);
            setWarehouse(data);
        } catch (error) {
            setError('창고 정보를 불러오는 데 실패했습니다.');
        } finally {
            setLoading(false);
        }
    };

    // 모달 열기
    const openModal = (id) => {
        setIsModalVisible(true);
        if (id) {
            loadWarehouseDetail(id);
        }
    };

    // 모달 닫기
    const closeModal = () => {
        setIsModalVisible(false);
        setWarehouse(null); // 모달을 닫을 때 선택된 창고 초기화
    };

    return {
        warehouse,
        loading,
        error,
        isModalVisible,
        openModal,
        closeModal,
        loadWarehouseDetail
    };
};

export default useWarehouseDetail;
