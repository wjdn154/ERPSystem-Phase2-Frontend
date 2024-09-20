import {Typography} from "@mui/material";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '내 권한 조회',
            children: (
                <Typography>
                    이 페이지에서는 사용자가 자신의 권한을 조회할 수 있음.<br/>
                    사용자는 시스템 내에서 자신에게 부여된 권한을 확인하고, 각 권한에 따라 접근할 수 있는 기능을 이해할 수 있음.<br/>
                    권한 변경을 원할 경우 관리자에게 문의해야 함.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '사용자 권한 관리',
            children: (
                <Typography>
                    이 페이지에서는 사용자의 권한을 관리하고, 역할에 따른 권한을 설정할 수 있음.<br/>
                    관리자는 특정 기능에 대한 접근 권한을 제어하여, 각 사용자가 자신의 직무에 맞는 기능만을 사용할 수 있도록 할 수 있음.
                </Typography>
            ),
        },
    ];
};