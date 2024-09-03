import React, {useMemo, useState, useEffect} from 'react';
import { Box, Grid, Grow } from '@mui/material';
import ProductListSection from '../components/BasicInformationManagement/ProductListSection.jsx';
import ProductDetailModal from '../components/BasicInformationManagement/ProductDetailModal.jsx'
// import ProductDetailSection from "../components/BasicInformationManagement/ProductDetailSection.jsx";
import { productHook } from "../hooks/ProductHook.jsx";
import { productColumn} from "../utils/BasicInformationManagement/ProductColumn.jsx";
import {productDetailColumn} from "../utils/BasicInformationManagement/ProductDetailColumn.jsx";

const ProductPage = ({ initialData }) => {
    const memoizedData = useMemo(() => initialData, [initialData]);
    const {
        data,
        productDetail,
        setProductDetail,
        handleRowSelection,
        handleInputChange,
        handleSelectedRow,
        showDetail,
    } = productHook(initialData);

    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleOpenModal = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    useEffect(() => {
        if (productDetail && Object.keys(productDetail).length > 0) {
            handleOpenModal();  // 상세 정보가 있을 때만 모달을 엶
        }
    }, [productDetail]);

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
                </Grid>

            </Grid>
            {productDetail && (
                <ProductDetailModal
                    open={isModalVisible}
                    onClose={handleCloseModal}
                    productDetail={productDetail}
                />
            )}
        </Box>


    );
}

export default ProductPage;