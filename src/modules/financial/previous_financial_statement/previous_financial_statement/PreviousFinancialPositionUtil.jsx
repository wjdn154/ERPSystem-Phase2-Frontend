import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '재무상태표 조회',
            children: (
                <Typography>
                    전기분의 자산, 부채, 자본 정보를 한눈에 확인할 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '재무상태 분석',
            children: (
                <Typography>
                    과거 재무 상태의 변동 내역을 분석하고 현재 상황과 비교할 수 있는 탭임.
                </Typography>
            ),
        },
    ];
}