// 스태프 관련 API
import apiClient from './client';
import {VerifyCodeRequest, VerifyCodeResponse} from '../types/api';

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
