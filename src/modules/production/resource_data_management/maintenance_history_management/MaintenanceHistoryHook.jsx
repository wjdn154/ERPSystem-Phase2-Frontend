import {useEffect, useMemo, useState, useRef} from "react";
import axios from "axios";
const { confirm } = Modal;
import {useNotificationContext} from "../../../../config/NotificationContext.jsx";
import {
    fetchMaintenanceHistoryList,
    fetchMaintenanceHistoryDetail,
    saveMaintenanceHistoryDetail,
    updateMaintenanceHistoryDetail,
    deleteMaintenanceHistoryDetail} from "./MaintenanceHistoryApi.jsx"
import {fetchEquipmentDataDetail} from "../equipment_data_management/EquipmentDataApi.jsx";
import {deleteMaterialData, fetchMaterialDataList} from "../material_data_management/MaterialDataApi.jsx";
import {Modal} from "antd";

export const maintenanceHistoryHook = (initialData) => {

    const [data, setData] = useState(initialData);
    const [showDetail, setShowDetail] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);    //선택된 행
    const [maintenanceDataDetail, setMaintenanceDataDetail] = useState(null);   //상세정보
    const [isInsertModalVisible, setIsInsertModalVisible] = useState(false); //삭제 모달 상태
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false); //수정 모달 상태
    const [activeTabKey, setActiveTabKey] = useState('1'); // tabs state

    const notify = useNotificationContext(); // 알림 컨텍스트 사용
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
            const detail = await fetchMaintenanceHistoryDetail(selectedRow.id);     //비동기 api 호출
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
            maintenanceManager: '',
            maintenanceType:'',
            maintenanceCost: '',
            maintenanceStatus: '',
            maintenanceDate: null,
            nextScheduleDate: null,
            title: '',
            maintenanceDetail: '',
        });
    };

    // 저장 버튼 클릭 시 실행되는 함수
    const handleSave = async () => {
        try {
            console.log("저장버튼 클릭 시 equipmentDataDetail : ",maintenanceDataDetail);
            await saveMaintenanceHistoryDetail(maintenanceDataDetail);
            const savedData = await fetchMaintenanceHistoryList();
            notify('success', '유지보수 이력 등록', '유지보수 이력 등록 성공', 'bottomRight')
            setIsInsertModalVisible(false);
            setData(savedData);
        } catch (error) {
            notify('error', '등록 실패', '데이터 등록 중 오류가 발생했습니다.', 'top');
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
        if (!maintenanceDataDetail.workcenterCode) {
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

        if (!maintenanceDataDetail.maintenanceManager) {
            alert("관리 담당자를 입력하세요.");
            setTimeout(() => maintenanceManagerRef.current?.focus(), 0);
            return;
        }
        if (!maintenanceDataDetail.maintenanceType) {
            alert("유형을 입력하세요.");
            setTimeout(() => maintenanceTypeRef.current?.focus(), 0);
            return;
        }
        if (!maintenanceDataDetail.maintenanceCost) {
            alert("유지보수 비용을 입력하세요.");
            setTimeout(() => maintenanceCostRef.current?.focus(), 0);
            return;
        }
        if (maintenanceDataDetail.maintenanceStatus === undefined || maintenanceDataDetail.maintenanceStatus === null || maintenanceDataDetail.maintenanceStatus === '') {
            alert("유지보수 진행 상태를 입력하세요.");
            return;
        }
        if (!maintenanceDataDetail.maintenanceDate) {
            alert("유지보수 일자를 입력하세요.");
            return;
        }
        if (!maintenanceDataDetail.nextScheduleDate) {
            alert("다음 유지보수 예정일을 입력하세요.");
            return;
        }
        if (!maintenanceDataDetail.title) {
            alert("제목을 입력하세요.");
            setTimeout(() => titleRef.current?.focus(), 0);
            return;
        }
        if (!maintenanceDataDetail.maintenanceDetail) {
            alert("내용을 입력하세요.");
            setTimeout(() => maintenanceDetailRef.current?.focus(), 0);
            return;
        }
        // 설비번호 존재 확인
        // if (!response.ok) {
        //     const errorMessage = await response.text(); // 백엔드에서 보낸 에러 메시지를 읽음
        //     alert(errorMessage); // 에러 메시지를 alert 창으로 표시
        //     return;
        // }

        const dataToSend = {
            ...workerDetail,
            maintenanceStatus: Boolean(workerDetail.maintenanceStatus),   //Boolean으로 변환
        };
        await handleSave(dataToSend);
    }


    //수정 버튼 클릭 시 모달창 띄우는 함수
    const showModal = () => {
        setIsUpdateModalVisible(true);
    };

    const handleUpdateOk = async () => {
    };

    const handleUpdateCancel = () => {
        setIsUpdateModalVisible(false);
    };

    // 수정 버튼 클릭 시 실행되는 함수
    const handleUpdate = async () => {

        try {
            console.log("수정버튼 클릭시 id : ",maintenanceDataDetail.id);
            console.log("수정버튼 클릭 시 equipmentDataDetail : ",maintenanceDataDetail);

            await updateMaintenanceHistoryDetail(maintenanceDataDetail.id, maintenanceDataDetail);
            const updatedData = await fetchMaintenanceHistoryList();
            notify('success', '유지보수 이력 수정', '유지보수 이력 수정 성공', 'bottomRight')
            setData(updatedData);
        } catch (error) {
            notify('error', '수정 실패', '데이터 수정 중 오류가 발생했습니다.', 'top');
        }
    }

    //삭제 버튼 선택 클릭 시 실행되는 함수
    const handleDelete = async () => {
        confirm({
            title: '삭제 확인',
            content: '정말로 삭제하시겠습니까?',
            okText: '확인',
            cancelText: '취소',
            onOk: async () => {
                try{
                    await deleteMaintenanceHistoryDetail(maintenanceDataDetail.id);
                    const deletedData = await fetchMaintenanceHistoryList();
                    notify('success', '삭제 성공', '유지보수 이력 삭제 성공.', 'bottomRight');
                    setData(deletedData);
                    // 선택된 행 초기화 및 상세보기 숨기기
                    setSelectedRow(null);
                }catch (error){
                    notify('error', '삭제 실패', '데이터 삭제 중 오류가 발생했습니다.', 'top');
                }
            }
        })

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




