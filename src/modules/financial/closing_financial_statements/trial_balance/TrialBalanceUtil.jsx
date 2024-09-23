import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '합계 잔액 조회',
            children: (
                <Typography>
                    모든 계정과목에 대한 차변, 대변 합계와 잔액을 조회할 수 있는 탭임.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '오류 검토',
            children: (
                <Typography>
                    합계 잔액의 불일치를 검토하고 오류를 수정할 수 있는 탭임.
                </Typography>
            ),
        },
    ];
}