import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '채용 공고 목록',
            children: (
                <Typography>
                    현재 진행 중인 채용 공고를 목록으로 확인하고, 각 공고의 상태를 조회할 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '채용 공고 등록/수정',
            children: (
                <Typography>
                    새로운 채용 공고를 등록하거나 기존 공고 내용을 수정할 수 있음.
                </Typography>
            ),
        },
    ];
}