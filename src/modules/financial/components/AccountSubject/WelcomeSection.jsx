import React, { useState } from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { Tabs } from 'antd';

const WelcomeSection = ({ handleTabChange, activeTabKey }) => {


    // Tabs items 정의
    const tabItems = [
        {
            key: '1',
            label: '계정과목 목록 및 상세 내용',
            children: <Typography>재무회계에서 사용되는 모든 계정과목을 리스트 형태로 보여주는 부분으로, 기업의 모든 거래 및 재무 데이터를 분류하고 관리하는 데 필수적인 역할을 함.</Typography>, // 탭 클릭 시 보여질 내용
        },
        {
            key: '2',
            label: '계정과목 체계',
            children: <Typography>회사의 재무 기록을 체계적으로 분류하고 관리하기 위해 사용되는 구조적 체계임.</Typography>,
        },
    ];

    return (
        <div style={{ padding: '20px' }}>
            {/* 제목 부분 */}
            <Typography sx={{ color: '#CFDFE1' }} variant="h4" component="h1">
                계정과목 및 적요등록
            </Typography>

            {/* 환영 메시지 및 설명 */}
            <Box sx={{ color: '#CFDFE1', display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Box>
                    <Typography variant="body1">
                        계정과목 및 적요 등록 페이지는 재무 관리 시스템에서{' '}
                        <span style={{ color: '#00C1D8' }}>계정과목과 적요</span>
                        (거래의 내역이나 설명)를 <span style={{ color: '#00C1D8' }}>관리하고 등록</span>하는 중요한 기능을 제공하는 페이지임.
                        <br />
                        이 페이지는 기업의 재무 데이터를 정확하게 기록하고 관리하는 데 필수적인 역할을 함.
                    </Typography>
                </Box>
            </Box>

            <Divider sx={{ marginTop: '20px' }}/>

            <Box sx={{ mt: 3 }}>
                {/* 탭 네비게이션 */}
                <Tabs activeKey={activeTabKey} onChange={handleTabChange} items={tabItems} />
            </Box>
        </div>
    );
};

export default WelcomeSection;