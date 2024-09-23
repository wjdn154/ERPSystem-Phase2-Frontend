import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '이력 목록',
            children: (
                <Typography>
                    작업 배정 이력: 배정된 작업의 이력을 확인하고, 각 작업의 배정 상황을 수정 및 업데이트할 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '이력 상세',
            children: (
                <Typography>
                    배정 이력 상세: 선택된 배정 작업의 상세 정보를 조회하고, 필요한 경우 수정할 수 있음.
                </Typography>
            ),
        },
    ];
}