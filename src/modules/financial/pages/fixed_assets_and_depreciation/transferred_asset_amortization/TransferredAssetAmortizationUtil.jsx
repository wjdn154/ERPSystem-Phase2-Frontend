import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '양도자산 감가상각 조회',
            children: (
                <Typography>
                    양도된 자산의 감가상각비를 조회하고, 자산별로 양도 전 감가상각 내역을 확인할 수 있는 탭임.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '감가상각 계산',
            children: (
                <Typography>
                    양도된 자산에 대한 감가상각비를 계산하고, 이를 장부에 반영할 수 있는 탭임.
                </Typography>
            ),
        },
    ];
}