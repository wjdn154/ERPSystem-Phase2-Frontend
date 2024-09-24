import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '출하지시서 작성',
            children: (
                <Typography>
                    새로운 출하지시서를 작성할 수 있으며, 주문서와 연동하여 출하 정보를 입력 가능함.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '출하지시서 수정',
            children: (
                <Typography>
                    이미 작성된 출하지시서를 선택하여 수정할 수 있음.
                </Typography>
            ),
        },
    ];
}