import {useEffect, useMemo, useState, useRef} from "react";
import axios from "axios";
import {
    fetchHazardousMaterial,
    updateHazardousMaterial,
    saveHazardousMaterial,
    deleteHazardousMaterial
} from "./HazardousMaterialApi.jsx";

export const hazardousMaterialHook = (initialData) => {

    const [data, setData] = useState(initialData);
    const [showDetail, setShowDetail] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);    //선택된 행
    const [hazardousMaterialDetail, setHazardousMaterialDetail] = useState(null);   //상세정보
    const [isInsertModalVisible, setIsInsertModalVisible] = useState(false); //삭제 모달 상태
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false); //수정 모달 상태
    const [activeTabKey, setActiveTabKey] = useState('1'); // tabs state


    const hazardousMaterialMemoizedData = useMemo(() => data, [data]);

    //데이터가 변경될 때마다 컴포넌트를 새로 렌더링
    useEffect(() => {
        if (hazardousMaterialDetail) {
            setShowDetail(true);
        } else {
            setShowDetail(false);
        }
    }, [hazardousMaterialDetail]);

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
            const detail = await fetchHazardousMaterial(selectedRow.id);     //비동기 api 호출
            console.log('fetch detail : ',detail);
            // 원래 유해물질 코드 따로 저장
            setHazardousMaterialDetail({
                ...detail,
                originHazardousMaterialCode: detail.hazardousMaterialCode  // 원래 유해물질 코드 저장
            });

        } catch (error) {
            console.error("API에서 데이터를 가져오는 중 오류 발생:", error);
        }
    };

    //필드의 값이 변경될 때 호출되는 함수
    const handleInputChange = (e, key) => {
        const value = e.target.value;

        setHazardousMaterialDetail(prevState => ({
            ...prevState,
            [key] : value,
        }));

    }
    //등록 버튼 누를 시 값 초기화되는 함수
    const handleOpenInsertModal=() => {
        setIsInsertModalVisible(true);
        setHazardousMaterialDetail({  // 모든 필드를 초기화
            hazardousMaterialCode: '',
            hazardousMaterialName: '',
            hazardLevel: '',
            description: ''
        });
    };

    // 저장 버튼 클릭 시 실행되는 함수
    const handleSave = async () => {
        try {
            const confirmSave = window.confirm("저장하시겠습니까?");

            if (!confirmSave) return;
            console.log("저장버튼 클릭 시 hazardousMaterial : ",hazardousMaterialDetail);
            await saveHazardousMaterial(hazardousMaterialDetail);
            const savedData = await fetchHazardousMaterial();  //등록 후 새로운 리스트 반환
            window.alert("저장되었습니다.");
            setIsInsertModalVisible(false);
            setData(savedData);
        } catch (error) {
            console.error("API에서 데이터를 저장하는 중 오류 발생:", error);
        }
    };

    //등록 버튼 클릭 시 모달 창 띄우는 함수
    const insertModal = () => {
        setIsInsertModalVisible(true);
    };
    //등록 취소 버튼 클릭 함수
    const handleInsertCancel = () => {
        setIsInsertModalVisible(false);
    }
    const handleInsertOk = async () => {

        if (!hazardousMaterialDetail.hazardousMaterialCode) {
            alert("유해물질 코드를 입력하세요.");
            return;
        }
        if (!hazardousMaterialDetail.hazardousMaterialName) {
            alert("유해물질 명을 입력하세요.");
            return;
        }
        if (!hazardousMaterialDetail.hazardLevel) {
            alert("위험등급을 입력하세요.");
            return;
        }


        await handleSave();
    }

    //수정 버튼 클릭 시 모달창 띄우는 함수
    const updateModal = () => {
        setIsUpdateModalVisible(true);
    };

    const handleUpdateOk = async () => {
        if (!hazardousMaterialDetail.hazardousMaterialCode) {
            alert("유해물질 코드를 입력하세요.");
            return;
        }
        if (!hazardousMaterialDetail.hazardousMaterialName) {
            alert("유해물질 명을 입력하세요.");
            return;
        }
        if (!hazardousMaterialDetail.hazardLevel) {
            alert("위험등급을 입력하세요.");
            return;
        }

        await handleUpdate();
    };

    // 수정 버튼 클릭 시 실행되는 함수
    const handleUpdate = async () => {
        try {
            const confirmSave = window.confirm("수정하시겠습니까?");
            console.log("수정버튼 클릭시 id ,hazardousMaterialDetail : ",hazardousMaterialDetail.id, hazardousMaterialDetail);

            await updateHazardousMaterial(hazardousMaterialDetail.id, hazardousMaterialDetail);
            const updatedData = await fetchHazardousMaterial();
            setData(updatedData);
            window.alert("수정완료되었습니다.");
            setIsUpdateModalVisible(false);
        } catch (error) {
            console.error("API에서 데이터를 수정하는 중 오류 발생:", error);
        }
    }

    const handleUpdateCancel = () => {
        setIsUpdateModalVisible(false);
    };

    //삭제 버튼 선택 클릭 시 실행되는 함수
    const handleDelete = async () => {
        const confirmDelete = window.confirm("정말로 삭제 하시겠습니까?");
        try{
            await deleteHazardousMaterial(hazardousMaterialDetail.id);
            const deletedData = await fetchHazardousMaterial();
            window.alert('삭제 완료되었습니다.');
            setData(deletedData);
        }catch (error){
            console.error("API에서 데이터를 삭제하는 중 오류 발생:", error);
        }
    }

    //탭 누를 시 화면 전환
    const handleTabChange = (key) => {
        setActiveTabKey(key);
    };



    return {
        data,
        showDetail,
        selectedRow,
        handleSelectedRow,
        handleRowSelection,
        hazardousMaterialDetail,
        setHazardousMaterialDetail,
        handleInputChange,
        handleSave,
        handleUpdate,
        handleDelete,
        updateModal,
        handleUpdateOk,
        handleUpdateCancel,
        insertModal,
        handleInsertOk,
        isInsertModalVisible,
        isUpdateModalVisible,
        handleInsertCancel,
        handleOpenInsertModal,
        activeTabKey,
        handleTabChange
    };

};




