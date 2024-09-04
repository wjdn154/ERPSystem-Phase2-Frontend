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
        handleInputChange,
        handleSave,
        handleUpdate,
        handleDelete,
        showModal,
        handleInsertOk,
        handleUpdateCancel,
        insertEquipmentModal,
        handleUpdateOk,
        isInsertModalVisible,
        isUpdateModalVisible,
        handleInsertCancel

    } = equipmentDataHook(initialData);

    console.log('rendered data:',data);
    console.log('initialData : ',initialData);
    console.log(data.equipmentDataDetail);
    console.log(equipmentDataDetail);


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
                                equipmentDataDetail={equipmentDataDetail}
                                setEquipmentDataDetail={setEquipmentDataDetail}
                                handleRowSelection={handleRowSelection}
                                handleSelectedRow={handleSelectedRow}
                                insertEquipmentModal={insertEquipmentModal}
                                handleInsertOk={handleInsertOk}
                                handleInsertCancel={handleInsertCancel}
                                isInsertModalVisible={isInsertModalVisible}

                            />
                        </div>
                    </Grow>
                </Grid>
            </Grid>

            <Grid item xs={12} sx={{ marginTop: 3 }}>
                {equipmentDataDetail && (
                    <Grow in={showDetail} timeout={200} key={equipmentDataDetail.id}>
                        <div>
                            <EquipmentDataDetailSection
                                data={data}
                                equipmentDataDetail={equipmentDataDetail}
                                handleInputChange={handleInputChange}
                                setEquipmentDataDetail={setEquipmentDataDetail}
                                handleDelete={handleDelete}
                                isUpdateModalVisible={{isUpdateModalVisible}}
                                showModal={showModal}
                                handleUpdateOk={handleUpdateOk}
                                handleUpdateCancel={handleUpdateCancel}
                            />
                        </div>
                    </Grow>
                )}
            </Grid>
        </Box>
    )
}




export default EquipmentDataPage;