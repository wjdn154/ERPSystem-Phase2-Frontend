import React, {useMemo, useState} from "react";
import {Box, Grid, Grow, Typography} from "@mui/material";
import {equipmentDataHook} from './EquipmentDataHook.jsx';
import EquipmentDataListSection from "./EquipmentDataListSection.jsx";
import {equipmentDataListColumn} from "./EquipmentDataListColumn.jsx";
import EquipmentDataDetailSection from "./EquipmentDataDetailSection.jsx";
import {tabItems} from "./EquipmentDataUtil.jsx"
import WelcomeSection from "../../../../components/WelcomeSection.jsx";
import TemporarySection from "../../../../components/TemporarySection.jsx";


const EquipmentDataPage = ({initialData}) => {

    const equipmentMemoizedData = useMemo(() => initialData, [initialData]);
    const [activeTabKey, setActiveTabKey] = useState('1');

    const handleTabChange = (key) => {
        setActiveTabKey(key);
    };

    const {
        data,
        showDetail,
        handleSelectedRow,
        handleRowSelection,
        equipmentDataDetail = {},
        setEquipmentDataDetail,
        handleInputChange,
        handleDelete,
        showModal,
        handleInsertOk,
        handleUpdateCancel,
        insertEquipmentModal,
        handleUpdateOk,
        isInsertModalVisible,
        isUpdateModalVisible,
        handleInsertCancel,
        handleOpenInsertModal,
        handleCostInput,

    } = equipmentDataHook(initialData);

    if(!data || data.length === 0) {
        return <div>데이터가 없습니다.</div>
    }

    return (
        <Box sx={{ margin: '20px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <WelcomeSection
                        title="설비 정보 관리"
                        description={(
                            <Typography>
                                설비 정보 관리 페이지는 <span>생산에 사용되는 각종 설비의 정보를 관리</span>하는 곳임. 이 페이지에서는 <span>설비 추가, 수정, 삭제</span>가 가능하며, 설비의 <span>모델명, 위치, 사용 가능 상태</span> 등을 관리할 수 있음. 또한, 설비별 <span>정비 일정</span>을 설정하여 설비의 효율성을 유지하고 <span>생산 공정의 안정성</span>을 높일 수 있음.
                            </Typography>
                        )}
                        tabItems={tabItems()}
                        activeTabKey={activeTabKey}
                        handleTabChange={handleTabChange}
                    />
                </Grid>
            </Grid>
            {/* 설비정보 리스트 영역 */}
            {activeTabKey === '1' && (
                <Grid container spacing={2}
                      justifyContent="center"  // 수평 중앙 정렬
                      alignItems="center"      // 수직 중앙 정렬
                >
                    <Grid item xs={12} md={12}>
                        <Grow in={true} timeout={200}>
                            <div>
                                <EquipmentDataListSection
                                    columns={equipmentDataListColumn}
                                    data={data}
                                    equipmentDataDetail={equipmentDataDetail}
                                    setEquipmentDataDetail={setEquipmentDataDetail}
                                    handleRowSelection={handleRowSelection}
                                    handleSelectedRow={handleSelectedRow}
                                    insertEquipmentModal={insertEquipmentModal}
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
            <Grid container spacing={2} sx={{ marginTop: 3 }}
                  justifyContent="center"  // 수평 중앙 정렬
                  alignItems="center"      // 수직 중앙 정렬
            >
                <Grid item xs={11} >
                    {equipmentDataDetail && (
                        <Grow in={showDetail} timeout={200} key={equipmentDataDetail.id}>
                            <div>
                                <EquipmentDataDetailSection
                                    data={data}
                                    equipmentDataDetail={equipmentDataDetail}
                                    handleInputChange={handleInputChange}
                                    setEquipmentDataDetail={setEquipmentDataDetail}
                                    handleDelete={handleDelete}
                                    isUpdateModalVisible={isUpdateModalVisible}
                                    showModal={showModal}
                                    handleUpdateOk={handleUpdateOk}
                                    handleUpdateCancel={handleUpdateCancel}
                                    handleCostInput={handleCostInput}
                                />
                            </div>
                        </Grow>
                    )}
                </Grid>
            </Grid>
            {activeTabKey === '2' && (
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
        </Box>
    );
};




export default EquipmentDataPage;