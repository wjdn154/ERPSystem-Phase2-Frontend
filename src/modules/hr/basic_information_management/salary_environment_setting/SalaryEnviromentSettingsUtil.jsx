import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '급여 환경 설정 조회',
            children: (
                <Typography>
                    호봉별 수당 체계를 조회하고, 호봉별 각 수당을 확인할 수 있는 탭임.
                </Typography>
            ),
        },
    ];
}