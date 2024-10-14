import React, {useMemo, useState} from 'react';
import {Box, Grid, Grow, Paper} from '@mui/material';
import WelcomeSection from '../../../../components/WelcomeSection.jsx';
import { tabItems } from './SalesPurchaseLedgerUtil.jsx';
import {Typography} from '@mui/material';
import {Table, Button, DatePicker, Tag} from 'antd';
import TemporarySection from "../../../../components/TemporarySection.jsx";
import {useNotificationContext} from "../../../../config/NotificationContext.jsx";
import dayjs from "dayjs";
import apiClient from "../../../../config/apiClient.jsx";
import {FINANCIAL_API} from "../../../../config/apiConstants.jsx";
import { Tooltip } from 'antd';
const { RangePicker } = DatePicker;

const SalesPurchaseLedgerPage = () => {
    const notify = useNotificationContext();
    const [activeTabKey, setActiveTabKey] = useState('1');
    const [searchData, setSearchData] = useState(null);
    const [searchParams, setSearchParams] = useState({
        startDate: null,
        endDate: null,
    });

    const handleTabChange = (key) => {
        setActiveTabKey(key);
    };

    return (
        <Box sx={{ margin: '20px' }}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <WelcomeSection
                        title="매입매출장"
                        description={(
                            <Typography>
                                매입매출장 페이지는 기업의 <span>매입 및 매출 내역을 종합적으로 관리</span>하는 페이지임. 이 페이지를 통해 기업의 <span>총 매출, 매입 내역</span>을 파악하고, 각 거래의 세부 내용을 확인할 수 있음. 이를 통해 <span>재고 관리 및 구매, 판매 내역</span>을 체계적으로 관리 가능함.<br/>
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
                    <Grid item xs={12} md={12} sx={{ minWidth: '1450px' }}>
                        <Grow in={true} timeout={200}>
                            <Paper elevation={3} sx={{ height: '100%' }}>
                                <Typography variant="h6" sx={{ padding: '20px' }} >매입매출장 조회</Typography>
                                <Grid sx={{ padding: '0px 20px 20px 20px' }}>
                                    <Grid sx={{ marginTop: '20px', marginBottom: '20px' }}>
                                        <RangePicker
                                            disabledDate={(current) => current && current.year() !== 2024}
                                            onChange={ (dates) => {
                                                    if (dates) {
                                                        setSearchParams({
                                                            ...searchParams,
                                                            startDate: dates[0].format('YYYY-MM-DD'),
                                                            endDate: dates[1].format('YYYY-MM-DD'),
                                                        });
                                                    }
                                                }
                                            }
                                            style={{ marginRight: '10px' }}
                                            defaultValue={[
                                                searchParams.startDate ? dayjs(searchParams.startDate, 'YYYY-MM-DD') : null,
                                                searchParams.endDate ? dayjs(searchParams.endDate, 'YYYY-MM-DD') : null,
                                            ]}
                                            format="YYYY-MM-DD"
                                        />
                                        <Button type="primary" onClick={async () => {
                                                const { startDate, endDate } = searchParams;
                                                // 입력값 검증
                                                if (!startDate || !endDate) {
                                                    notify('warning', '입력 오류', '모든 필드를 입력해 주세요.', 'bottomLeft');
                                                    return;
                                                }

                                                try {
                                                    const response = await apiClient.post(FINANCIAL_API.PURCHASE_SALES_LEDGER_API, searchParams);
                                                    const data = response.data;
                                                    console.log(data);
                                                    setSearchData(data);
                                                } catch (error) {
                                                    notify('error', '조회 오류', '매입매출장 조회 중 오류가 발생했습니다.', 'top');
                                                }
                                            }
                                        } >
                                            검색
                                        </Button>
                                    </Grid>
                                    <Table
                                        dataSource={
                                            searchData
                                                ? (() => {
                                                    const resultList = [];

                                                    let previousDate = null; // 이전 날짜를 저장하는 변수
                                                    let previousMonth = null; // 이전 월을 저장하는 변수
                                                    let previousQuarter = null; // 이전 분기를 저장하는 변수
                                                    let previousHalfYear = null; // 이전 반기를 저장하는 변수

                                                    // 일계에 대한 누적 값들을 저장하는 변수들
                                                    let dailyVoucherCount = 0;
                                                    let dailySupplyAmount = 0;
                                                    let dailyVatAmount = 0;
                                                    let dailySumAmount = 0;

                                                    // 월계에 대한 누적 값들을 저장하는 변수들
                                                    let monthlyVoucherCount = 0;
                                                    let monthlySupplyAmount = 0;
                                                    let monthlyVatAmount = 0;
                                                    let monthlySumAmount = 0;

                                                    // 누계에 대한 누적 값들을 저장하는 변수들
                                                    let cumulativeVoucherCount = 0;
                                                    let cumulativeSupplyAmount = 0;
                                                    let cumulativeVatAmount = 0;
                                                    let cumulativeSumAmount = 0;

                                                    // 분기에 대한 누적 값들을 저장하는 변수들
                                                    let quarterlyVoucherCount = 0;
                                                    let quarterlySupplyAmount = 0;
                                                    let quarterlyVatAmount = 0;
                                                    let quarterlySumAmount = 0;

                                                    // 반기에 대한 누적 값들을 저장하는 변수들
                                                    let halfYearlyVoucherCount = 0;
                                                    let halfYearlySupplyAmount = 0;
                                                    let halfYearlyVatAmount = 0;
                                                    let halfYearlySumAmount = 0;

                                                    const entries = searchData.salesAndPurChaseLedgerShowList; // 처리할 거래 목록

                                                    // 거래 목록을 순회하며 처리
                                                    entries.forEach((entry, index) => {
                                                        const currentDate = entry.voucherDate; // 현재 거래의 날짜
                                                        const currentMonth = currentDate.slice(0, 7); // 현재 거래의 월 정보 (YYYY-MM)
                                                        const monthNumber = parseInt(currentDate.slice(5, 7), 10); // 현재 거래의 월 숫자 (1 ~ 12)
                                                        const currentQuarter = Math.floor((monthNumber - 1) / 3) + 1; // 현재 분기 계산
                                                        const currentHalfYear = monthNumber <= 6 ? 1 : 2; // 현재 반기 계산

                                                        // 날짜가 변경되었을 경우, 일계 데이터를 추가
                                                        if (previousDate && currentDate !== previousDate) {
                                                            const dailyTotal = {
                                                                key: `dailyTotal-${index}`,
                                                                vatTypeName: dailyVoucherCount + '건', // 일계의 거래 건수
                                                                voucherDate: '[일 계]', // 일계를 나타내는 특수 표기
                                                                itemName: null,
                                                                clientCode: null,
                                                                clientName: null,
                                                                supplyAmount: dailySupplyAmount, // 공급가액 합계
                                                                vatAmount: dailyVatAmount, // 세액 합계
                                                                sumAmount: dailySumAmount, // 총액 합계
                                                                isSummary: true, // 요약 데이터임을 나타냄
                                                                isDailyTotal: true, // 일계임을 나타냄
                                                            };
                                                            resultList.push(dailyTotal);

                                                            // 일계의 누적 값을 초기화
                                                            dailyVoucherCount = 0;
                                                            dailySupplyAmount = 0;
                                                            dailyVatAmount = 0;
                                                            dailySumAmount = 0;
                                                        }

                                                        // 월이 변경되었을 경우, 월계와 누계 데이터를 추가
                                                        if (previousMonth && currentMonth !== previousMonth) {
                                                            const monthlyTotal = {
                                                                key: `monthlyTotal-${index}`,
                                                                vatTypeName: monthlyVoucherCount + '건', // 월계의 거래 건수
                                                                voucherDate: '[월 계]', // 월계를 나타내는 특수 표기
                                                                itemName: null,
                                                                clientCode: null,
                                                                clientName: null,
                                                                supplyAmount: monthlySupplyAmount, // 월계 공급가액 합계
                                                                vatAmount: monthlyVatAmount, // 월계 세액 합계
                                                                sumAmount: monthlySumAmount, // 월계 총액 합계
                                                                isSummary: true,
                                                                isMonthlyTotal: true,
                                                            };
                                                            resultList.push(monthlyTotal);

                                                            // 누계 데이터를 추가
                                                            const cumulativeTotal = {
                                                                key: `cumulativeTotal-${index}`,
                                                                vatTypeName: cumulativeVoucherCount + '건', // 누계의 거래 건수
                                                                voucherDate: '[누 계]', // 누계를 나타내는 특수 표기
                                                                itemName: null,
                                                                clientCode: null,
                                                                clientName: null,
                                                                supplyAmount: cumulativeSupplyAmount, // 누계 공급가액 합계
                                                                vatAmount: cumulativeVatAmount, // 누계 세액 합계
                                                                sumAmount: cumulativeSumAmount, // 누계 총액 합계
                                                                isSummary: true,
                                                                isCumulativeTotal: true,
                                                            };
                                                            resultList.push(cumulativeTotal);

                                                            // 월계의 누적 값을 초기화
                                                            monthlyVoucherCount = 0;
                                                            monthlySupplyAmount = 0;
                                                            monthlyVatAmount = 0;
                                                            monthlySumAmount = 0;
                                                        }

                                                        // 분기가 변경되었을 경우, 분기 데이터를 추가
                                                        if (previousQuarter && currentQuarter !== previousQuarter) {
                                                            const quarterlyTotal = {
                                                                key: `quarterlyTotal-${index}`,
                                                                vatTypeName: quarterlyVoucherCount + '건', // 분기의 거래 건수
                                                                voucherDate: '[분기 계]', // 분기를 나타내는 특수 표기
                                                                itemName: null,
                                                                clientCode: null,
                                                                clientName: null,
                                                                supplyAmount: quarterlySupplyAmount, // 분기 공급가액 합계
                                                                vatAmount: quarterlyVatAmount, // 분기 세액 합계
                                                                sumAmount: quarterlySumAmount, // 분기 총액 합계
                                                                isSummary: true,
                                                                isQuarterlyTotal: true,
                                                            };
                                                            resultList.push(quarterlyTotal);

                                                            // 분기의 누적 값을 초기화
                                                            quarterlyVoucherCount = 0;
                                                            quarterlySupplyAmount = 0;
                                                            quarterlyVatAmount = 0;
                                                            quarterlySumAmount = 0;
                                                        }

                                                        // 반기가 변경되었을 경우, 반기 데이터를 추가
                                                        if (previousHalfYear && currentHalfYear !== previousHalfYear) {
                                                            const halfYearlyTotal = {
                                                                key: `halfYearlyTotal-${index}`,
                                                                vatTypeName: halfYearlyVoucherCount + '건', // 반기의 거래 건수
                                                                voucherDate: '[반기 계]', // 반기를 나타내는 특수 표기
                                                                itemName: null,
                                                                clientCode: null,
                                                                clientName: null,
                                                                supplyAmount: halfYearlySupplyAmount, // 반기 공급가액 합계
                                                                vatAmount: halfYearlyVatAmount, // 반기 세액 합계
                                                                sumAmount: halfYearlySumAmount, // 반기 총액 합계
                                                                isSummary: true,
                                                                isHalfYearlyTotal: true,
                                                            };
                                                            resultList.push(halfYearlyTotal);

                                                            // 반기의 누적 값을 초기화
                                                            halfYearlyVoucherCount = 0;
                                                            halfYearlySupplyAmount = 0;
                                                            halfYearlyVatAmount = 0;
                                                            halfYearlySumAmount = 0;
                                                        }

                                                        // 현재 거래 데이터를 resultList에 추가
                                                        const dayEntry = {
                                                            ...entry,
                                                            key: `voucher-${entry.voucherId}`,
                                                            isPreviousBalance: false,
                                                            isSummary: false,
                                                        };
                                                        resultList.push(dayEntry);

                                                        // 누적 값을 업데이트
                                                        dailyVoucherCount += 1;
                                                        dailySupplyAmount += entry.supplyAmount;
                                                        dailyVatAmount += entry.vatAmount;
                                                        dailySumAmount += entry.sumAmount;

                                                        monthlyVoucherCount += 1;
                                                        monthlySupplyAmount += entry.supplyAmount;
                                                        monthlyVatAmount += entry.vatAmount;
                                                        monthlySumAmount += entry.sumAmount;

                                                        cumulativeVoucherCount += 1;
                                                        cumulativeSupplyAmount += entry.supplyAmount;
                                                        cumulativeVatAmount += entry.vatAmount;
                                                        cumulativeSumAmount += entry.sumAmount;

                                                        quarterlyVoucherCount += 1;
                                                        quarterlySupplyAmount += entry.supplyAmount;
                                                        quarterlyVatAmount += entry.vatAmount;
                                                        quarterlySumAmount += entry.sumAmount;

                                                        halfYearlyVoucherCount += 1;
                                                        halfYearlySupplyAmount += entry.supplyAmount;
                                                        halfYearlyVatAmount += entry.vatAmount;
                                                        halfYearlySumAmount += entry.sumAmount;

                                                        // 이전 날짜, 월, 분기, 반기를 업데이트
                                                        previousDate = currentDate;
                                                        previousMonth = currentMonth;
                                                        previousQuarter = currentQuarter;
                                                        previousHalfYear = currentHalfYear;
                                                    });

                                                    // 마지막 날짜에 대한 일계 데이터 추가
                                                    if (dailyVoucherCount > 0) {
                                                        const dailyTotal = {
                                                            key: `dailyTotal-final`,
                                                            vatTypeName: dailyVoucherCount + '건',
                                                            voucherDate: '[일 계]',
                                                            itemName: null,
                                                            clientCode: null,
                                                            clientName: null,
                                                            supplyAmount: dailySupplyAmount,
                                                            vatAmount: dailyVatAmount,
                                                            sumAmount: dailySumAmount,
                                                            isSummary: true,
                                                            isDailyTotal: true,
                                                        };
                                                        resultList.push(dailyTotal);
                                                    }

                                                    // 마지막 월에 대한 월계 데이터 추가
                                                    if (monthlyVoucherCount > 0) {
                                                        const monthlyTotal = {
                                                            key: `monthlyTotal-final`,
                                                            vatTypeName: monthlyVoucherCount + '건',
                                                            voucherDate: '[월 계]',
                                                            itemName: null,
                                                            clientCode: null,
                                                            clientName: null,
                                                            supplyAmount: monthlySupplyAmount,
                                                            vatAmount: monthlyVatAmount,
                                                            sumAmount: monthlySumAmount,
                                                            isSummary: true,
                                                            isMonthlyTotal: true,
                                                        };
                                                        resultList.push(monthlyTotal);

                                                        const cumulativeTotal = {
                                                            key: `cumulativeTotal-final`,
                                                            vatTypeName: cumulativeVoucherCount + '건',
                                                            voucherDate: '[누 계]',
                                                            itemName: null,
                                                            clientCode: null,
                                                            clientName: null,
                                                            supplyAmount: cumulativeSupplyAmount,
                                                            vatAmount: cumulativeVatAmount,
                                                            sumAmount: cumulativeSumAmount,
                                                            isSummary: true,
                                                            isCumulativeTotal: true,
                                                        };
                                                        resultList.push(cumulativeTotal);
                                                    }

                                                    // 마지막 분기에 대한 분기 데이터 추가
                                                    if (quarterlyVoucherCount > 0) {
                                                        const quarterlyTotal = {
                                                            key: `quarterlyTotal-final`,
                                                            vatTypeName: quarterlyVoucherCount + '건',
                                                            voucherDate: '[분기 계]',
                                                            itemName: null,
                                                            clientCode: null,
                                                            clientName: null,
                                                            supplyAmount: quarterlySupplyAmount,
                                                            vatAmount: quarterlyVatAmount,
                                                            sumAmount: quarterlySumAmount,
                                                            isSummary: true,
                                                            isQuarterlyTotal: true,
                                                        };
                                                        resultList.push(quarterlyTotal);
                                                    }

                                                    // 마지막 반기에 대한 반기 데이터 추가
                                                    if (halfYearlyVoucherCount > 0) {
                                                        const halfYearlyTotal = {
                                                            key: `halfYearlyTotal-final`,
                                                            vatTypeName: halfYearlyVoucherCount + '건',
                                                            voucherDate: '[반기 계]',
                                                            itemName: null,
                                                            clientCode: null,
                                                            clientName: null,
                                                            supplyAmount: halfYearlySupplyAmount,
                                                            vatAmount: halfYearlyVatAmount,
                                                            sumAmount: halfYearlySumAmount,
                                                            isSummary: true,
                                                            isHalfYearlyTotal: true,
                                                        };
                                                        resultList.push(halfYearlyTotal);
                                                    }

                                                    return resultList;
                                                })()
                                                : []
                                        }
                                        columns={[
                                            {
                                                title: '과세유형',
                                                dataIndex: 'vatTypeName',
                                                key: 'vatTypeName',
                                                align: 'center',
                                                render: (text, record) => record.isSummary ? (
                                                    <span style={{ fontSize: '0.7rem' }}>{text}</span>
                                                ) : (
                                                    <span style={{ fontSize: '0.9rem' }}>{text}</span>
                                                ),
                                            },
                                            {
                                                title: '일자',
                                                dataIndex: 'voucherDate',
                                                key: 'voucherDate',
                                                align: 'center',
                                                render: (text, record) => record.isSummary ? (
                                                    <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>{text}</span>
                                                ) : (
                                                    <span style={{ fontSize: '0.9rem' }}>{new Date(text).toLocaleDateString()}</span>
                                                ),
                                            },
                                            {
                                                title: '품목',
                                                dataIndex: 'itemName',
                                                key: 'itemName',
                                                align: 'center',
                                                render: (text) => text ? <span style={{ fontSize: '0.9rem' }}>{text}</span> : '',
                                            },
                                            {
                                                title: '공급가액',
                                                dataIndex: 'supplyAmount',
                                                key: 'supplyAmount',
                                                align: 'center',
                                                render: (text, record) => record.isSummary ? (
                                                    <span style={{ fontSize: '1rem', fontWeight: 500 }}>{Number(text).toLocaleString()}</span>
                                                ) : (
                                                    <span style={{ fontSize: '0.9rem' }}>{Number(text).toLocaleString()}</span>
                                                ),
                                            },
                                            {
                                                title: '부가세',
                                                dataIndex: 'vatAmount',
                                                key: 'vatAmount',
                                                align: 'center',
                                                render: (text, record) => record.isSummary ? (
                                                    <span style={{ fontSize: '1rem', fontWeight: 500 }}>{Number(text).toLocaleString()}</span>
                                                ) : (
                                                    <span style={{ fontSize: '0.9rem' }}>{Number(text).toLocaleString()}</span>
                                                ),
                                            },
                                            {
                                                title: '합계',
                                                dataIndex: 'sumAmount',
                                                key: 'sumAmount',
                                                align: 'center',
                                                render: (text, record) => record.isSummary ? (
                                                    <span style={{ fontSize: '1rem', fontWeight: 500 }}>{Number(text).toLocaleString()}</span>
                                                ) : (
                                                    <span style={{ fontSize: '0.9rem' }}>{Number(text).toLocaleString()}</span>
                                                ),
                                            },
                                            {
                                                title: '거래처',
                                                dataIndex: 'clientCode',
                                                key: 'clientCode',
                                                align: 'center',
                                                render: (text, record) => text ? <span style={{ fontSize: '0.9rem' }}>[{text}] {record.clientName} </span> : '',
                                            },
                                            {
                                                title: '전자',
                                                dataIndex: 'electronicTaxInvoiceStatus',
                                                key: 'electronicTaxInvoiceStatus',
                                                align: 'center',
                                                render: (text, record) => {
                                                    if (!text) return '';
                                                    let color, value, tooltipText;
                                                    switch (text) {
                                                        case 'PUBLISHED':
                                                            color = 'green';
                                                            value = '발행';
                                                            tooltipText = '세금 계산서가 발행되었습니다.';
                                                            break;
                                                        case 'UNPUBLISHED':
                                                            color = 'red';
                                                            value = '미발행';
                                                            tooltipText = '세금 계산서가 아직 발행되지 않았습니다.';
                                                            break;
                                                        default:
                                                            color = 'gray';
                                                            value = text;
                                                            tooltipText = '상태 정보 없음';
                                                    }
                                                    return (
                                                        <Tooltip title={tooltipText}>
                                                            <Tag color={color} style={{ cursor: 'pointer' }}>{value}</Tag>
                                                        </Tooltip>
                                                    );
                                                }
                                            },
                                            {
                                                title: '분개유형',
                                                dataIndex: 'journalEntryName',
                                                key: 'journalEntryName',
                                                align: 'center',
                                                render: (text) => text ? <span style={{ fontSize: '0.9rem' }}>{text}</span> : '',
                                            },
                                            {
                                                title: '계정과목',
                                                dataIndex: 'accountSubjectCode',
                                                key: 'accountSubjectCode',
                                                align: 'center',
                                                render: (text, record) => text ? <span style={{ fontSize: '0.9rem' }}>[{text}] {record.accountSubjectName}</span> : '',
                                            },
                                            {
                                                title: '담당자',
                                                dataIndex: 'voucherManagerCode',
                                                key: 'voucherManagerCode',
                                                align: 'center',
                                                render: (text, record) => text ? <span style={{ fontSize: '0.9rem' }}>[{text}] {record.voucherManagerName}</span> : '',
                                            },
                                            {
                                                title: '담당부서',
                                                dataIndex: 'voucherManagerDepartmentName',
                                                key: 'voucherManagerDepartmentName',
                                                align: 'center',
                                                render: (text) => text ? (() => {
                                                    let color;
                                                    let value;
                                                    switch (text) {
                                                        case '재무부':
                                                            color = 'red';
                                                            value = '재무';
                                                            break;
                                                        case '인사부':
                                                            color = 'green';
                                                            value = '인사';
                                                            break;
                                                        case '생산부':
                                                            color = 'blue';
                                                            value = '생산';
                                                            break;
                                                        case '물류부':
                                                            color = 'orange';
                                                            value = '물류';
                                                            break;
                                                        default:
                                                            color = 'gray';
                                                    }
                                                    return <Tag style={{ marginLeft: '5px' }} color={color}>{value}</Tag>;
                                                })() : '',
                                            },
                                        ]}
                                        rowKey="key"
                                        pagination={false}
                                        size={'small'}
                                        rowClassName={(record) => {
                                            if (record.isSummary) return 'summary-row';
                                            return '';
                                        }}
                                    />

                                </Grid>
                            </Paper>
                        </Grow>
                    </Grid>
                </Grid>
            )}

            {activeTabKey === '2' && (
                <Grid sx={{ padding: '0px 20px 0px 20px' }} container spacing={3}>
                    <Grid item xs={12} md={5} sx={{ minWidth: '500px !important', maxWidth: '700px !important' }}>
                        <Grow in={true} timeout={200}>
                            <div>
                                <TemporarySection />
                            </div>
                        </Grow>
                    </Grid>
                </Grid>
            )}

        </Box>
    );
};

export default SalesPurchaseLedgerPage;