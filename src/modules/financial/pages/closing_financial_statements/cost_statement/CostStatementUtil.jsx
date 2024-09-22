import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '원가 항목 조회',
            children: (
                <Typography>
                    재료비, 노무비, 제조경비 등 각 원가 항목을 조회하고 관리할 수 있는 탭임.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '총제조원가 분석',
            children: (
                <Typography>
                    모든 원가 항목을 합산하여 총제조원가를 분석하고, 이를 바탕으로 원가 절감 방안을 마련할 수 있는 탭임.
                </Typography>
            ),
        },
    ];
}