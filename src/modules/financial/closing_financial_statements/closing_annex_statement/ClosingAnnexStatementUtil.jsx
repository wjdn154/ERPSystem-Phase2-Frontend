import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '부속 명세서 조회',
            children: (
                <Typography>
                    결산과 관련된 부속 명세서를 조회할 수 있는 탭임.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '명세서 기록/수정',
            children: (
                <Typography>
                    필요한 결산 부속 명세서를 기록하거나 수정할 수 있는 탭임.
                </Typography>
            ),
        },
    ];
}