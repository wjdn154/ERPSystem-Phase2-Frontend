import {Typography} from "@mui/material";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '재무 개요',
            children: (
                <Typography>
                    재무회계는 기업의 모든 재정 관련 활동을 기록하고 분석하는 시스템입니다. 이를 통해 기업의 재무 상태를 파악하고 관리합니다.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '계정과목 관리',
            children: (
                <Typography>
                    계정과목은 기업의 거래를 기록하고 분류하는 데 사용됩니다. 모든 회계 작업의 기초로서 중요한 역할을 합니다.
                </Typography>
            ),
        },
    ];
};