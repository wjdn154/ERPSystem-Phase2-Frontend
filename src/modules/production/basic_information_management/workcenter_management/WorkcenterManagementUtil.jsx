import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '작업장 목록',
            children: (
                <Typography>
                    현재 등록된 작업장 목록을 조회하고, 수정 및 삭제할 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '작업장 등록',
            children: (
                <Typography>
                    새로운 작업장을 등록하는 탭으로, 위치, 담당자 정보, 설비 정보 등을 입력 가능함.
                </Typography>
            ),
        },
    ];
}