import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '반품 현황 조회',
            children: (
                <Typography>
                    현재 진행 중인 반품 요청의 상태를 확인할 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '반품 완료 내역',
            children: (
                <Typography>
                    완료된 반품 기록을 조회하고, 필요한 경우 관련 정보를 수정할 수 있음.
                </Typography>
            ),
        },
    ];
}