import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '계정과목 거래 내역',
            children: (
                <Typography>
                    각 계정과목의 거래 내역을 조회하고, 날짜별로 필터링할 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '계정과목 잔액 조회',
            children: (
                <Typography>
                    특정 계정과목의 현재 잔액을 조회할 수 있는 탭임.
                </Typography>
            ),
        },
    ];
}