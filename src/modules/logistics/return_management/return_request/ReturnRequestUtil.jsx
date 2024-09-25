import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '반품 접수 목록',
            children: (
                <Typography>
                    접수된 모든 반품 요청서를 조회하고, 수정 및 삭제할 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '반품 접수 작성',
            children: (
                <Typography>
                    새로운 반품 요청서를 작성하는 탭으로, 반품 사유와 반품 품목을 입력할 수 있음.
                </Typography>
            ),
        },
    ];
}