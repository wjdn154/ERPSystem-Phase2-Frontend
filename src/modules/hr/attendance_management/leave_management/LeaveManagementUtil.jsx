import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '휴가 내역 조회',
            children: (
                <Typography>
                    사원의 휴가 신청 내역과 남은 휴가 일수를 조회할 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '휴가 신청/승인',
            children: (
                <Typography>
                    새로운 휴가를 신청하거나 관리자가 이를 승인 및 반려할 수 있음.

                </Typography>
            ),
        },
    ];
}