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
    const [selectedRow, setSelectedRow] = useState(null);    //선택된 행
    const [equipmentDataDetail, setEquipmentDataDetail] = useState(null);   //상세정보

    const equipmentMemoizedData = useMemo(() => data, [data]);

    console.log("hook 호출됨");
    //데이터가 변경될 때마다 컴포넌트를 새로 렌더링
    useEffect(() => {
        console.log('equipmentdata 변경됨 : ',equipmentDataDetail);
        if (equipmentDataDetail) {
            setShowDetail(true);
        } else {
            setShowDetail(false);
        }
    }, [equipmentDataDetail]);

    // 행 선택 핸들러 설정
    const handleRowSelection =  {
        type:'radio',
        selectedRowKeys: selectedRow ? [selectedRow.id] : [],
        onChange: (selectedRowKeys, selectedRows) => {
            if (selectedRows.length > 0) {
                handleSelectedRow(selectedRows[0]);
            } else{
                console.warn("비어있음.");
            }
        },
    };

    // 행 선택 시 설비정보 상세 정보를 가져오는 로직
    const handleSelectedRow = async (selectedRow) => {

        console.log('선택된 행 : ',selectedRow);
        if(!selectedRow) return;
        setSelectedRow(selectedRow);
        setShowDetail(false);   //상세정보 로딩중일때 기존 상세정보 숨기기

        console.log('selected row : ',selectedRow);
        try {
            console.log('selectedRow.id : ',selectedRow.id);
            const detail = await fetchEquipmentDataDetail(selectedRow.id);     //비동기 api 호출
            console.log('fetch detail : ',detail);
            setEquipmentDataDetail(detail);      //상세정보 설정

        } catch (error) {
            console.error("API에서 데이터를 가져오는 중 오류 발생:", error);
        }
    };

    //필드의 값이 변경될 때 호출되는 함수
    const handleInputChange = (e, key) => {
        const value = e.target.value;

        setEquipmentDataDetail(prevState => ({
            ...prevState,
            [key] : value,
        }));
    }

return {
    data,
    showDetail,
    selectedRow,
    handleSelectedRow,
    handleRowSelection,
    equipmentDataDetail,
    setEquipmentDataDetail,
    handleInputChange
};

};




