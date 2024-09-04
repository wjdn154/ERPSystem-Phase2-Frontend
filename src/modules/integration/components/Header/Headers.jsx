import React from 'react';
import { Layout, Row, Col } from 'antd';
import Logo from "../../../../assets/favicon/OMZ.svg";

const { Header } = Layout;

// Headers 컴포넌트 정의, 메뉴 선택 상태를 props로 받음
function Headers() {

    return (
        <Header className={'background-color-header'} style={styles.header}>
            <Row style={styles.row}>
                <Col span={12} style={styles.col}>
                    <Col span={6} style={styles.col}>
                        <img src={Logo} alt="로고" style={{width: '80px'}}/>
                    </Col>
                    <Col span={6} style={styles.col}>
                        searchbar
                    </Col>
                </Col>
                <Col span={12} style={styles.col}>
                    <div>Right Side</div>
                </Col>
            </Row>
        </Header>
    );

};

const styles = {
    header: {
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        color: 'white',
        padding: '0 20px',
        display: 'flex',
        alignItems: 'center',
        height: '64px',
    },
    row: {
        width: '100%',
    },
    col: {
        display: 'flex',
        alignItems: 'center',
    },
    content: {
       padding: '20px'
    }, height: '2000px'
};

export default Headers;