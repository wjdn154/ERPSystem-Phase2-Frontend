import React, { useEffect, useState } from 'react';
import {Button, Checkbox, notification, Tag} from 'antd';
import {Box, FormControl, Grid, Paper, Typography} from '@mui/material';
import WelcomeSection from '../../Common/components/WelcomeSection.jsx';
import { Table } from 'antd';
import { tabItems } from '../utils/UserPermission/UserPermissonUtil.jsx';

// 임의의 데이터 설정
const initialData2 = {
    users: [
        { id: 1, name: '김철수', employeeId: '1001', department: '재무부', position: '과장', title: '팀장' },
        { id: 2, name: '박영희', employeeId: '1002', department: '인사부', position: '대리', title: '사원' },
        { id: 3, name: '이민수', employeeId: '1003', department: '생산부', position: '사원', title: '사원' },
        { id: 4, name: '김찬민', employeeId: '1004', department: '물류부', position: '팀장', title: '팀장' },
    ],
    permissions: {
        adminPermission: ['관리자 권한'],
        otherPermissions: [
            { key: 'clientRegistrationPermission', label: '거래처등록 권한' },
            { key: 'accountSubjectPermission', label: '계정과목 및 적요 등록 권한' },
            { key: 'generalVoucherPermission', label: '일반전표입력 권한' },
            { key: 'taxInvoicePermission', label: '세금계산서(계산서)현황 권한' },
        ],
        permissionOptions: ['NO_ACCESS', 'GENERAL', 'APPROVAL', 'ADMIN']
    }
};

const userColumns = [
    {
        title: '사원번호',
        dataIndex: 'employeeId',
        align: 'center',
        render: (text) => <Typography>{text}</Typography>,
    },
    {
        title: '이름',
        dataIndex: 'name',
        align: 'center',
        render: (text) => <Typography>{text}</Typography>,
    },
    {
        title: '직위',
        dataIndex: 'position',
        align: 'center',
        render: (text) => <Typography>{text}</Typography>,
    },
    {
        title: '직책',
        dataIndex: 'title',
        align: 'center',
        render: (text) => <Typography>{text}</Typography>,
    },
    {
        title: '부서',
        dataIndex: 'department',
        align: 'center',
        render: (text, record) => {
            let color;
            switch (record.department) {
                case '재무부':
                    color = 'red';
                    break;
                case '인사부':
                    color = 'green';
                    break;
                case '생산부':
                    color = 'blue';
                    break;
                case '물류부':
                    color = 'orange';
                    break;
                default:
                    color = 'gray'; // 기본 색상
            }
            return <Tag color={color}>{record.department}</Tag>;
        }
    },
];

const UserPermissionPage = ( {initialData} ) => {
    console.log(initialData);
    const [activeTabKey, setActiveTabKey] = useState('1');
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [permissions, setPermissions] = useState({});
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        setUsers(initialData2.users);
    }, []);

    const handleUserClick = (user) => {
        setSelectedUser(user);
        fetchUserPermissions(user.id);
    };

    const handleRowSelection = {
        type: 'radio',
        selectedRowKeys: selectedUser ? [selectedUser.id] : [],
    };

    const fetchUserPermissions = (userId) => {
        setPermissions({
            adminPermission: 'NO_ACCESS',
            otherPermissions: initialData2.permissions.otherPermissions.reduce((acc, perm) => {
                acc[perm.key] = 'NO_ACCESS';
                return acc;
            }, {})
        });
        setIsAdmin(false);
    };

    const handlePermissionChange = (permissionKey, value) => {
        if (permissionKey === 'adminPermission') {
            setIsAdmin(value === 'ADMIN');
            if (value === 'ADMIN') {
                setPermissions((prevPermissions) => ({
                    ...prevPermissions,
                    adminPermission: value,
                    otherPermissions: Object.keys(prevPermissions.otherPermissions).reduce((acc, key) => {
                        acc[key] = 'FULL_ACCESS';
                        return acc;
                    }, {})
                }));
            } else {
                setPermissions((prevPermissions) => ({
                    ...prevPermissions,
                    adminPermission: value,
                }));
            }
        } else {
            setPermissions((prevPermissions) => ({
                ...prevPermissions,
                otherPermissions: {
                    ...prevPermissions.otherPermissions,
                    [permissionKey]: value,
                }
            }));
        }
    };

    const handleSavePermissions = () => {
        notification.success({
            message: '성공',
            description: '권한이 성공적으로 저장되었습니다.',
        });
    };

    const permissionColumns = [
        {
            title: '권한명',
            dataIndex: 'label',
        },
        {
            title: '사용자',
            align: 'center',
            width: '10%',
            render: (_, record) => (
                <Checkbox
                    checked={permissions[record.key] === 'GENERAL'}
                    onChange={() => handlePermissionChange(record.key, 'GENERAL')}
                />
            ),
        },
        {
            title: '관리자',
            align: 'center',
            width: '10%',
            render: (_, record) => (
                <Checkbox
                    checked={permissions[record.key] === 'APPROVAL'}
                    onChange={() => handlePermissionChange(record.key, 'APPROVAL')}
                />
            ),
        },
    ];

    return (
        <Box sx={{ margin: '20px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <WelcomeSection
                        title="사용자 권한 관리"
                        description="이 페이지는 사용자의 권한을 관리하고 설정하는 페이지입니다."
                        tabItems={tabItems()}
                        activeTabKey={activeTabKey}
                        handleTabChange={setActiveTabKey}
                    />
                </Grid>
            </Grid>

            {activeTabKey === '1' && (
                <Grid sx={{ padding: '0px 20px 0px 20px' }} container spacing={3}>
                    {/* 회원 목록 테이블 */}
                    <Grid item xs={12} md={5} sx={{ minWidth: '400px !important', maxWidth: '600px !important' }}>
                        <Paper elevation={3} sx={{ height: '100%' }}>
                            <Typography variant="h6" sx={{ padding: '20px' }} >회원 목록</Typography>
                            <Table
                                style={{ padding: '20px' }}
                                columns={userColumns}
                                dataSource={users}
                                pagination={{ pageSize: 15, position: ['bottomCenter'], showSizeChanger: false }}
                                rowSelection={handleRowSelection}
                                size={'small'}
                                rowKey="id"
                                onRow={(record) => ({
                                    onClick: () => handleUserClick(record),
                                    style: { cursor: 'pointer' },
                                })}
                            />
                        </Paper>
                    </Grid>

                    {/* 권한 부여 또는 본인 권한 조회 */}
                    <Grid item xs={12} md={7} sx={{ minWidth: '500px !important', maxWidth: '700px !important' }}>
                        <Paper elevation={3} sx={{ height: '100%' }}>
                            <Typography variant="h5" sx={{ padding: '20px' }} >{selectedUser ? `${selectedUser.name} 님의 권한 관리` : '권한 관리'}</Typography>

                            {/* 권한 관리 테이블 */}
                            <Table
                                style={{ padding: '20px' }}
                                columns={permissionColumns}
                                dataSource={[{ key: 'adminPermission', label: '관리자 권한' }, ...initialData2.permissions.otherPermissions]}
                                pagination={{ pageSize: 15, position: ['bottomCenter'], showSizeChanger: false }}
                                size={'small'}
                                rowKey="id"
                            />

                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ mt: 2 }}
                                onClick={handleSavePermissions}
                            >
                                권한 저장
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
            )}
        </Box>
    );
};

export default UserPermissionPage;