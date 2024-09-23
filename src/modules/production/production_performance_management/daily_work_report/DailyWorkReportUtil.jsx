import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '일보 목록',
            children: (
                <Typography>
                    일보 목록: 현재까지 등록된 일간 생산 일보를 확인하고, 각 일보의 세부 정보를 조회할 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '일보 등록',
            children: (
                <Typography>
                    일보 등록: 새로운 일간 생산 일보를 등록하고, 생산된 제품 수량과 작업 결과를 입력할 수 있음.
                </Typography>
            ),
        },
    ];
}