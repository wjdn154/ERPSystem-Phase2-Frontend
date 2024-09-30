import React from 'react';
import {Layout, Row, Col, Avatar, Dropdown, Button, notification} from 'antd';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../config/redux/authSlice.jsx";
import { UserOutlined, DownOutlined, LogoutOutlined } from '@ant-design/icons';
import { Box, Grid, Grow } from '@mui/material';
import {useNotificationContext} from "../config/NotificationContext.jsx";

const { Header } = Layout;

function Headers() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userNickname = useSelector(state => state.auth.userNickname);

    const handleProfile = () => {
        notification.error({
            message: '미구현 기능',
            description: (
                <>
                    이 기능은 현재 준비 중입니다.<br />
                    추가 정보나 업데이트는{' '}
                    <a href="https://github.com/wjdn154/ERPSystem" target="_blank" rel="noopener noreferrer">
                        여기를 클릭
                    </a>
                    에서 확인하실 수 있습니다.
                </>
            ),
            placement: 'top',
        });
    }

    // 로그아웃 처리
    const handleLogout = () => {
        Cookies.remove('jwt'); // JWT 토큰 삭제
        dispatch(logout());
        navigate('/login');
    };

    // 사용자 메뉴 아이템
    const userMenuItems = [
        {
            key: 'profile',
            label: '프로필',
            icon: <UserOutlined />,
            onClick: handleProfile,
        },
        {
            type: 'divider',
        },
        {
            key: 'logout',
            label: '로그아웃',
            icon: <LogoutOutlined />,
            onClick: handleLogout,
        }
    ];

    return (
        <Header style={styles.header}>
            <Row justify="space-between" align="middle" style={styles.row}>
                <Box />
                <Col>
                    {userNickname ? (
                        <Dropdown menu={{ items: userMenuItems }} trigger={['click']}>
                            <div style={styles.userSection}>
                                <Avatar style={styles.avatar} icon={<UserOutlined />} />
                                <span style={styles.userNickname}>{userNickname}</span>
                                <DownOutlined style={styles.downIcon} />
                            </div>
                        </Dropdown>
                    ) : (
                        <Button type="primary" onClick={() => navigate('/login')}>
                            로그인
                        </Button>
                    )}
                </Col>
            </Row>
        </Header>
    );
}

const styles = {
    header: {
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        backgroundColor: '#fff',
        padding: '0 24px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 4px',
    },
    row: {
        width: '100%',
        color: '#000',
    },
    img: {
        width: '80px',
        cursor: 'pointer',
    },
    userSection: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
    },
    userNickname: {
        marginLeft: '10px',
        marginRight: '10px',
        fontWeight: 'bold',
        color: '#000',
    },
    downIcon: {
        color: '#000',
    },
    avatar: {
        backgroundColor: '#1890ff',
    },
};

export default Headers;