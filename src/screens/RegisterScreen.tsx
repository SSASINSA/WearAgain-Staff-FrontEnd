import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from '../components/common/Text';

interface RegisterScreenProps {
  navigation: any;
}

export default function RegisterScreen({navigation}: RegisterScreenProps) {
  return (
    <View style={styles.container}>
      <Text variant="headlineL" color="#1A1A1A" align="center">
        회원가입
      </Text>
      <Text
        variant="bodyM"
        color="#666666"
        align="center"
        style={styles.subtitle}>
        회원가입 기능은 준비 중입니다.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
  },
  subtitle: {
    marginTop: 16,
  },
});
