import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '감가상각비 조회',
            children: (
                <Typography>
                    미상각분 감가상각비를 조회하고, 자산별로 감가상각 내역을 확인할 수 있는 탭임.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '감가상각비 계산',
            children: (
                <Typography>
                    미상각된 감가상각비를 바탕으로 감가상각비를 계산하고 장부에 반영할 수 있는 탭임.
                </Typography>
            ),
        },
    ];
}