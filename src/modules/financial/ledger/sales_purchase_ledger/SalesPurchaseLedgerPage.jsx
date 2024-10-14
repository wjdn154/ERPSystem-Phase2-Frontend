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
                                                    notify('warning', '입력 오류', '모든 필드를 입력해 주세요.', 'bottomRight');
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

                                                    // 일계, 월계, 분기계, 반기계 데이터의 인덱스 변수들
                                                    let dailySummaryIndex = 0;
                                                    let monthlySummaryIndex = 0;
                                                    let quarterlySummaryIndex = 0;
                                                    let halfYearlySummaryIndex = 0;

                                                    const dailySummaries = searchData.dailySummaries;
                                                    const monthlySummaries = searchData.monthlySummaries;
                                                    const cumulativeSummaries = searchData.cumulativeSummaries;
                                                    const quarterlySummaries = searchData.quarterlySummaries;
                                                    const halfYearlySummaries = searchData.halfYearlySummaries;

                                                    const entries = searchData.salesAndPurChaseLedgerShowList;

                                                    let previousDate = null;
                                                    let previousMonth = null;
                                                    let previousQuarter = null;
                                                    let previousHalfYear = null;

                                                    entries.forEach((entry, index) => {
                                                        const currentDate = entry.voucherDate;
                                                        const currentMonth = currentDate.slice(0, 7); // 월 정보 (YYYY-MM)
                                                        const monthNumber = parseInt(currentDate.slice(5, 7), 10); // 월 숫자 (1 ~ 12)
                                                        const currentQuarter = Math.floor((monthNumber - 1) / 3) + 1; // 분기 계산
                                                        const currentHalfYear = monthNumber <= 6 ? 1 : 2; // 반기 계산

                                                        // 1. 날짜가 변경된 경우 일계 요약 추가
                                                        if (previousDate && currentDate !== previousDate) {
                                                            if (dailySummaryIndex < dailySummaries.length) {
                                                                const dailySummary = dailySummaries[dailySummaryIndex];
                                                                resultList.push({
                                                                    key: `dailyTotal-${index}`,
                                                                    vatTypeName: dailySummary.voucherCount + '건',
                                                                    voucherDate: '[일 계]',
                                                                    itemName: null,
                                                                    clientCode: null,
                                                                    clientName: null,
                                                                    supplyAmount: dailySummary.sumSupplyAmount,
                                                                    vatAmount: dailySummary.sumVatAmount,
                                                                    sumAmount: dailySummary.sumAmount,
                                                                    isSummary: true,
                                                                    isDailyTotal: true,
                                                                });
                                                                dailySummaryIndex++; // 다음 일계로 이동
                                                            }
                                                        }

                                                        // 2. 월이 변경된 경우 월계와 누계 요약 추가
                                                        if (previousMonth && currentMonth !== previousMonth) {
                                                            if (monthlySummaryIndex < monthlySummaries.length) {
                                                                const monthlySummary = monthlySummaries[monthlySummaryIndex];
                                                                resultList.push({
                                                                    key: `monthlyTotal-${index}`,
                                                                    vatTypeName: monthlySummary.voucherCount + '건',
                                                                    voucherDate: '[월 계]',
                                                                    itemName: null,
                                                                    clientCode: null,
                                                                    clientName: null,
                                                                    supplyAmount: monthlySummary.sumSupplyAmount,
                                                                    vatAmount: monthlySummary.sumVatAmount,
                                                                    sumAmount: monthlySummary.sumAmount,
                                                                    isSummary: true,
                                                                    isMonthlyTotal: true,
                                                                });
                                                                monthlySummaryIndex++; // 다음 월계로 이동
                                                            }

                                                            // 누계 요약 추가
                                                            if (monthlySummaryIndex < cumulativeSummaries.length) {
                                                                const cumulativeSummary = cumulativeSummaries[monthlySummaryIndex - 1]; // 해당 월 이후의 누계를 가져옴
                                                                resultList.push({
                                                                    key: `cumulativeTotal-${index}`,
                                                                    vatTypeName: cumulativeSummary.voucherCount + '건',
                                                                    voucherDate: '[누 계]',
                                                                    itemName: null,
                                                                    clientCode: null,
                                                                    clientName: null,
                                                                    supplyAmount: cumulativeSummary.cumulativeSupplyAmount,
                                                                    vatAmount: cumulativeSummary.cumulativeVatAmount,
                                                                    sumAmount: cumulativeSummary.cumulativeSumAmount,
                                                                    isSummary: true,
                                                                    isCumulativeTotal: true,
                                                                });
                                                            }
                                                        }

                                                        // 3. 분기가 변경된 경우 분기 요약 추가
                                                        if (previousQuarter && currentQuarter !== previousQuarter) {
                                                            if (quarterlySummaryIndex < quarterlySummaries.length) {
                                                                const quarterlySummary = quarterlySummaries[quarterlySummaryIndex];
                                                                resultList.push({
                                                                    key: `quarterlyTotal-${index}`,
                                                                    vatTypeName: quarterlySummary.voucherCount + '건',
                                                                    voucherDate: '[분기 계]',
                                                                    itemName: null,
                                                                    clientCode: null,
                                                                    clientName: null,
                                                                    supplyAmount: quarterlySummary.sumSupplyAmount,
                                                                    vatAmount: quarterlySummary.sumVatAmount,
                                                                    sumAmount: quarterlySummary.sumAmount,
                                                                    isSummary: true,
                                                                    isQuarterlyTotal: true,
                                                                });
                                                                quarterlySummaryIndex++; // 다음 분기로 이동
                                                            }
                                                        }

                                                        // 4. 반기가 변경된 경우 반기 요약 추가
                                                        if (previousHalfYear && currentHalfYear !== previousHalfYear) {
                                                            if (halfYearlySummaryIndex < halfYearlySummaries.length) {
                                                                const halfYearlySummary = halfYearlySummaries[halfYearlySummaryIndex];
                                                                resultList.push({
                                                                    key: `halfYearlyTotal-${index}`,
                                                                    vatTypeName: halfYearlySummary.voucherCount + '건',
                                                                    voucherDate: '[반기 계]',
                                                                    itemName: null,
                                                                    clientCode: null,
                                                                    clientName: null,
                                                                    supplyAmount: halfYearlySummary.sumSupplyAmount,
                                                                    vatAmount: halfYearlySummary.sumVatAmount,
                                                                    sumAmount: halfYearlySummary.sumAmount,
                                                                    isSummary: true,
                                                                    isHalfYearlyTotal: true,
                                                                });
                                                                halfYearlySummaryIndex++; // 다음 반기로 이동
                                                            }
                                                        }

                                                        // 현재 거래 데이터를 추가
                                                        const dayEntry = {
                                                            ...entry,
                                                            key: `voucher-${entry.voucherId}`,
                                                            isPreviousBalance: false,
                                                            isSummary: false,
                                                        };
                                                        resultList.push(dayEntry);

                                                        // 이전 날짜, 월, 분기, 반기를 업데이트
                                                        previousDate = currentDate;
                                                        previousMonth = currentMonth;
                                                        previousQuarter = currentQuarter;
                                                        previousHalfYear = currentHalfYear;
                                                    });

                                                    // 마지막 일계, 월계, 분기계, 반기계를 추가하는 로직
                                                    if (dailySummaryIndex < dailySummaries.length) {
                                                        const dailySummary = dailySummaries[dailySummaryIndex];
                                                        resultList.push({
                                                            key: `dailyTotal-final`,
                                                            vatTypeName: dailySummary.voucherCount + '건',
                                                            voucherDate: '[일 계]',
                                                            itemName: null,
                                                            clientCode: null,
                                                            clientName: null,
                                                            supplyAmount: dailySummary.sumSupplyAmount,
                                                            vatAmount: dailySummary.sumVatAmount,
                                                            sumAmount: dailySummary.sumAmount,
                                                            isSummary: true,
                                                            isDailyTotal: true,
                                                        });
                                                    }

                                                    if (monthlySummaryIndex < monthlySummaries.length) {
                                                        const monthlySummary = monthlySummaries[monthlySummaryIndex];
                                                        resultList.push({
                                                            key: `monthlyTotal-final`,
                                                            vatTypeName: monthlySummary.voucherCount + '건',
                                                            voucherDate: '[월 계]',
                                                            itemName: null,
                                                            clientCode: null,
                                                            clientName: null,
                                                            supplyAmount: monthlySummary.sumSupplyAmount,
                                                            vatAmount: monthlySummary.sumVatAmount,
                                                            sumAmount: monthlySummary.sumAmount,
                                                            isSummary: true,
                                                            isMonthlyTotal: true,
                                                        });
                                                    }

                                                    if (monthlySummaryIndex < cumulativeSummaries.length) {
                                                        const cumulativeSummary = cumulativeSummaries[monthlySummaryIndex]; // 해당 월 이후의 누계를 가져옴
                                                        resultList.push({
                                                            key: `cumulativeTotal-final`,
                                                            vatTypeName: cumulativeSummary.voucherCount + '건',
                                                            voucherDate: '[누 계]',
                                                            itemName: null,
                                                            clientCode: null,
                                                            clientName: null,
                                                            supplyAmount: cumulativeSummary.sumSupplyAmount,
                                                            vatAmount: cumulativeSummary.sumVatAmount,
                                                            sumAmount: cumulativeSummary.sumAmount,
                                                            isSummary: true,
                                                            isCumulativeTotal: true,
                                                        });
                                                    }

                                                    if (quarterlySummaryIndex < quarterlySummaries.length) {
                                                        const quarterlySummary = quarterlySummaries[quarterlySummaryIndex];
                                                        resultList.push({
                                                            key: `quarterlyTotal-final`,
                                                            vatTypeName: quarterlySummary.voucherCount + '건',
                                                            voucherDate: '[분기 계]',
                                                            itemName: null,
                                                            clientCode: null,
                                                            clientName: null,
                                                            supplyAmount: quarterlySummary.sumSupplyAmount,
                                                            vatAmount: quarterlySummary.sumVatAmount,
                                                            sumAmount: quarterlySummary.sumAmount,
                                                            isSummary: true,
                                                            isQuarterlyTotal: true,
                                                        });
                                                    }

                                                    if (halfYearlySummaryIndex < halfYearlySummaries.length) {
                                                        const halfYearlySummary = halfYearlySummaries[halfYearlySummaryIndex];
                                                        resultList.push({
                                                            key: `halfYearlyTotal-final`,
                                                            vatTypeName: halfYearlySummary.voucherCount + '건',
                                                            voucherDate: '[반기 계]',
                                                            itemName: null,
                                                            clientCode: null,
                                                            clientName: null,
                                                            supplyAmount: halfYearlySummary.sumSupplyAmount,
                                                            vatAmount: halfYearlySummary.sumVatAmount,
                                                            sumAmount: halfYearlySummary.sumAmount,
                                                            isSummary: true,
                                                            isHalfYearlyTotal: true,
                                                        });
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