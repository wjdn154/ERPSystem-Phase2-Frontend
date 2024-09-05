import {useEffect, useMemo, useState} from "react";
import axios from "axios";
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
    const [isInsertModalVisible, setIsInsertModalVisible] = useState(false); //삭제 모달 상태
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false); //수정 모달 상태

    const equipmentMemoizedData = useMemo(() => data, [data]);

    //데이터가 변경될 때마다 컴포넌트를 새로 렌더링
    useEffect(() => {
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
    //등록 버튼 누를 시 값 초기화되는 함수
    const handleOpenInsertModal=() => {
        setIsInsertModalVisible(true);
        setEquipmentDataDetail({  // 모든 필드를 초기화
            workcenterCode: '',
            factoryCode: '',
            equipmentNum: '',
            equipmentName: '',
            modelName: '',
            equipmentType: '',
            manufacturer: '',
            purchaseDate: null,
            installDate: null,
            operationStatus: '',
            cost: '',
            equipmentImg: ''
        });
    };

    // 저장 버튼 클릭 시 실행되는 함수
    const handleSave = async () => {
        try {
            const confirmSave = window.confirm("저장하시겠습니까?");

            if (!confirmSave) return;
            console.log("저장버튼 클릭 시 equipmentDataDetail : ",equipmentDataDetail);
            await saveEquipmentDataDetail(equipmentDataDetail);
            const savedData = await fetchEquipmentData();
            setData(savedData);
            window.alert("저장되었습니다.");
            handleInsertOk();
        } catch (error) {
            console.error("API에서 데이터를 저장하는 중 오류 발생:", error);
        }
    };

    //등록 버튼 클릭 시 모달 창 띄우는 함수
    const insertEquipmentModal = () => {
        setIsInsertModalVisible(true);
    };
    //등록 취소 버튼 클릭 함수
    const handleInsertCancel = () => {
        setIsInsertModalVisible(false);
    }
    const handleInsertOk = async () => {
        setIsInsertModalVisible(false);
        await handleSave();
    }

    //수정 버튼 클릭 시 모달창 띄우는 함수
    const showModal = () => {
        setIsUpdateModalVisible(true);
    };

    const handleUpdateOk = async () => {
        setIsUpdateModalVisible(false);
        await handleUpdate();
        // 여기서 수정 작업을 진행하거나 저장할 수 있습니다.
    };

    const handleUpdateCancel = () => {
        setIsUpdateModalVisible(false);
    };

    // 수정 버튼 클릭 시 실행되는 함수
    const handleUpdate = async () => {
        try {
            const confirmSave = window.confirm("수정하시겠습니까?");
            console.log("수정버튼 클릭시 id : ",equipmentDataDetail.id);
            console.log("수정버튼 클릭 시 equipmentDataDetail : ",equipmentDataDetail);

            await updateEquipmentDataDetail(equipmentDataDetail.id, equipmentDataDetail);
            const updatedData = await fetchEquipmentData();
            setData(updatedData);
            window.alert("수정완료되었습니다.");
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
            window.alert('삭제 완료되었습니다.');
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
        showModal,
        handleUpdateOk,
        handleUpdateCancel,
        insertEquipmentModal,
        handleInsertOk,
        isInsertModalVisible,
        isUpdateModalVisible,
        handleInsertCancel,
        handleOpenInsertModal
    };

};




