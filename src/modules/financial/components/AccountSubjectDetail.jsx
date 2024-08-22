import React, {useEffect, useState} from 'react';
import {Button, Col, Divider, Form, Grid, Input, Modal, Radio, Row, Table} from 'antd';
import {Box, List} from '@mui/material';
import '../../../styles/App.css';

const structuresColumns = [
    {
        title: <span style={{ fontSize: '0.7rem' }}>체계명</span>,
        dataIndex: 'name',
        align: 'center',
        render: text => <span className={'table-span'} >{text}</span>,
    },
    {
        title: <span style={{ fontSize: '0.7rem' }}>체계범위</span>,
        dataIndex: 'range',
        align: 'center',
        render: (_, value) => (
            <span className={'table-span'}>{`${value.min} - ${value.max}`}</span>
        ),
    },
];

const accountSubjectsColumns = [
    {
        title: <span className={'table-header-span'}>코드번호</span>,
        dataIndex: 'code',
        align: 'center',
        width: '20%',
        render: text => <span className={'table-span'} >{text}</span>,
        sorter: (a, b) => a.code.localeCompare(b.code),
    },
    {
        title: <span className={'table-header-span'}>계정과목명</span>,
        dataIndex: 'name',
        align: 'center',
        width: '40%',
        render: text => <span className={'table-span'} >{text}</span>,
    },
    {
        title: <span className={'table-header-span'}>성격</span>,
        dataIndex: 'natureCode',
        align: 'center',
        width: '20%',
        render: text => <span className={'table-span'} >{text}</span>,
    },
    {
        title: <span className={'table-header-span'}>관계</span>,
        dataIndex: 'parentCode',
        align: 'center',
        width: '20%',
        render: text => <span className={'table-span'} >{text}</span>,
    },
];

const cashMemosColumns = [
    {
        title: <span className={'table-header-span'}>적요번호</span>,
        dataIndex: 'id',
        align: 'center',
        width: '20%',
        render: text => <span className={'table-span'} >{text}</span>,
    },
    {
        title: <span className={'table-header-span'}>현금적요</span>,
        dataIndex: 'content',
        align: 'center',
        width: '80%',
        render: text => <span className={'table-span'} >{text}</span>,
    },
];

const transferMemosColumns = [
    {
        title: <span className={'table-header-span'}>적요번호</span>,
        dataIndex: 'id',
        align: 'center',
        width: '20%',
        render: text => <span className={'table-span'} >{text}</span>,
    },
    {
        title: <span className={'table-header-span'}>대체적요</span>,
        dataIndex: 'content',
        align: 'center',
        width: '80%',
        render: text => <span className={'table-span'} >{text}</span>,
    },
];

const fixedMemos = [
    {
        title: <span className={'table-header-span'}>적요번호</span>,
        dataIndex: 'id',
        align: 'center',
        width: '20%',
        render: text => <span className={'table-span'} >{text}</span>,
    },
    {
        title: <span className={'table-header-span'}>구분</span>,
        dataIndex: 'category',
        align: 'center',
        width: '20%',
        render: text => <span className={'table-span'} >{text}</span>,
    },
    {
        title: <span className={'table-header-span'}>고정적요</span>,
        dataIndex: 'content',
        align: 'center',
        width: '60%',
        render: text => <span className={'table-span'} >{text}</span>,
    },
];

const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: (record) => ({
        disabled: record.name === 'Disabled User',
        name: record.name,
    }),
};

