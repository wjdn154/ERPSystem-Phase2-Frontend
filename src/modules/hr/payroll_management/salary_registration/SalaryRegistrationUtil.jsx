import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '급여 정산 목록',
            children: (
                <Typography>
                    사원의 급여 등록 및 수정을 할 수 있음.
                </Typography>
            ),
        },
    ];
}