import React from 'react';

export const FinancialStatementColumn = () => {
    return [
        {
            title: '코드',
            dataIndex: 'code',
            key: 'code',
            align: 'center',
            width: '30%',
        },
        {
            title: '이름',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
            width: '70%',
        }
    ];
};