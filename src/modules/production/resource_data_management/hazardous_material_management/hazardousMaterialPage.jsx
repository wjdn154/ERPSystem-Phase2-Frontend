import React, {useMemo, useState} from 'react';
import { Box, Grid, Grow } from '@mui/material';
import WelcomeSection from '../../../../components/WelcomeSection.jsx';
import { materialTabItems } from '../material_data_management/MaterialDataUtil.jsx';
import {Typography} from '@mui/material';
import {Button} from 'antd';
import TemporarySection from "../../../../components/TemporarySection.jsx";
import HazardousMaterialListSection from "./HazardousMaterialListSection.jsx";
import {hazardousMaterialHook} from "./HazardousMaterialHook.jsx"

const HazardousMaterialPage = ({initialData}) => {

    console.log("initialData: " + initialData);

    const {data,
        showDetail,
        selectedRow,
        handleSelectedRow,
        handleRowSelection,
        hazardousMaterialDetail = {},
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
        handleTabChange,
        activeTabKey,
    } = hazardousMaterialHook(initialData);

    return (
        <Box sx={{ margin: '20px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <WelcomeSection
                        title="유해물질 관리"
                        description={(
                            <Typography>
                                유해물질 관리 페이지는 <span>유해물질 정보를 관리</span>하는 곳임. 이 페이지에서는 <span>유해물질 추가, 수정, 삭제</span>가 가능함
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
                    <Grid item xs={12} md={5} sx={{ minWidth: '500px !important', maxWidth: '700px !important' }}>
                        <Grow in={true} timeout={200}>
                            <div>
                                <TemporarySection />
                            </div>
                        </Grow>
                    </Grid>
                </Grid>
            )}

            {activeTabKey === '2' && (
                <Grid sx={{ padding: '0px 20px 0px 20px' }} container spacing={3}>
                    <Grid item xs={12} md={5} sx={{ minWidth: '500px !important', maxWidth: '50% !important' }}>
                        <Grow in={true} timeout={200}>
                            <div>
                                <HazardousMaterialListSection
                                data={data}
                                hazardousMaterialDetail={hazardousMaterialDetail}
                                setHazardousMaterialDetail={setHazardousMaterialDetail}
                                handleRowSelection={handleRowSelection}
                                handleSelectedRow={handleSelectedRow}
                                insertModal={insertModal}
                                handleInsertOk={handleInsertOk}
                                handleInsertCancel={handleInsertCancel}
                                isInsertModalVisible={isInsertModalVisible}
                                handleInputChange={handleInputChange}
                                handleOpenInsertModal={handleOpenInsertModal}
                                />
                            </div>
                        </Grow>
                    </Grid>
                </Grid>
            )}

        </Box>
    );
};

export default HazardousMaterialPage;