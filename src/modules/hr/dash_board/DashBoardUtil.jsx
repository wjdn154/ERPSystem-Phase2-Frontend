import {Typography} from "@mui/material";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '인사 관리 개요',
            children: (
                <Typography>
                    인사 관리는 기업의 직원 정보를 관리하고 인사 관련 기능을 지원합니다. 채용, 급여, 복지 등 다양한 정보를 포함합니다.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '근태 관리',
            children: (
                <Typography>
                    근태 관리는 직원의 출퇴근 기록 및 근무 시간을 관리하는 시스템입니다. 이를 통해 인사 업무를 효율적으로 수행할 수 있습니다.
                </Typography>
            ),
        },
    ];
};