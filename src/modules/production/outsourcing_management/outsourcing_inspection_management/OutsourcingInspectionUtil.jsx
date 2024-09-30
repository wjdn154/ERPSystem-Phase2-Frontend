import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '검사 목록',
            children: (
                <Typography>
                    외주 검사 목록: 외주 품목에 대해 완료된 검사 내역을 조회하고, 각 품목의 검사 결과를 확인할 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '검사 등록',
            children: (
                <Typography>
                    외주 검사 등록: 새로운 검사 항목을 추가하고, 외주 품목의 검사 결과를 입력할 수 있음.                    외주 검사 등록: 새로운 검사 항목을 추가하고, 외주 품목의 검사 결과를 입력할 수 있음. 등록: 새로운 외주 단가를 등록하고, 품목별 단가 정보를 입력할 수 있음.
                </Typography>
            ),
        },
    ];
}