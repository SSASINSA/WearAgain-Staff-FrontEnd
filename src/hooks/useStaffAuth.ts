// 스태프 인증 관련 React Query 훅
import {useMutation} from '@tanstack/react-query';
import {verifyStaffCode, checkIn} from '../api/staff';
import {ApiError} from '../types/api';

/**
 * 스태프 인증 코드 확인 훅
 */
export const useVerifyStaffCode = () => {
  return useMutation({
    mutationFn: (code: string) => verifyStaffCode(code),
    onError: (error: ApiError) => {
      // 전역 에러 처리가 필요한 경우 여기서 처리
      console.error('인증 코드 확인 실패:', error);
    },
  });
};

/**
 * 입장 티켓 체크인 훅
 */
export const useCheckIn = () => {
  return useMutation({
    mutationFn: ({qrToken, code}: {qrToken: string; code: string}) =>
      checkIn(qrToken, code),
    onError: (error: ApiError) => {
      console.error('체크인 실패:', error);
    },
  });
};
