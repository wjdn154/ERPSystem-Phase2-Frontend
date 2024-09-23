import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '원가명세서 조회',
            children: (
                <Typography>
                    전기분의 제조원가 내역을 확인할 수 있는 탭임.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '원가 분석',
            children: (
                <Typography>
                    과거 제조 비용을 분석하고, 비용 효율성을 평가할 수 있는 탭임.
                </Typography>
            ),
        },
    ];
}