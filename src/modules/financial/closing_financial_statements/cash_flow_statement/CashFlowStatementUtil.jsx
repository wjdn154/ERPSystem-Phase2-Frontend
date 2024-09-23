import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '현금 유입/유출 조회',
            children: (
                <Typography>
                    영업, 투자, 재무활동에 따른 현금의 유입과 유출 내역을 조회할 수 있는 탭임.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '현금흐름 분석',
            children: (
                <Typography>
                    현금 흐름을 분석하여 기업의 자금 상태와 향후 필요 자금을 예측할 수 있는 탭임.
                </Typography>
            ),
        },
    ];
}