import React from 'react';
import {Badge, Layout, Row, Col, Avatar, Dropdown, Button, notification} from 'antd';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../config/redux/authSlice.jsx";
import {UserOutlined, DownOutlined, LogoutOutlined, BellOutlined} from '@ant-design/icons';
import apiClient from "../config/apiClient.jsx";
import {COMMON_API} from "../config/apiConstants.jsx";
import {jwtDecode} from "jwt-decode";

const { Header } = Layout;

function Headers({ eventSourceRef }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { token, userNickname } = useSelector((state) => state.auth);

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
    };

    // 로그아웃 처리
    const handleLogout = () => {
        try {
            eventSourceRef.current.close();
            eventSourceRef.current = null;
            apiClient.post(COMMON_API.NOTIFICATION_UNSUBSCRIBE_API, {
                employeeId: jwtDecode(token).employeeId,
            }).then(() => {
                Cookies.remove('jwt'); // JWT 토큰 삭제
                dispatch(logout());
                navigate('/login');
            });
        } catch (error) {
            console.error("구독 해제 에러:", error);
        }
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
        },
    ];

    // 알림 메뉴 아이템
    const notificationItems = [
        { key: '1', label: '새로운 알림asdasdasasd 1' },
        { key: '2', label: '새로운 알림 2' },
        { key: '3', label: '새로운 알림 3' },
    ];

    return (
        <Header style={styles.header}>
            <Row align="middle" style={styles.row}>
                <Col style={{ marginRight: '20px'}}>
                    <Dropdown menu={{ items: notificationItems }} trigger={['click']}>
                        <Badge count={1} offset={[-5, 5]}>
                            <BellOutlined style={styles.notificationIcon} />
                        </Badge>
                    </Dropdown>
                </Col>
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
        display: 'flex',
        justifyContent: 'flex-end'
    },
    userSection: {
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
    },
    userNickname: {
        marginLeft: '8px',
        marginRight: '8px',
        fontWeight: 'bold',
        color: '#000',
    },
    downIcon: {
        color: '#000',
    },
    avatar: {
        backgroundColor: '#1890ff',
    },
    notificationIcon: {
        fontSize: '20px',
        color: '#1890ff',
        marginRight: '10px',
        cursor: 'pointer',
    },
};

export default Headers;