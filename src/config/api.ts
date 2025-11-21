// API 설정 파일
// 로컬 개발 시 api.local.ts 파일을 생성하여 사용하세요
// api.local.ts는 .gitignore에 포함되어 있어 Git에 커밋되지 않습니다

interface ApiConfig {
  BASE_URL: string;
}

// 로컬 설정 파일이 있으면 우선 사용, 없으면 기본값 사용
let apiConfig: ApiConfig;

try {
  // 로컬 설정 파일이 있으면 사용
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  apiConfig = require('./api.local.ts').default;
} catch (error) {
  // 로컬 설정 파일이 없으면 기본값 사용
  apiConfig = {
    BASE_URL: 'https://ssasinsa.co.kr',
  };
}

export default apiConfig;
