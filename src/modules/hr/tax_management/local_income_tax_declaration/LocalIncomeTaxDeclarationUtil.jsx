import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '지방소득세 신고 목록',
            children: (
                <Typography>
                    각 사원의 지방소득세 내역을 조회하고, 신고 현황을 확인할 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '지방소득세 신고서 작성',
            children: (
                <Typography>
                    지방소득세 신고서를 작성하고, 이를 제출할 수 있음.
                </Typography>
            ),
        },
    ];
}