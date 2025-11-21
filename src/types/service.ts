// 서비스 타입 정의
export enum ServiceType {
  CHECK_IN = 'CHECK_IN', // 입장 티켓 체크인
  CHARGE = 'CHARGE', // 교환 티켓 충전
  USE = 'USE', // 교환 티켓 사용
}

export const ServiceTypeLabel: Record<ServiceType, string> = {
  [ServiceType.CHECK_IN]: '입장 티켓 체크인',
  [ServiceType.CHARGE]: '교환 티켓 충전',
  [ServiceType.USE]: '교환 티켓 사용',
};
