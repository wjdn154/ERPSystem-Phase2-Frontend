import React, {useMemo} from "react";
import {Box, Grid, Grow, Typography} from "@mui/material";
import {MaintenanceHistoryListColumn} from "./MaintenanceHistoryListColumn.jsx";
import MaintenanceHistoryListSection from "./MaintenanceHistoryListSection.jsx"
import WelcomeSection from "../../../../components/WelcomeSection.jsx";
import {maintenanceTabItems} from "./MaintenanceHistoryUtil.jsx"
import {maintenanceHistoryHook} from "./MaintenanceHistoryHook.jsx";
import MaintenanceHistoryDetailSection from "./MaintenanceHistoryDetailSection.jsx";
import EquipmentDataDetailSection from "./MaintenanceHistoryDetailSection.jsx";


const MaintenanceHistoryPage = ({initialData}) => {

    const maintenanceMemoizedData = useMemo(() => initialData, [initialData]);

    const {
        data,
        showDetail,
        handleSelectedRow,
        handleRowSelection,
        maintenanceDataDetail = {},
        setMaintenanceDataDetail,
        handleInputChange,
        handleDelete,
        showModal,
        handleInsertOk,
        handleUpdateCancel,
        insertMaintenanceModal,
        handleUpdateOk,
        isInsertModalVisible,
        isUpdateModalVisible,
        handleInsertCancel,
        handleOpenInsertModal,
        handleCostInput,
        activeTabKey

    } = maintenanceHistoryHook(initialData);

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
                        title="유지보수 이력 관리"
                        description={(
                            <Typography>
                                유지보수 이력 페이지는 생산관리 시스템에서{' '}
                                <span style={{ color: '#00C1D8' }}>해당 설비의 유지보수 상세 </span>정보를
                                <span style={{ color: '#00C1D8' }}> 조회, 등록, 수정, 삭제</span>하는 기능을 제공하는 페이지
                            </Typography>
                        )}
                        //tabItems={maintenanceTabItems()}
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
                                <MaintenanceHistoryListSection
                                    columns={MaintenanceHistoryListColumn}
                                    data={data}
                                    maintenanceDataDetail={maintenanceDataDetail}
                                    setMaintenanceDataDetail={setMaintenanceDataDetail}
                                    handleRowSelection={handleRowSelection}
                                    handleSelectedRow={handleSelectedRow}
                                    insertMaintenanceModal={insertMaintenanceModal}
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
                    {maintenanceDataDetail && (
                        <Grow in={showDetail} timeout={200} key={maintenanceDataDetail.id}>
                            <div>
                                <MaintenanceHistoryDetailSection
                                    data={data}
                                    maintenanceDataDetail={maintenanceDataDetail}
                                    handleInputChange={handleInputChange}
                                    setMaintenanceDataDetail={setMaintenanceDataDetail}
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
        </Box>
    )
}




export default MaintenanceHistoryPage;