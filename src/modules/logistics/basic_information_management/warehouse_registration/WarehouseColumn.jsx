// warehouseColumn.js
import { Tag } from 'antd';

const getWarehouseTypeTag = (type) => {
    switch (type) {
        case 'WAREHOUSE':
            return <Tag color="green">창고</Tag>;
        case 'FACTORY':
            return <Tag color="blue">공장</Tag>;
        case 'OUTSOURCING_FACTORY':
            return <Tag color="purple">외주 공장</Tag>;
        default:
            return <Tag color="default"></Tag>;
    }
};

export const warehouseColumn = [
    {
        title: '창고 코드',
        dataIndex: 'code',
        key: 'code',
        width: '15%',
        align: 'center',
    },
    {
        title: '창고 이름',
        dataIndex: 'name',
        key: 'name',
        width: '25%',
        align: 'center',
    },
    {
        title: '창고 유형',
        dataIndex: 'warehouseType',
        key: 'warehouseType',
        width: '20%',
        align: 'center',
        render: (type) => getWarehouseTypeTag(type),
    },
    {
        title: '생산공정명',
        dataIndex: 'productionProcess',
        key: 'productionProcess',
        width: '20%',
        align: 'center',
    },
    {
        title: '활성 상태',
        dataIndex: 'isActive',
        key: 'isActive',
        width: '10%',
        align: 'center',
        render: (isActive) => (
            <Tag color={isActive ? 'green' : 'red'}>
                {isActive ? '활성' : '비활성'}
            </Tag>
        ),
    },
];
