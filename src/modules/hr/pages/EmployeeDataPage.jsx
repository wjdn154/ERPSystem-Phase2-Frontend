import React, {useMemo} from 'react';
import { Box, Grid, Grow } from '@mui/material';
import {employeeDataHook} from '../hooks/EmployeeDataHook';
import EmployeeDataListSection from '../components/Employee/EmployeeDataListSection.jsx';
import {employeeDataListColumn} from '../utils/EmployeeData/EmployeeDataListColumn.jsx';
import EmployeeDataDetailSection from '../../hr/components/Employee/EmployeeDataDetailSection';
import {getRowClassName} from "../utils/EmployeeData/EmployeeDataUtil.jsx";

const EmployeeDataPage = ({ initialData }) => {

    const employeeMemoizedData = useMemo(() => initialData, [initialData]);

    const{
        data,
        showDetail,
        handleSelectedRow,
        handleRowSelection,
        employeeDataDetail,
        setEmployeeDataDetail

    } = employeeDataHook(initialData);
    console.log('rendered data:',data);

    return (
        <Box sx={{flewGrow: 1, p:3}}>
            <Grid container spacing={2} sx={{marginTop: 2}}>
                {/* 사원정보 리스트 영역 */}
                  <Grid item xs={12}>
                      <Grow in={true} timeout={200}>
                          <div>
                              <EmployeeDataListSection
                                  columns={employeeDataListColumn}
                                  data={data}
                                  handleRowSelection={{handleRowSelection}}
                                  handleSelectedRow={{handleSelectedRow}}
                              />
                          </div>
                      </Grow>
                  </Grid>
        </Grid>
            {/* 사원정보 상세 영역 */}
            {showDetail && ( // showDetail이 true일 때만 렌더링
                <Grid item xs={12}>
                    <Grow in={showDetail} timeout={200} key={employeeDataDetail?.id}>
                        <div>
                            {employeeDataDetail && (
                                <EmployeeDataDetailSection
                                    data={data}
                                    employeeDataDetail={employeeDataDetail}
                                    handlePopupClick={handlePopupClick}
                                    isFinancialStatementModalVisible={isFinancialStatementModalVisible}
                                    isRelationCodeModalVisible={isRelationCodeModalVisible}
                                    handleClose={handleClose}
                                    selectFinancialStatement={selectFinancialStatement}
                                    handleInputChange={handleInputChange}
                                    handleInputChange2={handleInputChange2}
                                    handleDeleteMemo={handleDeleteMemo}
                                    handleAddNewMemo={handleAddNewMemo}
                                    setEquipmentDataDetail={setEmployeeDataDetail}
                                    selectRelationCode={selectRelationCode}
                                    handleSave={handleSave}
                                    deleteRelationCode={deleteRelationCode}
                                />
                            )}
                        </div>
                    </Grow>
                </Grid>
            )}
        </Box>
     )
}

export default EmployeeDataPage;