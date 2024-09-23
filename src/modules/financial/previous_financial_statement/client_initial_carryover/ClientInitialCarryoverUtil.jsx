import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '거래처별 초기이월 설정',
            children: (
                <Typography>
                    각 거래처의 초기 이월 금액을 설정할 수 있는 탭임.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '거래처별 이월 내역 조회',
            children: (
                <Typography>
                    설정된 초기이월 내역을 확인하고, 거래처별로 조회할 수 있는 탭임.
                </Typography>
            ),
        },
    ];
}