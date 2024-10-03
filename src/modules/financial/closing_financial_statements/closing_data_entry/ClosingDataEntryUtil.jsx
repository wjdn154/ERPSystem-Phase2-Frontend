import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '기초 결산 자료',
            children: (
                <Typography>
                    결산을 위한 기초 데이터를 입력하는 탭임. 자산, 부채, 자본 등 주요 항목을 관리함.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '결산 결과 확인',
            children: (
                <Typography>
                    입력된 결산자료를 바탕으로 결산 결과를 미리 확인할 수 있는 탭임.
                </Typography>
            ),
        },
    ];
}