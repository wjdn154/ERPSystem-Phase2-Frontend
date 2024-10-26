import React, {useEffect, useMemo, useState} from 'react';
import {Box, Grid, Grow, Paper} from '@mui/material';
import WelcomeSection from '../../../../components/WelcomeSection.jsx';
import {tabItems} from './IncomingProcessingUtil.jsx';
import {Typography} from '@mui/material';
import {Button, Col, DatePicker, Divider, Form, Input, Modal, Row, Spin, Table, Tag} from 'antd';
import TemporarySection from "../../../../components/TemporarySection.jsx";
import apiClient from "../../../../config/apiClient.jsx";
import dayjs from "dayjs";
import {LOGISTICS_API} from "../../../../config/apiConstants.jsx";
import defaultImage from "../../../../assets/img/uploads/defaultImage.png";
import {SearchOutlined} from "@ant-design/icons";
import {useNotificationContext} from "../../../../config/NotificationContext.jsx";

const {RangePicker} = DatePicker;

const IncomingProcessingPage = () => {
    const notify = useNotificationContext();
    const [activeTabKey, setActiveTabKey] = useState('1');
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [receivingOrderListData, setReceivingOrderListData] = useState([]);
    const [searchParams, setSearchParams] = useState({
        startDate: dayjs().subtract(30, 'day').format('YYYY-MM-DD'),
        endDate: dayjs().format('YYYY-MM-DD'),
    });


    const handleTabChange = (key) => {
        setActiveTabKey(key);
    };

    // 출하 목록 조회 패치
    const fetchReceivingOrderListData = async (startDate, endDate) => {
        setIsLoading(true);
        try {
            const response = await apiClient.post(LOGISTICS_API.RECEIVING_SCHEDULE_WAITING_RECEIPT_API(startDate, endDate));
            setReceivingOrderListData(response.data);
            notify('success', '데이터 조회 성공', '출하 목록 데이터를 성공적으로 조회했습니다.', 'bottomRight');
        } catch (error) {
            notify('error', '데이터 조회 오류', '출하 목록 데이터를 조회하는 중 오류가 발생했습니다.', 'top');
        } finally {
            setIsLoading(false);
        }
    }

    const handleDateChange = (dates, dateStrings) => {
        setSearchParams({
            startDate: dateStrings[0],
            endDate: dateStrings[1],
        });
    }

    const handleSearch = () => {
        fetchReceivingOrderListData(searchParams.startDate, searchParams.endDate);
    };

    useEffect(() => {
        fetchReceivingOrderListData(searchParams.startDate, searchParams.endDate);
    }, []);


    return (
        <Box sx={{margin: '20px'}}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <WelcomeSection
                        title="입고처리"
                        description={(
                            <Typography>
                                입고처리 페이지는 <span>입고 예정된 물품이 실제로 창고에 도착한 후, 입고 과정을 기록하고 관리</span>하는 곳임. 이 페이지에서는 <span>입고 품목의 수량, 입고 날짜</span> 등을
                                입력하고, <span>입고 완료 여부</span>를 관리할 수 있음. 입고가 완료되면 재고가 자동으로 업데이트되며,
                                창고의 <span>재고 상태와 물류 흐름</span>을 효율적으로 파악할 수 있음.
                            </Typography>
                        )}
                        tabItems={tabItems()}
                        activeTabKey={activeTabKey}
                        handleTabChange={handleTabChange}
                    />
                </Grid>
            </Grid>

            {activeTabKey === '1' && (
                <Grid sx={{padding: '0px 20px 0px 20px'}} container spacing={3}>
                    <Grid item xs={12} md={5} sx={{minWidth: '1000px !important', maxWidth: '1500px !important'}}><Grow
                        in={true} timeout={200}>
                        <Paper elevation={3} sx={{height: '100%'}}>
                            <Typography variant="h6" sx={{padding: '20px'}}>입고 품목 목록</Typography>
                            <Grid sx={{padding: '0px 20px 0px 20px'}}>
                                <Form layout="vertical">
                                    <Row gutter={16} style={{
                                        display: 'flex',
                                        alignItems: 'flex-end',
                                        justifyContent: 'space-between'
                                    }}>
                                        <Col>
                                            <Form.Item
                                                label="조회 기간"
                                                required
                                                tooltip="검색할 기간의 시작일과 종료일을 선택하세요"
                                            >
                                                <RangePicker
                                                    onChange={handleDateChange}
                                                    defaultValue={[
                                                        searchParams.startDate ? dayjs(searchParams.startDate, 'YYYY-MM-DD') : null,
                                                        searchParams.endDate ? dayjs(searchParams.endDate, 'YYYY-MM-DD') : null,
                                                    ]}
                                                    format="YYYY-MM-DD"
                                                    style={{width: '300px'}}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col>
                                            <Form.Item>
                                                <Button style={{width: '100px'}} type="primary"
                                                        onClick={handleSearch} icon={<SearchOutlined/>} block>
                                                    검색
                                                </Button>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form>
                            </Grid>
                            <Grid sx={{margin: '20px'}}>
                                <Table
                                    dataSource={receivingOrderListData}
                                    columns={[
                                        {
                                            title: <div className="title-text">등록날짜</div>,
                                            dataIndex: 'date',
                                            key: 'date',
                                            align: 'center',
                                            render: (text) => <div className="small-text">{text}</div>,
                                        },
                                        {
                                            title: <div className="title-text">보내는곳</div>,
                                            dataIndex: 'receivingWarehouseName',
                                            key: 'receivingWarehouseName',
                                            align: 'center',
                                            render: (text) => <div className="small-text">{text}</div>,
                                        },
                                        {
                                            title: <div className="title-text">품목명</div>,
                                            dataIndex: 'productName',
                                            key: 'productName',
                                            align: 'center',
                                            render: (text) => <div className="small-text">{text}</div>,
                                        },
                                        {
                                            title: <div className="title-text">입고예정날짜</div>,
                                            dataIndex: 'deliveryDate',
                                            key: 'deliveryDate',
                                            align: 'center',
                                            render: (text) => <div className="small-text">{text}</div>,
                                        },
                                        {
                                            title: <div className="title-text">입고예정수량</div>,
                                            dataIndex: 'quantity',
                                            key: 'quantity',
                                            align: 'center',
                                            render: (text) => <div className="small-text">{text}</div>,
                                        },
                                        {
                                            title: <div className="title-text">입고대기수량</div>,
                                            dataIndex: 'totalWaitingQuantity',
                                            key: 'totalWaitingQuantity',
                                            align: 'center',
                                            render: (text) => <div className="small-text">{text}</div>,
                                        },
                                        {
                                            title: <div className="title-text">미입고수량</div>,
                                            dataIndex: 'unreceivedQuantity',
                                            key: 'unreceivedQuantity',
                                            align: 'center',
                                            render: (text) => <div className="small-text">{text}</div>,
                                        },
                                        {
                                            title: <div className="title-text">적요</div>,
                                            dataIndex: 'remarks',
                                            key: 'remarks',
                                            align: 'center',
                                            render: (text) => <div className="small-text">{text}</div>,
                                        }
                                    ]}
                                    rowKey={(record) => record.id}
                                    pagination={{pageSize: 15, position: ['bottomCenter'], showSizeChanger: false}}
                                    size="small"
                                    rowSelection={{
                                        type: 'radio',
                                        selectedRowKeys,
                                        onChange: (newSelectedRowKeys) => {
                                            setSelectedRowKeys(newSelectedRowKeys);
                                        }
                                    }}
                                    onRow={(record) => ({
                                        style: {cursor: 'pointer'},
                                        onClick: async () => {
                                            // setSelectedRowKeys([record.id]); // 클릭한 행의 키로 상태 업데이트
                                            const id = record.id;
                                            // try {
                                            //     const response = await apiClient.post(LOGISTICS_API.PRODUCT_DETAIL_API(id));
                                            //     setDetailProductData(response.data);
                                            //     setEditProduct(true);
                                            //
                                            //     notify('success', '품목 조회', '품목 정보 조회 성공.', 'bottomRight')
                                            // } catch (error) {
                                            //     notify('error', '조회 오류', '데이터 조회 중 오류가 발생했습니다.', 'top');
                                            // }
                                        },
                                    })}
                                />
                            </Grid>
                        </Paper>
                    </Grow>
                    </Grid>
                    {requestIncoming && (
                        <Grid item xs={12} md={12} sx={{minWidth: '1000px !important', maxWidth: '1500px !important'}}>
                            <Grow in={true} timeout={200}>
                                <Paper elevation={3} sx={{height: '100%'}}>
                                    <Typography variant="h6" sx={{padding: '20px'}}>입고처리</Typography>
                                    <Grid sx={{padding: '0px 20px 0px 20px'}}>
                                        <Form
                                            initialValues={detailInspectionData}
                                            form={form}
                                            onFinish={(values) => {
                                                handleFormSubmit(values, 'update');
                                            }}
                                        >
                                            {/* 기초 정보 */}
                                            <Divider orientation={'left'} orientationMargin="0"
                                                     style={{marginTop: '0px', fontWeight: 600}}>
                                                기초 정보
                                            </Divider>
                                            <Row gutter={16}>
                                                <Col span={6}>
                                                    <Form.Item
                                                        name="inspectionDate"
                                                        rules={[{required: true, message: '실사 날짜를 입력하세요.'}]}
                                                    >
                                                        <Input addonBefore="실사 날짜"/>
                                                        {/*<DatePicker placeholder="실사 날짜 선택" format=" YYYY-MM-DD"/>*/}
                                                    </Form.Item>
                                                </Col>
                                                <Col span={6}>
                                                    <Form.Item
                                                        name=" inspectionNumber"
                                                        rules={[{required: true, message: '실사 번호를 입력하세요.'}]}
                                                    >
                                                        <Input addonBefore=" 실사 번호" disabled={true}/>
                                                    </Form.Item>
                                                </Col>
                                                <Col span={6}>
                                                    <Form.Item
                                                        name=" employeeName"
                                                        rules={[{required: true, message: '담당자명을 입력하세요.'}]}
                                                    >
                                                        <Input addonBefore=" 담당자명"
                                                               onDoubleClick={() => handleInputClick('employeeName')}
                                                        />
                                                    </Form.Item>
                                                    <Form.Item name=" employeeId" hidden>
                                                        <Input/>
                                                    </Form.Item>
                                                </Col>
                                                <Col span={6}>
                                                    <Form.Item
                                                        name=" warehouseName"
                                                        rules={[{required: true, message: '창고명을 입력하세요.'}]}
                                                    >
                                                        <Input addonBefore=" 창고명"
                                                               onDoubleClick={() => handleInputClick('warehouseName')}
                                                        />
                                                    </Form.Item>
                                                    <Form.Item name=" warehouseId" hidden>
                                                        <Input/>
                                                    </Form.Item>
                                                </Col>
                                            </Row>

                                            {/* 실사 품목 정보 */}
                                            <Divider orientation={'left'} orientationMargin="0"
                                                     style={{marginTop: '0px', fontWeight: 600}}>
                                                실사 품목 정보
                                            </Divider>

                                            <Form.List name="details">
                                                {(fields, {add, remove}) => (
                                                    <>
                                                        {fields.map(({key, name, ...restField}, index) => (
                                                            <Row gutter={16} key={key}
                                                                 style={{marginBottom: '10px'}}>
                                                                <Col span={6}>
                                                                    <Form.Item
                                                                        {...restField}
                                                                        name={[name, 'productCode']}
                                                                    >
                                                                        <Input addonBefore="품목 코드"
                                                                               onDoubleClick={() => handleInputClick('productCode', index)}/>
                                                                    </Form.Item>
                                                                    <Form.Item name={[name, 'productId']}
                                                                               hidden>
                                                                        <Input/>
                                                                    </Form.Item>
                                                                </Col>
                                                                <Col span={6}>
                                                                    <Form.Item
                                                                        {...restField}
                                                                        name={[name, 'productName']}
                                                                    >
                                                                        <Input addonBefore="품목명"/>
                                                                    </Form.Item>
                                                                </Col>
                                                                <Col span={6}>
                                                                    <Form.Item
                                                                        {...restField}
                                                                        name={[name, 'standard']}
                                                                    >
                                                                        <Input addonBefore="규격"/>
                                                                    </Form.Item>
                                                                </Col>
                                                                <Col span={6}>
                                                                    <Form.Item
                                                                        {...restField}
                                                                        name={[name, 'unit']}
                                                                    >
                                                                        <Input addonBefore="단위"/>
                                                                    </Form.Item>
                                                                </Col>
                                                                <Col span={6}>
                                                                    <Form.Item
                                                                        {...restField}
                                                                        name={[name, 'warehouseLocationName']}
                                                                    >
                                                                        <Input addonBefore="창고 위치"/>
                                                                    </Form.Item>
                                                                    <Form.Item
                                                                        name={[name, 'warehouseLocationId']}
                                                                        hidden>
                                                                        <Input/>
                                                                    </Form.Item>
                                                                </Col>
                                                                <Col span={6}>
                                                                    <Form.Item
                                                                        {...restField}
                                                                        name={[name, 'actualQuantity']}
                                                                    >
                                                                        <Input addonBefore="실사 수량"/>
                                                                    </Form.Item>
                                                                </Col>
                                                                <Col span={10}>
                                                                    <Form.Item
                                                                        {...restField}
                                                                        name={[name, 'comment']}
                                                                    >
                                                                        <Input addonBefore="비고"/>
                                                                    </Form.Item>
                                                                </Col>
                                                                <Col span={2} style={{
                                                                    display: 'flex',
                                                                    justifyContent: 'flex-end'
                                                                }}>
                                                                    <Button type="danger" onClick={() => remove(name)}>삭제</Button>
                                                                </Col>
                                                            </Row>
                                                        ))}
                                                        <Form.Item>
                                                            <Button type="dashed" onClick={() => add()} block>
                                                                항목 추가
                                                            </Button>
                                                        </Form.Item>
                                                    </>
                                                )}
                                            </Form.List>

                                            <Box sx={{
                                                display: 'flex',
                                                justifyContent: 'flex-end',
                                                marginBottom: '20px'
                                            }}>
                                                <Button type="primary" htmlType="submit">저장</Button>
                                            </Box>
                                            <Modal
                                                open={isModalVisible}
                                                onCancel={handleModalCancel}
                                                footer={null}
                                                width="40vw"
                                            >
                                                {isLoading ? (
                                                    <Spin/>  // 로딩 스피너
                                                ) : (
                                                    <>
                                                        {/* 담당자 선택 모달 */}
                                                        {currentField === 'employeeName' && (
                                                            <>
                                                                <Typography id="modal-modal-title" variant="h6"
                                                                            component="h2"
                                                                            sx={{marginBottom: '20px'}}>
                                                                    담당자 선택
                                                                </Typography>
                                                                <Input
                                                                    placeholder="검색"
                                                                    prefix={<SearchOutlined/>}
                                                                    onChange={(e) => {
                                                                        const value = e.target.value.toLowerCase();
                                                                        if (!value) {
                                                                            setModalData(initialModalData);
                                                                        } else {
                                                                            const filtered = initialModalData.filter((item) => {
                                                                                return (
                                                                                    (item.employeeNumber && item.employeeNumber.toLowerCase().includes(value)) ||
                                                                                    (`${item.lastName}${item.firstName}`.toLowerCase().includes(value))
                                                                                );
                                                                            });
                                                                            setModalData(filtered);
                                                                        }
                                                                    }}
                                                                    style={{marginBottom: 16}}
                                                                />
                                                                {modalData && (
                                                                    <Table
                                                                        columns={[
                                                                            {
                                                                                title: <div
                                                                                    className="title-text">사번</div>,
                                                                                dataIndex: 'employeeNumber',
                                                                                key: 'employeeNumber',
                                                                                align: 'center',
                                                                                render: (text) => <div
                                                                                    className="small-text">{text}</div>,
                                                                            },
                                                                            {
                                                                                title: <div
                                                                                    className="title-text">이름</div>,
                                                                                dataIndex: 'name',
                                                                                key: 'name',
                                                                                align: 'center',
                                                                                render: (_, record) => `${record.lastName}${record.firstName}`
                                                                            }
                                                                        ]}
                                                                        dataSource={modalData}
                                                                        rowKey="id"
                                                                        size="small"
                                                                        pagination={{
                                                                            pageSize: 15,
                                                                            position: ['bottomCenter'],
                                                                            showSizeChanger: false,
                                                                            showTotal: (total) => `총 ${total}개`
                                                                        }}
                                                                        onRow={(record) => ({
                                                                            style: {cursor: 'pointer'},
                                                                            onClick: () => handleModalSelect(record)
                                                                        })}
                                                                    />
                                                                )}
                                                            </>
                                                        )}

                                                        {/* 창고 선택 모달 */}
                                                        {currentField === 'warehouseName' && (
                                                            <>
                                                                <Typography id="modal-modal-title" variant="h6"
                                                                            component="h2"
                                                                            sx={{marginBottom: '20px'}}>
                                                                    창고 선택
                                                                </Typography>
                                                                <Input
                                                                    placeholder="검색"
                                                                    prefix={<SearchOutlined/>}
                                                                    onChange={(e) => {
                                                                        const value = e.target.value.toLowerCase();
                                                                        if (!value) {
                                                                            setModalData(initialModalData);
                                                                        } else {
                                                                            const filtered = initialModalData.filter((item) => {
                                                                                return (
                                                                                    (item.code && item.code.toLowerCase().includes(value)) ||
                                                                                    (item.name && item.name.toLowerCase().includes(value))
                                                                                );
                                                                            });
                                                                            setModalData(filtered);
                                                                        }
                                                                    }}
                                                                    style={{marginBottom: 16}}
                                                                />
                                                                {modalData && (
                                                                    <Table
                                                                        columns={[
                                                                            {
                                                                                title: <div
                                                                                    className="title-text">창고
                                                                                    코드</div>,
                                                                                dataIndex: 'code',
                                                                                key: 'code',
                                                                                align: 'center',
                                                                                render: (text) => <div
                                                                                    className="small-text">{text}</div>,
                                                                            },
                                                                            {
                                                                                title: <div
                                                                                    className="title-text">창고명</div>,
                                                                                dataIndex: 'name',
                                                                                key: 'name',
                                                                                align: 'center',
                                                                                render: (text) => <div
                                                                                    className="small-text">{text}</div>,
                                                                            },
                                                                            {
                                                                                title: <div
                                                                                    className="title-text">창고
                                                                                    유형</div>,
                                                                                dataIndex: 'warehouseType',
                                                                                key: 'warehouseType',
                                                                                align: 'center',
                                                                                render: (text) => <div
                                                                                    className="small-text">{text}</div>,
                                                                            }
                                                                        ]}
                                                                        dataSource={modalData}
                                                                        rowKey="id"
                                                                        size="small"
                                                                        pagination={{
                                                                            pageSize: 15,
                                                                            position: ['bottomCenter'],
                                                                            showSizeChanger: false,
                                                                            showTotal: (total) => `총 ${total}개`
                                                                        }}
                                                                        onRow={(record) => ({
                                                                            style: {cursor: 'pointer'},
                                                                            onClick: () => handleModalSelect(record)
                                                                        })}
                                                                    />
                                                                )}
                                                            </>
                                                        )}

                                                        {/* 품목 코드 선택 모달 */}
                                                        {currentField === 'productCode' && (
                                                            <>
                                                                <Typography id="modal-modal-title" variant="h6"
                                                                            component="h2"
                                                                            sx={{marginBottom: '20px'}}>
                                                                    품목 코드 선택
                                                                </Typography>
                                                                <Input
                                                                    placeholder="검색"
                                                                    prefix={<SearchOutlined/>}
                                                                    onChange={(e) => {
                                                                        const value = e.target.value.toLowerCase();
                                                                        if (!value) {
                                                                            setModalData(initialModalData);
                                                                        } else {
                                                                            const filtered = initialModalData.filter((item) => {
                                                                                return (
                                                                                    (item.productCode && item.productCode.toLowerCase().includes(value)) ||
                                                                                    (item.productName && item.productName.toLowerCase().includes(value))
                                                                                );
                                                                            });
                                                                            setModalData(filtered);
                                                                        }
                                                                    }}
                                                                    style={{marginBottom: 16}}
                                                                />
                                                                {modalData && (
                                                                    <Table
                                                                        columns={[
                                                                            {
                                                                                title: <div
                                                                                    className="title-text">품목
                                                                                    코드</div>,
                                                                                dataIndex: 'productCode',
                                                                                key: 'productCode',
                                                                                align: 'center',
                                                                                render: (text) => <div
                                                                                    className="small-text">{text}</div>,
                                                                            },
                                                                            {
                                                                                title: <div
                                                                                    className="title-text">품목명</div>,
                                                                                dataIndex: 'productName',
                                                                                key: 'productName',
                                                                                align: 'center',
                                                                                render: (text) => <div
                                                                                    className="small-text">{text}</div>,
                                                                            },
                                                                            {
                                                                                title: <div
                                                                                    className="title-text">규격</div>,
                                                                                dataIndex: 'quantity',
                                                                                key: 'quantity',
                                                                                align: 'center',
                                                                                render: (text) => <div
                                                                                    className="small-text">{text}</div>,
                                                                            },
                                                                            {
                                                                                title: <div
                                                                                    className="title-text">창고명</div>,
                                                                                dataIndex: 'warehouseName',
                                                                                key: 'warehouseName',
                                                                                align: 'center',
                                                                                render: (text) => <div
                                                                                    className="small-text">{text}</div>,
                                                                            },
                                                                            {
                                                                                title: <div
                                                                                    className="title-text">로케이션
                                                                                    위치</div>,
                                                                                dataIndex: 'warehouseLocationName',
                                                                                key: 'warehouseLocationName',
                                                                                align: 'center',
                                                                                render: (text) => <div
                                                                                    className="small-text">{text}</div>,
                                                                            }
                                                                        ]}
                                                                        dataSource={modalData}
                                                                        rowKey="id"
                                                                        size="small"
                                                                        pagination={{
                                                                            pageSize: 15,
                                                                            position: ['bottomCenter'],
                                                                            showSizeChanger: false,
                                                                            showTotal: (total) => `총 ${total}개`
                                                                        }}
                                                                        onRow={(record) => ({
                                                                            style: {cursor: 'pointer'},
                                                                            onClick: () => handleModalSelect(record)
                                                                        })}
                                                                    />
                                                                )}
                                                            </>
                                                        )}

                                                        <Box sx={{
                                                            mt: 2,
                                                            display: 'flex',
                                                            justifyContent: 'flex-end'
                                                        }}>
                                                            <Button onClick={handleModalCancel}
                                                                    variant="contained"
                                                                    type="danger" sx={{mr: 1}}>
                                                                닫기
                                                            </Button>
                                                        </Box>
                                                    </>
                                                )}
                                            </Modal>
                                        </Form>
                                    </Grid>
                                </Paper>
                            </Grow>
                        </Grid>
                    )}
                </Grid>
            )}

            {activeTabKey === '2' && (
                <Grid sx={{padding: '0px 20px 0px 20px'}} container spacing={3}>
                    <Grid item xs={12} md={5} sx={{minWidth: '500px !important', maxWidth: '700px !important'}}>
                        <Grow in={true} timeout={200}>
                            <div>
                                <TemporarySection/>
                            </div>
                        </Grow>
                    </Grid>
                </Grid>
            )}

        </Box>
    );
};

export default IncomingProcessingPage;