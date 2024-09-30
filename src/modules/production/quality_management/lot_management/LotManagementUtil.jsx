import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: 'LOT 목록',
            children: (
                <Typography>
                    LOT 목록: 생산된 로트별 기록을 조회하고, 각 로트의 정보를 확인할 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: 'LOT 등록',
            children: (
                <Typography>
                    LOT 등록: 새로운 LOT 정보를 등록하고, 생산 및 검사 관련 데이터를 입력할 수 있음.
                </Typography>
            ),
        },
    ];
}