import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '예적금 목록',
            children: (
                <Typography>
                    보유한 예금과 적금의 목록을 조회하고, 계좌별 상세 내역을 확인할 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '예적금 상태 분석',
            children: (
                <Typography>
                    예적금의 만기일과 잔액을 기반으로 자산 상태를 분석하고, 자금 운용 계획을 평가할 수 있음.
                </Typography>
            ),
        },
    ];
}