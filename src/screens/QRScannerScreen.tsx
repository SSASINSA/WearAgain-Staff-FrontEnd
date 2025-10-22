import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Dimensions,
  StyleSheet,
  Vibration,
  View,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Camera, CameraType} from 'react-native-camera-kit';
import {Text} from '../components/common/Text';

interface QRScannerScreenProps {
  navigation: any;
}

export default function QRScannerScreen({navigation}: QRScannerScreenProps) {
  const [scanned, setScanned] = useState<boolean>(true);
  const ref = useRef(null);

  useEffect(() => {
    // 종료후 재시작을 했을때 초기화
    setScanned(true);
  }, []);

  const onBarCodeRead = (event: any) => {
    if (!scanned) return;
    setScanned(false);
    Vibration.vibrate();
    Alert.alert('QR Code', event.nativeEvent.codeStringValue, [
      {
        text: 'OK',
        onPress: () => {
          navigation.reset({
            index: 0,
            routes: [{name: 'Register'}],
          });
          setScanned(true);
        },
      },
    ]);
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
