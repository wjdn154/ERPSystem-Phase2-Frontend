import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: 'Serial No. 목록',
            children: (
                <Typography>
                    Serial No. 목록: 각 제품의 일련번호 기록을 조회하고, 필요한 경우 수정 및 삭제할 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: 'Serial No. 등록',
            children: (
                <Typography>
                    Serial No. 등록: 새로운 제품의 일련번호를 등록하고, 관련 정보를 입력할 수 있음.
                </Typography>
            ),
        },
    ];
}