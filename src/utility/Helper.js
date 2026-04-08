import React from 'react';
import { View, Dimensions } from 'react-native';
import { heightPixel, widthPixel } from './fonts';
import { Text } from 'react-native';
import CryptoJS from "crypto-js";
const salt = CryptoJS.enc.Hex.parse("0102030405060708");

// ✅ DEVICE CONSTANTS
export const DEVICE_WIDTH = Dimensions.get('window').width;
export const DEVICE_HEIGHT = Dimensions.get('window').height;

// ✅ REGEX
export const EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const PASSWORD_REGX =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const NUMBER_REGX = /^-?\d*\.?\d+$/;

// ✅ COLOR CONSTANTS
export const colors = {
    buttonBackground: '#78787A99',
    RED: '#F44336',
    _NEW: '#FF0867',
    _SELLING_FAST: '#000000',
    _RESTOCKED: '#FF8017',
    _OVERSIZED: '#30CF6E',
    _BEST_SELLER: '#0B62FC',
    _RIBBLE: '#414040',
    TRANS_BLACK: 'rgba(0,0,0,0.2)',
    _DARK_GRAY: '#848282',
};

// ✅ ACCESSIBILITY LABEL HELPER
export const getAccessbility = (label, type) => {
    switch (type) {
        case 'BUTTON':
            return { label: `Button_${label}` };
        case 'TEXTINPUT':
            return { label: `textInput${label}` };
        default:
            return { label };
    }
};

// ✅ STRING HELPERS
export const toSentenceCase = str =>
    str
        ?.toLowerCase()
        ?.split(' ')
        ?.map(word => word.charAt(0).toUpperCase() + word.slice(1))
        ?.join(' ') ?? '';

// ✅ EMPTY CHECK
export const _isEmpty = obj => Object.keys(obj).length === 0;

// ✅ LAYOUT HELPERS
export const _getHorizontalPadding = padding => (
    <View style={{ width: widthPixel(padding) }} />
);

export const _getVerticalPadding = padding => (
    <View style={{ height: heightPixel(padding) }} />
);

export const truncateText = (text, maxLength = 50) => {
    if (!text) return '';

    return text.length > maxLength
        ? text.substring(0, maxLength).trim() + '...'
        : text;
};

export const encryptOneWay = async (value, sessionIdValue) => {
    console.log("value==>", value, "sessionIdValue==>", sessionIdValue);
    try {

        const saltText = CryptoJS.SHA256(value).toString();

        const finalHash = CryptoJS.SHA256(saltText + sessionIdValue).toString();

        return finalHash;

    } catch (error) {

        console.log("Error in encryptOneWay:", error);

        return null;

    }

};

export const _getValidateText = (text, center) => {
    return (
        <Text
            style={{
                fontSize: 12,
                color: colors.RED,
                alignSelf: center ? 'center' : 'flex-start',
                paddingLeft: 5,
            }}>
            {text}
        </Text>
    );
};


// ✅ DATE UTILITY
export const _getOldDate = () => {
    const currentDate = new Date();
    const oldDate = new Date(currentDate);
    oldDate.setFullYear(currentDate.getFullYear() - 123);
    return oldDate;
};

// ✅ CHECK OBJECT KEYS
export const checkKeys = (object, pattern) => {
    const regex = new RegExp(pattern);
    const filtered = {};

    Object.keys(object).forEach(key => {
        if (regex.test(key)) filtered[key] = object[key];
    });

    return Object.values(filtered).every(
        value => value !== '' && value !== undefined
    );
};

// ✅ REGION CALCULATOR (for maps)
export const getRegionFromCoordinates = coordinates => {
    if (!Array.isArray(coordinates) || coordinates.length === 0) {
        return null;
    }

    let minLat = coordinates[0].latitude;
    let maxLat = coordinates[0].latitude;
    let minLng = coordinates[0].longitude;
    let maxLng = coordinates[0].longitude;

    for (let i = 1; i < coordinates.length; i++) {
        const { latitude, longitude } = coordinates[i];
        minLat = Math.min(minLat, latitude);
        maxLat = Math.max(maxLat, latitude);
        minLng = Math.min(minLng, longitude);
        maxLng = Math.max(maxLng, longitude);
    }

    return {
        latitude: (minLat + maxLat) / 2,
        longitude: (minLng + maxLng) / 2,
        latitudeDelta: maxLat - minLat + 0.01,
        longitudeDelta: maxLng - minLng + 0.01,
    };
};
