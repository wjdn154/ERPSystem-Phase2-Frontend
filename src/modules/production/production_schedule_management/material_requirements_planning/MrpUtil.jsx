import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: 'MRP 목록',
            children: (
                <Typography>
                    자재소요량 목록: 각 제품별로 필요한 자재 소요량을 조회하고, 이를 바탕으로 자재 수급 계획을 세울 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: 'MRP 등록',
            children: (
                <Typography>
                    자재소요량 등록: 새로운 자재 소요량 계획을 수립하고, 필요 자재의 수량을 입력할 수 있음.
                </Typography>
            ),
        },
    ];
}