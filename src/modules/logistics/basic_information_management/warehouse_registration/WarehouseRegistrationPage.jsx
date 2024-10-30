import React, {useState, useEffect, useCallback} from 'react';
import {Box, Grid, Card, Paper, Typography, Divider, Grow} from '@mui/material';
import {Table, Tag, Input, Form, Space, Button, Modal, Tree, Select} from 'antd';
import {LOGISTICS_API, PRODUCTION_API} from '../../../../config/apiConstants';
import apiClient from '../../../../config/apiClient';
import {useNotificationContext} from '../../../../config/NotificationContext';
import {tabItems} from "./WarehouseUtil.jsx";
import WelcomeSection from "../../../../components/WelcomeSection.jsx";

const WarehouseRegistrationPage = () => {
    const notify = useNotificationContext(); // 알림 메시지 컨텍스트 사용
    const [warehouseList, setWarehouseList] = useState([]); // 창고 목록
    const [selectedWarehouseId, setSelectedWarehouseId] = useState(null); // 선택된 창고 ID
    const [hierarchyGroups, setHierarchyGroups] = useState([]); // 계층 그룹 목록
    const [checkedKeys, setCheckedKeys] = useState([]); // 체크된 키 목록
    const [selectedGroupData, setSelectedGroupData] = useState([]); // 선택된 그룹 정보
    const [productionProcesses, setProductionProcesses] = useState([]); // 생산공정 목록
    const [isCreating, setIsCreating] = useState(false); // 창고 생성 모드 여부
    const [isHierarchyModalVisible, setIsHierarchyModalVisible] = useState(false); // 계층 그룹 선택 모달 표시 여부
    const [isProcessModalVisible, setIsProcessModalVisible] = useState(false); // 생산공정 선택 모달 표시 여부
    const [selectedProcess, setSelectedProcess] = useState(null); // 선택된 생산공정
    const [activeTabKey, setActiveTabKey] = useState('1'); // 활성화된 탭 키
    const [selectedGroupWarehouses, setSelectedGroupWarehouses] = useState([]); // 선택된 계층 그룹에 속한 창고 목록
    const [form] = Form.useForm(); // Form 인스턴스 생성
    const [isCreateGroupModalVisible, setIsCreateGroupModalVisible] = useState(false);
    const [parentGroupId, setParentGroupId] = useState(null); // 상위 계층 그룹 ID
    const [newHierarchyGroups, setNewHierarchyGroups] = useState([
        {tempId: 1, hierarchyGroupCode: '', hierarchyGroupName: ''},
        {tempId: 2, hierarchyGroupCode: '', hierarchyGroupName: ''},
        {tempId: 3, hierarchyGroupCode: '', hierarchyGroupName: ''},
    ]);

    // 창고 목록 조회 함수
    const fetchWarehouseList = useCallback(async () => {
        try {
            const response = await apiClient.post(LOGISTICS_API.WAREHOUSE_LIST_API);
            setWarehouseList(response.data);
        } catch (error) {
            notify('error', '창고 목록 조회 실패', '목록 조회 중 오류가 발생했습니다.', 'top');
        }
    }, [notify]);

    // 창고 상세 조회 함수
    const fetchWarehouseDetail = useCallback(async (id) => {
        try {
            const response = await apiClient.post(LOGISTICS_API.WAREHOUSE_DETAIL_API(id));
            const warehouse = response.data;
            const groupData = warehouse.hierarchyGroups.map(group => ({
                id: group.id,
                code: group.code,
                name: group.name,
            }));

            form.setFieldsValue({
                code: warehouse.code,
                name: warehouse.name,
                warehouseType: warehouse.warehouseType,
                productionProcess: warehouse.productionProcess
                    ? `[${warehouse.productionProcess.code}] ${warehouse.productionProcess.name}`
                    : '',
                isActive: warehouse.isActive,
                hierarchyGroups: groupData.map(group => `${group.code} ${group.name}`).join(', '),
            });

            setCheckedKeys(warehouse.hierarchyGroups.map(group => group.id));
            setSelectedGroupData(groupData);
            setSelectedProcess(warehouse.productionProcess);
        } catch (error) {
            notify('error', '창고 상세 조회 실패', '창고 상세 조회 중 오류가 발생했습니다.', 'top');
        }
    }, [form, notify]);

    // 창고 등록 함수
    const handleRegisterWarehouse = async (data) => {
        try {
            await apiClient.post(LOGISTICS_API.WAREHOUSE_CREATE_API, data);
            notify('success', '창고 등록 성공', '새 창고가 등록되었습니다.', 'bottomRight');
            setIsCreating(false);
            resetState();
            await fetchWarehouseList();
        } catch (error) {
            notify('error', '창고 등록 실패', '등록 중 오류가 발생했습니다.', 'top');
        }
    };

    // 창고 수정 함수
    const handleUpdateWarehouse = async (id, data) => {
        try {
            await apiClient.put(LOGISTICS_API.WAREHOUSE_UPDATE_API(id), data);
            notify('success', '창고 수정 성공', '창고 정보가 수정되었습니다.', 'bottomRight');
            resetState();
            setSelectedWarehouseId(null);
            await fetchWarehouseList();
        } catch (error) {
            notify('error', '창고 수정 실패', '수정 중 오류가 발생했습니다.', 'top');
        }
    };

    // 창고 삭제 함수
    const handleDeleteWarehouse = async (id) => {
        try {
            await apiClient.delete(LOGISTICS_API.WAREHOUSE_DELETE_API(id));
            notify('success', '창고 삭제 성공', '창고가 삭제되었습니다.', 'bottomRight');
            resetState();
            await fetchWarehouseList();
        } catch (error) {
            notify('error', '창고 삭제 실패', '창고 삭제 중 오류가 발생했습니다.', 'top');
        }
    };

    // 생산공정 목록 조회 함수
    const fetchProductionProcesses = useCallback(async () => {
        try {
            const response = await apiClient.post(PRODUCTION_API.PROCESS_LIST_API);
            setProductionProcesses(response.data);
        } catch (error) {
            notify('error', '생산공정 목록 조회 실패', '생산공정 목록 조회 중 오류가 발생했습니다.', 'top');
        }
    }, [notify]);

    // 계층 그룹 목록 조회 함수
    const fetchHierarchyGroups = useCallback(async () => {
        try {
            const response = await apiClient.post(LOGISTICS_API.HIERARCHY_GROUP_LIST_API);
            setHierarchyGroups(convertToTreeData(response.data));
        } catch (error) {
            notify('error', '계층 그룹 목록 조회 실패', '계층 그룹 목록 조회 중 오류가 발생했습니다.', 'top');
        }
    }, [notify]);

    // 계층 그룹에 속한 창고 목록 조회 함수
    const fetchGroupWarehouses = useCallback(async (groupId) => {
        try {
            const response = await apiClient.post(LOGISTICS_API.HIERARCHY_GROUP_WAREHOUSES_API(groupId));
            setSelectedGroupWarehouses(response.data);
        } catch (error) {
            notify('error', '창고 목록 조회 실패', '계층 그룹에 속한 창고 목록을 조회하는 중 오류가 발생했습니다.', 'top');
        }
    }, [notify]);


    const handleFormSubmit = async (values) => {
        const formData = {
            ...values,
            hierarchyGroups: selectedGroupData.map(group => ({
                id: group.id,
                code: group.code,
                name: group.name
            })),
            processDetailId: selectedProcess?.id || null,
        };
        if (isCreating) {
            await handleRegisterWarehouse(formData);
        } else {
            await handleUpdateWarehouse(selectedWarehouseId, formData);
        }
    };

    const handleSaveHierarchyGroups = async () => {
        const validGroups = newHierarchyGroups.filter(group => group.hierarchyGroupCode.trim() !== '' && group.hierarchyGroupName.trim() !== '');
        if (validGroups.length === 0) {
            notify('error', '입력 오류', '적어도 하나의 유효한 계층 그룹을 입력하세요.', 'top');
            return;
        }
        try {
            await apiClient.post(LOGISTICS_API.HIERARCHY_GROUP_SAVE_API, {
                parentGroupId,
                hierarchyGroups: validGroups.map(group => ({
                    hierarchyGroupCode: group.hierarchyGroupCode,
                    hierarchyGroupName: group.hierarchyGroupName,
                    isActive: true
                }))
            });
            notify('success', '계층 그룹 등록 성공', '새 계층 그룹이 등록되었습니다.', 'bottomRight');
            setIsCreateGroupModalVisible(false);
            fetchHierarchyGroups();
        } catch (error) {
            notify('error', '계층 그룹 등록 실패', '등록 중 오류가 발생했습니다.', 'top');
        }
    };

    const handleDeleteGroup = async (groupId) => {
        Modal.confirm({
            title: '계층 그룹 삭제',
            content: '정말로 이 계층 그룹을 삭제하시겠습니까?',
            okText: '삭제',
            cancelText: '취소',
            onOk: async () => {
                try {
                    // API 호출로 계층 그룹 삭제 요청
                    await apiClient.post(LOGISTICS_API.HIERARCHY_GROUP_DELETE_API(groupId));
                    notify('success', '삭제 성공', '계층 그룹이 성공적으로 삭제되었습니다.', 'bottomRight');
                    fetchHierarchyGroups(); // 삭제 후 계층 그룹 목록 갱신
                } catch (error) {
                    notify('error', '삭제 실패', '계층 그룹 삭제 중 오류가 발생했습니다.', 'top');
                }
            }
        });
    };

    const resetState = () => {
        form.resetFields();
        setSelectedProcess(null);
        setSelectedGroupData([]);
        setCheckedKeys([]);
    };

    const handleTabChange = (key) => {
        setActiveTabKey(key); // 선택된 탭으로 변경
    };

    const openCreateGroupModal = () => {
        if (selectedGroupData.length > 0) {
            setParentGroupId(selectedGroupData[0]?.id || null);
            setIsCreateGroupModalVisible(true); // 모달 열기
        } else {
            notify('warning', '상위 계층 그룹을 선택하세요', '계층 그룹을 먼저 선택해야 합니다.');
        }
    };
    ;

    const handleProductionProcessClick = () => {
        fetchProductionProcesses();
        setIsProcessModalVisible(true);
    };
    // 계층 그룹 데이터 변환 함수

    const convertToTreeData = (groups) => groups.map(group => ({
        title: `[${group.hierarchyGroupCode}] ${group.hierarchyGroupName}`,
        key: group.id,
        children: group.childGroups ? convertToTreeData(group.childGroups) : [],
    }));
    // 계층 그룹 모달 확인 핸들러

    const handleHierarchyModalOk = () => {
        form.setFieldsValue({
            hierarchyGroups: selectedGroupData.map(group => `${group.code} ${group.name}`).join(', ')
        });
        setIsHierarchyModalVisible(false);
    };
    // 계층 그룹 선택 모달 열기 함수

    const openHierarchyModal = () => {
        fetchHierarchyGroups();
        setIsHierarchyModalVisible(true);
    };
    // 계층 그룹 등록 모달 열기 함수

    // 계층 그룹 선택 함수
    const onCheck = (checkedKeysValue, {checkedNodes}) => {
        setCheckedKeys(checkedKeysValue);
        const selectedGroups = checkedNodes.map(node => {
            const codeMatch = node.title.match(/\[([^\]]+)\]/);
            const code = codeMatch ? codeMatch[1] : '';
            const name = node.title.replace(/\[[^\]]+\]\s*/, '');
            return {
                id: node.key,
                code: code,
                name: name,
            };
        });
        setSelectedGroupData(selectedGroups);
    };

    // 계층 그룹 선택 함수
    const onSelectGroup = (selectedKeys, info) => {
        if (selectedKeys.length > 0) {
            const selectedGroup = {
                id: selectedKeys[0],
                code: info.node.code,
                name: info.node.title
            };
            setSelectedGroupData([selectedGroup]);
            fetchGroupWarehouses(selectedGroup.id);
        }
    };

    // 새 계층 그룹 입력 필드 변경 핸들러
    const handleInputChange = (e, index, field) => {
        const updatedGroups = [...newHierarchyGroups];
        updatedGroups[index][field] = e.target.value;
        setNewHierarchyGroups(updatedGroups);
    };

    // 새 계층 그룹 추가 함수
    const addNewGroupField = () => {
        setNewHierarchyGroups([...newHierarchyGroups, {
            tempId: newHierarchyGroups.length + 1,
            hierarchyGroupCode: '',
            hierarchyGroupName: ''
        }]);
    };

    // 컴포넌트 마운트 시 창고 목록과 계층 그룹 목록 조회
    useEffect(() => {
        fetchWarehouseList();
        fetchHierarchyGroups();
    }, [fetchWarehouseList, fetchHierarchyGroups]);

    // 선택된 창고 ID가 변경되면 창고 상세 조회 함수 호출
    useEffect(() => {
        if (selectedWarehouseId) fetchWarehouseDetail(selectedWarehouseId);
    }, [selectedWarehouseId, fetchWarehouseDetail]);

    return (
        <Box sx={{margin: '20px'}} className="warehouse-registration-page">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <WelcomeSection
                        title="창고 등록"
                        description={(
                            <Typography className="welcome-section-description">
                                창고 등록 페이지는 <span>회사의 창고 정보를 관리</span>하는 페이지로, 창고를 <span>추가, 수정, 삭제</span>할 수 있음.
                            </Typography>
                        )}
                        tabItems={tabItems()}
                        activeTabKey={activeTabKey}
                        handleTabChange={handleTabChange}
                    />
                </Grid>
            </Grid>

            {activeTabKey === '1' && (
                <Grid sx={{padding: '0px 20px 0px 20px'}} container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Grow in={true} timeout={200}>
                            <Paper elevation={3} sx={{height: '100%'}}>
                                <Typography variant="h6" sx={{padding: '20px'}}>창고 조회</Typography>
                                <Grid sx={{padding: '0px 20px 0px 20px'}}>
                                        <Table
                                            dataSource={warehouseList}
                                            columns={[
                                                {
                                                    title: <div className="title-text">창고 코드</div>,
                                                    dataIndex: 'code',
                                                    key: 'code',
                                                    align: 'center'
                                                },
                                                {
                                                    title: <div className="title-text">창고 이름</div>,
                                                    dataIndex: 'name',
                                                    key: 'name',
                                                    align: 'center'
                                                },
                                                {
                                                    title: <div className="title-text">창고 유형</div>,
                                                    dataIndex: 'warehouseType',
                                                    key: 'warehouseType',
                                                    align: 'center',
                                                    render: (type) => (
                                                        <Tag color={type === 'WAREHOUSE' ? 'green' : 'blue'}>
                                                            {type === 'WAREHOUSE' ? '창고' : '공장'}
                                                        </Tag>
                                                    ),
                                                },
                                                {
                                                    title: <div className="title-text">생산공정명</div>,
                                                    dataIndex: 'productionProcess',
                                                    key: 'productionProcess',
                                                    align: 'center'
                                                },
                                                {
                                                    title: <div className="title-text">활성화 여부</div>,
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
                                            pagination={{position: ['bottomCenter'], defaultPageSize: 10}}
                                            rowSelection={{
                                                type: 'radio',
                                                selectedRowKeys: [selectedWarehouseId],
                                                onChange: (selectedRowKeys) => setSelectedWarehouseId(selectedRowKeys[0])
                                            }}
                                            onRow={(record) => ({
                                                onClick: () => {
                                                    setSelectedWarehouseId(record.id);
                                                    setIsCreating(false);
                                                    fetchWarehouseDetail(record.id);
                                                    setSelectedProcess(record.productionProcess);
                                                },
                                            })}
                                        />
                                    <Box sx={{
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        marginBottom: '20px',
                                    }}>
                                        <Button
                                            type="primary"
                                            onClick={() => {
                                                setIsCreating(true);
                                                form.resetFields();
                                                setSelectedProcess(null);
                                                setSelectedGroupData([]);
                                                setCheckedKeys([]);
                                            }}
                                            className="ant-btn-primary"
                                        >
                                            신규 창고
                                        </Button>
                                    </Box>
                                </Grid>
                            </Paper>
                        </Grow>
                    </Grid>

                    {(isCreating || selectedWarehouseId) && (
                        <Grid item xs={12} md={6}>
                            <Grow in={true} timeout={200}>
                                <Paper elevation={3} sx={{height: '100%'}}>
                                    <Typography variant="h6" sx={{padding: '20px'}}>
                                        {isCreating ? '신규 창고 등록' : '창고 상세 정보 수정'}
                                    </Typography>
                                    <Grid sx={{padding: '0px 20px 0px 20px'}}>
                                        <Form form={form} onFinish={handleFormSubmit} layout="vertical">
                                            <Form.Item name="code" rules={[{required: true}]}>
                                                <Input addonBefore="창고 코드"
                                                       disabled={!isCreating}/>
                                            </Form.Item>
                                            <Form.Item name="name" rules={[{required: true}]}>
                                                <Input addonBefore="창고 이름"/>
                                            </Form.Item>
                                            <Form.Item name="warehouseType" label="창고 유형" rules={[{required: true}]}>
                                                <Select
                                                    onChange={(value) => {
                                                        if (value !== 'FACTORY') {
                                                            setSelectedProcess(null);
                                                            form.setFieldsValue({productionProcess: ''});
                                                        }
                                                    }}
                                                >
                                                    <Select.Option value="WAREHOUSE">창고</Select.Option>
                                                    <Select.Option value="FACTORY">공장</Select.Option>
                                                </Select>
                                            </Form.Item>
                                            <Form.Item
                                                name="productionProcess"
                                                label="생산공정명"
                                                rules={form.getFieldValue('warehouseType') === 'FACTORY' ? [{
                                                    required: true,
                                                    message: '생산공정을 선택해주세요.'
                                                }] : []}
                                            >
                                                <div
                                                    style={{
                                                        padding: '10px',
                                                        border: '1px solid #d9d9d9',
                                                        borderRadius: '4px',
                                                        cursor: 'pointer'
                                                    }}
                                                    onClick={handleProductionProcessClick}
                                                >
                                                    {selectedProcess ? `[${selectedProcess.code}] ${selectedProcess.name}` : '생산공정명을 선택하세요'}
                                                </div>
                                            </Form.Item>
                                            <Form.Item name="hierarchyGroups" label="계층 그룹">
                                                <div
                                                    style={{
                                                        padding: '10px',
                                                        border: '1px solid #d9d9d9',
                                                        borderRadius: '4px',
                                                        cursor: 'pointer'
                                                    }}
                                                    onClick={openHierarchyModal}
                                                >
                                                    {selectedGroupData.length > 0
                                                        ? selectedGroupData.map(group => `[${group.code}]${group.name}`).join(', ')
                                                        : '계층 그룹을 선택하세요'}
                                                </div>
                                            </Form.Item>
                                            <Form.Item name="isActive" label="활성화 여부" rules={[{required: true}]}>
                                                <Select>
                                                    <Select.Option value={true}>사용중</Select.Option>
                                                    <Select.Option value={false}>사용중단</Select.Option>
                                                </Select>
                                            </Form.Item>
                                            <Space style={{
                                                marginTop: '20px',
                                                display: 'flex',
                                                justifyContent: 'flex-end'
                                            }}>
                                                <Button type="primary" htmlType="submit" >
                                                    {isCreating ? '등록하기' : '수정하기'}
                                                </Button>
                                                {!isCreating && (
                                                    <Button onClick={() => handleDeleteWarehouse(selectedWarehouseId)} type="danger">
                                                        삭제하기
                                                    </Button>
                                                )}
                                            </Space>
                                        </Form>
                                    </Grid>
                                </Paper>
                            </Grow>
                        </Grid>
                    )}
                </Grid>
            )}

            {/* 생산공정 선택 모달 */}
            <Modal
                title="생산공정 선택"
                open={isProcessModalVisible}
                onCancel={() => setIsProcessModalVisible(false)}
                width="60vw"
                footer={null}
            >
                <Table
                    dataSource={productionProcesses}
                    columns={[
                        {
                            title: '코드',
                            dataIndex: 'code',
                            key: 'code',
                            align: 'center',
                        },
                        {
                            title: '이름',
                            dataIndex: 'name',
                            key: 'name',
                            align: 'center',
                        },
                    ]}
                    rowKey="id"
                    pagination={{pageSize: 10, position: ['bottomCenter'], showSizeChanger: false}}
                    onRow={(record) => ({
                        style: {cursor: 'pointer'},
                        onClick: () => {
                            setSelectedProcess(record);
                            form.setFieldsValue({productionProcess: `[${record.code}] ${record.name}`});
                            setIsProcessModalVisible(false);
                        },
                    })}
                />
            </Modal>

            {/* 계층 그룹 선택 모달 */}
            <Modal
                title="계층 그룹 선택"
                open={isHierarchyModalVisible}
                onCancel={() => setIsHierarchyModalVisible(false)}
                onOk={handleHierarchyModalOk}
                width="30vw"
                okText="적용"
                cancelText="닫기"
            >
                <Tree
                    checkStrictly
                    onCheck={onCheck}
                    checkedKeys={checkedKeys}
                    treeData={hierarchyGroups}
                    defaultExpandAll
                />
            </Modal>

            {activeTabKey === '2' && (
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                        <Card sx={{height: '100%', overflow: 'auto'}}>
                            <Typography variant="h6" className="ant-typography"
                                        sx={{marginBottom: '16px', marginTop: '10px', marginLeft: '16px'}}>
                                계층 그룹 목록
                            </Typography>
                            <Tree
                                onSelect={onSelectGroup}
                                checkedKeys={checkedKeys}
                                treeData={hierarchyGroups}
                                defaultExpandAll
                            />
                            <div style={{
                                display: 'flex',
                                justifyContent: 'flex-end',
                                marginTop: '6px',
                                marginRight: '8px',
                                marginBottom: '8px'
                            }}>
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        if (selectedGroupData.length === 0) {
                                            notify('warning', '상위 계층 그룹을 선택하세요', '계층 그룹을 먼저 선택해야 합니다.');
                                            return;
                                        }
                                        openCreateGroupModal();
                                    }}
                                >
                                    계층 그룹 등록
                                </Button>
                                <Button
                                    type="danger"
                                    onClick={() => {
                                        if (selectedGroupData.length === 0) {
                                            notify('warning', '삭제할 계층 그룹을 선택하세요', '삭제할 계층 그룹을 먼저 선택해야 합니다.');
                                            return;
                                        }
                                        handleDeleteGroup(selectedGroupData[0]?.id);  // 선택한 계층 그룹의 ID를 사용
                                    }}
                                    style={{marginLeft: '10px'}}  // 버튼 간격
                                >
                                    계층 그룹 삭제
                                </Button>
                            </div>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={8}>
                        <Card>
                            <Table
                                columns={[
                                    {
                                        title: <div className="title-text">창고 유형</div>,
                                        dataIndex: 'warehouseType',
                                        key: 'warehouseType',
                                        align: 'center',
                                        render: (type) => (
                                            <Tag color={type === 'WAREHOUSE' ? 'green' : 'blue'}>
                                                {type === 'WAREHOUSE' ? '창고' : '공장'}
                                            </Tag>
                                        ),
                                    },
                                    {
                                        title: <div className="title-text">창고 코드</div>,
                                        dataIndex: 'warehouseCode',
                                        key: 'warehouseCode',
                                        align: 'center',
                                    },
                                    {
                                        title: <div className="title-text">창고 이름</div>,
                                        dataIndex: 'warehouseName',
                                        key: 'warehouseName',
                                        align: 'center',
                                    }
                                ]}
                                dataSource={selectedGroupWarehouses}
                                rowKey={(record) => record.id || record.warehouseCode}
                                pagination={{pageSize: 5, position: ['bottomCenter']}}
                            />
                        </Card>
                    </Grid>
                </Grid>
            )}
            <Modal
                title="신규 계층 그룹 등록"
                open={isCreateGroupModalVisible}
                onCancel={() => setIsCreateGroupModalVisible(false)}
                footer={[
                    <Button key="cancel" onClick={() => setIsCreateGroupModalVisible(false)}>닫기</Button>,
                    <Button key="save" type="primary" onClick={handleSaveHierarchyGroups}>저장</Button>
                ]}
            >
                <Form layout="vertical">
                    <Form.Item label="상위 계층 그룹">
                        <Input
                            value={selectedGroupData.length > 0 ? selectedGroupData[0].name : ''}
                            placeholder="상위 계층 그룹을 입력하세요"
                            disabled
                        />
                    </Form.Item>
                    <Table
                        dataSource={newHierarchyGroups}
                        columns={[
                            {
                                title: '계층 그룹 코드',
                                dataIndex: 'hierarchyGroupCode',
                                key: 'hierarchyGroupCode',
                                render: (text, record, index) => (
                                    <Input
                                        value={newHierarchyGroups[index].hierarchyGroupCode}
                                        onChange={(e) => handleInputChange(e, index, 'hierarchyGroupCode')}
                                    />
                                ),
                            },
                            {
                                title: '계층 그룹명',
                                dataIndex: 'hierarchyGroupName',
                                key: 'hierarchyGroupName',
                                render: (text, record, index) => (
                                    <Input
                                        value={newHierarchyGroups[index].hierarchyGroupName}
                                        onChange={(e) => handleInputChange(e, index, 'hierarchyGroupName')}
                                    />
                                ),
                            },
                        ]}
                        pagination={false}
                        rowKey={(record) => record.tempId}
                    />
                    <Button type="dashed" onClick={addNewGroupField} style={{width: '100%', marginTop: 16}}>
                        + 추가 그룹
                    </Button>
                </Form>
            </Modal>
        </Box>
    );
};

export default WarehouseRegistrationPage;