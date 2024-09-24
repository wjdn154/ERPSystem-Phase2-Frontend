import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '진행 중인 출하',
            children: (
                <Typography>
                    현재 진행 중인 출하 내역을 조회하고, 상태를 실시간으로 업데이트할 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '출하 완료 내역',
            children: (
                <Typography>
                    완료된 출하 기록을 조회하고, 배송 완료 상태와 송장 정보를 확인할 수 있음.
                </Typography>
            ),
        },
    ];
}