import React from 'react';
import { Button, Row } from 'antd';

const ButtonSection = ({ onCreateClick }) => {
    return (
        <Row style={{ marginBottom: '20px' }}>
            <Button type="primary" onClick={onCreateClick}>신규(F2)</Button>
            <Button style={{ marginLeft: 8 }}>계층그룹</Button>
            <Button style={{ marginLeft: 8 }}>사용중단/재사용</Button>
        </Row>
    );
};

export default ButtonSection;
