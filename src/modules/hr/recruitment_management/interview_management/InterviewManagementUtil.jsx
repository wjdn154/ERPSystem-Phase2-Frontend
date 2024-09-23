import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '인터뷰 일정 관리',
            children: (
                <Typography>
                    각 지원자의 인터뷰 일정을 설정하고, 예정된 인터뷰를 관리할 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '인터뷰 결과 관리',
            children: (
                <Typography>
                    인터뷰 결과를 기록하고, 평가 내용을 저장하여 최종 결정을 내릴 수 있음.
                </Typography>
            ),
        },
    ];
}