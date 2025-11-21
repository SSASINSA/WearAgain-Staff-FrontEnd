import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  StyleSheet,
  TouchableOpacity,
  Vibration,
  View,
} from 'react-native';
import {Camera, CameraType} from 'react-native-camera-kit';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text} from '../components/common/Text';
import {ServiceType, ServiceTypeLabel} from '../types/service';
import {useCheckIn} from '../hooks/useStaffAuth';
import {useAuthStore} from '../store/authStore';
import {ApiError} from '../types/api';

interface QRScannerScreenProps {
  navigation: any;
  route: {
    params?: {
      serviceType?: ServiceType;
    };
  };
}

export default function QRScannerScreen({
  navigation,
  route,
}: QRScannerScreenProps) {
  const [scanned, setScanned] = useState<boolean>(true);
  const ref = useRef(null);
  const serviceType = route.params?.serviceType || ServiceType.CHECK_IN;
  const {mutate: checkIn, isPending: isCheckingIn} = useCheckIn();
  const {authCode} = useAuthStore();

  useEffect(() => {
    // 종료후 재시작을 했을때 초기화
    setScanned(true);
  }, []);

  const onBarCodeRead = (event: any) => {
    if (!scanned) return;
    setScanned(false);
    Vibration.vibrate();
    const qrCode = event.nativeEvent.codeStringValue;
    const serviceLabel = ServiceTypeLabel[serviceType];

    if (serviceType === ServiceType.CHECK_IN) {
      // CHECK_IN: 체크인 API 호출
      if (!authCode) {
        Alert.alert('오류', '인증 코드가 없습니다.');
        setScanned(true);
        return;
      }

      Alert.alert('QR Code', `${serviceLabel}\n${qrCode}`, [
        {
          text: '취소',
          style: 'cancel',
          onPress: () => {
            setScanned(true);
          },
        },
        {
          text: '확인',
          onPress: () => {
            checkIn(
              {qrToken: qrCode, code: authCode},
              {
                onSuccess: data => {
                  Alert.alert(
                    '체크인 완료',
                    `${data.userDisplayName}님\n${data.eventTitle}\n체크인 완료되었습니다.`,
                    [
                      {
                        text: '확인',
                        onPress: () => {
                          // Main으로 이동
                          navigation.navigate('Main');
                          setScanned(true);
                        },
                      },
                    ],
                  );
                },
                onError: (error: ApiError) => {
                  Alert.alert(
                    '오류',
                    error.message || '체크인에 실패했습니다.',
                    [
                      {
                        text: '확인',
                        onPress: () => {
                          // Main으로 이동
                          navigation.navigate('Main');
                          setScanned(true);
                        },
                      },
                    ],
                  );
                },
              },
            );
          },
        },
      ]);
    } else {
      // CHARGE, USE: Register로 이동
      if (!authCode) {
        Alert.alert('오류', '인증 코드가 없습니다.');
        setScanned(true);
        return;
      }

      Alert.alert('QR Code', `${serviceLabel}\n${qrCode}`, [
        {
          text: '취소',
          style: 'cancel',
          onPress: () => {
            setScanned(true);
          },
        },
        {
          text: '확인',
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: 'Register',
                  params: {serviceType, qrCode, authCode},
                },
              ],
            });
            setScanned(true);
          },
        },
      ]);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scanner}>
        <Camera
          style={styles.camera}
          ref={ref}
          cameraType={CameraType.Back}
          scanBarcode
          showFrame={false}
          laserColor="rgba(6, 176, 183, 0.8)"
          frameColor="rgba(6, 176, 183, 1)"
          onReadCode={onBarCodeRead}
        />

        {/* 상단 헤더 */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text variant="labelL" color="#FFFFFF">
              ← 뒤로
            </Text>
          </TouchableOpacity>
          <Text variant="headlineM" color="#FFFFFF" align="center">
            QR 코드 스캔
          </Text>
          <View style={styles.placeholder} />
        </View>

        {/* 하단 안내 텍스트 */}
        <View style={styles.footer}>
          <Text variant="bodyM" color="#FFFFFF" align="center">
            QR 코드를 카메라에 비춰주세요
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  scanner: {
    flex: 1,
    position: 'relative',
  },
  camera: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  backButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  placeholder: {
    width: 60, // backButton과 같은 너비로 균형 맞춤
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: 20,
  },
});
