import {Typography} from "antd";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '세금계산서 조회',
            children: (
                <Typography>
                    세금계산서 내역을 조회할 수 있는 탭임. 날짜, 거래처별로 필터링하여 필요한 자료를 쉽게 찾을 수 있음.<br/>
                </Typography>
            ),
        },
        {
            key: '2',
            label: '발행 상태 관리',
            children: (
                <Typography>
                    발행된 세금계산서의 상태를 확인하고 관리 할 수 있는 탭임.<br/>
                </Typography>
            ),
        },
    ];
}