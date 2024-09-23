import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '사회보험 내역 조회',
            children: (
                <Typography>
                    사원의 사회보험 가입 상태와 납부 내역을 조회할 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '사회보험 등록/수정',
            children: (
                <Typography>
                    새로운 사회보험 항목을 등록하거나 기존 내역을 수정할 수 있음.
                </Typography>
            ),
        },
    ];
}