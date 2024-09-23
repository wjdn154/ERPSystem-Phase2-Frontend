import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '급여명세서 조회',
            children: (
                <Typography>
                    사원의 월별 급여명세서를 조회하고, 각 항목별로 지급 내역을 확인할 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '급여명세서 발급',
            children: (
                <Typography>
                    사원에게 급여명세서를 발급하고, 필요한 경우 명세서를 출력할 수 있음.
                </Typography>
            ),
        },
    ];
}