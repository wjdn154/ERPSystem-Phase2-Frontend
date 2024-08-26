import React, {useMemo} from "react";
import {Box, Grid, Grow} from "@mui/material";
import {equipmentDataHook} from '../hooks/equipmentDataHook.jsx';
import EquipmentDataListSection from "../../production/components/EquipmentDataListSection.jsx"
import {equipmentDataListColumn} from "../utils/EquipmentData/EquipmentDataListColumn.jsx";
import {accountSubjectColumn} from "../../financial/utils/AccountSubject/AccountSubjectColumn.jsx";
import {getRowClassName} from "../../financial/utils/AccountSubject/AccountSubjectUtil.jsx";
import SelectedAccountSubjectDetailSection
    from "../../financial/components/AccountSubject/SelectedAccountSubjectDetailSection.jsx";

const EquipmentDataPage = ({initialData}) => {
    const equipmentMemoizedData = useMemo(() => initialData, [initialData]);

    const {
        data,
        handleRowSelection,
    } = equipmentDataHook(initialData);
    

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
                            />
                        </div>
                    </Grow>
                </Grid>
            </Grid>
        </Box>
    )
}




export default EquipmentDataPage;