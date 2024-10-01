import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '발주 계획 목록',
            children: (
                <Typography>
                    생성된 발주 계획을 조회하고, 수정 및 삭제할 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '발주 계획 작성',
            children: (
                <Typography>
                    발주 요청서를 기반으로 새로운 발주 계획을 작성하는 탭으로, 일정과 공급업체를 지정할 수 있음.
                </Typography>
            ),
        },
    ];
}