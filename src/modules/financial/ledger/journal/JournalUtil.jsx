import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '분개장 조회',
            children: (
                <Typography>
                    모든 거래 내역을 차변과 대변으로 나눠서 기록한 데이터를 조회할 수 있는 탭임.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '분개장 필터',
            children: (
                <Typography>
                    특정 날짜, 계정과목, 거래처별로 거래 내역을 필터링할 수 있는 탭임.
                </Typography>
            ),
        },
    ];
}