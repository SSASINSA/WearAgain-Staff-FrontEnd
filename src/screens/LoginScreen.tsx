import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import {Text} from '../components/common/Text';

interface LoginScreenProps {
  navigation: any;
}

export default function LoginScreen({navigation}: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('오류', '이메일과 비밀번호를 입력해주세요.');
      return;
    }

    setIsLoading(true);
    try {
      // TODO: 실제 로그인 API 호출
      console.log('로그인 시도:', {email, password});
      // 임시로 2초 후 성공 처리
      setTimeout(() => {
        setIsLoading(false);
        // MainScreen으로 이동
        navigation.navigate('Main');
      }, 2000);
    } catch (error) {
      setIsLoading(false);
      Alert.alert('오류', '로그인에 실패했습니다.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          {/* 로고 및 타이틀 영역 */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Text variant="displayL" color="#1A1A1A" align="center">
                WearAgain
              </Text>
              <Text variant="headlineM" color="#666666" align="center">
                Staff Portal
              </Text>
            </View>
          </View>

          {/* 로그인 폼 영역 */}
          <View style={styles.formContainer}>
            <Text variant="headlineL" color="#1A1A1A" align="center">
              직원 로그인
            </Text>
            <Text
              variant="bodyM"
              color="#666666"
              align="center"
              style={styles.subtitle}>
              계정 정보를 입력해주세요
            </Text>

            <View style={styles.inputContainer}>
              <Text variant="labelM" color="#1A1A1A" style={styles.inputLabel}>
                이메일
              </Text>
              <TextInput
                style={styles.textInput}
                placeholder="직원 이메일을 입력하세요"
                placeholderTextColor="#999999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text variant="labelM" color="#1A1A1A" style={styles.inputLabel}>
                비밀번호
              </Text>
              <TextInput
                style={styles.textInput}
                placeholder="비밀번호를 입력하세요"
                placeholderTextColor="#999999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            <TouchableOpacity
              style={[
                styles.loginButton,
                isLoading && styles.loginButtonDisabled,
              ]}
              onPress={handleLogin}
              disabled={isLoading}>
              <Text variant="labelL" color="#FFFFFF" align="center">
                {isLoading ? '로그인 중...' : '로그인'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.forgotPassword}>
              <Text variant="bodyM" color="#007AFF" align="center">
                비밀번호를 잊으셨나요?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logoContainer: {
    alignItems: 'center',
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  subtitle: {
    marginTop: 8,
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputLabel: {
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    fontFamily: 'Pretendard-Regular',
    backgroundColor: '#FAFAFA',
    color: '#1A1A1A',
  },
  loginButton: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    paddingVertical: 16,
    marginTop: 8,
    marginBottom: 24,
  },
  loginButtonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  forgotPassword: {
    alignSelf: 'center',
  },
});
