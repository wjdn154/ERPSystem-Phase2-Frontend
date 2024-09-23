// 수정 불가능한 계정과목의 행을 빨간색으로 표시하기 위한 클래스 이름 반환
import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '거래처별 거래 내역',
            children: (
                <Typography>
                    각 거래처에 대한 거래 내역을 조회할 수 있는 탭임. 기간별로 필터링 하여 거래 기록을 상세히 확인할 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '거래처별 미수금/미지급금',
            children: (
                <Typography>
                    특정 거래처에 대해 남아 있는 미수금과 미지급금을 조회하고 관리할 수 있는 탭임.
                </Typography>
            ),
        },
    ];
}