import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '사용자 목록 조회',
            children: (
                <Typography>
                    현재 시스템에 등록된 사용자 목록을 조회하고, 계정 상태와 권한을 확인할 수 있는 탭임.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '사용자 등록/수정',
            children: (
                <Typography>
                    신규 사용자를 등록하거나 기존 사용자 정보를 수정할 수 있는 탭임.
                </Typography>
            ),
        },
    ];
}