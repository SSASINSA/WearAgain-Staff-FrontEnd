import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from '../components/common/Text';

interface MainScreenProps {
  navigation: any;
}

export default function MainScreen({navigation}: MainScreenProps) {
  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="displayM" color="#1A1A1A" align="center">
          WearAgain Staff
        </Text>
        <Text variant="headlineM" color="#666666" align="center">
          메인 대시보드
        </Text>
      </View>

      <View style={styles.content}>
        <Text variant="headlineL" color="#1A1A1A" align="center">
          환영합니다!
        </Text>
        <Text
          variant="bodyL"
          color="#666666"
          align="center"
          style={styles.welcomeText}>
          직원 포털에 성공적으로 로그인하셨습니다.
        </Text>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text variant="labelL" color="#FFFFFF" align="center">
            로그아웃
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 60,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcomeText: {
    marginTop: 16,
    marginBottom: 40,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
});
