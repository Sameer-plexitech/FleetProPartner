'use strict';

import {
    StyleSheet,
} from 'react-native';

import colors from './colors';
import fonts, { normalize } from '../utility/fonts';
import { Typography } from 'react-native-ui-lib';

var styles = StyleSheet.create({

    styleFull: {
        flex: 1,
        backgroundColor: colors.WHITE
    },
});

Typography.loadTypographies(styles);

module.exports = styles;
