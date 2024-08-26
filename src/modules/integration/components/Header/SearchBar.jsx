
import React from 'react';
import { Box, InputBase, IconButton, Typography } from '@mui/material'; // Material-UI의 컴포넌트들 가져옴
import SearchIcon from '@mui/icons-material/Search'; // 검색 아이콘 가져옴
import SettingsIcon from '@mui/icons-material/Settings'; // 설정 아이콘 가져옴 (사용되지 않음, 필요 시 제거 가능)

function SearchBar() {
    return (
        // Box 컴포넌트로 검색바 전체를 감싸고, flexbox 레이아웃을 사용해 아이템들을 수평으로 배치
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* 검색 아이콘 */}
            <SearchIcon sx={{ marginLeft: '10px', marginRight: '20px' }} /> {/* 좌우에 마진을 추가해 위치 조정 */}

            {/* 입력 필드 */}
            <InputBase
                placeholder="검색"  // 입력 필드에 기본으로 표시되는 텍스트
                sx={{ flexGrow: 1 }} // flexGrow: 1을 설정해 입력 필드가 가능한 공간을 모두 차지하도록 함
            />
        </Box>
    );
}

export default SearchBar;