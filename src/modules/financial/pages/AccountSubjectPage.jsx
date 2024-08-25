import React, {useMemo} from 'react';
import { Box, Grid } from '@mui/material';
import AccountSubjectStructureSection from '../components/AccountSubject/AccountSubjectStructureSection.jsx';
import AccountSubjectListSection from '../components/AccountSubject/AccountSubjectListSection.jsx';
import SelectedAccountSubjectDetailSection from '../../financial/components/AccountSubject/SelectedAccountSubjectDetailSection';
import { accountSubjectHook } from '../hooks/AccountSubjectHook';
import {accountSubjectColumn} from "../utils/AccountSubject/AccountSubjectColumn.jsx";
import {getRowClassName} from "../utils/AccountSubject/AccountSubjectUtil.jsx";

const AccountSubjectPage = ({ initialData }) => {
    const memoizedData = useMemo(() => initialData, [initialData]);
    console.log(memoizedData);
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
        handleSave
    } = accountSubjectHook(initialData);

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Grid container spacing={2}>
                {/*계정과목 체계 영역*/}
                <AccountSubjectStructureSection data={data} />
                {/*계정과목 리스트 영역*/}
                <AccountSubjectListSection
                    columns={accountSubjectColumn}
                    data={data}
                    handleRowSelection={handleRowSelection}
                    handleSelectedRow={handleSelectedRow}
                    rowClassName={getRowClassName}
                />
            </Grid>
            {/*계정과목 상세 영역*/}
            {accountSubjectDetail && (
                <SelectedAccountSubjectDetailSection
                    data={data}
                    accountSubjectDetail={accountSubjectDetail}
                    handlePopupClick ={handlePopupClick}
                    isFinancialStatementModalVisible = {isFinancialStatementModalVisible}
                    isRelationCodeModalVisible = {isRelationCodeModalVisible}
                    handleClose ={handleClose}
                    selectFinancialStatement ={selectFinancialStatement}
                    handleInputChange ={handleInputChange}
                    handleInputChange2 ={handleInputChange2}
                    handleDeleteMemo ={handleDeleteMemo}
                    handleAddNewMemo ={handleAddNewMemo}
                    setAccountSubjectDetail ={setAccountSubjectDetail}
                    selectRelationCode ={selectRelationCode}
                    handleSave = {handleSave}
                />
            )}
        </Box>
    );
}

export default AccountSubjectPage;