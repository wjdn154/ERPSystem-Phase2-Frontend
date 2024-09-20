import React, { useEffect, useState } from 'react';
import {Button, Checkbox, Input, notification, Space, Tag} from 'antd';
import {Box, Grid, Grow, Paper, Typography} from '@mui/material';
import WelcomeSection from '../../../common/components/WelcomeSection.jsx';
import { Table } from 'antd';
import { tabItems, getPermissionData, userColumns, personalPermissionColumns, permissionColumns } from './UserPermissonUtil.jsx';
import { EMPLOYEE_API, USERS_API } from "../../../../config/apiConstants.jsx";
import axios from "axios";
import { setAuth } from "../../../../config/redux/authSlice.jsx";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const UserPermissionPage = () => {

    const { token, isAdmin, permission, companyId } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const [myPermissions, setMyPermissions] = useState(permission);
    const [activeTabKey, setActiveTabKey] = useState('1');
    const [selectedUser, setSelectedUser] = useState(null);
    const [employee, setEmployee] = useState({});
    const [adminEmployee, setAdminEmployee] = useState({});
    const [permissions, setPermissions] = useState(permission);

    // 필터링된 권한 데이터
    const filteredPermissions = getPermissionData(myPermissions)
        .filter(({ key }) => myPermissions[key] && myPermissions[key] !== 'NO_ACCESS' && myPermissions[key] !== null);

    const handleUserClick = (user) => {
        setSelectedUser(user);
        fetchUserPermissions(user.email);
    };

    const fetchAdminEmployee = async () => {
        try {
            const response = await axios.post(EMPLOYEE_API.EMPLOYEE_ADMIN_PERMISSION_API(companyId));
            const data = response.data;
            setAdminEmployee(data);
        } catch (error) {
            console.error('관리자 직원 정보를 가져오지 못했습니다. :', error);
        }
    };

    const fetchEmployee = async () => {
        try {
            const response = await axios.post(EMPLOYEE_API.EMPLOYEE_DATA_API);
            const data = response.data;
            setEmployee(data);
        } catch (error) {
            console.error('직원 목록을 가져오지 못했습니다. :', error);
        }
    };

    const fetchUserPermissions = async (username) => {
        try {
            const response = await axios.post(USERS_API.USERS_PERMISSION_API(username));
            const data = response.data;
            setPermissions(data);
        } catch (error) {
            console.error('사용자 권한을 가져오지 못했습니다. :', error);
        }
    };

    const updateUserPermissions = async () => {
        try {
            const requestBody = {
                username: selectedUser.email,
                permissionDTO: permissions,
            };

            const response = await axios.post(USERS_API.UPDATE_USERS_PERMISSION_API, requestBody);
            const permission = response.data;

            dispatch(setAuth({ token, permission }));
            setMyPermissions(permission);

            notification.success({
                message: '성공',
                description: '권한이 성공적으로 저장되었습니다.',
                placement: 'bottomLeft',
            });

        } catch (error) {
            notification.error({
                message: '실패',
                description: error.response ? error.response.data : error.message,
                placement: 'bottomLeft',
            });
        }
    };

    const handleTabChange = (key) => {
        if (key === '2') {
            if (!isAdmin && myPermissions.adminPermission !== "ADMIN") {
                notification.error({
                    message: '권한 오류',
                    description: '해당 페이지에 접근할 권한이 없습니다.',
                    placement: 'top',
                });
                return;
            }
            fetchAdminEmployee();
            fetchEmployee();
        }
        setActiveTabKey(key);
    };

    return (
        <Box sx={{ margin: '20px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <WelcomeSection
                        title="사용자 권한 관리"
                        description={(
                            <Typography>
                                이 페이지는 <span>ERP 시스템의 사용자 권한을 관리</span>하고 설정하는 페이지임.<br />
                                관리자는 사용자별로 적합한 권한을 부여하여, 각 사용자가 자신의 직무에 맞는 기능만을 사용할 수 있도록 제어할 수 있음.<br />
                                이를 통해 <span>업무 효율성을 극대화</span>하고, 기업 내 시스템의 보안성을 강화할 수 있음.
                            </Typography>
                        )}
                        tabItems={tabItems()}
                        activeTabKey={activeTabKey}
                        handleTabChange={handleTabChange}
                    />
                </Grid>
            </Grid>

            {activeTabKey === '1' && (
                <Grid sx={{ padding: '0px 20px 0px 20px' }} container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <Grow in={true} timeout={300}>
                            <Paper elevation={3}>
                                <Typography variant="h6" sx={{ padding: '20px' }}>내 권한</Typography>
                                <Table
                                    style={{ padding: '20px' }}
                                    columns={personalPermissionColumns(myPermissions, setPermissions, selectedUser, isAdmin, adminEmployee, token)}
                                    dataSource={filteredPermissions}
                                    pagination={{ pageSize: 15, position: ['bottomCenter'], showSizeChanger: false }}
                                    size={'small'}
                                    rowKey="key"
                                    locale={{
                                        emptyText: '데이터가 없습니다.',
                                    }}
                                />
                            </Paper>
                        </Grow>
                    </Grid>
                </Grid>
            )}

            {activeTabKey === '2' && (
                <Grid sx={{ padding: '0px 20px 0px 20px' }} container spacing={3}>
                    <Grid item xs={12} md={5} sx={{ minWidth: '600px !important', maxWidth: '800px !important' }}>
                        <Grow in={true} timeout={300}>
                            <Paper elevation={3}>
                                <Typography variant="h6" sx={{ padding: '20px' }}>회원 목록</Typography>
                                <Table
                                    style={{ padding: '20px' }}
                                    columns={userColumns}
                                    dataSource={Array.isArray(employee) ? employee : []}
                                    pagination={{ pageSize: 15, position: ['bottomCenter'], showSizeChanger: false }}
                                    rowSelection={{
                                        type: 'radio',
                                        selectedRowKeys: selectedUser ? [selectedUser.id] : [],
                                    }}
                                    size={'small'}
                                    rowKey="id"
                                    onRow={(record) => ({
                                        onClick: () => handleUserClick(record),
                                        style: { cursor: 'pointer' },
                                    })}
                                    locale={{
                                        emptyText: '데이터가 없습니다.',
                                    }}
                                />
                            </Paper>
                        </Grow>
                    </Grid>

                    <Grid item xs={12} md={6} sx={{ minWidth: '500px !important', maxWidth: '700px !important' }}>
                        <Grow in={!!selectedUser} timeout={300}>
                            {selectedUser ? (
                                <Paper elevation={3}>
                                    <Typography variant="h6" sx={{ padding: '20px' }}>
                                        {`${selectedUser.lastName}${selectedUser.firstName} 님의 권한 관리`}
                                    </Typography>
                                    <Table
                                        style={{ padding: '20px' }}
                                        columns={permissionColumns(permissions, setPermissions, selectedUser, isAdmin, adminEmployee, token)}
                                        dataSource={getPermissionData(permissions)}
                                        pagination={{ pageSize: 15, position: ['bottomCenter'], showSizeChanger: false }}
                                        size={'small'}
                                        rowKey="key"
                                        locale={{
                                            emptyText: '데이터가 없습니다.',
                                        }}
                                    />
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginRight: '20px' }}>
                                        <Button onClick={updateUserPermissions} type="primary" style={{ marginBottom: '20px' }}>
                                            저장
                                        </Button>
                                    </Box>
                                </Paper>
                            ) : (
                                <></>
                            )}
                        </Grow>
                    </Grid>
                </Grid>
            )}
        </Box>
    );
};

export default UserPermissionPage;