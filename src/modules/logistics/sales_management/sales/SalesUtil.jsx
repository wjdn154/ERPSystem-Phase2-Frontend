import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '판매 내역',
            children: (
                <Typography>
                    완료된 판매 기록을 조회하고, 필요한 경우 수정 및 삭제할 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '판매 보고서',
            children: (
                <Typography>
                    판매 실적을 분석한 보고서를 확인하고, 기간별, 제품별 통계를 제공함.
                </Typography>
            ),
        },
    ];
}