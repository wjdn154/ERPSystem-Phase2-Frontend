import React, { useMemo } from 'react';
import { Box, Grid, Grow } from '@mui/material';
import ProcessDetailsListSection from '../../components/ProcessDetails/ProcessDetailsListSection.jsx';
import SelectedProcessDetailsSection from '../../components/ProcessDetails/SelectedProcessDetailsSection.jsx';
import { useProcessDetails } from '../../hooks/ProcessDetails/ProcessDetailsHook.jsx';
import { processDetailsColumn } from '../../utils/ProcessDetails/ProcessDetailsColumn.jsx';
import { getRowClassName } from '../../utils/ProcessDetails/ProcessDetailsUtil.jsx';

const ProcessDetailsPage = ({ initialData }) => {
    const memoizedData = useMemo(() => initialData, [initialData]);

    const {
        data,
        processDetail,
        setProcessDetail,
        handleRowSelection,
        handleInputChange,
        handleInputChange2,
        handleAddNewDetail,
        handleDeleteDetail,
        handleSelectedRow,
        handlePopupClick,
        isProcessModalVisible,
        handleClose,
        selectProcessDetail,
        handleSave,
        showDetail,
        deleteProcessDetail,
    } = useProcessDetails(memoizedData);

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Grid container spacing={2} sx={{ marginTop: 2 }}>
                {/* 공정 리스트 영역 */}
                <Grid item xs={12} md={5}>
                    <Grow in={true} timeout={200}>
                        <div>
                            <ProcessDetailsListSection
                                columns={processDetailsColumn}
                                data={data}
                                handleRowSelection={handleRowSelection}
                                handleSelectedRow={handleSelectedRow}
                                rowClassName={getRowClassName}
                            />
                        </div>
                    </Grow>
                </Grid>
                {/* 공정 상세 영역 */}
                <Grid item xs={12} md={7}>
                    <Grow in={showDetail} timeout={200} key={processDetail}>
                        <div>
                            {processDetail && (
                                <SelectedProcessDetailsSection
                                    data={data}
                                    processDetail={processDetail}
                                    handlePopupClick={handlePopupClick}
                                    isProcessModalVisible={isProcessModalVisible}
                                    handleClose={handleClose}
                                    selectProcessDetail={selectProcessDetail}
                                    handleInputChange={handleInputChange}
                                    handleInputChange2={handleInputChange2}
                                    handleDeleteDetail={handleDeleteDetail}
                                    handleAddNewDetail={handleAddNewDetail}
                                    setProcessDetail={setProcessDetail}
                                    handleSave={handleSave}
                                    deleteProcessDetail={deleteProcessDetail}
                                />
                            )}
                        </div>
                    </Grow>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ProcessDetailsPage;
