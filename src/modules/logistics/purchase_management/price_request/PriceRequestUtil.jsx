import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '단가 요청 목록',
            children: (
                <Typography>
                    현재 발송된 모든 단가 요청서를 조회하고, 단가 정보를 확인할 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '단가 요청 작성',
            children: (
                <Typography>
                    새로운 단가 요청서를 작성하는 탭으로, 물품명과 수량, 요청 일자를 입력 가능함.
                </Typography>
            ),
        },
    ];
}