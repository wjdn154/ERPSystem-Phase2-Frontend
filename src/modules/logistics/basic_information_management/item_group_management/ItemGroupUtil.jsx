import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '그룹 목록',
            children: (
                <Typography>
                    등록된 모든 품목 그룹을 조회할 수 있으며, 그룹별로 포함된 품목들을 확인할 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '그룹 등록',
            children: (
                <Typography>
                    새로운 품목 그룹을 등록하는 탭으로, 그룹명과 설명을 입력하고 그룹에 포함시킬 품목들을 선택 가능함.
                </Typography>
            ),
        },
    ];
}