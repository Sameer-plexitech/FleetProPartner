import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { _getHorizontalPadding } from '../utility/Helper';
import { heightPixel } from '../utility/fonts';

const CommonInput = ({
    label,
    placeholder,
    value,
    onChangeText,
    iconName,
    keyboardType = 'default',
    maxLength,
    secureTextEntry = false,
    rightComponent,
    inputRef,
    returnKeyType,
    onSubmitEditing,
    autoCapitalize,
    autoCorrect,
}) => {
    return (
        <View style={styles.container}>

            {label && <Text style={styles.label}>{label}</Text>}

            <View style={styles.inputBox}>

                {iconName && (
                    <Svg xmlns="http://www.w3.org/2000/svg" width="14" height="21" viewBox="0 0 14 21" fill="none">
                        <Path d="M12 0H1.5C1.10218 0 0.720645 0.158035 0.43934 0.43934C0.158036 0.720644 0 1.10218 0 1.5V19.5C0 19.8978 0.158036 20.2794 0.43934 20.5607C0.720645 20.842 1.10218 21 1.5 21H12C12.3978 21 12.7794 20.842 13.0607 20.5607C13.342 20.2794 13.5 19.8978 13.5 19.5V1.5C13.5 1.10218 13.342 0.720644 13.0607 0.43934C12.7794 0.158035 12.3978 0 12 0ZM1.5 1.5H12V15H1.5V1.5ZM1.5 19.5V16.5H12V19.5H1.5Z" fill="#111111" />
                    </Svg>
                )}
                

                {_getHorizontalPadding(15)}

                <TextInput
                    ref={inputRef}
                    style={styles.input}
                    placeholder={placeholder}
                    placeholderTextColor="#999"
                    value={value}
                    onChangeText={onChangeText}
                    keyboardType={keyboardType}
                    maxLength={maxLength}
                    secureTextEntry={secureTextEntry}
                    returnKeyType={returnKeyType}
                    onSubmitEditing={onSubmitEditing}
                    autoCapitalize={autoCapitalize}
                    autoCorrect={autoCorrect}
                />

                {rightComponent && rightComponent}

            </View>
        </View>
    );
};

export default CommonInput;


const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
    },
    label: {
        color: '#fff',
        marginBottom: 6,
        fontSize: 14,
    },
    inputBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 8,
        paddingHorizontal: 12,
        height: heightPixel(50),
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#000',
    },
});
