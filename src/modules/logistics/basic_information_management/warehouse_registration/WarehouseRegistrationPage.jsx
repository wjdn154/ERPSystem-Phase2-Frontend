import React, { useState, useEffect, useCallback } from 'react';
import { Box, Grid, Card, Paper, Typography, Button, Divider } from '@mui/material';
import { Table, Tag, Select, Input, Form, Popconfirm, Space } from 'antd';
import { LOGISTICS_API } from '../../../../config/apiConstants';
import apiClient from '../../../../config/apiClient';
import { useNotificationContext } from '../../../../config/NotificationContext';

const { Option } = Select;

const WarehouseRegistrationPage = () => {
    const notify = useNotificationContext();
    const [warehouseList, setWarehouseList] = useState([]);
    const [warehouseDetail, setWarehouseDetail] = useState(null);
    const [selectedWarehouseId, setSelectedWarehouseId] = useState(null);
    const [hierarchyGroups, setHierarchyGroups] = useState([]);
    const [isCreating, setIsCreating] = useState(false);
    const [form] = Form.useForm(); // Form 인스턴스 생성

    // **창고 목록 가져오기**
    const fetchWarehouseList = useCallback(async () => {
        try {
            const response = await apiClient.post(LOGISTICS_API.WAREHOUSE_LIST_API);
            setWarehouseList(response.data);
        } catch (error) {
            notify('error', '창고 목록 조회 실패', '목록 조회 중 오류가 발생했습니다.');
        }
    }, [notify]);

    // **계층 그룹 목록 가져오기**
    const fetchHierarchyGroups = useCallback(async () => {
        try {
            const response = await apiClient.post(LOGISTICS_API.HIERARCHY_GROUP_LIST_API);
            setHierarchyGroups(response.data);
        } catch (error) {
            notify('error', '계층 그룹 조회 실패', '계층 그룹 목록 조회 중 오류가 발생했습니다.');
        }
    }, [notify]);

    // **창고 상세 정보 가져오기**
    const fetchWarehouseDetail = useCallback(async (id) => {
        try {
            const response = await apiClient.post(LOGISTICS_API.WAREHOUSE_DETAIL_API(id));
            setWarehouseDetail(response.data);
            form.setFieldsValue({
                ...response.data,
                isActive: response.data.isActive ? '사용중' : '사용중단',
                hierarchyGroups: response.data.hierarchyGroups?.map((group) => group.id) || [],
            });
        } catch (error) {
            notify('error', '창고 상세 조회 실패', '상세 정보 조회 중 오류가 발생했습니다.');
        }
    }, [form, notify]);

    useEffect(() => {
        fetchWarehouseList();
        fetchHierarchyGroups();
    }, [fetchWarehouseList, fetchHierarchyGroups]);

    useEffect(() => {
        if (selectedWarehouseId) fetchWarehouseDetail(selectedWarehouseId);
    }, [selectedWarehouseId, fetchWarehouseDetail]);

    const handleFormSubmit = async (values) => {
        const formData = {
            ...values,
            isActive: values.isActive === '사용중',
            hierarchyGroups: values.hierarchyGroups.map((id) =>
                hierarchyGroups.find((group) => group.id === id)
            ),
        };
        if (isCreating) {
            await handleRegisterWarehouse(formData);
        } else {
            await handleUpdateWarehouse(selectedWarehouseId, formData);
        }
    };

    const handleRegisterWarehouse = async (data) => {
        try {
            await apiClient.post(LOGISTICS_API.WAREHOUSE_CREATE_API, data);
            notify('success', '창고 등록 성공', '새 창고가 등록되었습니다.');
            setIsCreating(false);
            await fetchWarehouseList();
        } catch (error) {
            notify('error', '창고 등록 실패', '등록 중 오류가 발생했습니다.');
        }
    };

    const handleUpdateWarehouse = async (id, data) => {
        try {
            await apiClient.put(LOGISTICS_API.WAREHOUSE_UPDATE_API(id), data);
            notify('success', '창고 수정 성공', '창고 정보가 수정되었습니다.');
            await fetchWarehouseList();
        } catch (error) {
            notify('error', '창고 수정 실패', '수정 중 오류가 발생했습니다.');
        }
    };

    const handleDeleteWarehouse = async (id) => {
        try {
            await apiClient.delete(LOGISTICS_API.WAREHOUSE_DELETE_API(id));
            notify('success', '창고 삭제 성공', '창고가 삭제되었습니다.');
            setSelectedWarehouseId(null);
            await fetchWarehouseList();
        } catch (error) {
            notify('error', '창고 삭제 실패', '삭제 중 오류가 발생했습니다.');
        }
    };

    return (
        <Box sx={{ margin: '20px' }}>
            <Typography variant="h4">창고 관리</Typography>
            <Divider sx={{ marginY: '20px' }} />

            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Card sx={{ height: '100%', overflow: 'auto' }}>
                        <Table
                            dataSource={warehouseList}
                            columns={[
                                { title: '창고 코드', dataIndex: 'code', key: 'code', align: 'center' },
                                { title: '창고 이름', dataIndex: 'name', key: 'name', align: 'center' },
                                {
                                    title: '창고 유형',
                                    dataIndex: 'warehouseType',
                                    key: 'warehouseType',
                                    align: 'center',
                                    render: (type) => (
                                        <Tag color={type === 'WAREHOUSE' ? 'green' : 'blue'}>
                                            {type === 'WAREHOUSE' ? '창고' : '공장'}
                                        </Tag>
                                    ),
                                },
                                { title: '생산공정명', dataIndex: 'productionProcess', key: 'productionProcess', align: 'center' },
                                {
                                    title: '활성화 여부',
                                    dataIndex: 'isActive',
                                    key: 'isActive',
                                    align: 'center',
                                    render: (isActive) => (
                                        <Tag color={isActive ? 'green' : 'red'}>
                                            {isActive ? '사용중' : '사용중단'}
                                        </Tag>
                                    ),
                                },
                            ]}
                            rowKey="id"
                            onRow={(record) => ({
                                onClick: () => {
                                    setSelectedWarehouseId(record.id);
                                    setIsCreating(false);
                                },
                            })}
                        />
                        <Button
                            onClick={() => {
                                setIsCreating(true);
                                form.resetFields();
                            }}
                            type="primary"
                            style={{ marginTop: '10px' }}
                        >
                            신규 창고
                        </Button>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                    {(isCreating || selectedWarehouseId) && (
                        <Paper sx={{ padding: '20px' }}>
                            <Typography variant="h6">
                                {isCreating ? '신규 창고 등록' : '창고 상세 정보'}
                            </Typography>
                            <Form form={form} onFinish={handleFormSubmit} layout="vertical">
                                <Form.Item
                                    name="code"
                                    label="창고 코드"
                                    rules={[{ required: true, message: '창고 코드를 입력해주세요.' }]}
                                >
                                    <Input disabled={!isCreating} />
                                </Form.Item>
                                <Form.Item
                                    name="name"
                                    label="창고 이름"
                                    rules={[{ required: true, message: '창고 이름을 입력해주세요.' }]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    name="warehouseType"
                                    label="창고 유형"
                                    rules={[{ required: true, message: '창고 유형을 선택해주세요.' }]}
                                >
                                    <Select>
                                        <Option value="WAREHOUSE">창고</Option>
                                        <Option value="FACTORY">공장</Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item name="hierarchyGroups" label="계층 그룹">
                                    <Select mode="multiple" placeholder="계층 그룹을 선택해주세요.">
                                        {hierarchyGroups.map((group) => (
                                            <Option
                                                key={group.id}
                                                value={group.id}
                                                label={`${group.hierarchyGroupCode} - ${group.hierarchyGroupName}`}
                                            >
                                                {`${group.hierarchyGroupCode} - ${group.hierarchyGroupName}`}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item name="isActive" label="활성화 여부">
                                    <Select>
                                        <Option value="사용중">사용중</Option>
                                        <Option value="사용중단">사용중단</Option>
                                    </Select>
                                </Form.Item>
                                <Space style={{ marginTop: '20px' }}>
                                    <Button type="primary" htmlType="submit">
                                        {isCreating ? '등록하기' : '수정하기'}
                                    </Button>
                                    {!isCreating && (
                                        <Popconfirm
                                            title="정말로 삭제하시겠습니까?"
                                            onConfirm={() => handleDeleteWarehouse(selectedWarehouseId)}
                                        >
                                            <Button danger>삭제하기</Button>
                                        </Popconfirm>
                                    )}
                                </Space>
                            </Form>
                        </Paper>
                    )}
                </Grid>
            </Grid>
        </Box>
    );
};

export default WarehouseRegistrationPage;
