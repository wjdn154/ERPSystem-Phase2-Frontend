import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '퇴직금 추계액 조회',
            children: (
                <Typography>
                    사원의 근속 기간과 급여 정보를 바탕으로 퇴직금 추계액을 조회할 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '퇴직금 계산 내역',
            children: (
                <Typography>
                    사원의 퇴직금을 계산하고, 퇴직 시 지급될 금액을 확인할 수 있음.
                </Typography>
            ),
        },
    ];
}