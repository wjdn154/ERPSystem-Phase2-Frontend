import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '입고 처리 목록',
            children: (
                <Typography>
                    입고 처리 목록: 생산품의 입고 처리 내역을 조회하고, 각 입고 건의 세부 정보를 확인할 수 있음.
                </Typography>

            ),
        },
        {
            key: '2',
            label: '입고 처리 등록',
            children: (
                <Typography>
                    입고 처리 등록: 새로운 생산품 입고 처리를 등록하고, 입고 관련 데이터를 입력할 수 있음.
                </Typography>
            ),
        },
    ];
}