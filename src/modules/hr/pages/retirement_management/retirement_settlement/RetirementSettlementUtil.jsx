import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '퇴직 정산 내역 조회',
            children: (
                <Typography>
                    사원의 퇴직 시 정산된 금액을 조회하고, 퇴직 내역을 확인할 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '퇴직금 정산 계산',
            children: (
                <Typography>
                    사원의 퇴직금 정산 내역을 입력하고, 중도 또는 정상 퇴직 시 정산된 금액을 계산할 수 있음.
                </Typography>
            ),
        },
    ];
}