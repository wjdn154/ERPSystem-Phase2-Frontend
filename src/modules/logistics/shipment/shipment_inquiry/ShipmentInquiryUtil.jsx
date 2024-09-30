import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '출하 내역',
            children: (
                <Typography>
                    완료된 출하 기록을 조회하고, 각 출하의 상세 정보를 확인할 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '송장 정보',
            children: (
                <Typography>
                    출하된 품목의 송장 번호 및 배송 상태를 확인하고 추적할 수 있음.
                </Typography>
            ),
        },
    ];
}