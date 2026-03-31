import React from 'react'
import { Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import Ripple from 'react-native-material-ripple';
import global from '../utility/global';
import constants from '../utility/constants';
import fonts from '../utility/fonts';
import colors from '../styles/colors';

export default toolbar = ({
    title, navigation,     
    showBackButton = false,
}) => {

    const close = () => {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            {
                showBackButton &&
                <TouchableHighlight
                    style={[styles.btnBack, { padding: 0 }]}
                    onPress={() => close()}
                    underlayColor={colors.RIPPLE_EFFECT}>
                        
                    {global.drawIcon(constants.IC_MATERIAL, 'arrow-back', 25, colors.BLACK)}
                </TouchableHighlight>
            }

            <Text numberOfLines={1} style={[styles.title]}>
                {title}
            </Text>

        </View>
    )
}

const styles = StyleSheet.create({
    container: { 
        flexDirection: 'row',
        height: 56,
        alignItems: 'center',
        backgroundColor: colors.WHITE,
        paddingHorizontal: 15,
    },
    btnBack: {
        alignSelf: 'center',
        height: 40,
        width: 40,
        padding: 8,
        marginRight: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
   
    title: {
        color: colors.BLACK,
        fontSize: fonts._18,
        fontFamily: fonts.FONT_FAMILY.Bold,
    },

})





