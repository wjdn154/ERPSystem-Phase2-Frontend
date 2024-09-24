import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '자산 등록',
            children: (
                <Typography>
                    고정자산을 새로 등록하거나 기존 자산 정보를 수정할 수 있는 탭임.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '자산 조회',
            children: (
                <Typography>
                    등록된 고정자산을 목록으로 조회하고, 각 자산의 상태와 세부 정보를 확인할 수 있는 탭임.
                </Typography>
            ),
        },
    ];
}