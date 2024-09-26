import {Typography} from "antd";

export const materialTabItems = () => {
    return [
        {
            key: '1',
            label: '자재 목록',
            children: <Typography>등록된 자재 목록을 조회하고, 각 자재의 정보를 등록, 수정 및 삭제할 수 있음.</Typography>, // 탭 클릭 시 보여질 내용
        },
        {
            key: '2',
            label: '유해물질 목록',
            children: <Typography>등록된 유해물질 목록을 조회하고, 각 유해물질 정보를 등록, 수정 및 삭제할 수 있음.</Typography>, // 탭 클릭 시 보여질 내용
        }
    ];
}
