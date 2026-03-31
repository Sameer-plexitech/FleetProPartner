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
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { _getVerticalPadding } from '../../utility/Helper';
import { fontPixel, widthPixel } from '../../utility/fonts';
import CommonInput from '../../components/CommonInput';

const Login = () => {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <LinearGradient colors={['#000088', '#6420AA']} style={styles.gradient}>
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            bounces={false}
            contentInsetAdjustmentBehavior="never"
            automaticallyAdjustContentInsets={false}
          >
            <Image source={require('../../assets/images/Logo.png')} />

            {_getVerticalPadding(65)}

            <View style={styles.titleWrap}>
              <Text style={styles.title}>Get Started with FleetPro</Text>

              {_getVerticalPadding(5)}

              <Text style={styles.subtitle}>
                Click change password to update {'\n'} new password
              </Text>
            </View>

            {_getVerticalPadding(59)}

            <Image source={require('../../assets/images/uberBlack.png')} />

            {_getVerticalPadding(65)}

            <View style={styles.formWrap}>
              <CommonInput
                label="Mobile Number"
                placeholder="Enter your number"
                iconName="phone"
                keyboardType="phone-pad"
              />
            </View>
          </ScrollView>
        </LinearGradient>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
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
});
