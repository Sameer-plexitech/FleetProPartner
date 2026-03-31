import { Dimensions, PixelRatio, Platform } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const widthScale = SCREEN_WIDTH / 375;
const heightScale = SCREEN_HEIGHT / 812;

const normalize = (size, based = 'height') => {
  const newSize = based === 'height' ? size * heightScale : size * widthScale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

const normalizeFont = (size, based = 'height') => {
  const newSize = based === 'height' ? size * heightScale : size * widthScale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize + 1));
};

const widthPixel = (size) => normalize(size, 'width');
const heightPixel = (size) => normalize(size, 'height');
const pixelSizeVertical = (size) => heightPixel(size);
const pixelSizeHorizontal = (size) => widthPixel(size);
const paddingMarginPixel = (size) => widthPixel(size);
const fontPixel = (size) => widthPixel(size);

const fonts = {
  _5: normalizeFont(5),
  _6: normalizeFont(6),
  _7: normalizeFont(7),
  _8: normalizeFont(8),
  _9: normalizeFont(9),
  _10: normalizeFont(10),
  _11: normalizeFont(11),
  _12: normalizeFont(12),
  _13: normalizeFont(13),
  _14: normalizeFont(14),
  _15: normalizeFont(15),
  _16: normalizeFont(16),
  _17: normalizeFont(17),
  _18: normalizeFont(18),
  _19: normalizeFont(19),
  _20: normalizeFont(20),
  _21: normalizeFont(21),
  _22: normalizeFont(22),
  _23: normalizeFont(23),
  _24: normalizeFont(24),
  _25: normalizeFont(25),
  _26: normalizeFont(26),
  _27: normalizeFont(27),
  _28: normalizeFont(28),
  _31: normalizeFont(31),
  _32: normalizeFont(32),
  _40: normalizeFont(40),
  _48: normalizeFont(48),

  _DEVICE_HEIGHT: SCREEN_HEIGHT,
  _DEVICE_WIDTH: SCREEN_WIDTH,

  FONT_FAMILY: {
    Regular: Platform.OS === 'ios' ? 'Montserrat-Regular' : 'Montserrat-Regular',
    Medium: Platform.OS === 'ios' ? 'Montserrat-Medium' : 'Montserrat-Medium',
    Bold: Platform.OS === 'ios' ? 'Montserrat-Bold' : 'Montserrat-Bold',
    SemiBold: Platform.OS === 'ios' ? 'Montserrat-SemiBold' : 'Montserrat-SemiBold',
  },
};

export default fonts;

export {
  widthPixel,
  heightPixel, 
  pixelSizeVertical,
  pixelSizeHorizontal,
  paddingMarginPixel,
  fontPixel,
};
