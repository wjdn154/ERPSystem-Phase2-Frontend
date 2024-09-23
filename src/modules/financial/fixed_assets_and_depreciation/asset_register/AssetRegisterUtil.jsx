import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '자산 관리대장 조회',
            children: (
                <Typography>
                    모든 고정자산의 관리대장을 조회하여 자산별 상세 내역을 확인할 수 있는 탭임.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '자산 상태 분석',
            children: (
                <Typography>
                    각 고정자산의 감가상각 상태와 자산 가치를 분석하고, 자산의 상태를 평가할 수 있는 탭임.
                </Typography>
            ),
        },
    ];
}