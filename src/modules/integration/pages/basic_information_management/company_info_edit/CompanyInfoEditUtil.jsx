// 수정 불가능한 계정과목의 행을 빨간색으로 표시하기 위한 클래스 이름 반환
import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '기본 정보',
            children: (
                <Typography>
                    회사명, 주소, 전화번호, 이메일 등 기본적인 회사 정보를 조회하고 수정할 수 있는 탭임.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '추가 설정',
            children: (
                <Typography>
                    회사 로고 및 기타 추가 정보를 설정할 수 있는 탭임.
                </Typography>
            ),
        },
    ];
}