import {useEffect, useMemo, useState, useRef} from "react";
import axios from "axios";
const { confirm } = Modal;
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
import {Modal, notification} from "antd";
import {useNotificationContext} from "../../../../config/NotificationContext.jsx";

export const materialDataHook = (initialData) => {

    const [data, setData] = useState(initialData);
    const [showDetail, setShowDetail] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);    //선택된 행
    const [materialDataDetail, setMaterialDataDetail] = useState({product:[], hazardousMaterial:[]});   //상세정보
    const [isInsertModalVisible, setIsInsertModalVisible] = useState(false); //삭제 모달 상태
    const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false); //수정 모달 상태
    const [activeTabKey, setActiveTabKey] = useState('1'); // tabs state


    const hazardousMaterialMemoizedData = useMemo(() => data, [data]);
    const [selectedMaterialId, setSelectedMaterialId] = useState(null);
    const [filteredProductData, setFilteredProductData] = useState([]);
    const [filterHazardousData, setFilterHazardousData] = useState([]);
    const [selectedProductCode, setSelectedProductCode] = useState(null);
    const notify = useNotificationContext(); // 알림 컨텍스트 사용

    //데이터가 변경될 때마다 컴포넌트를 새로 렌더링
    useEffect(() => {
        if (materialDataDetail) {
            setShowDetail(true);
        } else {
            setShowDetail(false);
        }
    }, [materialDataDetail]);

    useEffect(() => {
        if(materialDataDetail && materialDataDetail.product && materialDataDetail.hazardousMaterial){
            setFilteredProductData(materialDataDetail.product);
            setFilterHazardousData(materialDataDetail.hazardousMaterial);
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

    // 행 선택 시 자재 상세 정보를 가져오는 로직
    const handleSelectedRow = async (selectedRow) => {

        console.log('선택된 행 : ',selectedRow);
        if(!selectedRow) return;
        setSelectedRow(selectedRow);
        setShowDetail(false);   //상세정보 로딩중일때 기존 상세정보 숨기기

        try {
            console.log('selectedRow.id : ',selectedRow.id);
            const detail = await fetchMaterialDetail(selectedRow.id);     //비동기 api 호출
            console.log('fetch detail : ',detail);
            //'detail'이 제대로 받아졌는지 확인하기
            if(!detail) {
                console.warn("api로부터 유효한 상세정보를 받지 못했습니다.");
                return;
            }
            // 원래 유해물질 코드 따로 저장
            setMaterialDataDetail({
                ...detail,
                originMaterialCode: detail.materialCode  // 원래 유해물질 코드 저장
            });

        } catch (error) {
            console.error("API에서 데이터를 가져오는 중 오류 발생:", error);
        }
    };

    //자재 리스트에서 행을 클릭할 때 호출되는 함수
    const onMaterialRowClick = (record) => {
        setSelectedMaterialId(record.id);
        handleSelectedRow(record);  //비동기 데이터 가져오기 작업 수행
    }

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

            console.log("저장버튼 클릭 시 hazardousMaterial : ",materialDataDetail);
            await saveMaterialData(materialDataDetail);
            const savedData = await fetchMaterialDataList();  //등록 후 새로운 리스트 반환
            notify('success', '자재 등록', '자재 등록 성공', 'bottomRight')
            setIsInsertModalVisible(false);
            setData(savedData);
        } catch (error) {
            notify('error', '등록 실패', '데이터 등록 중 오류가 발생했습니다.', 'top');
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


    //등록 모달창 ok 눌렀을 때 실행되는 함수
    const handleInsertOk = async () => {

        alertMaterial();

        await handleSave();
    }

    //수정 버튼 클릭 시 모달창 띄우는 함수
    const updateModal = () => {
        setIsUpdateModalVisible(true);
    };

    //수정 모달창 ok 눌렀을 때 실행되는 함수
    const handleUpdateOk = async () => {

        alertMaterial();

        await handleUpdate();
    };

    // 수정 버튼 클릭 시 실행되는 함수
    const handleUpdate = async () => {
        try {
            const updateData = {
                ...materialDataDetail,
                product: filteredProductData,
                hazardousMaterial: filterHazardousData,
            };

            console.log("수정버튼 클릭시 id ,materialDataDetail : ",updateData.id, updateData);

            await updateMaterialData(updateData.id, updateData);
            const updatedData = await fetchMaterialDataList();
            notify('success', '자재 수정', '자재 수정 성공', 'bottomRight')
            setData(updatedData);
            setShowDetail(false);
        } catch (error) {
            notify('error', '수정 실패', '데이터 수정 중 오류가 발생했습니다.', 'top');
        }
    }

    const handleUpdateCancel = () => {
        setIsUpdateModalVisible(false);
    };

    //삭제 버튼 선택 클릭 시 실행되는 함수
    const handleDelete = async () => {

        confirm({
            title: '삭제 확인',
            content: '정말로 삭제하시겠습니까?',
            okText: '확인',
            cancelText: '취소',
            onOk: async () => {
                if(materialDataDetail && materialDataDetail.id){
                    try{
                       await deleteMaterialData(materialDataDetail.id);
                        const deletedData = await fetchMaterialDataList();
                        notify('success', '삭제 성공', '자재 삭제 성공.', 'bottomRight');
                        setData(deletedData);
                        // 선택된 행 초기화 및 상세보기 숨기기
                        setSelectedRow(null);
                    }catch (error){
                        notify('error', '삭제 실패', '데이터 삭제 중 오류가 발생했습니다.', 'top');
                    }
                }
            }
        })

    }

    //탭 누를 시 화면 전환
    const handleTabChange = (key) => {
        setActiveTabKey(key);
    };

    // 품목 리스트에서 행을 클릭할 때 호출되는 함수
    const onProductRowClick = (record) => {
        setSelectedProductCode(record.productCode);
    };

    // 행 선택 핸들러 설정
    const handleProductRowSelection =  {
        type:'radio',
        selectedRowKeys: selectedRow ? [selectedRow.id] : [],
        onChange: (selectedRowKeys, selectedRows) => {
            if (selectedRows.length > 0) {
                handleDeleteProduct();
            } else{
                console.warn("비어있음.");
            }
        },
    };


    // 품목 삭제 함수
    const handleDeleteProduct = async () => {
        if (selectedMaterialId && selectedProductCode) {
            try {
                const confirmDelete = window.confirm("정말로 삭제 하시겠습니까?");

                if(!confirmDelete) return;
                await deleteMaterialProduct(selectedMaterialId, selectedProductCode);
                window.alert('품목이 삭제되었습니다.');
                // 여기서 삭제 후 품목 리스트를 다시 불러옵니다.
            } catch (error) {
                notify('error', '삭제 실패', '데이터 삭제 중 오류가 발생했습니다.', 'top');
            }
        } else {
            window.alert('삭제할 품목을 선택해주세요.');
        }
    };

    //등록 모달창 ok 눌렀을 때 실행되는 함수
    const handleProductInsertOk = async () => {

        await handleProductSave();
    }
    // 저장 버튼 클릭 시 실행되는 함수
    const handleProductSave = async () => {
        try {
            const confirmSave = window.confirm("저장하시겠습니까?");

            if (!confirmSave) return;
            console.log("저장버튼 클릭 시 materialProduct : ",materialDataDetail.product);
            await updateMaterialProductList(materialDataDetail.id, materialDataDetail.product);
            const savedData = await fetchProductMaterialList();  //등록 후 새로운 리스트 반환
            window.alert("저장되었습니다.");
            setIsInsertModalVisible(false);
            setFilteredProductData(savedData);
        } catch (error) {
            notify('error', '등록 실패', '데이터 등록 중 오류가 발생했습니다.', 'top');
        }
    };
    //등록 모달창 ok 눌렀을 때 실행되는 함수
    const handleHazardousInsertOk = async () => {

        await handleHazardousSave();
    }
    // 저장 버튼 클릭 시 실행되는 함수
    const handleHazardousSave = async () => {
        try {

            if (!confirmSave) return;
            console.log("저장버튼 클릭 시 materialHazardous : ",materialDataDetail.hazardousMaterial);
            await updateMaterialHazardousList(materialDataDetail.id, materialDataDetail.hazardousMaterial);
            const savedData = await fetchHazardousMaterialList();  //등록 후 새로운 리스트 반환
            notify('success', '유해물질 등록', '유해물질 등록 성공', 'bottomRight')
            setIsInsertModalVisible(false);
            setFilterHazardousData(savedData);
        } catch (error) {
            notify('error', '등록 실패', '데이터 등록 중 오류가 발생했습니다.', 'top');
        }
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
        handleTabChange,
        filteredProductData,
        setFilteredProductData,
        filterHazardousData,
        setFilterHazardousData,
        onMaterialRowClick,
        onProductRowClick,
        handleDeleteProduct,
        handleProductRowSelection,
        handleProductInsertOk,
        handleHazardousInsertOk
    };

};




