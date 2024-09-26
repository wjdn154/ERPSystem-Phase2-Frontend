import {useEffect, useMemo, useState, useRef} from "react";
import axios from "axios";
import {
    fetchMaterialDetail,
    fetchMaterialDataList,
    updateMaterialData,
    saveMaterialData,
    deleteMaterialData,
    fetchProductMaterialList,
    updateMaterialProductList,
    deleteMaterialProduct,
    fetchHazardousMaterialList,
    updateMaterialHazardousList
} from "./MaterialDataApi.jsx";

export const materialDataHook = (initialData) => {

    const [data, setData] = useState(initialData);
    const [showDetail, setShowDetail] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);    //선택된 행
    const [materialDataDetail, setMaterialDataDetail] = useState(null);   //상세정보
    const [isInsertModalVisible, setIsInsertModalVisible] = useState(false); //삭제 모달 상태
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false); //수정 모달 상태
    const [activeTabKey, setActiveTabKey] = useState('1'); // tabs state


    const hazardousMaterialMemoizedData = useMemo(() => data, [data]);

    //데이터가 변경될 때마다 컴포넌트를 새로 렌더링
    useEffect(() => {
        if (materialDataDetail) {
            setShowDetail(true);
        } else {
            setShowDetail(false);
        }
    }, [materialDataDetail]);

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
            const detail = await fetchMaterialDetail(selectedRow.id);     //비동기 api 호출
            console.log('fetch detail : ',detail);
            // 원래 유해물질 코드 따로 저장
            setMaterialDataDetail({
                ...detail,
                originMaterialCode: detail.materialCode  // 원래 유해물질 코드 저장
            });

        } catch (error) {
            console.error("API에서 데이터를 가져오는 중 오류 발생:", error);
        }
    };

    //필드의 값이 변경될 때 호출되는 함수
    const handleInputChange = (e, key) => {
        const value = e.target.value;

        setMaterialDataDetail(prevState => ({
            ...prevState,
            [key] : value,
        }));

    }
    //등록 버튼 누를 시 값 초기화되는 함수
    const handleOpenInsertModal=() => {
        setIsInsertModalVisible(true);
        setMaterialDataDetail({  // 모든 필드를 초기화
            materialCode: '',
            materialName: '',
            materialType: '',
            stockQuantity: '',
            purchasePrice: '',
            representativeCode: '',
            representativeName: '',
            hazardousMaterialQuantity: ''
        });
    };

    // 저장 버튼 클릭 시 실행되는 함수
    const handleSave = async () => {
        try {
            const confirmSave = window.confirm("저장하시겠습니까?");

            if (!confirmSave) return;
            console.log("저장버튼 클릭 시 hazardousMaterial : ",materialDataDetail);
            await saveMaterialData(materialDataDetail);
            const savedData = await fetchMaterialDataList();  //등록 후 새로운 리스트 반환
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

        if (!materialDataDetail.materialCode) {
            alert("자재 코드를 입력하세요.");
            return;
        }
        if (!materialDataDetail.materialName) {
            alert("자재 명을 입력하세요.");
            return;
        }
        if (!materialDataDetail.materialType) {
            alert("자재유형을 입력하세요.");
            return;
        }
        if (!materialDataDetail.stockQuantity) {
            alert("재고 수량을 입력하세요.");
            return;
        }
        if (!materialDataDetail.purchasePrice) {
            alert("구매 가격을 입력하세요.");
            return;
        }
        if (!materialDataDetail.representativeCode) {
            alert("거래처 코드를 입력하세요.");
            return;
        }
        if (!materialDataDetail.representativeName) {
            alert("커래처 명을 입력하세요.");
            return;
        }
        if (!materialDataDetail.hazardousMaterialQuantity) {
            alert("유해물질 개수를 입력하세요.");
            return;
        }


        await handleSave();
    }

    //수정 버튼 클릭 시 모달창 띄우는 함수
    const updateModal = () => {
        setIsUpdateModalVisible(true);
    };

    const handleUpdateOk = async () => {
        if (!materialDataDetail.materialCode) {
            alert("자재 코드를 입력하세요.");
            return;
        }
        if (!materialDataDetail.materialName) {
            alert("자재 명을 입력하세요.");
            return;
        }
        if (!materialDataDetail.materialType) {
            alert("자재유형을 입력하세요.");
            return;
        }
        if (!materialDataDetail.stockQuantity) {
            alert("재고 수량을 입력하세요.");
            return;
        }
        if (!materialDataDetail.purchasePrice) {
            alert("구매 가격을 입력하세요.");
            return;
        }
        if (!materialDataDetail.representativeCode) {
            alert("거래처 코드를 입력하세요.");
            return;
        }
        if (!materialDataDetail.representativeName) {
            alert("커래처 명을 입력하세요.");
            return;
        }
        if (!materialDataDetail.hazardousMaterialQuantity) {
            alert("유해물질 개수를 입력하세요.");
            return;
        }

        await handleUpdate();
    };

    // 수정 버튼 클릭 시 실행되는 함수
    const handleUpdate = async () => {
        try {
            const confirmSave = window.confirm("수정하시겠습니까?");
            console.log("수정버튼 클릭시 id ,materialDataDetail : ",materialDataDetail.id, materialDataDetail);

            await updateMaterialData(materialDataDetail.id, materialDataDetail);
            const updatedData = await fetchMaterialDataList();
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
        if(!confirmDelete || !materialDataDetail || !materialDataDetail.id) return;
        try{
            await deleteMaterialData(materialDataDetail.id);
            const deletedData = await fetchMaterialDataList();
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
        materialDataDetail,
        setMaterialDataDetail,
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




