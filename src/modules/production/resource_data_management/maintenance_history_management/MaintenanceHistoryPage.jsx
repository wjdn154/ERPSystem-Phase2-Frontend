import React, {useMemo, useState} from "react";
import {Box, Grid, Grow, Typography} from "@mui/material";
import {MaintenanceHistoryListColumn} from "./MaintenanceHistoryListColumn.jsx";
import MaintenanceHistoryListSection from "./MaintenanceHistoryListSection.jsx"
import WelcomeSection from "../../../../components/WelcomeSection.jsx";
import {maintenanceTabItems} from "./MaintenanceHistoryUtil.jsx"
import {maintenanceHistoryHook} from "./MaintenanceHistoryHook.jsx";
import MaintenanceHistoryDetailSection from "./MaintenanceHistoryDetailSection.jsx";
import EquipmentDataDetailSection from "./MaintenanceHistoryDetailSection.jsx";
import TemporarySection from "../../../../components/TemporarySection.jsx";


const MaintenanceHistoryPage = ({initialData}) => {

    const maintenanceMemoizedData = useMemo(() => initialData, [initialData]);
    const [activeTabKey, setActiveTabKey] = useState('1');

    const handleTabChange = (key) => {
        setActiveTabKey(key);
    };

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
        // activeTabKey

    } = maintenanceHistoryHook(initialData);


    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Grid container spacing={3}
                  // sx={{ marginTop: 2 }}
                  // justifyContent="center"  // 수평 중앙 정렬
                  // alignItems="center"      // 수직 중앙 정렬
            >
                <Grid item xs={12} md={10}>
                    <WelcomeSection
                        title="유지보수 이력 관리"
                        description={(
                            <Typography>
                                유지보수 이력 관리 페이지는 <span>설비와 자재의 유지보수 내역을 기록하고 관리</span>하는 곳임. 이 페이지에서는 <span>유지보수 작업의 기록</span>을 남기고, 설비별 <span>정비 이력</span>을 조회할 수 있음. 유지보수 이력을 통해 <span>정기 정비 일정</span>을 설정하고, <span>장비의 가동률</span>을 높이는 데 도움을 줌.
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
                // <Grid container spacing={2}
                //       justifyContent="center"  // 수평 중앙 정렬
                //       alignItems="center"      // 수직 중앙 정렬
                // >
                <Grid item xs={12} md={10}>
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
                // </Grid>
            )}
            {/*<Grid container spacing={2} sx={{ marginTop: 3 }}*/}
            {/*      justifyContent="center"  // 수평 중앙 정렬*/}
            {/*      alignItems="center"      // 수직 중앙 정렬*/}
            {/*>*/}
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
            {/*</Grid>*/}
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
    )
}




export default MaintenanceHistoryPage;