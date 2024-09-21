// 수정 불가능한 계정과목의 행을 빨간색으로 표시하기 위한 클래스 이름 반환
import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '회계 환경 설정',
            children: (
                <Typography>
                    회계 기준(회계 연도, 회계 기간)을 설정하여 재무 처리 기준을 명확하게 함.<br/>
                    결산일, 보고 주기 등 재무 관리를 위한 환경을 설정함.<br/>
                </Typography>
            ),
        },
        {
            key: '2',
            label: '세금 및 통화 설정',
            children: (
                <Typography>
                    부가세 설정 및 신고 기간을 관리하여 세무 절차를 간소화함.<br/>
                    통화 단위 및 환율 설정을 통해 국제 거래 및 외화 관리에 대한 대비 가능.<br/>
                </Typography>
            ),
        },
    ];
}