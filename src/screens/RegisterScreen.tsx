import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text} from '../components/common/Text';

interface RegisterScreenProps {
  navigation: any;
}

export default function RegisterScreen({navigation}: RegisterScreenProps) {
  const [quantity, setQuantity] = useState(1);

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleRegister = () => {
    Alert.alert('교환 등록', `${quantity}벌의 옷을 교환 등록하시겠습니까?`, [
      {text: '취소', style: 'cancel'},
      {
        text: '확인',
        onPress: () => {
          // TODO: 실제 교환 등록 API 호출
          console.log(`${quantity}벌 교환 등록`);
          // 등록 완료 후 메인 화면으로 이동
          navigation.navigate('Main');
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />

      {/* 헤더 */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text variant="headlineM" color="#111827" align="center">
            교환 옷 정보
          </Text>
        </View>
      </View>

      {/* 메인 콘텐츠 */}
      <View style={styles.content}>
        {/* 질문 영역 */}
        <View style={styles.questionContainer}>
          <Text variant="headlineL" color="#111827">
            몇 벌을 교환하시나요?
          </Text>
          <Text variant="bodyM" color="#6B7280" style={styles.subtitle}>
            교환할 옷의 수량을 선택해주세요
          </Text>
        </View>

        {/* 수량 선택 영역 */}
        <View style={styles.quantityContainer}>
          <View style={styles.quantitySelector}>
            {/* 감소 버튼 */}
            <TouchableOpacity
              style={[
                styles.quantityButton,
                quantity === 1 && styles.quantityButtonDisabled,
              ]}
              onPress={handleDecrease}
              disabled={quantity === 1}>
              <Text
                variant="headlineM"
                color={quantity === 1 ? '#9CA3AF' : '#642C8D'}>
                −
              </Text>
            </TouchableOpacity>

            {/* 수량 표시 */}
            <View style={styles.quantityDisplay}>
              <Text variant="displayL" color="#642C8D" align="center">
                {quantity}
              </Text>
            </View>

            {/* 증가 버튼 */}
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={handleIncrease}>
              <Text variant="headlineM" color="#06B0B7">
                +
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* 하단 버튼 */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}>
          <Text variant="headlineM" color="#FFFFFF" align="center">
            교환 등록하기
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 77,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    justifyContent: 'center',
  },
  headerContent: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  questionContainer: {
    marginTop: 8,
    marginBottom: 32,
  },
  subtitle: {
    marginTop: 8,
  },
  quantityContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 24,
    height: 108,
    justifyContent: 'center',
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
  },
  quantityButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonDisabled: {
    backgroundColor: '#F9FAFB',
    borderColor: '#E5E7EB',
  },
  quantityDisplay: {
    marginHorizontal: 16,
    minWidth: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingTop: 17,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  registerButton: {
    backgroundColor: '#06B0B7',
    borderRadius: 12,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
