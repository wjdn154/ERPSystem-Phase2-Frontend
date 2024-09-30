import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '폐기물 목록',
            children: (
                <Typography>
                    폐기물 목록: 발생한 폐기물의 목록을 조회하고, 각 폐기물의 처리 상태를 확인할 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '폐기물 처리 등록',
            children: (
                <Typography>
                    폐기물 처리 등록: 새로운 폐기물 처리 내역을 등록하고, 처리 방법과 처리 업체 등의 정보를 입력할 수 있음.
                </Typography>
            ),
        },
    ];
}