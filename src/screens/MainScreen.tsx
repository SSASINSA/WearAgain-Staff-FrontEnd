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

  const handleQRScan = (serviceType: string) => {
    Alert.alert('QR 촬영', `${serviceType} QR 코드를 촬영하시겠습니까?`, [
      {text: '취소', style: 'cancel'},
      {
        text: '확인',
        onPress: () => {
          // TODO: QR 스캔 기능 구현
          console.log(`${serviceType} QR 스캔 시작`);
          navigation.navigate('Register');
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      {/* 헤더 */}
      <View style={styles.header}>
        <Text variant="headlineL" color="#111827">
          스태프 QR 서비스
        </Text>
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
              onPress={() => handleQRScan('입장 티켓 체크인')}>
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
              onPress={() => handleQRScan('교환 티켓 충전')}>
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
              onPress={() => handleQRScan('교환 티켓 사용')}>
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
    justifyContent: 'center',
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
    backgroundColor: '#EF4444',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginTop: 32,
    alignSelf: 'center',
  },
});
