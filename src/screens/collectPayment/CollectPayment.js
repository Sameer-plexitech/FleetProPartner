import React from 'react';
import { Image, KeyboardAvoidingView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CollectPaymentHeader from './components/CollectPaymentHeader';
import CollectPaymentProfile from './components/CollectPaymentProfile';
import CollectPaymentForm from './components/CollectPaymentForm';
import { COLLECT_PAYMENT_PROFILE } from './collectPaymentData';
import { styles } from './collectPaymentStyles';
import { _getVerticalPadding } from '../../utility/Helper';
import { fontPixel, heightPixel, widthPixel } from '../../utility/fonts';
import Svg, { Path } from 'react-native-svg';

const CollectPayment = () => {
  const navigation = useNavigation();
  const [amount, setAmount] = React.useState('');
  const [isAmountCollected, setIsAmountCollected] = React.useState(false);

  const handleChangeAmount = text => {
    const sanitizedAmount = text.replace(/[^\d.]/g, '');
    const splitAmount = sanitizedAmount.split('.');
    if (splitAmount.length > 2) {
      return;
    }

    setAmount(sanitizedAmount);
  };

  return (
    <View style={styles.container}>
      <CollectPaymentHeader
        onMenuPress={() => navigation.openDrawer()}
        onNotificationPress={() => null}
      />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={80} // adjust if header overlaps
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.content, { flexGrow: 1 }]}
          keyboardShouldPersistTaps="handled"
        >

          {_getVerticalPadding(99)}

          <Image source={require("../../assets/images/Logo_Blue.png")} />

          {

            isAmountCollected ?

              <>

                {_getVerticalPadding(72)}

                <Svg width={92} height={92} viewBox="0 0 92 92" fill="none">
                  <Path
                    d="M46 88.5C51.5822 88.5069 57.1107 87.4107 62.268 85.2745C67.4252 83.1382 72.1095 80.0039 76.0518 76.0518C80.0039 72.1095 83.1382 67.4252 85.2745 62.268C87.4107 57.1107 88.5069 51.5822 88.5 46C88.5069 40.4178 87.4107 34.8893 85.2745 29.7321C83.1382 24.5748 80.0039 19.8905 76.0518 15.9483C72.1095 11.9961 67.4252 8.86187 62.268 6.7256C57.1107 4.58933 51.5822 3.49315 46 3.50003C40.4178 3.49315 34.8893 4.58933 29.7321 6.7256C24.5748 8.86187 19.8905 11.9961 15.9483 15.9483C11.9961 19.8905 8.86187 24.5748 6.7256 29.7321C4.58933 34.8893 3.49315 40.4178 3.50003 46C3.49315 51.5822 4.58933 57.1107 6.7256 62.268C8.86187 67.4252 11.9961 72.1095 15.9483 76.0518C19.8905 80.0039 24.5748 83.1382 29.7321 85.2745C34.8893 87.4107 40.4178 88.5069 46 88.5Z"
                    stroke="#079A34"
                    strokeWidth={6}
                    strokeLinejoin="round"
                  />

                  <Path
                    d="M29 46L41.75 58.75L67.25 33.25"
                    stroke="#079A34"
                    strokeWidth={6}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </Svg>

                <Text style={{ fontSize: fontPixel(20), marginTop: heightPixel(14), marginBottom: heightPixel(47) }} >Collect Payment Successfully</Text>

                <TouchableOpacity style={styles.submitButton} onPress={() => null}>
                  <Text style={styles.submitButtonText}>Done</Text>
                </TouchableOpacity>

              </>

              :

              <>

                <CollectPaymentProfile profile={COLLECT_PAYMENT_PROFILE} />
                <CollectPaymentForm
                  amount={amount}
                  onChangeAmount={handleChangeAmount}
                  onSubmit={() => setIsAmountCollected(true)}
                />

              </>

          }


        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default CollectPayment;
