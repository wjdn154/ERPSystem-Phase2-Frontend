import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '지급명세서 조회',
            children: (
                <Typography>
                    사원의 지급명세서를 조회하고, 해당 연도 또는 월의 지급 내역을 확인할 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '지급명세서 발급:',
            children: (
                <Typography>
                    새로운 지급명세서를 발급하거나, 기존 명세서를 출력할 수 있음.
                </Typography>
            ),
        },
    ];
}