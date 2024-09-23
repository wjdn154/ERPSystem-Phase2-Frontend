import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '지원자 목록',
            children: (
                <Typography>
                    각 채용 공고에 지원한 지원자를 목록으로 조회하고, 지원자의 기본 정보를 확인할 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '지원자 상세 정보',
            children: (
                <Typography>
                    선택한 지원자의 상세 정보를 확인하고, 지원 상태를 관리할 수 있음.
                </Typography>
            ),
        },
    ];
}