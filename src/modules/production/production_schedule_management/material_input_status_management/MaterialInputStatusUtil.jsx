import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '실자재 투입 목록',
            children: (
                <Typography>
                    실자재 투입 목록: 현재까지 투입된 자재의 목록을 조회하고, 각 자재의 사용량을 확인할 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '자재 투입 등록',
            children: (
                <Typography>
                    자재 투입 등록: 새로운 자재 투입 기록을 추가하고, 공정별로 투입된 자재를 입력할 수 있음.
                </Typography>
            ),
        },
    ];
}