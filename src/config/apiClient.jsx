import axios from 'axios';
import { COMMON_API } from './apiConstants.jsx'; // API 경로 상수
import Cookies from 'js-cookie';

// Axios 인스턴스 생성
const apiClient = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
});

// 요청 인터셉터 설정 (모든 요청에 JWT 토큰 추가)
apiClient.interceptors.request.use((config) => {
    const token = Cookies.get('jwt');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`; // JWT 토큰을 헤더에 추가
    }

    return config;
}, (error) => Promise.reject(error)); // 에러 처리

// 응답 인터셉터 설정 (403 에러 발생 시 리프레시 토큰을 사용하여 액세스 토큰 갱신)
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // 403 에러 발생 시 리프레시 토큰을 사용하여 재시도
        if (error.response && error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true; // 리프레시 시도 중인지 플래그 설정

            console.log('액세스 토큰 만료. 리프레시 토큰으로 재시도')
            const refreshToken = Cookies.get('refreshToken'); // 리프레시 토큰 가져오기

            if (!refreshToken) {
                console.log('리프레시 토큰이 없음. 로그아웃 필요');
                return Promise.reject(error);
            }

            try {
                // 리프레시 토큰으로 새로운 액세스 토큰 요청
                const res = await axios.post(COMMON_API.REFRESH_TOKEN_API, { refreshToken });

                if (res.status === 200) {
                    const newToken = res.data.token;

                    if (!newToken) {
                        console.log('새 액세스 토큰이 없음. 로그아웃 필요');
                        return Promise.reject(error);
                    }

                    // 새 JWT 토큰을 쿠키에 저장
                    Cookies.set('jwt', newToken);

                    // 원래 요청에 새로운 토큰을 추가하고 재시도
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    return apiClient(originalRequest);
                }
            } catch (refreshError) {
                console.log('리프레시 토큰 요청 에러:', refreshError);
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error); // 그 외 에러 처리
    }
);

export default apiClient;