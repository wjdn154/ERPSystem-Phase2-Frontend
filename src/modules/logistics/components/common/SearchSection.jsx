import React from 'react';
import { Row, Col, Input, Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const SearchSection = () => {
    return (
        <Row justify="space-between" style={{ marginBottom: '20px' }}>
            <Col>
                <Input
                    placeholder="입력 후 [Enter]"
                    style={{ width: 200 }}
                    suffix={<SearchOutlined />}
                />
                <Button type="primary" icon={<SearchOutlined />} style={{ marginLeft: 8 }}>
                    Search(F3)
                </Button>
            </Col>
            <Col>
            </Col>
        </Row>
    );
};

export default SearchSection;
