import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  StatusBar,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text} from '../components/common/Text';
import QrSvg from '../asset/image/icon_qr.svg';
import {ServiceType, ServiceTypeLabel} from '../types/service';
import {useAuthStore} from '../store/authStore';

interface MainScreenProps {
  navigation: any;
}

export default function MainScreen({navigation}: MainScreenProps) {
  const {clearAuth} = useAuthStore();

  const handleLogout = () => {
    // authCode 및 인증 정보 clear
    clearAuth();
    // LoginScreen으로 이동 (스택 초기화)
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };

  const handleQRScan = (serviceType: ServiceType) => {
    const serviceLabel = ServiceTypeLabel[serviceType];
    console.log(`${serviceLabel} QR 스캔 시작`);
    navigation.navigate('QRScanner', {serviceType});
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      {/* 헤더 */}
      <View style={styles.header}>
        <Text variant="headlineL" color="#111827">
          스태프 QR 서비스
        </Text>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text variant="labelM" color="#EF4444">
            로그아웃
          </Text>
        </TouchableOpacity>
      </View>

      {/* 메인 콘텐츠 */}
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* 입장 티켓 체크인 카드 */}
        <View style={styles.cardContainer}>
          <View style={[styles.serviceCard, styles.checkInCard]}>
            <View style={styles.cardContent}>
              <Text variant="displayM" color="#FFFFFF" align="center">
                입장 티켓 체크인
              </Text>
            </View>
            <TouchableOpacity
              style={styles.qrButton}
              onPress={() => handleQRScan(ServiceType.CHECK_IN)}>
              <QrSvg
                width={16}
                height={18}
                color="#06B0B7"
                style={styles.qrIcon}
              />
              <Text variant="labelL" color="#06B0B7" align="center">
                QR 촬영
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.cardContainer}>
          <View style={[styles.serviceCard, styles.chargeCard]}>
            <View style={styles.cardContent}>
              <Text variant="displayM" color="#FFFFFF" align="center">
                교환 티켓 충전
              </Text>
            </View>
            <TouchableOpacity
              style={styles.qrButton}
              onPress={() => handleQRScan(ServiceType.CHARGE)}>
              <QrSvg
                width={16}
                height={18}
                color="#642C8D"
                style={styles.qrIcon}
              />
              <Text variant="labelL" color="#642C8D" align="center">
                QR 촬영
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.cardContainer}>
          <View style={[styles.serviceCard, styles.useCard]}>
            <View style={styles.cardContent}>
              <Text variant="displayM" color="#FFFFFF" align="center">
                교환 티켓 사용
              </Text>
            </View>
            <TouchableOpacity
              style={styles.qrButton}
              onPress={() => handleQRScan(ServiceType.USE)}>
              <QrSvg
                width={16}
                height={18}
                color="#FB923C"
                style={styles.qrIcon}
              />
              <Text variant="labelL" color="#FB923C" align="center">
                QR 촬영
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: 65,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
  },
  cardContainer: {
    marginBottom: 24,
  },
  serviceCard: {
    height: 168,
    borderRadius: 16,
    padding: 24,
    justifyContent: 'space-between',
  },
  checkInCard: {
    backgroundColor: '#06B0B7',
  },
  chargeCard: {
    backgroundColor: '#642C8D',
  },
  useCard: {
    backgroundColor: '#FB923C',
  },
  cardContent: {
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrButton: {
    backgroundColor: '#FFFFFF',
    height: 52,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  qrIcon: {
    marginRight: 8,
  },
  logoutButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
});
