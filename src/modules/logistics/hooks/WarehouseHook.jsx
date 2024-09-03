import { useEffect, useMemo, useState } from 'react';
import { warehouseApi, fetchWarehouseDetail, updateWarehouseDetail } from '../services/WarehouseApi.jsx';

export const warehouseHook = (initialData) => {
    const [data, setData] = useState(initialData);
    const [selectedRow, setSelectedRow] = useState(null);
    const [warehouseDetail, setWarehouseDetail] = useState(initialData?.warehouseDetail || null);
    const [showDetail, setShowDetail] = useState(false);

    const memoizedData = useMemo(() => data, [data]);

    useEffect(() => {
        if (warehouseDetail) {
            setShowDetail(false);
            setTimeout(() => {
                setShowDetail(true);
            }, 0);
        }
    }, [warehouseDetail]);

    // 행 선택 핸들러 설정
    const handleRowSelection = {
        type: 'radio',
        selectedRowKeys: selectedRow ? [selectedRow.id] : [],
        onChange: (selectedRowKeys, selectedRows) => {
            if (selectedRows.length > 0) {
                handleSelectedRow(selectedRows[0]);
            }
        },
    };

    const handleSelectedRow = async (selectedRow) => {
        setSelectedRow(selectedRow);
        try {
            const detail = await fetchWarehouseDetail(selectedRow.id);
            setWarehouseDetail(detail);
        } catch (error) {
            console.error("API에서 데이터를 가져오는 중 오류 발생:", error);
        }
    };

    const handleInputChange = (e, key) => {
        const value = e.target.value;
        setWarehouseDetail(prevState => ({
            ...prevState,
            [key]: value,
        }));
    };

    const handleSave = async () => {
        try {
            const confirmSave = window.confirm("정말로 저장하시겠습니까?");
            if (!confirmSave) return;

            await updateWarehouseDetail(warehouseDetail.id, warehouseDetail);
            const updatedData = await fetchWarehouseList();
            setData(updatedData);
        } catch (error) {
            console.error("API에서 데이터를 가져오는 중 오류 발생:", error);
        }
    }

    return {
        data,
        warehouseDetail,
        setWarehouseDetail,
        handleRowSelection,
        handleInputChange,
        handleSelectedRow,
        handleSave,
        showDetail,
    };
};
