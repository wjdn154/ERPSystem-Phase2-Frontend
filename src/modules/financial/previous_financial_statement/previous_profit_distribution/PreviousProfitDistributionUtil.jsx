import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '잉여금처분 내역 조회',
            children: (
                <Typography>
                    전기분 잉여금 처분 내역을 조회할 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '처분 내역 분석',
            children: (
                <Typography>
                    잉여금 처분 내역을 분석하고, 자본 관리 방안을 평가할 수 있는 탭임.
                </Typography>
            ),
        },
    ];
}