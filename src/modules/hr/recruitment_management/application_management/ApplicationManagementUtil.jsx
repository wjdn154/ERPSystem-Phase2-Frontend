import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '지원서 목록',
            children: (
                <Typography>
                    각 지원자가 제출한 지원서를 목록으로 조회하고, 각 지원서의 상태를 확인할 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '지원서 상세 정보',
            children: (
                <Typography>
                    선택한 지원자의 지원서를 열람하고, 필요한 경우 상태를 변경하거나 코멘트를 추가할 수 있음.
                </Typography>
            ),
        },
    ];
}