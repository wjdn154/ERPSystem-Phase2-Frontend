import { Typography } from "@mui/material";
import {Button, Input, Popconfirm, Select} from "antd";
import React from "react";
import DebounceSelect from "../../../../components/DebounceSelect.jsx";
import apiClient from "../../../../config/apiClient.jsx";
import {COMMON_API, FINANCIAL_API} from "../../../../config/apiConstants.jsx";

export const tabItems = () => {
    return [
        {
            key: '1',
            label: '미결전표 입력',
            children: (
                <Typography>
                    미결전표 입력 페이지는 거래 내역을 입력하고 관리하는 기능을 제공합니다.
                    차변과 대변을 입력하여 대차 차액을 맞추고, 재무 기록을 관리할 수 있습니다.
                </Typography>
            ),
        },
        {
            key: '2',
            label: '미결전표 기능',
            children: (
                <Typography>
                    이 기능은 재무 관리에서 발생한 거래 내역을 정확하게 기록하고,
                    대차 차액을 맞추어 재무 상태를 관리할 수 있도록 도와줍니다.
                    각 항목을 입력하여 차변과 대변의 균형을 맞추어야 하며,
                    잔액은 자동으로 계산됩니다.
                </Typography>
            ),
        },
    ];
};

const fetchInitialAccountSubject = async () => {
    try {
        const response = await apiClient.post(FINANCIAL_API.ACCOUNT_SUBJECTS_API);
        return response.data.accountSubjects.map((accountSubject) => ({
            label: accountSubject.name,
            value: accountSubject.id,
        }));
    } catch (error) {
        console.error('초기 회사 목록을 불러오는 중 오류 발생', error);
        return [];
    }
};

const fetchAccountSubjects = async (searchText) => {
    try {
        const response = await apiClient.post(FINANCIAL_API.ACCOUNT_SUBJECTS_SEARCH_API, { searchText });
        return response.data.map((accountSubject) => ({
            label: accountSubject.name,
            value: accountSubject.id,
        }));
    } catch (error) {
        return [];
    }
};

const fetchClients = async (searchText) => {
    try {
        console.log(searchText);
        const response = await apiClient.post(FINANCIAL_API.CLIENT_SEARCH_API, { searchText });
        console.log(response.data);
        return response.data.map((client) => ({
            label: client.printClientName,
            value: client.code,
        }));
    } catch (error) {
        return [];
    }
};

export const VoucherColumns = (handleFieldChange, accountSubjects, clients, dataSource, handleDelete) => [
    {
        title: '구분',
        dataIndex: 'type',
        key: 'type',
        render: (text, record) => (
            <Select
                value={record.type}
                onChange={(value) => handleFieldChange(value, 'type', record.key)}
                placeholder="구분 선택"
                style={{ width: '100%', padding: '0' }} // 패딩을 0으로 설정하여 더 플랫하게 만듦
            >
                <Select.Option value="출금">출금</Select.Option>
                <Select.Option value="입금">입금</Select.Option>
                <Select.Option value="차변">차변</Select.Option>
                <Select.Option value="대변">대변</Select.Option>
            </Select>
        ),
        width: 150,
    },
    {
        title: '계정과목',
        dataIndex: 'accountSubject',
        key: 'accountSubject',
        render: (text, record) => (
            <DebounceSelect
                value={record.accountSubject}
                placeholder="계정과목 선택"
                fetchInitialOptions={fetchInitialAccountSubject}
                fetchSearchOptions={fetchAccountSubjects}
                onChange={(value) => handleFieldChange(value, 'accountSubject', record.key)}
                style={{ width: '100%', padding: '0' }} // 테이블에 맞도록 스타일을 플랫하게 만듦
            />
        ),
        width: 150,
    },
    {
        title: '거래처',
        dataIndex: 'client',
        key: 'client',
        render: (text, record) => (
            <DebounceSelect
                value={record.client}
                placeholder="거래처 선택"
                fetchInitialOptions={fetchClients}
                fetchSearchOptions={fetchClients}
                onChange={(value) => handleFieldChange(value, 'client', record.key)}
                style={{ width: '100%', padding: '0' }} // 테이블에 맞게 플랫하게 조정
            />
        ),
        width: 150,
    },
    {
        title: '적요',
        dataIndex: 'description',
        key: 'description',
        render: (text, record) => (
            <Input
                value={record.description}
                onChange={(e) => handleFieldChange(e.target.value, 'description', record.key)}
                placeholder="적요 입력"
                style={{ width: '100%', padding: '4px', border: 'none' }} // 플랫하게 보이도록 패딩과 테두리 제거
            />
        ),
        width: 200,
    },
    {
        title: '차변',
        dataIndex: 'debitAmount',
        key: 'debitAmount',
        render: (text, record) => (
            <Input
                type="number"
                value={record.debitAmount}
                onChange={(e) => handleFieldChange(e.target.value, 'debitAmount', record.key)}
                placeholder="차변 입력"
                disabled={record.type === '대변' || record.type === '결산대변'}
                style={{ width: '100%', padding: '4px', border: 'none' }} // 입력 요소를 플랫하게 만듦
            />
        ),
        width: 150,
    },
    {
        title: '대변',
        dataIndex: 'creditAmount',
        key: 'creditAmount',
        render: (text, record) => (
            <Input
                type="number"
                value={record.creditAmount}
                onChange={(e) => handleFieldChange(e.target.value, 'creditAmount', record.key)}
                placeholder="대변 입력"
                disabled={record.type === '차변' || record.type === '결산차변'}
                style={{ width: '100%', padding: '4px', border: 'none' }} // 플랫 스타일 적용
            />
        ),
        width: 150,
    },
    {
        title: '삭제',
        key: 'action',
        render: (_, record) =>
            dataSource.length >= 1 ? (
                <Popconfirm title="삭제하시겠습니까?" onConfirm={() => handleDelete(record.key)}>
                    <Button size="small" type="primary" danger>삭제</Button>
                </Popconfirm>
            ) : null,
        width: 100,
    },
];