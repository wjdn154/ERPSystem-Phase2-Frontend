import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '의뢰 내역',
            children: (
                <Typography>
                    생산 의뢰 목록: 현재 등록된 생산 의뢰 목록을 조회하고, 각 의뢰의 세부 정보를 수정 및 삭제할 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '의뢰 등록',
            children: (
                <Typography>
                    생산 의뢰 등록: 새로운 생산 의뢰를 등록하는 탭으로, 제품명, 수량, 납기일 등의 정보를 입력할 수 있음.
                </Typography>
            ),
        },
    ];
}