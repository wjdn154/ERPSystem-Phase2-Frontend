import React, {useMemo} from "react";
import {Box, Grid, Grow, Typography} from "@mui/material";
import {equipmentDataHook} from '../../hooks/resourceData/equipmentDataHook.jsx';
import EquipmentDataListSection from "../../components/resourceData/EquipmentDataListSection.jsx";
import {equipmentDataListColumn} from "../../utils/resourceData/EquipmentDataListColumn.jsx";
import EquipmentDataDetailSection from "../../components/resourceData/EquipmentDataDetailSection.jsx";
import WelcomeSection from "../../../Common/components/WelcomeSection.jsx";
import {equipmentTabItems} from "../../utils/resourceData/EquipmentDataUtil.jsx";


const EquipmentDataPage = ({initialData}) => {

    const equipmentMemoizedData = useMemo(() => initialData, [initialData]);

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
        activeTabKey

    } = equipmentDataHook(initialData);

    if(!data || data.length === 0) {
        return <div>데이터가 없습니다.</div>
    }

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Grid container spacing={2}
                  sx={{ marginTop: 2 }}
                  justifyContent="center"  // 수평 중앙 정렬
                  alignItems="center"      // 수직 중앙 정렬
           >
                    <Grid item xs={12}>
                        <WelcomeSection
                            title="설비 정보 관리"
                            description={(
                                <Typography>
                                    설비 정보 페이지는 생산관리 시스템에서{' '}
                                    <span style={{ color: '#00C1D8' }}>설비 상세 </span>정보를
                                    <span style={{ color: '#00C1D8' }}> 조회, 등록, 수정, 삭제</span>하는 기능을 제공하는 페이지
                                </Typography>
                            )}
                            //tabItems={equipmentTabItems()}
                            activeTabKey={activeTabKey}
                            //handleTabChange={handleTabChange}
                        />
                    </Grid>
                </Grid>
                {/* 설비정보 리스트 영역 */}
            {activeTabKey === '1' && (
            <Grid container spacing={2}
                  justifyContent="center"  // 수평 중앙 정렬
                  alignItems="center"      // 수직 중앙 정렬
            >
                <Grid item xs={11}>
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
                                    handleCostInput={handleCostInput}
                                />
                            </div>
                        </Grow>
                    )}
                </Grid>
            </Grid>
        </Box>
    )
}




export default EquipmentDataPage;