import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '수익/비용 조회',
            children: (
                <Typography>
                    수익과 비용을 항목별로 조회하여 해당 기간 동안의 경영 성과를 파악할 수 있는 탭임.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '순이익 분석',
            children: (
                <Typography>
                    총수익에서 총비용을 차감한 순이익을 분석하고, 이를 통해 경영 상태를 확인할 수 있는 탭임.
                </Typography>
            ),
        },
    ];
}