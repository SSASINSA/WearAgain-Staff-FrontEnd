// 스태프 관련 API
import apiClient from './client';
import {
  VerifyCodeRequest,
  VerifyCodeResponse,
  CheckInRequest,
  CheckInResponse,
  ChargeTicketRequest,
  ChargeTicketResponse,
  UseTicketRequest,
  UseTicketResponse,
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

/**
 * 교환 티켓 충전 API
 * @param qrToken QR 코드 토큰
 * @param code 인증 코드
 * @param amount 충전할 티켓 수량
 * @returns 충전 결과
 */
export const chargeTicket = async (
  qrToken: string,
  code: string,
  amount: number,
): Promise<ChargeTicketResponse> => {
  const response = await apiClient.post<ChargeTicketResponse>(
    '/api/v1/staff/tickets/charge',
    {qrToken, code, amount} as ChargeTicketRequest,
  );
  return response.data;
};

/**
 * 교환 티켓 사용 API
 * @param qrToken QR 코드 토큰
 * @param code 인증 코드
 * @param amount 사용할 티켓 수량
 * @returns 사용 결과
 */
export const useTicket = async (
  qrToken: string,
  code: string,
  amount: number,
): Promise<UseTicketResponse> => {
  const response = await apiClient.post<UseTicketResponse>(
    '/api/v1/staff/tickets/use',
    {qrToken, code, amount} as UseTicketRequest,
  );
  return response.data;
};
