import React from 'react';
import { Layout, Row, Col } from 'antd';
import LogoWhite from "../../../../assets/favicon/OMZ.svg";
import {useNavigate} from "react-router-dom";
const { Header } = Layout;



// Headers 컴포넌트 정의, 메뉴 선택 상태를 props로 받음
function Headers() {
    const navigate = useNavigate(); // URL 이동을 위한 navigate 훅

    const onclick = () => {
        navigate('/groupware/basic-info/company-edit');
    };

    return (
        <Header style={styles.header}>
            <Row style={styles.row}>
                <Col span={12} style={styles.col}>
                    <Col span={6} style={styles.col}>
                        <img onClick={onclick} src={LogoWhite} alt="로고" style={styles.img}/>
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
    content: {
       padding: '20px',
       height: '2000px'
    },
    img: {
        width: '80px',
        cursor: 'pointer',
    },
};

export default Headers;