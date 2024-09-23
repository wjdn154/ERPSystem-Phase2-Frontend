import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '계정과목별 거래 내역',
            children: (
                <Typography>
                    거래처별로 계정과목에 따른 거래 내역을 조회할 수 있음. 각 계정과목의 세부 내역을 확인하고 분석 가능함.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '계정과목별 잔액 조회',
            children: (
                <Typography>
                    거래처별로 계정과목별 잔액을 조회하여 재무 상태를 확인할 수 있는 탭임.
                </Typography>
            ),
        },
    ];
}