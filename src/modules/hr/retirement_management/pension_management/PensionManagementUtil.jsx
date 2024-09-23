import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '퇴직연금 내역 조회',
            children: (
                <Typography>
                    사원의 퇴직연금 납부 내역과 계좌 정보를 조회할 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '퇴직연금 관리',
            children: (
                <Typography>
                    새로운 퇴직연금 계좌를 등록하거나, 사원의 연금 관련 정보를 수정할 수 있음.

                </Typography>
            ),
        },
    ];
}