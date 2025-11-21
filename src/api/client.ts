// API 클라이언트 설정
import axios, {AxiosError, AxiosInstance} from 'axios';
import apiConfig from '../config/api';

// API 베이스 URL 설정 (src/config/api.ts에서 관리)
const BASE_URL = apiConfig.BASE_URL;

// Axios 인스턴스 생성
const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
apiClient.interceptors.request.use(
  config => {
    // 필요시 토큰 추가 등
    // const token = getToken();
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// 응답 인터셉터
apiClient.interceptors.response.use(
  response => {
    return response;
  },
  (error: AxiosError) => {
    // 에러 처리
    if (error.response) {
      // 서버 응답이 있는 경우
      const message =
        (error.response.data as any)?.message ||
        `서버 오류가 발생했습니다. (${error.response.status})`;
      return Promise.reject({
        message,
        code: error.code,
        status: error.response.status,
      });
    } else if (error.request) {
      // 요청은 보냈지만 응답을 받지 못한 경우
      return Promise.reject({
        message: '네트워크 오류가 발생했습니다. 연결을 확인해주세요.',
        code: error.code,
      });
    } else {
      // 요청 설정 중 오류가 발생한 경우
      return Promise.reject({
        message: error.message || '알 수 없는 오류가 발생했습니다.',
        code: error.code,
      });
    }
  },
);

export default apiClient;
