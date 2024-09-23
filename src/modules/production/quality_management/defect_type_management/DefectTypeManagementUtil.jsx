import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '불량군',
            children: (
                <Typography>
                    불량군/유형 목록: 등록된 불량군 및 유형을 조회하고, 수정 및 삭제할 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '불량유형',
            children: (
                <Typography>
                    불량군/유형 등록: 새로운 불량군 및 유형을 등록하고, 관련 정보를 입력할 수 있음.\
                </Typography>
            ),
        },
    ];
}