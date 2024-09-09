import React, { useMemo, useState, useEffect } from 'react';
import { Box, Button, Grid, Grow } from '@mui/material';
import ProductListSection from '../components/BasicInformationManagement/ProductListSection.jsx';
import ProductDetailModal from '../components/BasicInformationManagement/ProductDetailModal.jsx';
import NewProductModal from '../components/BasicInformationManagement/NewProductModal.jsx';
import { productHook } from "../hooks/ProductHook.jsx";
import { productColumn } from "../utils/BasicInformationManagement/ProductColumn.jsx";
import { saveProductDetail, updateProductDetail } from "../services/ProductApi.jsx";

const ProductPage = ({ initialData }) => {
    const memoizedData = useMemo(() => initialData, [initialData]);

    // 데이터를 관리하는 상태 (useState로 정의)
    const [data, setData] = useState(memoizedData);

    const {
        productDetail,
        setProductDetail,
        handleRowSelection,
        handleInputChange,
        handleSelectedRow,
        updateProductDetail,
        isSaving,
        showDetail,
    } = productHook(initialData);

    const [isModalVisible, setIsModalVisible] = useState(false);  // 상세 정보 모달 상태
    const [isAddModalVisible, setIsAddModalVisible] = useState(false);  // 신규 등록 모달 상태
    const [selectedProductDetail, setSelectedProductDetail] = useState(null);

    // 신규 모달을 위한 그룹 및 라우팅 데이터
    const [groupList, setGroupList] = useState([]);  // 품목 그룹 리스트 상태
    const [routingList, setRoutingList] = useState([]);  // 생산 라우팅 리스트 상태

    // 모달 열기/닫기 핸들러
    const handleOpenModal = () => {
        setIsModalVisible(true);
    };

    const handleOpenAddModal = () => {
        setIsModalVisible(false);
        setIsAddModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);  // 상세 정보 모달 닫기
        setIsAddModalVisible(false);  // 신규 등록 모달 닫기
    };

    useEffect(() => {
        if (productDetail && Object.keys(productDetail).length > 0) {
            setSelectedProductDetail(productDetail);
            handleOpenModal();  // 상세 정보가 있을 때만 모달을 엶
        }
    }, [productDetail]);

    const handleSaveProductDetail = (updatedProductDetail) => {
        console.log("저장된 데이터:", updatedProductDetail);
        updateProductDetail(updatedProductDetail.id, updatedProductDetail);
        handleCloseModal();  // 저장 후 상세 정보 모달 닫기
    };

    // 새로운 품목 등록 함수
    const handleSaveNewProduct = async (newProductDetail) => {
        try {
            console.log(newProductDetail);
            const savedProduct = await saveProductDetail(newProductDetail);  // 새로운 품목 등록 함수 호출
            console.log("savedProduct" + savedProduct)
            setData((prevData) => [...prevData, savedProduct]);  // 새로 등록된 품목을 리스트에 추가
            handleCloseModal();  // 신규 등록 모달 닫기
        } catch (error) {
            console.error('Error saving new product:', error);
        }
    };

    // API 호출 또는 더미 데이터로 그룹 및 라우팅 데이터 로드
    useEffect(() => {
        // 그룹 리스트 불러오기 (API 요청으로 대체 가능)
        setGroupList([
            { id: 1, name: '그룹1' },
            { id: 2, name: '그룹2' },
            { id: 3, name: '그룹3' },
        ]);

        // 생산 라우팅 리스트 불러오기 (API 요청으로 대체 가능)
        setRoutingList([
            { id: 1, name: '라우팅1' },
            { id: 2, name: '라우팅2' },
            { id: 3, name: '라우팅3' },
        ]);
    }, []);  // 컴포넌트가 마운트될 때 한 번만 실행

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Grid container spacing={2} sx={{ marginTop: 2 }}>
                {/* 품목 리스트 영역 */}
                <Grid item xs={12} md={12}>
                    <Grow in={true} timeout={200}>
                        <div>
                            <ProductListSection
                                columns={productColumn}
                                data={data}
                                handleRowSelection={handleRowSelection}
                                handleSelectedRow={handleSelectedRow}
                            />
                        </div>
                    </Grow>
                    <Button variant="contained" color="primary" onClick={handleOpenAddModal} sx={{ marginTop: '20px' }}>
                        신규
                    </Button>
                </Grid>
            </Grid>

            {selectedProductDetail && (
                <ProductDetailModal
                    open={isModalVisible}
                    onClose={handleCloseModal}
                    productDetail={selectedProductDetail}
                    onSave={handleSaveProductDetail}
                    isSaving={isSaving}
                />
            )}

            {/* 신규 등록 모달 */}
            {isAddModalVisible && (
                <NewProductModal
                    open={isAddModalVisible}  // 신규 모달 상태
                    onClose={handleCloseModal}
                    onSave={handleSaveNewProduct}
                    isSaving={isSaving}
                    groupList={groupList}  // 전달할 그룹 데이터
                    routingList={routingList}  // 전달할 라우팅 데이터
                />
            )}
        </Box>
    );
}

export default ProductPage;
