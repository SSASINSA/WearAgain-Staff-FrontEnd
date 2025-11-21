// API 타입 정의

export interface VerifyCodeRequest {
  code: string;
}

export interface Event {
  eventId: number;
  title: string;
  status: 'OPEN' | 'CLOSED' | 'CANCELLED';
  startDate: string;
  endDate: string;
  location: string;
  usageGuide: string;
  precautions: string;
  staffCodeIssuedAt: string;
  organizerName: string;
}

export interface VerifyCodeResponse {
  valid: boolean;
  event: Event;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

export interface CheckInRequest {
  qrToken: string;
  code: string;
}

export interface CheckInResponse {
  applicationId: number;
  status: string;
  checkedInAt: string;
  userDisplayName: string;
  eventTitle: string;
}

