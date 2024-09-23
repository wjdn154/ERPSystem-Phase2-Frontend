import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '입고 예정 목록',
            children: (
                <Typography>
                    현재 등록된 입고 예정 목록을 확인하고, 각 품목의 입고 상태를 조회할 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '입고 예정 상세',
            children: (
                <Typography>
                    선택한 입고 예정 품목의 세부 정보를 확인하고, 예정일, 수량 등을 수정할 수 있음.
                </Typography>
            ),
        },
    ];
}