import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '초과근무 내역 조회',
            children: (
                <Typography>
                    사원의 초과 근무 시간을 조회하고, 해당 기간 동안의 초과근무 내역을 확인할 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '초과근무 등록/수정',
            children: (
                <Typography>
                    새로운 초과근무를 기록하거나 기존 내역을 수정할 수 있음.
                </Typography>
            ),
        },
    ];
}