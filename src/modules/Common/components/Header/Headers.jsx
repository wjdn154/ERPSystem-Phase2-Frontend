import React, { useState, useEffect } from 'react';
import { Layout, Row, Col } from 'antd';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'; // 쿠키 관리 라이브러리
import LogoWhite from "../../../../assets/favicon/OMZ.svg";

const { Header } = Layout;

function Headers() {
    const navigate = useNavigate();
    const [username, setUsername] = useState(null); // 쿠키에서 가져온 사용자 이름을 저장하는 상태

    // 컴포넌트가 로드될 때 쿠키에서 사용자 정보를 읽어옴
    useEffect(() => {
        const storedUsername = Cookies.get('username'); // 쿠키에서 사용자 이름 가져오기
        setUsername(storedUsername); // 사용자 이름 상태 설정
    }, []); // 컴포넌트가 로드될 때 한 번 실행

    useEffect(() => {
        // 로그인이 되었을 때 상태가 업데이트되면 헤더도 다시 렌더링
        const storedUsername = Cookies.get('username');
        setUsername(storedUsername); // 쿠키에서 다시 읽어옴
    }, [Cookies.get('username')]); // 쿠키 값이 변할 때마다 실행

    // 로고 클릭 시 특정 페이지로 이동
    const handleLogoClick = () => {
        navigate('/groupware/basic-info/company-edit');
    };

    // 로그아웃 처리
    const handleLogout = () => {
        Cookies.remove('username'); // 쿠키에서 사용자 이름 삭제
        setUsername(null); // 상태 즉시 업데이트
        navigate('/login'); // 로그인 페이지로 리디렉션
        window.location.reload(); // 강제 새로고침하여 상태 반영
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
                    {username ? ( // 사용자가 로그인된 경우
                        <div style={styles.userSection}>
                            <span style={styles.username}>{username}</span> {/* 사용자 이름 표시 */}
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
    username: {
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