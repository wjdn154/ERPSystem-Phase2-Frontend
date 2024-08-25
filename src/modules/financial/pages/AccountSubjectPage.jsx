import React from 'react';
import { Box, Grid } from '@mui/material';
import AccountSubjectStructureSection from '../components/AccountSubject/AccountSubjectStructureSection.jsx';
import AccountSubjectListSection from '../components/AccountSubject/AccountSubjectListSection.jsx';
import SelectedAccountSubjectDetailSection from '../../financial/components/AccountSubject/SelectedAccountSubjectDetailSection';
import { accountSubjectHook } from '../hooks/AccountSubjectHook';
import {accountSubjectColumn} from "../utils/AccountSubject/AccountSubjectColumn.jsx";
import {getRowClassName} from "../utils/AccountSubject/AccountSubjectUtil.jsx";

const AccountSubjectPage = ({ data }) => {
    const { selectedRow, setSelectedRow, accountSubjectDetail, setAccountSubjectDetail, handleRowSelection, handleInputChange,
            handleInputChange2, handleAddNewMemo, handleDeleteMemo, handleSelectedRow, handlePopupClick, isModalVisible,
            selectedFinancialStatement, showModal, handleClose, selectFinancialStatement } = accountSubjectHook();

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
                    accountSubjectDetail={accountSubjectDetail}
                    handlePopupClick ={handlePopupClick}
                    isModalVisible ={isModalVisible}
                    handleClose ={handleClose}
                    selectFinancialStatement ={selectFinancialStatement}
                    handleInputChange ={handleInputChange}
                    handleInputChange2 ={handleInputChange2}
                    handleDeleteMemo ={handleDeleteMemo}
                    handleAddNewMemo ={handleAddNewMemo}
                    setAccountSubjectDetail ={setAccountSubjectDetail}
                />
            )}
        </Box>
    );
}

export default AccountSubjectPage;