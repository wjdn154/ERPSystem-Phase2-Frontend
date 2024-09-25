import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '출하지시서 목록',
            children: (
                <Typography>
                    작성된 출하지시서들을 조회하고 수정 및 삭제할 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '출하지시서 작성',
            children: (
                <Typography>
                    새로운 출하지시서를 작성하는 탭으로, 주문서와 연동하여 내용을 자동으로 가져오거나 수동으로 입력 가능함.
                </Typography>
            ),
        },
    ];
}