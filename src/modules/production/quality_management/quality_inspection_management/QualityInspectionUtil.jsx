import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '불량군',
            children: (
                <Typography>
                    품질 검사 목록: 완료된 품질 검사 내역을 조회하고, 각 검사 항목의 결과를 확인할 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '불량유형',
            children: (
                <Typography>
                    품질 검사 등록: 새로운 품질 검사 항목을 등록하고, 검사 기준 및 결과를 입력할 수 있음.
                </Typography>
            ),
        },
    ];
}