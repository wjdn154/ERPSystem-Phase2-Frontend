// 수정 불가능한 계정과목의 행을 빨간색으로 표시하기 위한 클래스 이름 반환
import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '미결 전표 목록',
            children: (
                <Typography>
                    승인 대기 중인 전표를 확인하고 검토할 수 있음.<br/>
                    전표별 거래 내역을 조회하고 필요한 경우 전표를 수정하거나 반려할 수 있음.<br/>
                </Typography>
            ),
        },
        {
            key: '2',
            label: '승인 내역',
            children: (
                <Typography>
                    승인된 전표 목록을 확인하고, 승인 일자 및 승인자를 조회할 수 있음.<br/>
                    승인 내역은 추후 회계 감사 시 중요한 자료로 활용됨.<br/>
                </Typography>
            ),
        },
    ];
}