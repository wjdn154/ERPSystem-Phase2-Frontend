import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '실적 목록',
            children: (
                <Typography>
                    작업 실적 목록: 현재까지 기록된 작업 실적 목록을 확인하고, 각 실적의 세부 정보를 조회 및 수정할 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '실적 등록',
            children: (
                <Typography>
                    작업 실적 등록: 새로운 작업 실적을 등록하고, 작업 내용 및 결과를 입력할 수 있음.
                </Typography>
            ),
        },
    ];
}