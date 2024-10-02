import React, { useState, useEffect, useCallback, useMemo } from 'react'
import {Box, Grid, Grow, Paper, Typography} from '@mui/material'
import { DeleteOutlined, PlusOutlined, SaveOutlined, ExclamationCircleOutlined } from '@ant-design/icons'
import { Space, Table, Button, Input, Select, DatePicker, InputNumber, message, Spin, AutoComplete, Modal, Tag} from 'antd'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import dayjs from "dayjs"
import WelcomeSection from "../../../../components/WelcomeSection"
import { tabItems } from "./PendingVoucherInputUtil"
import TemporarySection from "../../../../components/TemporarySection"
import {useNotificationContext} from "../../../../config/NotificationContext.jsx";
import axios from "axios";
import {FINANCIAL_API} from "../../../../config/apiConstants.jsx";
import apiClient from "../../../../config/apiClient.jsx";
import { useSelector } from 'react-redux';
import {jwtDecode} from "jwt-decode";

const { Option } = Select

const PendingVoucherInputPage = () => {
    const token = useSelector(state => state.auth.token);
    const notify = useNotificationContext();
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [searchData, setSearchData] = useState([])
    const [activeTabKey, setActiveTabKey] = useState('1')
    const [voucher, setVoucher] = useState({});
    const [vouchers, setVouchers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentField, setCurrentField] = useState('');
    const [displayValues, setDisplayValues] = useState({
        accountSubjectCode: '',
        clientCode: ''
    });

    const handleTabChange = (key) => {
        setActiveTabKey(key)
    }

    const handleVoucherTypeChange = (value) => {
        setVoucher((prevVoucher) => {
            let updatedVoucher = { ...prevVoucher, voucherType: value };

            // 구분이 'Credit' 또는 'Withdrawal'일 경우 차변 값 0으로 설정
            if (value === 'Credit' || value === 'Withdrawal') {
                updatedVoucher.creditAmount = null;
            }

            // 구분이 'Debit' 또는 'Deposit'일 경우 대변 값 0으로 설정
            if (value === 'Debit' || value === 'Deposit') {
                updatedVoucher.debitAmount = null;
            }

            return updatedVoucher;
        });
    };

    // 모달에서 선택한 값 searchParams에 반영
    const handleModalSelect = (record) => {
        const formattedValue = `[${record.code}] ${record.name || record.printClientName}`;

        setVoucher((prevParams) => ({
            ...prevParams,
            [currentField]: record.code, // 선택한 필드에 따라 값을 할당
        }));

        setDisplayValues((prevValues) => ({
            ...prevValues,
            [currentField]: formattedValue, // 화면에 표시될 형식으로 저장
        }));

        setIsModalVisible(false);  // 모달창 닫기
    };

    const handleModalCancel = () => {
        setIsModalVisible(false);  // 모달창 닫기
    };

    // 모달 데이터 가져오기
    const fetchModalData = async (fieldName) => {
        setIsLoading(true);
        const apiPath = (fieldName === 'accountSubjectCode')
            ? FINANCIAL_API.ACCOUNT_SUBJECTS_SEARCH_API
            : FINANCIAL_API.CLIENT_SEARCH_API;
        try {
            const searchText = null;
            const response = await apiClient.post(apiPath, { searchText });
            setModalData(response.data);
        } catch (error) {
            notify('error', '조회 오류', '데이터 조회 중 오류가 발생했습니다.', 'top');
        } finally {
            setIsLoading(false);
        }
    };

    // 입력 필드 클릭 시 모달 열기
    const handleInputClick = (fieldName) => {
        setCurrentField(fieldName);
        setModalData(null); // 모달 열기 전에 데이터를 초기화
        fetchModalData(fieldName);  // 모달 데이터 가져오기 호출
        setIsModalVisible(true);  // 모달창 열기
    };


    const fetchData = useCallback(async () => {
        try {
            const response = await apiClient.post(FINANCIAL_API.UNRESOLVED_VOUCHER_SEARCH_API, {
                searchDate: formattedDate,
            });

            setSearchData(response.data); // API로 받은 데이터를 바로 상태로 설정

        } catch (err) {
            console.error('데이터를 불러오는 중 오류 발생:', err);
            notify('error', '오류', '데이터를 불러오는 중 오류가 발생했습니다.', 'top');
        }
    }, [selectedDate]);

    // selectedDate 변경 시 fetchData 호출
    useEffect(() => {
        fetchData();
    }, [selectedDate, fetchData]);

    const formattedDate = useMemo(() => {
        return format(selectedDate, 'yyyy-MM-dd', { locale: ko });
    }, [selectedDate]);

    const handleSubmit = async () => {
        try {
            // vouchers 배열이 비어 있으면 현재 voucher 객체를 추가
            const updatedVouchers = vouchers.length ? vouchers : [{
                ...voucher, // voucher 상태에서 필요한 값들 모두 가져옴
                creditAmount: voucher.creditAmount || 0,
                debitAmount: voucher.debitAmount || 0,
            }];

            const processedVouchers = updatedVouchers.map((v) => {
                // 유효성 검사
                if ((v.voucherType === 'Withdrawal' || v.voucherType === 'Deposit') && v.accountSubjectCode === '101') throw new Error("입금, 출금 전표는 현금 계정과목을 사용 할 수 없습니다.");
                if (v.debitAmount < 0 || v.creditAmount < 0) throw new Error("금액은 음수가 될 수 없습니다.");
                if (!v.voucherType || !v.accountSubjectCode || !v.clientCode) throw new Error("필수 입력값이 누락되었습니다.");
                if (v.voucherType === 'Deposit' && v.creditAmount === 0) throw new Error("전표 구분이 입금일 경우 금액을 입력해주세요.");
                if (v.voucherType === 'Withdrawal' && v.debitAmount === 0) throw new Error("전표 구분이 출금일 경우 금액을 입력해주세요.");
                if ((v.voucherType === 'Debit' || v.voucherType === 'Credit') &&
                    (v.voucherType === 'Deposit' || v.voucherType === 'Withdrawal')) {
                    throw new Error("차변/대변과 입금/출금은 동시에 사용할 수 없습니다.");
                }
                if (v.voucherType === 'Debit' || v.voucherType === 'Credit') {
                    const totalDebit = updatedVouchers.reduce((sum, item) => sum + (item.debitAmount || 0), 0);
                    const totalCredit = updatedVouchers.reduce((sum, item) => sum + (item.creditAmount || 0), 0);
                    if (totalDebit !== totalCredit) throw new Error("차변과 대변의 합계가 일치하지 않습니다.");
                }

                // formattedAccountSubjectCode와 formattedClientCode에서 숫자만 추출하고 반환
                const { formattedAccountSubjectCode, formattedClientCode, ...rest } = v;

                const accountSubjectCode = formattedAccountSubjectCode ? formattedAccountSubjectCode.match(/\d+/)[0] : rest.accountSubjectCode;
                const clientCode = formattedClientCode ? formattedClientCode.match(/\d+/)[0] : rest.clientCode;

                return {
                    ...rest, // 나머지 필드 유지 (formattedAccountSubjectCode와 formattedClientCode는 포함되지 않음)
                    voucherDate: format(selectedDate, 'yyyy-MM-dd'),
                    voucherKind: "General",
                    voucherManagerId: jwtDecode(token).employeeId,
                    debitAmount: v.debitAmount ? v.debitAmount : 0,
                    creditAmount: v.creditAmount ? v.creditAmount : 0,
                    accountSubjectCode, // 숫자로 변환된 accountSubjectCode
                    clientCode, // 숫자로 변환된 clientCode
                    transactionDescription: v.transactionDescription,
                    voucherType: v.voucherType,
                };
            });

            console.log("Processed Vouchers:", processedVouchers);

            // 데이터 저장
            await apiClient.post(FINANCIAL_API.SAVE_UNRESOLVED_VOUCHER_API, processedVouchers); // API 호출
            notify('success', '저장 완료', '전표가 성공적으로 저장되었습니다.', 'bottomLeft');
            fetchData(); // 목록 갱신
            setVoucher({}); // 저장 후 입력폼 초기화
            setDisplayValues({ accountSubjectCode: '', clientCode: '' });
            setVouchers([]); // 저장 후 배열 초기화

        } catch (err) {
            notify('error', '저장 실패', err.message || '전표 저장 중 오류가 발생했습니다.', 'bottomLeft');
        }
    };

    const handleAddRow = () => {

        // 입금, 출금일 경우에는 행 추가를 허용하지 않음
        if (voucher.voucherType === 'Deposit' || voucher.voucherType === 'Withdrawal') {
            notify('warning', '입력 오류', '입금 또는 출금일 경우 행을 추가할 수 없습니다.', 'bottomLeft');
            return;
        }

        // 필수 입력값 모두 체크 (차변 또는 대변 금액이 0이어도 허용)
        if (!voucher.voucherType || !voucher.accountSubjectCode || !voucher.clientCode) {
            notify('warning', '입력 오류', '모든 필수 필드를 입력해주세요.', 'bottomLeft');
            return;
        }

        const newVoucher = {
            ...voucher,
            key: Date.now(),
            formattedAccountSubjectCode: displayValues.accountSubjectCode, // 포맷된 값 추가
            formattedClientCode: displayValues.clientCode, // 포맷된 값 추가
        };

        setVouchers([...vouchers, newVoucher]);
        setVoucher({}); // 입력폼 초기화
        setDisplayValues({ accountSubjectCode: '', clientCode: '' });
    };


    const handleDeleteRow = () => {
        if (vouchers.length === 0) return;

        const updatedVouchers = [...vouchers];
        const lastVoucher = updatedVouchers.pop();

        // vouchers 배열 업데이트 및 입력 필드 유지
        setVouchers(updatedVouchers);
        setVoucher(lastVoucher);

        // displayValues도 lastVoucher에 맞게 업데이트
        setDisplayValues({
            accountSubjectCode: lastVoucher.formattedAccountSubjectCode,
            clientCode: lastVoucher.formattedClientCode
        });
    };

    return (
        <Box sx={{ margin: '20px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <WelcomeSection
                        title="미결전표 입력"
                        description={(
                            <Typography>
                                미결전표 입력 페이지는 <span>아직 승인되지 않은 전표</span>를 등록하고 관리하는 기능을 제공합니다. 이 페이지에서는 <span>거래 내역, 적요, 금액, 계정과목</span> 등을 입력하여 <span>미결 상태의 전표를 작성</span>할 수 있으며, 전표 승인 전까지 <span>수정 및 검토</span>가 가능합니다. 이를 통해 <span>전표 처리 과정</span>을 효율적으로 관리하고 추적할 수 있습니다.
                            </Typography>
                        )}
                        tabItems={tabItems()}
                        activeTabKey={activeTabKey}
                        handleTabChange={handleTabChange}
                    />
                </Grid>
            </Grid>

            {activeTabKey === '1' && (
                <Grid sx={{ padding: '0px 20px 0px 20px' }} container spacing={3}>
                    <Grid item xs={12} md={12}>
                        <Grow in={true} timeout={200}>
                            <Paper elevation={3} sx={{ height: '100%' }}>
                                <Typography variant="h6" sx={{ padding: '20px' }} >전표 목록</Typography>
                                <Grid sx={{ padding: '0px 20px 0px 20px' }}>
                                    <Grid item xs={12} md={3} sx={{ marginBottom: '20px' }}>
                                        <DatePicker
                                            value={dayjs(selectedDate)}
                                            onChange={(date) => setSelectedDate(date.toDate())}
                                            style={{ width: '100%' }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sx={{ marginBottom: '20px' }}>
                                        <Table
                                            dataSource={searchData?.voucherDtoList}
                                            columns={[
                                                {
                                                    title: <span style={{ fontSize: '0.8rem' }}>날짜</span>,
                                                    dataIndex: 'voucherDate',
                                                    key: 'voucherDate',
                                                    width: '10%',
                                                    align: 'center',
                                                    render: (text, record) => <span style={{ fontSize: '0.7rem' }}>{text || formattedDate}</span>
                                                },
                                                {
                                                    title: <span style={{ fontSize: '0.8rem' }}>전표번호</span>,
                                                    dataIndex: 'voucherNumber',
                                                    key: 'voucherNumber',
                                                    width: '5%',
                                                    align: 'center',
                                                    render: (text, record) => record.total ? null : <span style={{ fontSize: '0.7rem' }}>{text}</span>
                                                },
                                                {
                                                    title: <span style={{ fontSize: '0.8rem' }}>구분</span>,
                                                    dataIndex: 'voucherType',
                                                    key: 'voucherType',
                                                    width: '10%',
                                                    align: 'center',
                                                    render: (text) => {
                                                        let color;
                                                        let value;
                                                        switch (text) {
                                                            case 'DEPOSIT':
                                                                color = 'green';
                                                                value = '입금';
                                                                break;
                                                            case 'WITHDRAWAL':
                                                                color = 'red';
                                                                value = '출금';
                                                                break;
                                                            case 'DEBIT':
                                                                color = 'green';
                                                                value = '차변';
                                                                break;
                                                            case 'CREDIT':
                                                                color = 'red';
                                                                value = '대변';
                                                                break;
                                                            default:
                                                                color = 'gray';
                                                                value = text;
                                                        }
                                                        return <Tag style={{ marginLeft: '5px' }} color={color}>{value}</Tag>;
                                                    }
                                                },
                                                {
                                                    title: <span style={{ fontSize: '0.8rem' }}>계정과목</span>,
                                                    dataIndex: 'accountSubjectCode',
                                                    key: 'accountSubjectCode',
                                                    width: '10%',
                                                    align: 'center',
                                                    render: (text, record) => <span style={{ fontSize: '0.7rem' }}>[{text}] {record.accountSubjectName}</span>
                                                },
                                                {
                                                    title: <span style={{ fontSize: '0.8rem' }}>거래처</span>,
                                                    dataIndex: 'clientCode',
                                                    key: 'clientCode',
                                                    width: '10%',
                                                    align: 'center',
                                                    render: (text, record) => <span style={{ fontSize: '0.7rem' }}>[{text}] {record.clientName}</span>
                                                },
                                                {
                                                    title: <span style={{ fontSize: '0.8rem' }}>적요</span>,
                                                    dataIndex: 'transactionDescription',
                                                    key: 'transactionDescription',
                                                    width: '20%',
                                                    align: 'center',
                                                    render: (text) => <span style={{ fontSize: '0.7rem' }}>{text}</span>
                                                },
                                                {
                                                    title: <span style={{ fontSize: '0.8rem' }}>차변</span>,
                                                    dataIndex: 'debitAmount',
                                                    key: 'debitAmount',
                                                    width: '10%',
                                                    align: 'right',
                                                    render: (text) => <span style={{ fontSize: '0.7rem' }}>{text.toLocaleString()}</span>
                                                },
                                                {
                                                    title: <span style={{ fontSize: '0.8rem' }}>대변</span>,
                                                    dataIndex: 'creditAmount',
                                                    key: 'creditAmount',
                                                    width: '10%',
                                                    align: 'right',
                                                    render: (text) => <span style={{ fontSize: '0.7rem' }}>{text.toLocaleString()}</span>
                                                }
                                            ]}
                                            rowKey={(record) => record.id}
                                            pagination={false}
                                            size="small"
                                            scroll={{ x: 'max-content' }}
                                            summary={() =>  (
                                                <Table.Summary.Row style={{ backgroundColor: '#FAFAFA' }}>
                                                    <Table.Summary.Cell index={0} ><Typography sx={{ textAlign: 'center', fontSize: '0.9rem' }}>합계</Typography></Table.Summary.Cell>
                                                    <Table.Summary.Cell index={1} />
                                                    <Table.Summary.Cell index={2} />
                                                    <Table.Summary.Cell index={3} />
                                                    <Table.Summary.Cell index={4} />
                                                    <Table.Summary.Cell index={5} />
                                                    <Table.Summary.Cell index={6}><Typography sx={{ textAlign: 'right', fontSize: '0.9rem'}}>{Number(searchData.totalDebit).toLocaleString()}</Typography></Table.Summary.Cell>
                                                    <Table.Summary.Cell index={7}><Typography sx={{ textAlign: 'right', fontSize: '0.9rem'}}>{Number(searchData.totalCredit).toLocaleString()}</Typography></Table.Summary.Cell>
                                                </Table.Summary.Row>
                                            )}
                                        />
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grow>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <Grow in={true} timeout={200}>
                            <Paper elevation={3} sx={{ height: '100%' }}>
                                <Typography variant="h6" sx={{ padding: '20px' }}>전표 입력</Typography>
                                <Box sx={{ margin: '20px' }}>
                                    {/* 입력 폼 */}
                                    <Grid container spacing={2} alignItems="center" justifyContent="space-between" sx={{ padding: '0px 20px 0px 20px' }}>
                                        {/* 구분 입력 */}
                                        <Grid item xs={2}>
                                            <Select
                                                placeholder="구분"
                                                style={{ width: '100%' }}
                                                value={voucher.voucherType}
                                                onChange={handleVoucherTypeChange}
                                                dropdownRender={menu => (
                                                    <>
                                                        <div style={{ padding: '8px', cursor: 'pointer' }}>
                                                            <Typography>구분 선택</Typography>
                                                        </div>
                                                        {menu}
                                                    </>
                                                )}
                                            >
                                                <Option value="Deposit">입금</Option>
                                                <Option value="Withdrawal">출금</Option>
                                                <Option value="Debit">차변</Option>
                                                <Option value="Credit">대변</Option>
                                            </Select>
                                        </Grid>

                                        {/* 계정과목 입력 */}
                                        <Grid item xs={2}>
                                            <Input
                                                addonBefore="계정과목"
                                                name="accountCode"
                                                placeholder="계정과목"
                                                value={displayValues.accountSubjectCode}
                                                onClick={() => handleInputClick('accountSubjectCode')}
                                                style={{
                                                    caretColor: 'transparent',
                                                }}
                                            />
                                        </Grid>

                                        {/* 거래처명 입력 */}
                                        <Grid item xs={2}>
                                            <Input
                                                addonBefore="거래처"
                                                name="clientCode"
                                                placeholder="거래처"
                                                value={displayValues.clientCode}
                                                onClick={() => handleInputClick('clientCode')}
                                                style={{
                                                    cursor: 'pointer',
                                                    caretColor: 'transparent',
                                                }}
                                            />
                                        </Grid>

                                        {/* 적요 입력 */}
                                        <Grid item xs={2}>
                                            <Space.Compact>
                                                <Input
                                                    style={{ width: '30%', color: '#000', backgroundColor: '#FAFAFA' }}
                                                    value="적요"
                                                    disabled
                                                />
                                                <AutoComplete
                                                    style={{ width: '70%' }}
                                                    placeholder="적요"
                                                    value={voucher.transactionDescription}
                                                    onChange={(value) => setVoucher({ ...voucher, transactionDescription: value })}
                                                    showSearch
                                                    defaultActiveFirstOption
                                                />
                                            </Space.Compact>
                                        </Grid>

                                        {/* 차변 금액 입력 */}
                                        <Grid item xs={2}>
                                            <InputNumber
                                                addonBefore="차변"
                                                style={{ width: '100%' }}
                                                placeholder="차변"
                                                value={voucher.debitAmount}
                                                onChange={(value) => setVoucher({ ...voucher, debitAmount: value })}
                                                disabled={voucher.voucherType === 'Credit' || voucher.voucherType === 'Deposit'} // 출금일 경우 차변 비활성화
                                            />
                                        </Grid>

                                        {/* 대변 금액 입력 */}
                                        <Grid item xs={2}>
                                            <InputNumber
                                                addonBefore="대변"
                                                style={{ width: '100%' }}
                                                placeholder="대변"
                                                value={voucher.creditAmount}
                                                onChange={(value) => setVoucher({ ...voucher, creditAmount: value })}
                                                disabled={voucher.voucherType === 'Debit' || voucher.voucherType === 'Withdrawal'} // 입금일 경우 대변 비활성화
                                            />
                                        </Grid>
                                    </Grid>

                                    {/* 저장 버튼 및 행 추가 버튼 */}
                                    <Grid container justifyContent="flex-end" sx={{ padding: '20px' }}>
                                        <Grid item>
                                            <Button
                                                type="primary"
                                                icon={<PlusOutlined />}
                                                onClick={handleAddRow}
                                            >
                                                행 추가
                                            </Button>
                                        </Grid>
                                    </Grid>

                                    {/* 저장된 행을 출력하는 테이블 */}
                                    <Table
                                        dataSource={vouchers}
                                        columns={[
                                            {
                                                title: "날짜",
                                                dataIndex: "voucherDate",
                                                key: "voucherDate",
                                                width: "10%",
                                                align: "center",
                                                render: () => <span style={{ fontSize: '0.7rem' }}>{formattedDate}</span>,
                                            },
                                            {
                                                title: "구분",
                                                dataIndex: "voucherType",
                                                key: "voucherType",
                                                width: "10%",
                                                align: "center",
                                                render: (text) => {
                                                    let color;
                                                    let value;
                                                    switch (text) {
                                                        case 'Debit':
                                                            color = 'green';
                                                            value = '차변';
                                                            break;
                                                        case 'Credit':
                                                            color = 'red';
                                                            value = '대변';
                                                            break;
                                                        default:
                                                            color = 'gray';
                                                            value = text;
                                                    }
                                                    return <Tag color={color}>{value}</Tag>;
                                                }
                                            },
                                            {
                                                title: "계정과목",
                                                dataIndex: "formattedAccountSubjectCode", // 포맷된 값을 사용
                                                key: "formattedAccountSubjectCode",
                                                width: "15%",
                                                align: "center",
                                                render: (text) => <span style={{ fontSize: '0.7rem' }}>{text}</span>,
                                            },
                                            {
                                                title: "거래처",
                                                dataIndex: "formattedClientCode", // 포맷된 값을 사용
                                                key: "formattedClientCode",
                                                width: "15%",
                                                align: "center",
                                                render: (text) => <span style={{ fontSize: '0.7rem' }}>{text}</span>,
                                            },
                                            {
                                                title: "적요",
                                                dataIndex: "transactionDescription",
                                                key: "transactionDescription",
                                                width: "20%",
                                                align: "center",
                                                render: (text) => <span style={{ fontSize: '0.7rem' }}>{text}</span>,
                                            },
                                            {
                                                title: "차변",
                                                dataIndex: "debitAmount",
                                                key: "debitAmount",
                                                width: "10%",
                                                align: "center",
                                                render: (text) => <span style={{ fontSize: '0.7rem' }}>{(text || 0).toLocaleString()}</span>,
                                            },
                                            {
                                                title: "대변",
                                                dataIndex: "creditAmount",
                                                key: "creditAmount",
                                                width: "10%",
                                                align: "center",
                                                render: (text) => <span style={{ fontSize: '0.7rem' }}>{(text || 0).toLocaleString()}</span>,
                                            }
                                        ]}
                                        rowKey={(record) => record.key}
                                        pagination={false}
                                        size="small"
                                        summary={() => (
                                            vouchers.length > 0 &&
                                            <>
                                                <Table.Summary.Row style={{ backgroundColor: '#FAFAFA' }}>
                                                    <Table.Summary.Cell index={0}>
                                                        <Typography sx={{ textAlign: 'center', fontSize: '0.8rem' }}>합계</Typography>
                                                    </Table.Summary.Cell>
                                                    <Table.Summary.Cell index={1}></Table.Summary.Cell>
                                                    <Table.Summary.Cell index={2}></Table.Summary.Cell>
                                                    <Table.Summary.Cell index={3}></Table.Summary.Cell>
                                                    <Table.Summary.Cell index={4}></Table.Summary.Cell>
                                                    <Table.Summary.Cell index={5}>
                                                        <Typography sx={{ textAlign: 'center', fontSize: '0.8rem' }}>
                                                            {(vouchers.reduce((acc, cur) => acc + (cur?.debitAmount || 0), 0) || 0).toLocaleString()}
                                                        </Typography>
                                                    </Table.Summary.Cell>
                                                    <Table.Summary.Cell index={6}>
                                                        <Typography sx={{ textAlign: 'center', fontSize: '0.8rem' }}>
                                                            {(vouchers.reduce((acc, cur) => acc + (cur?.creditAmount || 0), 0) || 0).toLocaleString()}
                                                        </Typography>
                                                    </Table.Summary.Cell>
                                                </Table.Summary.Row>
                                                <Table.Summary.Row style={{ backgroundColor: '#FAFAFA' }}>
                                                    <Table.Summary.Cell index={0}>
                                                        <Typography sx={{ textAlign: 'center', fontSize: '0.8rem' }}>대차차액</Typography>
                                                    </Table.Summary.Cell>
                                                    <Table.Summary.Cell index={1}></Table.Summary.Cell>
                                                    <Table.Summary.Cell index={2}></Table.Summary.Cell>
                                                    <Table.Summary.Cell index={3}></Table.Summary.Cell>
                                                    <Table.Summary.Cell index={4}></Table.Summary.Cell>
                                                    <Table.Summary.Cell index={5}>
                                                        <Typography sx={{ textAlign: 'center', fontSize: '0.8rem' }}>
                                                            {(vouchers.reduce((acc, cur) => acc + (cur?.debitAmount || 0), 0) - vouchers.reduce((acc, cur) => acc + (cur?.creditAmount || 0), 0) || 0).toLocaleString()}
                                                        </Typography>
                                                    </Table.Summary.Cell>
                                                    <Table.Summary.Cell index={6}>
                                                        <Typography sx={{ textAlign: 'center', fontSize: '0.8rem' }}>
                                                            {(vouchers.reduce((acc, cur) => acc + (cur?.creditAmount || 0), 0) - vouchers.reduce((acc, cur) => acc + (cur?.debitAmount || 0), 0) || 0).toLocaleString()}
                                                        </Typography>
                                                    </Table.Summary.Cell>
                                                </Table.Summary.Row>
                                            </>
                                        )}
                                        locale={{
                                            emptyText: '데이터가 없습니다.',
                                        }}
                                    />
                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                                        {/* 삭제 버튼 */}
                                        <Button danger onClick={handleDeleteRow} style={{ marginRight: '20px' }}>삭제</Button>
                                        <Button type="primary" onClick={handleSubmit}>저장</Button>
                                    </Box>
                                </Box>
                            </Paper>
                        </Grow>
                    </Grid>
                </Grid>
            )}

            {activeTabKey === '2' && (
                <Grid sx={{ padding: '0px 20px 0px 20px' }} container spacing={3}>
                    <Grid item xs={12} md={5} sx={{ minWidth: '500px !important', maxWidth: '700px !important' }}>
                        <TemporarySection />
                    </Grid>
                </Grid>
            )}

            <Modal
                open={isModalVisible}
                onCancel={handleModalCancel}
                footer={null}
                width="40vw"
            >
                {isLoading ? (
                    <Spin />  // 로딩 스피너
                ) : (
                    <>
                        {currentField === 'accountSubjectCode' && (
                            <>
                                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: '20px' }}>
                                    계정과목 선택
                                </Typography>
                                {modalData && (
                                    <Table
                                        columns={[
                                            { title: '코드', dataIndex: 'code', key: 'code', align: 'center' },
                                            { title: '이름', dataIndex: 'name', key: 'name', align: 'center' },
                                        ]}
                                        dataSource={modalData}
                                        rowKey="id"
                                        size={'small'}
                                        pagination={{ pageSize: 15, position: ['bottomCenter'], showSizeChanger: false }}
                                        onRow={(record) => ({
                                            style: { cursor: 'pointer' },
                                            onClick: () => handleModalSelect(record), // 선택 시 처리
                                        })}
                                    />
                                )}
                            </>
                        )}

                        {currentField === 'clientCode' && (
                            <>
                                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: '20px' }}>
                                    거래처 선택
                                </Typography>
                                {modalData && (
                                    <Table
                                        columns={[
                                            { title: '코드', dataIndex: 'code', key: 'code', align: 'center' },
                                            { title: '거래처명', dataIndex: 'printClientName', key: 'printClientName', align: 'center' },
                                        ]}
                                        dataSource={modalData}
                                        rowKey="code"
                                        size={'small'}
                                        pagination={{ pageSize: 15, position: ['bottomCenter'], showSizeChanger: false }}
                                        onRow={(record) => ({
                                            style: { cursor: 'pointer' },
                                            onClick: () => handleModalSelect(record), // 선택 시 처리
                                        })}
                                    />
                                )}
                            </>
                        )}

                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                            <Button onClick={handleModalCancel} variant="contained" type="danger" sx={{ mr: 1 }}>
                                닫기
                            </Button>
                        </Box>
                    </>
                )}
            </Modal>
        </Box>
    )
}

export default PendingVoucherInputPage