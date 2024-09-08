import React, { useState, useEffect } from 'react';
import { Layout, Row, Col } from 'antd';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'; // 쿠키 관리 라이브러리
import LogoWhite from "../../../../assets/favicon/OMZ.svg";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../../../store.jsx";

const { Header } = Layout;

function Headers() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userNickName = useSelector(state => state.auth.userNickName);

    // 로고 클릭 시 특정 페이지로 이동
    const handleLogoClick = () => {
        navigate('/groupware/basic-info/company-edit');
    };

    // 로그아웃 처리
    const handleLogout = () => {
        Cookies.remove('jwt'); // JWT 토큰 삭제
        dispatch(logout());
        navigate('/login');
    };

    return (
        <Header style={styles.header}>
            <Row style={styles.row}>
                <Col span={12} style={styles.col}>
                    <Col span={6} style={styles.col}>
                        <img onClick={handleLogoClick} src={LogoWhite} alt="로고" style={styles.img} />
                    </Col>
                    <Col span={6} style={styles.col}>
                        searchbar
                    </Col>
                </Col>
                <Col span={12} style={styles.col}>
                    {userNickName ? ( // 사용자가 로그인된 경우
                        <div style={styles.userSection}>
                            <span style={styles.userNickName}>{userNickName}</span> {/* 사용자 이름 표시 */}
                            <button onClick={handleLogout} style={styles.logoutButton}>로그아웃</button> {/* 로그아웃 버튼 */}
                        </div>
                    ) : (
                        <div>로그인 필요</div> // 로그인되지 않은 경우
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
        color: '#000',
        padding: '0 20px',
        display: 'flex',
        alignItems: 'center',
        height: '64px',
        backgroundColor: '#fff',
        boxShadow: 'rgba(0, 0, 0, 0.15) 0px 1px 4px -1px',
    },
    row: {
        width: '100%',
    },
    col: {
        display: 'flex',
        alignItems: 'center',
    },
    img: {
        width: '80px',
        cursor: 'pointer',
    },
    userSection: {
        display: 'flex',
        alignItems: 'center',
    },
    userNickName: {
        marginRight: '20px',
        fontWeight: 'bold',
    },
    logoutButton: {
        padding: '5px 10px',
        backgroundColor: '#f5222d',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default Headers;