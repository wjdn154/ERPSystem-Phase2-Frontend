import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '출하 입력',
            children: (
                <Typography>
                    출하지시서와 연동하여 출하할 품목과 수량, 출하일을 입력할 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '송장 정보 입력',
            children: (
                <Typography>
                    출하와 관련된 송장 번호를 입력하고 배송 상태를 업데이트할 수 있음.
                </Typography>
            ),
        },
    ];
}