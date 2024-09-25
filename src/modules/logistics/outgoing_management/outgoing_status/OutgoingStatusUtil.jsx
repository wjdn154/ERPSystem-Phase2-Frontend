import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '출고 예정 현황',
            children: (
                <Typography>
                    전체 출고 예정 품목의 상태를 한눈에 확인하고, 각 품목의 진행 상황을 파악할 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '출고 예정 상세',
            children: (
                <Typography>
                    선택된 출고 예정 품목의 상태를 더 상세히 보고, 수정이 필요한 경우 상태를 업데이트할 수 있음.
                </Typography>
            ),
        },
    ];
}