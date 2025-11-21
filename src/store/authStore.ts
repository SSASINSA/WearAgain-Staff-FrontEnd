// 인증 및 이벤트 정보 저장소 (Zustand)
import {create} from 'zustand';
import {Event} from '../types/api';

interface AuthState {
  isAuthenticated: boolean;
  authCode: string | null;
  currentEvent: Event | null;
  setAuthenticated: (authenticated: boolean) => void;
  setAuthCode: (code: string | null) => void;
  setCurrentEvent: (event: Event | null) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>(set => ({
  isAuthenticated: false,
  authCode: null,
  currentEvent: null,
  setAuthenticated: authenticated => set({isAuthenticated: authenticated}),
  setAuthCode: code => set({authCode: code}),
  setCurrentEvent: event => set({currentEvent: event}),
  clearAuth: () =>
    set({
      isAuthenticated: false,
      authCode: null,
      currentEvent: null,
    }),
}));
