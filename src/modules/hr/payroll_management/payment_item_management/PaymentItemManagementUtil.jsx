import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '지급항목 목록',
            children: (
                <Typography>
                    등록된 지급항목을 조회하고, 각 항목의 세부 내역을 확인할 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '지급항목 등록/수정',
            children: (
                <Typography>
                    새로운 지급항목을 등록하거나 기존 항목을 수정할 수 있음.
                </Typography>
            ),
        },
    ];
}