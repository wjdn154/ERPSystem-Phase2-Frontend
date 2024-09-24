import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '마감후 이월 설정',
            children: (
                <Typography>
                    마감 후 이월 내역을 설정할 수 있는 탭임.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '이월 내역 조회',
            children: (
                <Typography>
                    마감 후 이월된 내역을 조회하고 관리할 수 있는 탭임.
                </Typography>
            ),
        },
    ];
}