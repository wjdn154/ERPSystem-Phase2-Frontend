import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '발령 내역 조회',
            children: (
                <Typography>
                    사원의 발령 내역을 조회하고, 발령 이력을 확인할 수 있는 탭임.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '발령 등록/수정',
            children: (
                <Typography>
                    새로운 발령을 등록하거나 기존 발령 내역을 수정할 수 있는 탭임.
                </Typography>
            ),
        },
    ];
}