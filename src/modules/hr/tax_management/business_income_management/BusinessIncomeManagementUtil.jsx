import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '사업소득 내역 조회',
            children: (
                <Typography>
                    사원의 사업소득 내역을 조회하고, 세금 계산 결과를 확인할 수 있음.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '사업소득 세금 계산',
            children: (
                <Typography>
                    사업소득에 따른 세금 내역을 입력하고, 세금 납부에 필요한 자료를 생성할 수 있음.
                </Typography>
            ),
        },
    ];
}