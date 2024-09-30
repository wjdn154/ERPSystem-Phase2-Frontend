import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '계획 목록',
            children: (
                <Typography>
                    주문 생산 계획 목록: 현재 진행 중인 주문 생산 계획을 조회하고, 각 주문의 상태를 확인할 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '주문 생산 계획 등록',
            children: (
                <Typography>
                    주문 생산 계획 등록: 새로운 주문에 따른 생산 계획을 수립하고, 해당 제품의 생산 일정을 입력할 수 있음.
                </Typography>
            ),
        },
    ];
}