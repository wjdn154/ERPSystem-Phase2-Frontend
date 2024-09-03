import React, {useMemo} from "react";
import {Box, Grid, Grow} from "@mui/material";
import {equipmentDataHook} from '../hooks/equipmentDataHook.jsx';
import EquipmentDataListSection from "../../production/components/EquipmentDataListSection.jsx";
import {equipmentDataListColumn} from "../utils/EquipmentData/EquipmentDataListColumn.jsx";
import EquipmentDataDetailSection from "../components/EquipmentDataDetailSection.jsx";

const EquipmentDataPage = ({initialData}) => {

    const equipmentMemoizedData = useMemo(() => initialData, [initialData]);

    const {
        data,
        showDetail,
        handleSelectedRow,
        handleRowSelection,
        equipmentDataDetail,
        setEquipmentDataDetail,
        handleInputChange

    } = equipmentDataHook(initialData);
    console.log('rendered data:',data);
    console.log('initialData : ',initialData);
    console.log(data.equipmentDataDetail);


    if(!data || data.length === 0) {
        return <div>데이터가 없습니다.</div>
    }

    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
            <Grid container spacing={2} sx={{ marginTop: 2 }}>
                {/* 설비정보 리스트 영역 */}
                <Grid item xs={12}>
                    <Grow in={true} timeout={200}>
                        <div>
                            <EquipmentDataListSection
                                columns={equipmentDataListColumn}
                                data={data}
                                handleRowSelection={handleRowSelection}
                                handleSelectedRow={handleSelectedRow}
                            />
                        </div>
                    </Grow>
                </Grid>
            </Grid>
             설비정보 상세 영역
            <Grid item xs={12}>
                <Grow in={showDetail} timeout={200} key={equipmentDataDetail.id}>
                    <div>
                        {equipmentDataDetail && (
                            <EquipmentDataDetailSection
                                data={data}
                                equipmentDataDetail={equipmentDataDetail}
                                handlePopupClick={handlePopupClick}
                                isFinancialStatementModalVisible={isFinancialStatementModalVisible}
                                isRelationCodeModalVisible={isRelationCodeModalVisible}
                                handleClose={handleClose}
                                selectFinancialStatement={selectFinancialStatement}
                                handleInputChange={handleInputChange}
                                handleInputChange2={handleInputChange2}
                                handleDeleteMemo={handleDeleteMemo}
                                handleAddNewMemo={handleAddNewMemo}
                                setEquipmentDataDetail={setEquipmentDataDetail}
                                selectRelationCode={selectRelationCode}
                                handleSave={handleSave}
                                deleteRelationCode={deleteRelationCode}
                            />
                        )}
                    </div>
                </Grow>
            </Grid>
        </Box>
    )
}




export default EquipmentDataPage;