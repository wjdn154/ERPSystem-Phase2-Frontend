import React, {useMemo} from 'react';
import { Box, Grid, Grow } from '@mui/material';
import AccountSubjectStructureSection from '../components/AccountSubject/AccountSubjectStructureSection.jsx';
import AccountSubjectListSection from '../components/AccountSubject/AccountSubjectListSection.jsx';
import SelectedAccountSubjectDetailSection from '../../financial/components/AccountSubject/SelectedAccountSubjectDetailSection';
import { accountSubjectHook } from '../hooks/AccountSubjectHook';
import {accountSubjectColumn} from "../utils/AccountSubject/AccountSubjectColumn.jsx";
import {getRowClassName} from "../utils/AccountSubject/AccountSubjectUtil.jsx";

const AccountSubjectPage = ({ initialData }) => {
    const memoizedData = useMemo(() => initialData, [initialData]);
    const {
        data,
        accountSubjectDetail,
        setAccountSubjectDetail,
        handleRowSelection,
        handleInputChange,
        handleInputChange2,
        handleAddNewMemo,
        handleDeleteMemo,
        handleSelectedRow,
        handlePopupClick,
        isFinancialStatementModalVisible,
        isRelationCodeModalVisible,
        handleClose,
        selectFinancialStatement,
        selectRelationCode,
        handleSave,
        showDetail,
        deleteRelationCode
    } = accountSubjectHook(initialData);

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {/* 계정과목 체계 영역 */}
                    <Grow in={true} timeout={200}>
                        <div>
                            <AccountSubjectStructureSection data={data} />
                        </div>
                    </Grow>
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginTop: 2 }}>
                {/* 계정과목 리스트 영역 */}
                <Grid item xs={12} md={5}>
                    <Grow in={true} timeout={200}>
                        <div>
                            <AccountSubjectListSection
                                columns={accountSubjectColumn}
                                data={data}
                                handleRowSelection={handleRowSelection}
                                handleSelectedRow={handleSelectedRow}
                                rowClassName={getRowClassName}
                            />
                        </div>
                    </Grow>
                </Grid>
                {/* 계정과목 상세 영역 */}
                <Grid item xs={12} md={7}>
                    <Grow in={showDetail} timeout={200} key={accountSubjectDetail.code}  >
                        <div>
                            {accountSubjectDetail && (
                                <SelectedAccountSubjectDetailSection
                                    data={data}
                                    accountSubjectDetail={accountSubjectDetail}
                                    handlePopupClick={handlePopupClick}
                                    isFinancialStatementModalVisible={isFinancialStatementModalVisible}
                                    isRelationCodeModalVisible={isRelationCodeModalVisible}
                                    handleClose={handleClose}
                                    selectFinancialStatement={selectFinancialStatement}
                                    handleInputChange={handleInputChange}
                                    handleInputChange2={handleInputChange2}
                                    handleDeleteMemo={handleDeleteMemo}
                                    handleAddNewMemo={handleAddNewMemo}
                                    setAccountSubjectDetail={setAccountSubjectDetail}
                                    selectRelationCode={selectRelationCode}
                                    handleSave={handleSave}
                                    deleteRelationCode={deleteRelationCode}
                                />
                            )}
                        </div>
                    </Grow>
                </Grid>
            </Grid>
        </Box>
    );
}
export default AccountSubjectPage;