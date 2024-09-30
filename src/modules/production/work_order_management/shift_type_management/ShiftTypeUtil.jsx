import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '유형 목록',
            children: (
                <Typography>
                    교대 유형 목록: 등록된 교대 근무 유형을 확인하고, 각 유형의 정보를 수정 및 삭제할 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '유형 등록',
            children: (
                <Typography>
                    교대 유형 등록: 새로운 교대 근무 유형을 등록하고, 근무 시간과 관련 정보를 입력할 수 있음.
                </Typography>
            ),
        },
    ];
}