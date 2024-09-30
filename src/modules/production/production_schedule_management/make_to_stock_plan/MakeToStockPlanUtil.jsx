import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '계획 목록',
            children: (
                <Typography>
                    재고 생산 계획 목록: 현재 진행 중인 재고 생산 계획을 조회하고, 각 제품의 재고 상태를 확인할 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '재고 생산 계획 등록',
            children: (
                <Typography>
                    재고 생산 계획 등록: 새로운 재고 생산 계획을 수립하고, 필요 제품의 생산 일정을 입력할 수 있음.
                </Typography>
            ),
        },
    ];
}