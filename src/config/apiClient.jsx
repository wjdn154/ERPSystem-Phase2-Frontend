import axios from 'axios';

// Axios 인스턴스 생성
const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// 요청 인터셉터 설정 (모든 API 호출에 대해 적용)
apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('accessToken');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

// 응답 인터셉터 설정 (403 에러 시 토큰 갱신)
apiClient.interceptors.response.use(response => {
    return response;
}, async (error) => {
    const originalRequest = error.config;

    // 토큰 만료로 403 에러가 발생했을 경우
    if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;

        // 리프레시 토큰을 사용하여 새로운 액세스 토큰을 요청
        const refreshToken = localStorage.getItem('refreshToken');
        const res = await axios.post('http://localhost:8080/api/auth/refresh-token', { token: refreshToken });

        if (res.status === 200) {
            const newAccessToken = res.data.accessToken;
            localStorage.setItem('accessToken', newAccessToken);

            // 헤더에 새 토큰을 추가하고 원래 요청을 다시 시도
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return apiClient(originalRequest);
        }
    }
    return Promise.reject(error);
});

export default apiClient;