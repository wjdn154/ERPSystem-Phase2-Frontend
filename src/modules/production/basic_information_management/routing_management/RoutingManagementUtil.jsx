import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: 'Routing 목록',
            children: (
                <Typography>
                    현재 설정된 Routing 경로를 조회하고 수정할 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: 'Routing 등록',
            children: (
                <Typography>
                    새로운 제품의 공정 경로를 설정하고, 순서와 공정 간 의존성을 관리할 수 있음.
                </Typography>
            ),
        },
    ];
}