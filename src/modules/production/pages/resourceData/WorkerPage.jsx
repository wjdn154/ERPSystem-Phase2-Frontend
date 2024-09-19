import React, {useMemo} from "react";
import {Box, Grid, Grow, Typography} from "@mui/material";
import {workerHook} from '../../hooks/resourceData/WorkerHook.jsx';
import WorkerListSection from "../../components/resourceData/WorkerListSection.jsx";
import {workerListColumn} from "../../utils/resourceData/WorkerListColumn.jsx"
import WelcomeSection from "../../../Common/components/WelcomeSection.jsx";
import {workerTabItems} from "../../utils/resourceData/ResourceDataUtil.jsx";
import WorkerAttendanceListSection from "../../components/resourceData/WorkerAttendanceListSection.jsx";
import {workerAttendanceListColumn} from "../../utils/resourceData/WorkerAttendanceListColumn.jsx"


const WorkerPage = ({initialData}) => {

    const workerMemoizedData = useMemo(() => initialData, [initialData]);
    console.log(initialData);
    const {
        data,
        showDetail,
        selectedRow,
        handleSelectedRow,
        handleRowSelection,
        workerDetail,
        setWorkerDetail,
        handleInputChange,
        showUpdateModal,
        handleUpdateOk,
        handleUpdateCancel,
        isUpdateModalVisible,
        activeTabKey,
        handleTabChange,
        handleSelectedAttendanceRow,
        setWorkerAttendanceDetail,
        workerAttendanceDetail

    } = workerHook(initialData);

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
                            title="작업자 관리"
                            description={(
                                <Typography>
                                    작업자 관리 페이지는 생산관리 시스템에서{' '}
                                    <span style={{ color: '#00C1D8' }}>부서가 생산에 해당하는 작업자 </span>정보를
                                    <span style={{ color: '#00C1D8' }}> 조회 및 수정</span>하는 기능을 제공하는 페이지
                                </Typography>
                            )}
                            tabItems={workerTabItems()}
                            activeTabKey={activeTabKey}
                            handleTabChange={handleTabChange}
                        />
                    </Grid>
                </Grid>
                {/* 작업자 목록 및 상세내용 영역 */}
            {activeTabKey === '1' && (
            <Grid container spacing={2}
                  justifyContent="center"  // 수평 중앙 정렬
                  alignItems="center"      // 수직 중앙 정렬
            >
                <Grid item xs={11}>
                    <Grow in={true} timeout={200}>
                        <div>
                            <WorkerListSection
                                columns={workerListColumn}
                                data={data}
                                workerDetail={workerDetail}
                                setWorkerDetail={setWorkerDetail}
                                handleRowSelection={handleRowSelection}
                                handleSelectedRow={handleSelectedRow}
                                handleUpdateOk={handleUpdateOk}
                                handleUpdateCancel={handleUpdateCancel}
                                isUpdateModalVisible={isUpdateModalVisible}
                                handleInputChange={handleInputChange}
                                showUpdateModal={showUpdateModal}
                            />
                        </div>
                    </Grow>
                </Grid>
            </Grid>
            )}
            {/* 작업자 작업배치 및 근태목록 영역 */}
            {activeTabKey === '2' && (
                <Grid container spacing={2}
                      justifyContent="center"  // 수평 중앙 정렬
                      alignItems="center"      // 수직 중앙 정렬
                >
                    <Grid item xs={11}>
                        <Grow in={true} timeout={200}>
                            <div>
                                <WorkerAttendanceListSection
                                    columns={workerListColumn}
                                    workerAttendanceListColumn={workerAttendanceListColumn}
                                    data={data}
                                    workerDetail={workerDetail}
                                    setWorkerDetail={setWorkerDetail}
                                    handleRowSelection={handleRowSelection}
                                    handleSelectedAttendanceRow={handleSelectedAttendanceRow}
                                    handleUpdateOk={handleUpdateOk}
                                    handleUpdateCancel={handleUpdateCancel}
                                    isUpdateModalVisible={isUpdateModalVisible}
                                    handleInputChange={handleInputChange}
                                    showUpdateModal={showUpdateModal}
                                    setWorkerAttendanceDetail={setWorkerAttendanceDetail}
                                    workerAttendanceDetail={workerAttendanceDetail}
                                />
                            </div>
                        </Grow>
                    </Grid>
                </Grid>
            )}
        </Box>
    )
}




export default WorkerPage;