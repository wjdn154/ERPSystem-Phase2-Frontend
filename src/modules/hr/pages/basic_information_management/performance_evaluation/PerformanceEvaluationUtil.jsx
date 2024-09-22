import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '성과 평가 내역 조회',
            children: (
                <Typography>
                    사원의 성과 평가 내역을 조회하고, 평가 결과를 확인할 수 있는 탭임.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '성과 평가 등록/수정',
            children: (
                <Typography>
                    새로운 평가 데이터를 등록하거나 기존 평가 결과를 수정할 수 있는 탭임.
                </Typography>
            ),
        },
    ];
}