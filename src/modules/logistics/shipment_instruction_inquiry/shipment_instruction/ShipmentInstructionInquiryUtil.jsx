import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '출하지시서 목록',
            children: (
                <Typography>
                    작성된 모든 출하지시서를 조회하고, 상태를 확인할 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '출하지시서 상세',
            children: (
                <Typography>
                    선택된 출하지시서의 상세 내용을 확인하고, 필요한 경우 수정할 수 있음.
                </Typography>
            ),
        },
    ];
}