import {useEffect, useMemo, useState} from "react";
import {
    fetchEquipmentData,
    fetchEquipmentDataDetail,
    updateEquipmentDataDetail,
    saveEquipmentDataDetail,
    deleteEquipmentDataDetail
} from "../services/EquipmentDataApi.jsx";

export const equipmentDataHook = (initialData) => {

    const [data, setData] = useState(initialData || {});
    const [showDetail, setShowDetail] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
    const [equipmentDataDetail, setEquipmentDataDetail] = useState({});

    const equipmentMemoizedData = useMemo(() => data, [data]);
    console.log(data);
    console.log(equipmentDataDetail);
    console.log("hook",initialData);
    useEffect(() => {
        if(selectedRow !==null){
            const seletedData = data.find(item => item.id === selectedRow);
            if(seletedData){
                setEquipmentDataDetail(seletedData);
                setShowDetail(true);
            }
        }

    }, [selectedRow, data]);

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




