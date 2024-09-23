import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '재고 실사 목록',
            children: (
                <Typography>
                    현재 진행 중이거나 완료된 재고 실사의 목록을 조회할 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '재고 실사 상세',
            children: (
                <Typography>
                    특정 실사의 세부 내용을 확인하고, 필요 시 실사 결과를 수정할 수 있음.
                </Typography>
            ),
        },
    ];
}