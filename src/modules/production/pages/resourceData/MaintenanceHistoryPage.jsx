import React, {useMemo} from "react";
import {Box, Grid, Grow} from "@mui/material";
import {equipmentDataHook} from '../../hooks/resourceData/equipmentDataHook.jsx';

const MaintenanceHistoryPage = ({initialData}) => {
    const equipmentMemoizedData = useMemo(() => initialData, [initialData]);

    const {
        data
    } = equipmentDataHook(initialData);


}




export default MaintenanceHistoryPage;