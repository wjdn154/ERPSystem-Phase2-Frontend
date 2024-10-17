import React, { useState, useEffect } from 'react';
import { Box, Grid, Card, Tabs, Tab, Button } from '@mui/material';
import WarehouseListSection from './WarehouseListSection';
import WarehouseDetailSection from './WarehouseDetailSection';
import { useWarehouse } from './WarehouseHook';
import { useHierarchyGroups } from '../hierarchy_group_management/HierarchyGroupHook.jsx';
import HierarchyGroupListSection from '../hierarchy_group_management/HierarchyGroupListSection.jsx';
import { Table } from 'antd';
import { hierarchyWarehouseColumn } from '../hierarchy_group_management/HierarchyGroupWarehouseColumn.jsx';

const WarehouseRegistrationPage = () => {
    const {
        warehouseList,
        warehouseDetail,
        selectedWarehouseId,
        setSelectedWarehouseId,
        isCreating,
        setIsCreating,
        handleRegisterWarehouse,
        handleUpdateWarehouse,
        handleDeleteWarehouse,
    } = useWarehouse();

    const {
        selectedGroupId,
        setSelectedGroupId,
        fetchWarehousesByGroup,
    } = useHierarchyGroups();

    const [activeTab, setActiveTab] = useState(0);
    const [groupWarehouses, setGroupWarehouses] = useState([]);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
        setSelectedWarehouseId(null);
        setSelectedGroupId(null);
    };

    useEffect(() => {
        if (activeTab === 1 && selectedGroupId) {
            fetchWarehousesByGroup(selectedGroupId).then(setGroupWarehouses);
        }
    }, [activeTab, selectedGroupId, fetchWarehousesByGroup]);

    return (
        <Box sx={{ margin: '20px' }}>
            <Tabs value={activeTab} onChange={handleTabChange} aria-label="Warehouse Management Tabs">
                <Tab label="창고 목록" />
                <Tab label="계층 그룹" />
            </Tabs>

            {activeTab === 0 && (
                <Grid
                    container
                    spacing={2}
                    sx={{ padding: '20px', alignItems: 'stretch', height: 'calc(100vh - 160px)' }}
                >
                    {/* 창고 목록 */}
                    <Grid item xs={12} md={6}>
                        <Card
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                overflow: 'auto'
                            }}
                        >
                            <WarehouseListSection
                                warehouseList={warehouseList}
                                onSelect={(id) => {
                                    setSelectedWarehouseId(id);
                                    setIsCreating(false);
                                }}
                                selectedWarehouseId={selectedWarehouseId}
                            />
                            <Box display="flex" justifyContent="flex-end" sx={{ padding: '10px' }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => {
                                        setIsCreating(true);
                                        setSelectedWarehouseId(null);
                                    }}
                                >
                                    신규 창고
                                </Button>
                            </Box>
                        </Card>
                    </Grid>

                    {/* 상세 정보 */}
                    <Grid item xs={12} md={6}>
                        {(isCreating || selectedWarehouseId) && (
                            <Card
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    overflow: 'auto'
                                }}
                            >
                                <WarehouseDetailSection
                                    warehouseDetail={isCreating ? {} : warehouseDetail}
                                    isCreating={isCreating}
                                    handleUpdateWarehouse={handleUpdateWarehouse}
                                    handleRegisterWarehouse={handleRegisterWarehouse}
                                    handleDeleteWarehouse={handleDeleteWarehouse}
                                    onCancel={() => {
                                        setIsCreating(false);
                                        setSelectedWarehouseId(null);
                                    }}
                                />
                            </Card>
                        )}
                    </Grid>
                </Grid>
            )}

            {activeTab === 1 && (
                <Grid container spacing={2} sx={{ padding: '20px' }}>
                    <Grid item xs={12} md={4}>
                        <Card sx={{ maxHeight: '400px', overflowY: 'auto', padding: '16px' }}>
                            <HierarchyGroupListSection
                                onSelectGroup={(groupId) => setSelectedGroupId(groupId)}
                            />
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={8}>
                        <Card>
                            <Table
                                columns={hierarchyWarehouseColumn}
                                dataSource={groupWarehouses}
                                rowKey="id"
                                pagination={{
                                    pageSize: 5,
                                    position: ['bottomCenter'],
                                }}
                            />
                        </Card>
                    </Grid>
                </Grid>
            )}
        </Box>
    );
};

export default WarehouseRegistrationPage;
