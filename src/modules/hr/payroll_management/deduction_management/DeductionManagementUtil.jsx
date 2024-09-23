import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '공제 항목 목록',
            children: (
                <Typography>
                    각 사원에게 적용되는 공제 항목을 목록으로 조회하고, 공제 내역을 확인할 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '공제 항목 등록/수정',
            children: (
                <Typography>
                    새로운 공제 항목을 등록하거나 기존 항목을 수정할 수 있음.
                </Typography>
            ),
        },
    ];
}