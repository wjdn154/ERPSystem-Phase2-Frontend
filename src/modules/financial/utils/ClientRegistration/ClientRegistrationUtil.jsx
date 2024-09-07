// 수정 불가능한 계정과목의 행을 빨간색으로 표시하기 위한 클래스 이름 반환
import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '거래처 목록',
            children: (
                <Typography>
                    현재 등록된 모든 거래처 목록을 보여주는 부분으로, 거래처명, 거래처 코드, 연락처 등 기본 정보를 포함하고 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '거래처 상세 정보',
            children: (
                <Typography>
                    선택된 거래처의 상세 정보를 확인하고 수정할 수 있는 부분으로, 주소, 결제 조건, 담당자 등의 정보를 포함하고 있음.
                </Typography>
            ),
        },
        {
            key: '3',
            label: '거래처 등록',
            children: (
                <Typography>
                    새로운 거래처를 등록할 수 있는 화면으로, 거래처명, 주소, 연락처, 결제 조건 등을 입력하여 거래처를 추가할 수 있음.
                </Typography>
            ),
        },
    ];
}