import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '기타소득 내역 조회',
            children: (
                <Typography>
                    사원의 기타소득 내역을 조회하고, 소득 발생 내역을 확인할 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '기타소득 세금 계산',
            children: (
                <Typography>
                    기타소득에 따른 세금을 계산하고, 이를 신고하기 위한 자료를 생성할 수 있음.
                </Typography>
            ),
        },
    ];
}