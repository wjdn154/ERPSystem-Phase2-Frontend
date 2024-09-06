import {useEffect, useMemo, useState, useRef} from "react";
import axios from "axios";
import {
    fetchMaintenanceHistoryList,
    fetchMaintenanceHistoryDetail,
    saveMaintenanceHistoryDetail,
    updateMaintenanceHistoryDetail,
    deleteMaintenanceHistoryDetail} from "../../services/resourceData/MaintenanceHistoryApi.jsx"

export const maintenanceHistoryHook = (initialData) => {

    const [data, setData] = useState(initialData);
    const [showDetail, setShowDetail] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);    //선택된 행
    const [maintenanceDataDetail, setMaintenanceDataDetail] = useState(null);   //상세정보
    const [isInsertModalVisible, setIsInsertModalVisible] = useState(false); //삭제 모달 상태
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false); //수정 모달 상태
    const [activeTabKey, setActiveTabKey] = useState('1'); // tabs state
    const workcenterCodeRef = useRef(null);
    const factoryCodeRef = useRef(null);
    const equipmentNumRef = useRef(null);
    const equipmentNameRef = useRef(null);
    const modelNameRef = useRef(null);
    const manufacturerRef = useRef(null);
    const equipmentTypeRef = useRef(null);
    const installDateRef = useRef(null);
    const purchaseDateRef = useRef(null);
    const equipmentImgRef = useRef(null);

    const maintenanceMemoizedData = useMemo(() => data, [data]);

    //데이터가 변경될 때마다 컴포넌트를 새로 렌더링
    useEffect(() => {
        if (maintenanceDataDetail) {
            setShowDetail(true);
        } else {
            setShowDetail(false);
        }
    }, [maintenanceDataDetail]);

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
            const detail = await fe(selectedRow.id);     //비동기 api 호출
            console.log('fetch detail : ',detail);
            // 원래 설비 번호를 따로 저장 (originalEquipmentNum)
            setMaintenanceDataDetail({
                ...detail,
                originalMaintenanceNum: detail.originalMaintenanceNum  // 원래 설비번호 저장
            });

        } catch (error) {
            console.error("API에서 데이터를 가져오는 중 오류 발생:", error);
        }
    };

    //필드의 값이 변경될 때 호출되는 함수
    const handleInputChange = (e, key) => {
        const value = e.target.value;

        setMaintenanceDataDetail(prevState => ({
            ...prevState,
            [key] : value,
        }));

    }
    //등록 버튼 누를 시 값 초기화되는 함수
    const handleOpenInsertModal=() => {
        setIsInsertModalVisible(true);
        setMaintenanceDataDetail({  // 모든 필드를 초기화
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
            console.log("저장버튼 클릭 시 equipmentDataDetail : ",maintenanceDataDetail);
            await saveMaintenanceHistoryDetail(maintenanceDataDetail);
            const savedData = await fetchMaintenanceHistoryList();
            window.alert("저장되었습니다.");
            setIsInsertModalVisible(false);
            setData(savedData);
        } catch (error) {
            console.error("API에서 데이터를 저장하는 중 오류 발생:", error);
        }
    };

    // 비용 입력 시 숫자만 허용
    const handleCostInput = (e) => {
        const regex = /^[0-9\b]+$/; // 숫자와 백스페이스만 허용
        if (!regex.test(e.key)) {
            window.alert("비용 입력시 숫자만 입력하세요");
            setTimeout(() => costRef.current.focus(), 0);
        }
    };

    //등록 버튼 클릭 시 모달 창 띄우는 함수
    const insertMaintenanceModal = () => {
        setIsInsertModalVisible(true);
    };
    //등록 취소 버튼 클릭 함수
    const handleInsertCancel = () => {
        setIsInsertModalVisible(false);
    }
    const handleInsertOk = async () => {
        if (!maintenanceDataDetail.equipmentDataName) {
            alert("작업장 코드를 입력하세요.");
            setTimeout(() => workcenterCodeRef.current?.focus(), 0); // 경고창 닫힌 후 해당 input으로 포커스 이동
            return;
        }
        if (!maintenanceDataDetail.factoryCode) {
            alert("공장 코드를 입력하세요.");
            setTimeout(() => factoryCodeRef.current?.focus(), 0);
            return;
        }
        if (!maintenanceDataDetail.equipmentNum) {
            alert("설비 번호를 입력하세요.");
            setTimeout(() => equipmentNumRef.current?.focus(), 0);
            return;
        }
        if (!maintenanceDataDetail.equipmentName) {
            alert("설비 명을 입력하세요.");
            setTimeout(() => equipmentNameRef.current?.focus(), 0);
            return;
        }
        if (!maintenanceDataDetail.modelName) {
            alert("모델 명을 입력하세요.");
            setTimeout(() => modelNameRef.current?.focus(), 0);
            return;
        }
        if (!maintenanceDataDetail.equipmentType) {
            alert("설비 유형을 입력하세요.");
            return;
        }
        if (!maintenanceDataDetail.manufacturer) {
            alert("제조사를 입력하세요.");
            setTimeout(() => manufacturerRef.current?.focus(), 0);
            return;
        }
        if (!maintenanceDataDetail.purchaseDate) {
            alert("구매 날짜를 입력하세요.");
            return;
        }if (!maintenanceDataDetail.installDate) {
            alert("설치 날짜를 입력하세요.");
            return;
        }
        if (!maintenanceDataDetail.operationStatus) {
            alert("가동 상태를 입력하세요.");
            return;
        }
        if (!maintenanceDataDetail.cost) {
            alert("비용을 입력하세요.");
            setTimeout(() => costRef.current?.focus(), 0);
            return;
        }
        if (!maintenanceDataDetail.equipmentImg) {
            alert("설비 이미지를 입력하세요.");
            setTimeout(() => equipmentImgRef.current?.focus(), 0);
            return;
        }

        await handleSave();
    }

    //수정 버튼 클릭 시 모달창 띄우는 함수
    const showModal = () => {
        setIsUpdateModalVisible(true);
    };

    const handleUpdateOk = async () => {
        if (!equipmentDataDetail.E) {
            alert("작업장 코드를 입력하세요.");
            setTimeout(() => workcenterCodeRef.current.focus(), 0); // 경고창 닫힌 후 해당 input으로 포커스 이동
            return;
        }
        if (!equipmentDataDetail.factoryCode) {
            alert("공장 코드를 입력하세요.");
            setTimeout(() => factoryCodeRef.current.focus(), 0);
            return;
        }
        if (!equipmentDataDetail.equipmentNum) {
            alert("설비 번호를 입력하세요.");
            setTimeout(() => equipmentNumRef.current.focus(), 0);
            return;
        }
        if (!equipmentDataDetail.equipmentName) {
            alert("설비 명을 입력하세요.");
            setTimeout(() => equipmentNameRef.current.focus(), 0);
            return;
        }
        if (!equipmentDataDetail.modelName) {
            alert("모델 명을 입력하세요.");
            setTimeout(() => modelNameRef.current.focus(), 0);
            return;
        }
        if (!equipmentDataDetail.manufacturer) {
            alert("제조사를 입력하세요.");
            setTimeout(() => manufacturerRef.current.focus(), 0);
            return;
        }
        if (!equipmentDataDetail.cost) {
            alert("비용을 입력하세요.");
            setTimeout(() => costRef.current.focus(), 0);
            return;
        }
        if (equipmentDataDetail?.equipmentNum !== equipmentDataDetail?.originalEquipmentNum) {
            alert("설비번호가 일치하지 않습니다.");
            setTimeout(() => equipmentNumRef.current.focus(), 0);
            return;
        }


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
            console.log("수정버튼 클릭시 id : ",maintenanceDataDetail.id);
            console.log("수정버튼 클릭 시 equipmentDataDetail : ",maintenanceDataDetail);

            await updateEquipmentDataDetail(maintenanceDataDetail.id, maintenanceDataDetail);
            const updatedData = await fetchMaintenanceHistoryList();
            window.alert("수정완료되었습니다.");
            setIsUpdateModalVisible(false);
            setData(updatedData);
        } catch (error) {
            console.error("API에서 데이터를 수정하는 중 오류 발생:", error);
        }
    }

    //삭제 버튼 선택 클릭 시 실행되는 함수
    const handleDelete = async () => {
        const confirmDelete = window.confirm("정말로 삭제 하시겠습니까?");
        try{
            await deleteEquipmentDataDetail(maintenanceDataDetail.id);
            const deletedData = await fetchEquipmentData();
            window.alert('삭제 완료되었습니다.');
            setData(deletedData);
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
        maintenanceDataDetail,
        setMaintenanceDataDetail,
        handleInputChange,
        handleSave,
        handleUpdate,
        handleDelete,
        showModal,
        handleUpdateOk,
        handleUpdateCancel,
        insertMaintenanceModal,
        handleInsertOk,
        isInsertModalVisible,
        isUpdateModalVisible,
        handleInsertCancel,
        handleOpenInsertModal,
        handleCostInput,
        activeTabKey
    };

};




