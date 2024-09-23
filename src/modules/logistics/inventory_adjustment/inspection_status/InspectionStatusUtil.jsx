import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '실사 현황',
            children: (
                <Typography>
                    재고 실사의 현재 상태와 진행 상황을 확인할 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '실사 완료 내역',
            children: (
                <Typography>
                    실사가 완료된 항목을 조회하고, 결과를 검토할 수 있음.
                </Typography>
            ),
        },
    ];
}