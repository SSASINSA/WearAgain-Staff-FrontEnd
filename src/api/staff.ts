// 스태프 관련 API
import apiClient from './client';
import {
  VerifyCodeRequest,
  VerifyCodeResponse,
  CheckInRequest,
  CheckInResponse,
} from '../types/api';

/**
 * 인증 코드 확인 API
 * @param code 인증 코드
 * @returns 인증 결과 및 이벤트 정보
 */
export const verifyStaffCode = async (
  code: string,
): Promise<VerifyCodeResponse> => {
  const response = await apiClient.post<VerifyCodeResponse>(
    '/api/v1/staff/codes/verify',
    {code} as VerifyCodeRequest,
  );
  return response.data;
};

/**
 * 입장 티켓 체크인 API
 * @param qrToken QR 코드 토큰
 * @param code 인증 코드
 * @returns 체크인 결과
 */
export const checkIn = async (
  qrToken: string,
  code: string,
): Promise<CheckInResponse> => {
  const response = await apiClient.post<CheckInResponse>(
    '/api/v1/staff/events/check-in',
    {qrToken, code} as CheckInRequest,
  );
  return response.data;
};
