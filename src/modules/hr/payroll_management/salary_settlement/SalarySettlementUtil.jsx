import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '급여 정산 목록',
            children: (
                <Typography>
                    사원의 월별 급여 내역을 확인하고, 급여 정산 내역을 조회할 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '급여 정산 계산',
            children: (
                <Typography>
                    사원의 근무 정보를 바탕으로 급여를 계산하고, 각종 공제 항목을 반영한 급여를 확인할 수 있음.
                </Typography>
            ),
        },
    ];
}