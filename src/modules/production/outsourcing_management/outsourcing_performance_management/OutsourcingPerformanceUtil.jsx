import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '실적 목록',
            children: (
                <Typography>
                    외주 실적 목록: 외주 업체의 작업 실적을 조회하고, 각 실적의 세부 내용을 확인할 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '실적 등록',
            children: (
                <Typography>
                    외주 실적 등록: 외주 업체의 실적을 기록하고, 품목별 납품 내역과 품질 성과를 입력할 수 있음.                </Typography>
            ),
        },
    ];
}