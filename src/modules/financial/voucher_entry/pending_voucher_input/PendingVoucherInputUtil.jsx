import { Typography } from "@mui/material";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '미결전표 입력',
            children: (
                <Typography>
                    미결전표 입력 페이지는 거래 내역을 입력하고 관리하는 기능을 제공합니다.
                    차변과 대변을 입력하여 대차 차액을 맞추고, 재무 기록을 관리할 수 있습니다.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '미결전표 기능',
            children: (
                <Typography>
                    이 기능은 재무 관리에서 발생한 거래 내역을 정확하게 기록하고,
                    대차 차액을 맞추어 재무 상태를 관리할 수 있도록 도와줍니다.
                    각 항목을 입력하여 차변과 대변의 균형을 맞추어야 하며,
                    잔액은 자동으로 계산됩니다.
                </Typography>
            ),
        },
    ];
};