function AccountSubjectDetail({ data }) {
    console.log(data);
    if (!data) return null;

    const [isCashModalVisible, setIsCashModalVisible] = useState(false);
    const [isTransferModalVisible, setIsTransferModalVisible] = useState(false);

    const showCashModal = () => {
        setIsCashModalVisible(true);
    };

    const showTransferModal = () => {
        setIsTransferModalVisible(true);
    };

    const handleOk = () => {
        setIsCashModalVisible(false);
        setIsTransferModalVisible(false);
    };

    const handleCancel = () => {
        setIsCashModalVisible(false);
        setIsTransferModalVisible(false);
    };

    return (
        <Box style={{ padding: '20px', width: '100vw', display: 'flex' }}>
            <Box sx={{width: '20vw', height: '100vh'}}>
                <Box sx={{ backgroundColor: '#fff', padding: '30px', borderRadius: '10px', boxShadow: 1 }}>
                    <span className={'table-title-span'}>계 정 체 계</span>
                    <Box sx={{ marginTop: '20px' }}>
                        <Table
                            rowKey="id"
                            bordered={true}
                            style={{minWidth: '220px', overflow: 'hidden'}}
                            pagination={false}
                            size="small"
                            columns={structuresColumns}
                            dataSource={data.structures}
                            scroll={{y: 600}}
                        />
                    </Box>
                </Box>
            </Box>
            <Box sx={{width: '25vw', height: '70vh', padding: '0px 10px 0px 10px'}}>
                <Box sx={{ backgroundColor: '#fff', padding: '30px', borderRadius: '10px', boxShadow: 1 }}>
                    <span className={'table-title-span'} >계 정 과 목</span>
                    <Box sx={{ marginTop: '20px' }}>
                        <Table
                            rowHoverable={true}
                            rowKey="id"
                            style={{minWidth: '300px'}}
                            pagination={{pageSize: 15, position: ['bottomCenter'], showSizeChanger: false}}
                            bordered={true}
                            size="small"
                            rowSelection={{
                                type: 'radio',
                                ...rowSelection,
                            }}
                            columns={accountSubjectsColumns}
                            dataSource={data.accountSubjects}
                        />
                    </Box>
                </Box>
            </Box>
            <Box sx={{width: '50vw', height: '70vh'}}>
                <Box sx={{ backgroundColor: '#fff', width: '500px', padding: '30px', borderRadius: '10px', boxShadow: 1 }}>
                    <span className={'table-title-span'}>계 정 과 목 상 세</span>
                    <div style={{padding: '20px', marginTop: '20px'}}>
                        <Form layout="vertical">
                            <Row gutter={16}>
                                <Col span={4}>
                                    <Form.Item label="계정코드(명)">
                                        <Input defaultValue="당좌자산"/>
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <Form.Item label="성격">
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <Form.Item label="관계코드(명)">
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <Form.Item label="영문명">
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <Form.Item label="과목코드">
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <Form.Item label="계정사용여부">
                                        <Input defaultValue="(1:여/2:부)"/>
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={4}>
                                    <Form.Item label="계정사유구분">
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <Form.Item label="표준재무제표">
                                        <Input/>
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <Form.Item label="외환">
                                        <Input defaultValue="0.부"/>
                                    </Form.Item>
                                </Col>
                                <Col span={4}>
                                    <Form.Item label="업무용차 여부">
                                        <Input defaultValue="2(1:여/2:부)"/>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>


                        <div style={{marginTop: '20px'}}>
                            <Button type="primary" onClick={showCashModal} style={{marginRight: '10px'}}>
                                현금적요 보기
                            </Button>
                            <Button type="primary" onClick={showTransferModal}>
                                대체적요 보기
                            </Button>
                        </div>
                    </div>
                </Box>
            </Box>

            <Modal
                title="현금적요"
                visible={isCashModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                width={600}
            >
                <Table
                    rowKey="id"
                    pagination={false}
                    bordered={true}
                    size="small"
                    columns={cashMemosColumns}
                    dataSource={data.accountSubjectDetail.cashMemos}
                />
            </Modal>

            <Modal
                title="대체적요"
                visible={isTransferModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                width={600}
            >
                <Table
                    rowKey="id"
                    pagination={false}
                    bordered={true}
                    size="small"
                    columns={transferMemosColumns}
                    dataSource={data.accountSubjectDetail.transferMemos}
                />
            </Modal>
        </Box>
    );
}

export default AccountSubjectDetail;