// getRowClassName 함수 정의
import {Typography} from "antd";

export const getRowClassName = (record) => {
    return record.isActive ? 'active-row' : 'inactive-row';
};


export const tabItems = () => {
    return [
        {
            key: '1',
            label: '작업장 목록 및 상세 내용',
            children: (
                <Typography>
                    작업장에서 사용되는 모든 작업장을 리스트 형태로 보여주는 부분으로, 각 작업장의 상태와 세부 정보를 관리하는 데 필수적인 역할을 함.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '작업장 체계',
            children: (
                <Typography>
                    작업장의 구조와 운영 방식을 체계적으로 분류하고 관리하기 위한 체계임.
                </Typography>
            ),
        },
    ];
};