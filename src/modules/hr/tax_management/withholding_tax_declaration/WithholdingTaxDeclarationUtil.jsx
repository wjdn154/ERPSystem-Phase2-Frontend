import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '원천세 신고 목록',
            children: (
                <Typography>
                    각 사원의 원천세 내역을 조회하고, 원천세 신고 현황을 확인할 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '원천세 신고서 작성',
            children: (
                <Typography>
                    원천세 신고서를 작성하고, 각종 세금 항목을 반영한 신고서를 제출할 수 있음.
                </Typography>
            ),
        },
    ];
}