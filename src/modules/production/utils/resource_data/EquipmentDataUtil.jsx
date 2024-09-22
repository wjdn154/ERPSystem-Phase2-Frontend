
import {Typography} from "@mui/material";


export const equipmentTabItems = () => {
    return [
        {
            key: '1',
            label: '설비 목록 및 상세 내용',
            //children: <Typography></Typography>, // 탭 클릭 시 보여질 내용
        }
    ];
}

export const maintenanceTabItems = () => {
    return [
        {
            key: '1',
            label: '유지보수 이력 및 상세 내용',
            //children: <Typography></Typography>, // 탭 클릭 시 보여질 내용
        }
    ];
}