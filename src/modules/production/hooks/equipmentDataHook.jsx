import {useEffect, useMemo, useState} from "react";
import {
    fetchEquipmentData,
    fetchEquipmentDataDetail,
    updateEquipmentDataDetail,
    saveEquipmentDataDetail,
    deleteEquipmentDataDetail
} from "../services/EquipmentDataApi.jsx";

export const equipmentDataHook = (initialData) => {

    const [data, setData] = useState(initialData);
    const [showDetail, setShowDetail] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [equipmentDataDetail, setEquipmentDataDetail] = useState(initialData.equipmentDataDetail);

    const equipmentMemoizedData = useMemo(() => data, [data]);

    useEffect(() => {
        if (equipmentDataDetail) {
            setShowDetail(false); // 기존 컴포넌트를 사라지게 함
            setTimeout(() => {
                setShowDetail(true); // 새 컴포넌트를 나타나게 함
            }, 0); // 0ms의 지연 시간 후에 나타나도록 설정
        }
    }, [equipmentDataDetail]);

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

    // 행 선택 시 설비정보 상세 정보를 가져오는 로직
    const handleSelectedRow = async (selectedRow) => {
        setSelectedRow(selectedRow);
        try {
            const detail = await fetchEquipmentDataDetail(selectedRow.id);
            setEquipmentDataDetail(detail);
        } catch (error) {
            console.error("API에서 데이터를 가져오는 중 오류 발생:", error);
        }
    };

return {
    data,
    showDetail,
    selectedRow,
    handleSelectedRow,
    handleRowSelection,
    equipmentDataDetail,
    setEquipmentDataDetail
};

};




