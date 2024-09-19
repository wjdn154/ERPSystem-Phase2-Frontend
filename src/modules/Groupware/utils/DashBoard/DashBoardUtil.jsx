import {Typography} from "@mui/material";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '그룹웨어 소개',
            children: (
                <Typography>
                    그룹웨어는 기업의 협업과 커뮤니케이션을 지원하는 시스템으로, 직원 간의 정보 공유, 일정 관리, 문서 관리 등의 다양한 기능을 제공합니다.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '그룹웨어 기능',
            children: (
                <Typography>
                    그룹웨어 기능으로는 일정 관리, 전자 결재, 메일 시스템, 문서 관리 등이 있으며, 이를 통해 기업 내부에서 효율적인 협업을 도모할 수 있습니다.
                </Typography>
            ),
        },
    ];
};