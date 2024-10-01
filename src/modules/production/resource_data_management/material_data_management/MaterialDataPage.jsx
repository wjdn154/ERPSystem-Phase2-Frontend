import React, {useMemo, useState} from 'react';
import { Box, Grid, Grow } from '@mui/material';
import WelcomeSection from '../../../../components/WelcomeSection.jsx';
import { materialTabItems } from './MaterialDataUtil.jsx';
import {Typography} from '@mui/material';
import {Button} from 'antd';
import TemporarySection from "../../../../components/TemporarySection.jsx";
import MaterialListSection from "./MaterialListSection.jsx"
import SecondMaterialListSection from "./SecondMaterialListSection.jsx";
import {materialDataHook} from "./MaterialDataHook.jsx"

const MaterialDataPage = ({initialData}) => {

    console.log("initialData: " + initialData);

    const {data,
        showDetail,
        selectedRow,
        handleSelectedRow,
        handleRowSelection,
        materialDataDetail = {},
        setMaterialDataDetail,
        handleInputChange,
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
        handleTabChange,
        activeTabKey,
        filteredProductData,
        filterHazardousData,
        onMaterialRowClick,
        onProductRowClick,
        handleDeleteProduct,
        handleProductRowSelection,
        handleProductInsertOk,
        handleProductSave,
        handleHazardousInsertOk,
        handleHazardousSave
    } = materialDataHook(initialData);

    return (
        <Box sx={{ margin: '20px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <WelcomeSection
                        title="자재 관리"
                        description={(
                            <Typography>
                                자재 정보 관리 페이지는 <span>생산에 필요한 자재의 기본 정보</span>를 관리하며, 자재의 <span>재고 및 자재 흐름</span>을 체계적으로 관리할 수 있음.
                            </Typography>
                        )}
                        tabItems={materialTabItems()}
                        activeTabKey={activeTabKey}
                        handleTabChange={handleTabChange}
                    />
                </Grid>
            </Grid>

            {activeTabKey === '1' && (
                <Grid sx={{ padding: '0px 20px 0px 20px' }} container spacing={3}>
                    <Grid item xs={12} md={10} >

                        <Grow in={true} timeout={200} >
                            <div>
                                <MaterialListSection
                                    data={data}
                                    materialDataDetail={materialDataDetail}
                                    setMaterialDataDetail={setMaterialDataDetail}
                                    handleRowSelection={handleRowSelection}
                                    handleSelectedRow={handleSelectedRow}
                                    insertModal={insertModal}
                                    handleInsertOk={handleInsertOk}
                                    handleInsertCancel={handleInsertCancel}
                                    isInsertModalVisible={isInsertModalVisible}
                                    handleInputChange={handleInputChange}
                                    handleOpenInsertModal={handleOpenInsertModal}
                                    updateModal={updateModal}
                                    handleUpdateOk={handleUpdateOk}
                                    handleUpdateCancel={handleUpdateCancel}
                                    isUpdateModalVisible={isUpdateModalVisible}
                                    handleDelete={handleDelete}/>
                            </div>
                        </Grow>

                    </Grid>
                </Grid>
            )}

            {activeTabKey === '2' && (
                <Grid sx={{ padding: '0px 20px 0px 20px' }} container spacing={3}>
                    <Grid item xs={12} md={10} >
                        <Grow in={true} timeout={200}>
                            <div>
                                <SecondMaterialListSection
                                    data={data}
                                    materialDataDetail={materialDataDetail}
                                    setMaterialDataDetail={setMaterialDataDetail}
                                    handleRowSelection={handleRowSelection}
                                    filteredProductData={filteredProductData}
                                    filterHazardousData={filterHazardousData}
                                    onMaterialRowClick={onMaterialRowClick}
                                    onProductRowClick={onProductRowClick}
                                    handleDeleteProduct={handleDeleteProduct}
                                    handleProductRowSelection={handleProductRowSelection}
                                    handleProductInsertOk={handleProductInsertOk}
                                    handleHazardousInsertOk={handleHazardousInsertOk}
                                />
                            </div>
                        </Grow>
                    </Grid>
                </Grid>
            )}

        </Box>
    );
};

export default MaterialDataPage;