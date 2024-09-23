import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '전표 목록',
            children: (
                <Typography>
                    출력할 전표를 선택할 수 있는 탭임. 전표 번호나 날짜로 필터링하여 조회 할 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '발행 내역 조회',
            children: (
                <Typography>
                    전표를 인쇄하거나 PDF로 저장 할 때 필요한 설정을 할 수 있는 탭임.
                </Typography>
            ),
        },
    ];
}