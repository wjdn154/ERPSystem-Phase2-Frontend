import {Typography} from "@mui/material";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '생산 프로세스 관리',
            children: (
                <Typography>
                    생산 프로세스는 제품을 생산하는 단계들을 관리하는 중요한 기능입니다. 이를 통해 생산 효율을 극대화할 수 있습니다.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '생산 자원 관리',
            children: (
                <Typography>
                    생산 자원은 재료, 인력, 설비 등 모든 생산 요소를 포함하며, 이를 최적화하여 관리하는 것이 중요합니다.
                </Typography>
            ),
        },
    ];
};