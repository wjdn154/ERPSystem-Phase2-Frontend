import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '진행 단계 목록',
            children: (
                <Typography>
                    현재 진행 중인 재고 조정 작업의 단계를 확인할 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '진행 단계 상세',
            children: (
                <Typography>
                    각 재고 조정의 세부 단계를 조회하고 필요한 경우 수정할 수 있음.
                </Typography>
            ),
        },
    ];
}