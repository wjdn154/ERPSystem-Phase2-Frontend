import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '잉여금 처분 항목',
            children: (
                <Typography>
                    잉여금을 배당, 적립금 등으로 나누어 처분할 항목을 관리할 수 있는 탭임.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '처분 내역 확인',
            children: (
                <Typography>
                    각 항목에 대해 잉여금 처분 내역을 확인하고 기록할 수 있는 탭임.
                </Typography>
            ),
        },
    ];
}