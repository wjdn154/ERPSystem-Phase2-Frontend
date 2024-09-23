import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '공정 목록',
            children: (
                <Typography>
                    등록된 공정의 세부 정보를 조회하고, 필요한 경우 수정할 수 있음.

                </Typography>
            ),
        },
        {
            key: '2',
            label: '공정 등록',
            children: (
                <Typography>
                    새로운 공정을 등록하여 공정 단계, 소요 시간 등을 입력할 수 있음.
                </Typography>
            ),
        },
    ];
}