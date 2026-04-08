import {
  Image,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { _getVerticalPadding } from '../../utility/Helper';
import { fontPixel, heightPixel, widthPixel } from '../../utility/fonts';
import CommonInput from '../../components/CommonInput';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import { secreteKeyToken, authenticateToken } from '../../apis/request';
import { LocalStorage } from '../../utility/LocalStorage';
import DeviceInfo from 'react-native-device-info';

const Login = () => {
  const Container = Platform.OS === 'ios' ? KeyboardAvoidingView : View;
  const scrollRef = React.useRef(null);
  const passwordInputRef = React.useRef(null);
  const [keyboardHeight, setKeyboardHeight] = React.useState(0);
  const [mobileNumber, setMobileNumber] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [mobileError, setMobileError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      await secreteKeyToken();
    };

    fetchData();
  }, []);

  const validateMobileNumber = number => {
    if (!number) {
      return 'Mobile number is required';
    }

    if (number.length !== 10) {
      return 'Mobile number must be exactly 10 digits';
    }

    return '';

  };

  const handleMobileChange = text => {
    const formattedNumber = text.replace(/\D/g, '').slice(0, 10);
    setMobileNumber(formattedNumber);

    if (mobileError) {
      setMobileError(validateMobileNumber(formattedNumber));
    }
  };

  const validatePassword = value => {
    if (!value?.trim()) {
      return 'Password is required';
    }

    if (value.trim().length < 6) {
      return 'Password must be at least 6 characters';
    }

    return '';
  };

  const handlePasswordChange = text => {
    setPassword(text);

    if (passwordError) {
      setPasswordError(validatePassword(text));
    }
  };

  const handleLoginPress = async () => {
    const mobileValidationError = validateMobileNumber(mobileNumber);
    const passwordValidationError = validatePassword(password);

    setMobileError(mobileValidationError);
    setPasswordError(passwordValidationError);

    if (mobileValidationError || passwordValidationError) {
      return;
    }

    const body = {
      "userName": mobileNumber
    }

    const response = await authenticateToken(body);
    console.log("Login response===>", response);
    LocalStorage.set("sessionId", response?.data?.token);
    const uniqueId = await DeviceInfo.getUniqueId();
    // let datas = response?.data?.payload;
    // datas.mobile = data?.mobile;
    let encryptedPassword = await encryptOneWay(data?.password, response?.data?.token)

    let bodydata = {
      "userName": mobileNumber,
      "password": encryptedPassword,
      "sessionId": response?.data?.token,
      "assetTypeId": 2,
      "ipAddress": "",
      "imei": uniqueId,
      "applicationTypeId": 6,
      "applicationName": "WTI Driver",
      "applicationVersion": DeviceInfo.getVersion(),
      "osVersion": DeviceInfo.getSystemVersion(),
      "make": 0,
      "model": DeviceInfo.getModel(),
      "mfgName": await DeviceInfo.getManufacturer(),
      "dataState": "",
      "geolocationStatus": "",
      "browserName": "",
      "browserVersion": "",
      "firebaseToken": "",
      "latitude": 0,
      "longitude": 0,
      "deviceTypeId": Platform.OS === 'ios' ? 1 : 2,
    }

    

    Keyboard.dismiss();
    // navigation.navigate('OtpVerification', { mobileNumber });
    navigation.navigate('DrawerTabs');
  };

  React.useEffect(() => {
    if (Platform.OS !== 'android') {
      return undefined;
    }

    const showSub = Keyboard.addListener('keyboardDidShow', event => {
      setKeyboardHeight(event.endCoordinates?.height || 0);
      setTimeout(() => {
        scrollRef.current?.scrollToEnd({ animated: true });
      }, 120);
    });
    const hideSub = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  return (
    <Container
      style={styles.container}
      {...(Platform.OS === 'ios' ? { behavior: 'padding' } : {})}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <LinearGradient colors={['#000088', '#6420AA']} style={styles.gradient}>
          <ScrollView
            ref={scrollRef}
            style={styles.scroll}
            contentContainerStyle={[
              styles.scrollContent,
              Platform.OS === 'android' && keyboardHeight > 0
                ? { paddingBottom: keyboardHeight + 16 }
                : null,
            ]}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode={
              Platform.OS === 'ios' ? 'interactive' : 'on-drag'
            }
            bounces={false}
            contentInsetAdjustmentBehavior="never"
            automaticallyAdjustContentInsets={false}
          >
            <Image source={require('../../assets/images/Logo.png')} />

            {_getVerticalPadding(24)}

            <View style={styles.titleWrap}>
              <Text style={styles.title}>Get Started with FleetPro</Text>
            </View>

            {_getVerticalPadding(39)}

            <Image
              source={require('../../assets/images/uberBlack.png')}
              style={styles.uberImage}
              resizeMode="contain"
            />

            {_getVerticalPadding(45)}

            <View style={styles.formWrap}>
              <CommonInput
                label="Mobile Number"
                placeholder="Enter your number"
                iconName="phone"
                keyboardType="phone-pad"
                value={mobileNumber}
                onChangeText={handleMobileChange}
                maxLength={10}
                returnKeyType="next"
                autoCapitalize="none"
                autoCorrect={false}
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />

              {mobileError ? (
                <Text style={styles.errorText}>{mobileError}</Text>
              ) : null}

              <CommonInput
                label="Password"
                placeholder="Enter your password"
                value={password}
                onChangeText={handlePasswordChange}
                secureTextEntry={!isPasswordVisible}
                maxLength={64}
                inputRef={passwordInputRef}
                returnKeyType="done"
                autoCapitalize="none"
                autoCorrect={false}
                onSubmitEditing={handleLoginPress}
                rightComponent={
                  <TouchableOpacity
                    onPress={() => setIsPasswordVisible(prev => !prev)}
                    style={styles.passwordEyeButton}
                    activeOpacity={0.7}
                  >
                    <Feather
                      name={isPasswordVisible ? 'eye-off' : 'eye'}
                      size={heightPixel(18)}
                      color="#5F5F5F"
                    />
                  </TouchableOpacity>
                }
              />

              {passwordError ? (
                <Text style={styles.errorText}>{passwordError}</Text>
              ) : null}

              {_getVerticalPadding(45)}

              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleLoginPress}
              >
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>

              <View style={styles.footerWrap}>
                <Text style={styles.footerText}>Powered by PLEXITECH</Text>
                <Text style={styles.footerText}>
                  Copyright 2026 Fleet Pro. Privacy Policy
                </Text>
              </View>

              {_getVerticalPadding(20)}
            </View>
          </ScrollView>
        </LinearGradient>
      </TouchableWithoutFeedback>
    </Container>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  gradient: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  titleWrap: {
    alignItems: 'center',
  },
  title: {
    fontSize: fontPixel(28),
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  formWrap: {
    width: '100%',
    paddingHorizontal: widthPixel(25),
  },
  errorText: {
    color: '#FFB4B4',
    fontSize: fontPixel(12),
    marginTop: 2,
    marginBottom: 8,
  },
  loginButton: {
    backgroundColor: 'white',
    height: heightPixel(50),
    borderRadius: widthPixel(8),
  },
  loginButtonText: {
    color: 'black',
    fontSize: fontPixel(16),
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: heightPixel(50),
  },
  footerWrap: {
    marginTop: heightPixel(20),
    alignItems: 'center',
  },
  footerText: {
    color: 'white',
    fontSize: fontPixel(12),
  },
  uberImage: {
    height: heightPixel(150),
    width: '100%',
  },
  passwordEyeButton: {
    paddingLeft: widthPixel(8),
    paddingVertical: 4,
  },
});
