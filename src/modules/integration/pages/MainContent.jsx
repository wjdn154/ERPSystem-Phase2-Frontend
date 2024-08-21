import React, { useEffect, useState } from 'react';
import { Typography, Box, Skeleton, Stack } from '@mui/material';
import axios from 'axios';
import AccountSubjectDetail from '../../financial/components/AccountSubjectDetail2.jsx';  // 컴포넌트를 가져옴

const baseUrl = 'http://localhost:8080/api';  // API 기본 URL

function MainContent({ selectedSubSubMenu }) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let apiEndpoint = null;

        switch (selectedSubSubMenu) {
            case '계정과목및적요등록':
                apiEndpoint = `${baseUrl}/financial/accountSubjects`;
                break;
            case '다른메뉴':
                apiEndpoint = `${baseUrl}/anotherEndpoint`;
                break;
            // 추가 케이스들
            default:
                apiEndpoint = null;
        }

        if (apiEndpoint) {
            setLoading(true);  // 로딩 시작
            axios.post(apiEndpoint)
                .then(response => {
                    setData(response.data);
                    setError(null);
                })
                .catch(err => {
                    setError('데이터를 가져오는 데 실패했습니다.');
                    console.error('There was an error fetching the data!', err);
                    setData(null);
                })
                .finally(() => setLoading(false));  // 로딩 종료
        } else {
            setData(null);
            setError(null);
        }
    }, [selectedSubSubMenu]);

    // Skeleton UI를 렌더링하는 내부 함수
    const renderSkeleton = () => {
        return (
            <Box sx={{ width: '58vw', padding: '20px' }}>
                <Skeleton variant="text" width="30%" height={40} sx={{ bgcolor: 'grey.100', marginBottom: 2 }} animation="wave" />

                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                    <Skeleton variant="circular" width={50} height={50} sx={{ bgcolor: 'grey.200' }} animation="wave" />
                    <Skeleton variant="text" width="60%" height={40} sx={{ bgcolor: 'grey.100', marginLeft: 2 }} animation="wave" />
                </Box>

                {[...Array(3)].map((_, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                        <Skeleton variant="rectangular" width={90} height={90} sx={{ bgcolor: 'grey.300', marginRight: 2 }} animation="wave" />
                        <Box sx={{ width: '100%' }}>
                            <Skeleton variant="text" width="90%" height={30} sx={{ bgcolor: 'grey.200', marginBottom: 1 }} animation="wave" />
                            <Skeleton variant="text" width="80%" height={30} sx={{ bgcolor: 'grey.200', marginBottom: 1 }} animation="wave" />
                            <Skeleton variant="text" width="50%" height={30} sx={{ bgcolor: 'grey.200' }} animation="wave" />
                        </Box>
                    </Box>
                ))}

                <Skeleton sx={{ bgcolor: 'grey.200', marginBottom: 2 }} variant="rectangular" width="100%" height={20} animation="wave" />
                <Skeleton sx={{ bgcolor: 'grey.200' }} variant="rectangular" width="100%" height={20} animation="wave" />
            </Box>
        );
    };

    return (
        <Box >
            {loading ? (
                renderSkeleton()  // 로딩 중일 때 Skeleton UI 표시
            ) : error ? (
                <Typography color="error" gutterBottom>
                    {error}
                </Typography>
            ) : (
                <AccountSubjectDetail data={data} />  // 데이터를 컴포넌트에 전달하여 렌더링
            )}
        </Box>
    );
}

export default MainContent;