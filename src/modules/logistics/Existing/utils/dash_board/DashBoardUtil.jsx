import {Typography} from "@mui/material";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '물류 관리 개요',
            children: (
                <Typography>
                    물류 관리는 상품의 이동과 저장을 포함하여 전체적인 물류 프로세스를 관리하는 시스템입니다.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '재고 관리',
            children: (
                <Typography>
                    재고 관리는 상품의 입고, 출고 및 현재 재고 상태를 추적하고 관리하는 중요한 물류 기능입니다.
                </Typography>
            ),
        },
    ];
};