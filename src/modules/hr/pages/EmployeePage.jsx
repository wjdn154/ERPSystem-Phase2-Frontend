import React, {useMemo} from 'react';
import { Box, Grid, Grow } from '@mui/material';
import EmployeeListSection from '../components/Employee/EmployeeListSection.jsx';
import {employeeHook} from '../hooks/employeeHook.jsx';
import {employeeColumn} from "../utils/Employee/EmployeeColumn.jsx"
import {getRowClassName} from "../utils/Employee/EmployeeUtil.jsx";
import AccountSubjectStructureSection
    from "../../financial/components/AccountSubject/AccountSubjectStructureSection.jsx";
import AccountSubjectListSection from "../../financial/components/AccountSubject/AccountSubjectListSection.jsx";
import {accountSubjectColumn} from "../../financial/utils/AccountSubject/AccountSubjectColumn.jsx";

const EmployeePage = ({ initialData }) => {
    const memoizedData = useMemo(() => initialData, [initialData]);
    const{
        data,
        employeeDetail,
        setEmployeeDetail,
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
        selectHrStatement,
        selectRelationId,
        handleSave,
        showDetail,
        deleteRelationId
    } = employeeHook(initialData);

    return(
        <Box sx={{flewGrow: 1, p:3}}>
            <Grid container spacing={{2}}
                  <Grid item xs={12}>
                      {/* 사원목록 영역 */}
                      <Grow in={true} timeout={200}>
                          <div>
                              <AccountSubjectStructureSection data={data} />
                          </div>
                      </Grow>
                  </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ marginTop: 2 }}>
                {/* 사원 리스트 영역 */}
                <Grid item xs={12} md={5}>
                    <Grow in={true} timeout={200}>
                        <div>
                            <EmployeeListSection
                                columns={employeeColumn}
                                data={data}
                                handleRowSelection={handleRowSelection}
                                handleSelectedRow={handleSelectedRow}
                                rowClassName={getRowClassName}
                            />
                        </div>
                    </Grow>
                </Grid>
                {/* 사원 상세 영역 */}
                <Grid item xs={12} md={7}>
                    <Grow in={showDetail} timeout={200} key={employeeDetail.employeeNumber}>
                        <div>
                            {employeeDetail && (
                                <SelectedEmployeeDetailSection
                                    data={dtata}
                                    employeeDetail={employeeDetail}
                                    handlePopupClick={handlePopupClick}
                                    isHrStatementModalVisible={isHrStatementModalVisible}
                                    isRelationCodeModalVisible={isRelationCodeModalVisible}
                                    handleClose={handleClose}
                                    selectHrStatement={selectHrStatement}
                                    handleInputChange={handleInputChange}
                                    handleInputChange2={handleInputChange2}
                                    handleDeleteMemo={handleDeleteMemo}
                                    handleAddNewMemo={handleAddNewMemo}
                                    setEmployeeDetail={setEmployeeDetail}
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

export defalut EmployeePage;