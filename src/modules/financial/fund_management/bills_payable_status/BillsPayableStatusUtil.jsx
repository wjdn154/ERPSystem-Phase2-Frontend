import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '지급 어음 목록',
            children: (
                <Typography>
                    발행된 지급 어음의 리스트를 조회하고, 어음별 상세 내역을 확인할 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '어음 상환 분석',
            children: (
                <Typography>
                    지급 어음의 상환 일정을 분석하고, 기업의 지출 계획을 평가할 수 있음.
                </Typography>
            ),
        },
    ];
}