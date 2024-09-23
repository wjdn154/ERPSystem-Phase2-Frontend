import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '받을 어음 목록',
            children: (
                <Typography>
                    발행된 받을 어음의 리스트를 조회하고, 어음별 상세 내역을 확인할 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '어음 상태 분석',
            children: (
                <Typography>
                    어음의 만기일, 금액, 발행처 등을 기반으로 받을 어음의 상태를 분석하고, 자금 흐름을 평가할 수 있음.
                </Typography>
            ),
        },
    ];
}