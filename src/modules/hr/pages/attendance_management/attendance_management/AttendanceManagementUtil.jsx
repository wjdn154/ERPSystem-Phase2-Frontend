import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '근태 기록 조회',
            children: (
                <Typography>
                    사원의 출퇴근 시간과 근무 상태를 일별, 월별로 조회할 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '근태 기록 등록/수정',
            children: (
                <Typography>
                    새로운 근태 기록을 등록하거나 기존 데이터를 수정할 수 있음.
                </Typography>
            ),
        },
    ];
}