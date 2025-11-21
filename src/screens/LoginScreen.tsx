import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import {Text} from '../components/common/Text';
import {useVerifyStaffCode} from '../hooks/useStaffAuth';
import {useAuthStore} from '../store/authStore';
import {ApiError} from '../types/api';

interface LoginScreenProps {
  navigation: any;
}

// 이미지 에셋 경로
const logoImage = require('../asset/image/wear_again_logo.png');

export default function LoginScreen({navigation}: LoginScreenProps) {
  const [authCode, setAuthCode] = useState('');
  const {mutate: verifyCode, isPending: isLoading} = useVerifyStaffCode();
  const {
    setAuthenticated,
    setAuthCode: setAuthCodeToStore,
    setCurrentEvent,
  } = useAuthStore();

  const handleVerify = () => {
    if (!authCode.trim()) {
      Alert.alert('오류', '인증 코드를 입력해주세요.');
      return;
    }

    verifyCode(authCode, {
      onSuccess: data => {
        if (data.valid && data.event) {
          // 인증 성공 - Zustand store에 저장
          setAuthenticated(true);
          setAuthCodeToStore(authCode);
          setCurrentEvent(data.event);
          // MainScreen으로 이동
          navigation.navigate('Main');
        } else {
          Alert.alert('오류', '유효하지 않은 인증 코드입니다.');
        }
      },
      onError: (error: ApiError) => {
        // API 실패 시 에러 메시지 팝업
        Alert.alert('오류', error.message || '인증에 실패했습니다.');
      },
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.content}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          {/* 로고 이미지 */}
          <View style={styles.logoContainer}>
            <Image
              source={logoImage}
              style={styles.logoImage}
              resizeMode="contain"
            />
          </View>

          {/* 타이틀 영역 */}
          <View style={styles.titleContainer}>
            <Text variant="displayM" color="#111827" align="center">
              스태프 인증 코드
            </Text>
            <Text
              variant="bodyM"
              color="#6B7280"
              align="center"
              style={styles.subtitle}>
              관리자로부터 받은 인증 코드를 입력해주세요
            </Text>
          </View>

          {/* 인증 코드 입력 영역 */}
          <View style={styles.inputContainer}>
            <Text variant="labelM" color="#374151" style={styles.inputLabel}>
              인증 코드
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder="인증 코드를 입력하세요"
              placeholderTextColor="#9CA3AF"
              value={authCode}
              onChangeText={setAuthCode}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="default"
              maxLength={6}
            />
          </View>
        </ScrollView>

        {/* 확인 버튼 - 화면 하단 고정 */}
        <View style={styles.bottomButtonContainer}>
          <TouchableOpacity
            style={[
              styles.verifyButton,
              authCode.length === 6 && styles.verifyButtonActive,
            ]}
            onPress={handleVerify}
            disabled={isLoading || authCode.length !== 6}>
            <Text variant="labelL" color="#FFFFFF" align="center">
              {isLoading ? '확인 중...' : '확인'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 76,
    paddingBottom: 20,
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  logoContainer: {
    width: 300,
    height: 200,
    marginBottom: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  subtitle: {
    marginTop: 8,
  },
  inputContainer: {
    width: 327,
    marginBottom: 32,
  },
  inputLabel: {
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 20,
    fontSize: 16,
    fontFamily: 'Pretendard-Regular',
    backgroundColor: '#FFFFFF',
    color: '#111827',
    height: 64,
  },
  bottomButtonContainer: {
    paddingHorizontal: 16,
    paddingBottom: 30,
    paddingTop: 20,
    backgroundColor: '#FFFFFF',
  },
  verifyButton: {
    backgroundColor: '#8A3FB8',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    width: '100%',
    alignSelf: 'center',
    opacity: 0.5,
  },
  verifyButtonActive: {
    opacity: 1,
  },
});
