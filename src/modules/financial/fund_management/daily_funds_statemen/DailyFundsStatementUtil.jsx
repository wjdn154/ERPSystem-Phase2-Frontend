import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '일일 자금 내역',
            children: (
                <Typography>
                    하루 동안의 입금과 출금 내역을 조회할 수 있는 탭임.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '자금 상태 분석',
            children: (
                <Typography>
                    일일 자금의 유입과 유출을 분석하여 자금 흐름을 평가할 수 있음.
                </Typography>
            ),
        },
    ];
}