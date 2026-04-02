import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CollectPaymentHeader from './components/CollectPaymentHeader';
import CollectPaymentProfile from './components/CollectPaymentProfile';
import CollectPaymentForm from './components/CollectPaymentForm';
import { COLLECT_PAYMENT_PROFILE } from './collectPaymentData';
import { styles } from './collectPaymentStyles';
import { _getVerticalPadding } from '../../utility/Helper';
import { heightPixel, widthPixel } from '../../utility/fonts';

const CollectPayment = () => {
  const navigation = useNavigation();
  const [amount, setAmount] = React.useState('');

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

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >

        {_getVerticalPadding(99)}

          <Image source={require("../../assets/images/Logo_Blue.png")} />

        <CollectPaymentProfile profile={COLLECT_PAYMENT_PROFILE} />

        <CollectPaymentForm
          amount={amount}
          onChangeAmount={handleChangeAmount}
          onSubmit={() => null}
        />
      </ScrollView>
    </View>
  );
};

export default CollectPayment;
