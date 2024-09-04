import React, { useMemo } from 'react';
import { Box, Grid, Grow } from '@mui/material';
import AccountSubjectStructureSection from '../components/AccountSubject/AccountSubjectStructureSection.jsx';
import AccountSubjectListSection from '../components/AccountSubject/AccountSubjectListSection.jsx';
import SelectedAccountSubjectDetailSection from '../../financial/components/AccountSubject/SelectedAccountSubjectDetailSection';
import WelcomeSection from '../../financial/components/AccountSubject/WelcomeSection';
import { accountSubjectHook } from '../hooks/AccountSubjectHook';
import { accountSubjectColumn } from '../utils/AccountSubject/AccountSubjectColumn.jsx';
import { getRowClassName } from '../utils/AccountSubject/AccountSubjectUtil.jsx';
import { Button } from 'antd';

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
        isNatureModalVisible,
        handleClose,
        selectFinancialStatement,
        selectRelationCode,
        selectNature,
        handleSave,
        showDetail,
        deleteRelationCode,
        handleTabChange,
        activeTabKey, // 탭 상태
    } = accountSubjectHook(initialData);

    // console.log(data);
    return (
        <Box sx={{ margin: '20px' }}>
            {/* 계정과목 관리 제목과 환영 메시지 */}
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <WelcomeSection handleTabChange={handleTabChange} activeTabKey={activeTabKey} />
                </Grid>
            </Grid>

            {activeTabKey === '1' && (
                <Grid sx={{ padding: '0px 20px 0px 20px' }} container spacing={3}>
                    {/* 계정과목 상세 영역 */}
                    <Grid item xs={12} md={4} sx={{ minWidth: '500px' }}>
                        <Grow in={showDetail} timeout={200} key={accountSubjectDetail?.code}>
                            <div>
                                {accountSubjectDetail && (
                                    <SelectedAccountSubjectDetailSection
                                        data={data}
                                        accountSubjectDetail={accountSubjectDetail}
                                        handlePopupClick={handlePopupClick}
                                        isFinancialStatementModalVisible={isFinancialStatementModalVisible}
                                        isRelationCodeModalVisible={isRelationCodeModalVisible}
                                        isNatureModalVisible={isNatureModalVisible}
                                        handleClose={handleClose}
                                        selectFinancialStatement={selectFinancialStatement}
                                        handleInputChange={handleInputChange}
                                        handleInputChange2={handleInputChange2}
                                        handleDeleteMemo={handleDeleteMemo}
                                        handleAddNewMemo={handleAddNewMemo}
                                        setAccountSubjectDetail={setAccountSubjectDetail}
                                        selectRelationCode={selectRelationCode}
                                        selectNature={selectNature}
                                        handleSave={handleSave}
                                        deleteRelationCode={deleteRelationCode}
                                    />
                                )}
                            </div>
                        </Grow>
                    </Grid>
                    {/* 계정과목 리스트 영역 */}
                    <Grid item xs={12} md={3} sx={{ minWidth: '400px' }}>
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
                </Grid>
            )}

            {/* activeTabKey가 2일 때 새로운 레이아웃을 보여줌 */}
            {activeTabKey === '2' && (
                /* 계정과목 체계 영역 */
                <Grid container spacing={2}>
                    <Grid item xs={12} md={2}>
                        <Grow in={true} timeout={200}>
                            <div>
                                <AccountSubjectStructureSection data={data} />
                            </div>
                        </Grow>
                    </Grid>
                    <Grid item xs={12} md={10}>
                    </Grid>
                </Grid>
            )}
        </Box>
    );
};

export default AccountSubjectPage;