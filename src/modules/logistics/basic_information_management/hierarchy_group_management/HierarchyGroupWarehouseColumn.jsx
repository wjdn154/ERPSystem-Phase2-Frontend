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

export const hierarchyWarehouseColumn = [
    {
        title: '창고 유형',
        dataIndex: 'warehouseType',
        key: 'warehouseType',
        width: '20%',
        align: 'center',
        render: (type) => getWarehouseTypeTag(type),
    },
    {
        title: '창고 코드',
        dataIndex: 'warehouseCode',
        key: 'warehouseCode',
        width: '15%',
        align: 'center',
    },
    {
        title: '창고 이름',
        dataIndex: 'warehouseName',
        key: 'warehouseCode',
        width: '25%',
        align: 'center',
    }
];
