import React, { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import axios from 'axios';
import AccountSubjectDetail from '../../financial/components/AccountSubjectDetail.jsx';  // 컴포넌트를 가져옵니다

function MainContent({ selectedSubMenu }) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('서브 메뉴가 변경되었습니다:', selectedSubMenu);
        if (selectedSubMenu === '계정과목및적요등록') {
            axios.post('http://localhost:8080/api/financial/accountSubjects', {
            })
                .then(response => {
                    console.log('API 응답:', response.data);
                    setData(response.data); // 응답 데이터 저장
                })
                .catch(error => {
                    setError('데이터를 가져오는 데 실패했습니다.');
                    console.error('There was an error fetching the data!', error);
                });
        }
    }, [selectedSubMenu]);

    return (
        <Box sx={{ backgroundColor: '#ffffff', marginLeft: '100px', padding: '20px', borderRadius: '8px', height: '80vh', overflow: 'auto' }}>
            <Typography variant="h4" gutterBottom>
                {selectedSubMenu || '메인 컨텐츠'}
            </Typography>
            {error && (
                <Typography color="error" gutterBottom>
                    {error}
                </Typography>
            )}
            {data ? (
                <AccountSubjectDetail data={data} />  // 데이터를 컴포넌트에 전달하여 렌더링합니다
            ) : (
                <Typography>
                    {selectedSubMenu ? `선택된 서브 메뉴: ${selectedSubMenu}` : '서브 메뉴를 선택하세요.'}
                </Typography>
            )}
        </Box>
    );
}

export default MainContent;