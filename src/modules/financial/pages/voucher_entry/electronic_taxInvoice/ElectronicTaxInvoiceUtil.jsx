// 수정 불가능한 계정과목의 행을 빨간색으로 표시하기 위한 클래스 이름 반환
import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '세금계산서 발행',
            children: (
                <Typography>
                    새로운 전자세금계산서를 발행 할 수 있는 탭임. 거래처 정보와 거래 금액을 입력한 후 전자 서명을 통해 세금계산서를 발행함.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '발행 내역 조회',
            children: (
                <Typography>
                    선택한 전표의 상세 내역을 확인할 수 있는 탭임. 여기서 전표 내용을 확인하고 수정 및 삭제할 수 있음.
                </Typography>
            ),
        },
    ];
}