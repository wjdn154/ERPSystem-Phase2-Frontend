import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '단가 목록',
            children: (
                <Typography>
                    외주 단가 목록: 현재 등록된 외주 단가를 확인하고, 수정 및 삭제할 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '단가 등록',
            children: (
                <Typography>
                    외주 단가 등록: 새로운 외주 단가를 등록하고, 품목별 단가 정보를 입력할 수 있음.
                </Typography>
            ),
        },
    ];
}