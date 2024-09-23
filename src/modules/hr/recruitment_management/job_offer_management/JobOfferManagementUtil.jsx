import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '채용 제안 작성',
            children: (
                <Typography>
                    채용이 확정된 지원자에게 보내는 채용 제안을 작성하고, 제안서를 관리할 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '제안 수락/거부 관리',
            children: (
                <Typography>
                    지원자의 제안 수락 또는 거부 여부를 기록하고, 채용 상태를 업데이트할 수 있음.
                </Typography>
            ),
        },
    ];
}