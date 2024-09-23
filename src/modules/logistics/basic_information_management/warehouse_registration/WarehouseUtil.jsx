import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '창고 목록',
            children: (
                <Typography>
                    등록된 창고들을 조회하고, 창고별로 재고 정보를 확인할 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '창고 등록',
            children: (
                <Typography>
                    새로운 창고를 등록하는 탭으로, 창고 이름, 위치, 담당자 정보 등을 입력할 수 있음.
                </Typography>
            ),
        },
    ];
}