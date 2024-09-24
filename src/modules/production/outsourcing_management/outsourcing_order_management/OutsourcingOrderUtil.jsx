import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '발주 목록',
            children: (
                <Typography>
                    외주 발주 목록: 외주 업체에 발주한 내역을 조회하고, 각 발주서의 세부 정보를 확인할 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '발주 등록',
            children: (
                <Typography>
                    외주 발주 등록: 새로운 외주 발주서를 작성하고, 발주 품목과 수량을 입력할 수 있음.
                </Typography>
            ),
        },
    ];
}