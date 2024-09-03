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
    const [isModalVisible, setIsModalVisible] = useState(false); //상태를 사용하여 모달 창이 열려 있는지 여부를 관리

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

    // 저장 버튼 클릭 시 실행되는 함수
    const handleSave = async () => {
        try {
            const confirmSave = window.confirm("저장하시겠습니까?");

            if (!confirmSave) return;
            console.log("저장버튼 클릭 시 equipmentDataDetail : ",equipmentDataDetail);
            await saveEquipmentDataDetail(equipmentDataDetail);
            const savedData = await fetchEquipmentData();
            setData(savedData);
        } catch (error) {
            console.error("API에서 데이터를 저장하는 중 오류 발생:", error);
        }
    }

    //수정 버튼 클릭 시 모달창 띄우는 함수
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
        // 여기서 수정 작업을 진행하거나 저장할 수 있습니다.
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // 수정 버튼 클릭 시 실행되는 함수
    const handleUpdate = async () => {
        try {
            console.log("수정버튼 클릭시 id : ",equipmentDataDetail.id);
            console.log("수정버튼 클릭 시 equipmentDataDetail : ",equipmentDataDetail);

            await updateEquipmentDataDetail(equipmentDataDetail.id, equipmentDataDetail);
            const updatedData = await fetchEquipmentData();
            setData(updatedData);
        } catch (error) {
            console.error("API에서 데이터를 수정하는 중 오류 발생:", error);
        }
    }

    //삭제 버튼 선택 클릭 시 실행되는 함수
   const handleDelete = async () => {
       const confirmDelete = window.confirm("정말로 삭제 하시겠습니까?");
        try{
            await deleteEquipmentDataDetail(equipmentDataDetail.id);
            const deletedData = await fetchEquipmentData();
            const deleteOK = window.alert('삭제 완료되었습니다.');
        }catch (error){
            console.error("API에서 데이터를 삭제하는 중 오류 발생:", error);
        }
   }


return {
    data,
    showDetail,
    selectedRow,
    handleSelectedRow,
    handleRowSelection,
    equipmentDataDetail,
    setEquipmentDataDetail,
    handleInputChange,
    handleSave,
    handleUpdate,
    handleDelete,
    isModalVisible,
    showModal,
    handleOk,
    handleCancel
};

};




