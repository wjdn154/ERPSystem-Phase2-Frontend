import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '퇴사자 목록 조회',
            children: (
                <Typography>
                    퇴사한 사원의 목록을 조회하고, 퇴사 사유와 일정을 확인할 수 있는 탭임.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '퇴사자 기록 관리',
            children: (
                <Typography>
                    퇴사자 정보를 수정하거나 필요 시 기록을 삭제할 수 있는 탭임.
                </Typography>
            ),
        },
    ];
}