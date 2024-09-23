import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '입출금 내역 조회',
            children: (
                <Typography>
                    일자별로 현금의 입출금 내역을 조회할 수 있는 탭임. 각 거래의 금액과 거래처를 함께 확인할 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '현금 잔액 조회',
            children: (
                <Typography>
                    특정 시점의 현금 잔액을 확인 할 수 있는 탭임. 이를 통해 현금 흐름을 분석 가능함.
                </Typography>
            ),
        },
    ];
}