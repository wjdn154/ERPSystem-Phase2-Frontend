import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '손익계산서 조회',
            children: (
                <Typography>
                    전기분의 수익과 비용을 조회하여 과거의 경영 성과를 확인할 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '손익 분석',
            children: (
                <Typography>
                    과거 수익과 비용을 분석하여 경영 성과의 변동 내역을 파악할 수 있는 탭임.
                </Typography>
            ),
        },
    ];
}