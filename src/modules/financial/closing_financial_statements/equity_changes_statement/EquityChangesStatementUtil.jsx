import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '자본 변동 내역 조회',
            children: (
                <Typography>
                    자본금, 잉여금 등 자본 항목의 변동 내역을 조회할 수 있는 탭임.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '자본 변동 분석',
            children: (
                <Typography>
                    자본의 변동 원인과 결과를 분석하고, 기업의 자본 구조를 평가할 수 있는 탭임.
                </Typography>
            ),
        },
    ];
}