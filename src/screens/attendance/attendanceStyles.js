import { StyleSheet } from 'react-native';
import { fontPixel, heightPixel, widthPixel } from '../../utility/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    height: heightPixel(62),
    paddingHorizontal: widthPixel(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerIconWrap: {
    height: heightPixel(38),
    width: widthPixel(38),
    borderRadius: widthPixel(50),
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: fontPixel(16),
    fontWeight: '600',
  },
  content: {
    paddingHorizontal: widthPixel(8),
    paddingTop: heightPixel(8),
    paddingBottom: heightPixel(20),
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendChip: {
    minWidth: widthPixel(38),
    height: heightPixel(20),
    borderRadius: widthPixel(10),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: widthPixel(6),
    marginRight: widthPixel(6),
  },
  legendChipText: {
    fontSize: fontPixel(10),
    fontWeight: '700',
  },
  addButton: {
    marginLeft: 'auto',
    height: heightPixel(24),
    width: widthPixel(24),
    borderRadius: widthPixel(12),
    backgroundColor: '#0D1D9C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarCard: {
    marginTop: heightPixel(10),
    borderWidth: 1,
    borderColor: '#DCDCDC',
    borderRadius: widthPixel(8),
    backgroundColor: '#FFFFFF',
    paddingVertical: heightPixel(4),
  },
  calendarTheme: {
    textMonthFontSize: fontPixel(13),
    monthTextColor: '#2344BD',
    textDayHeaderFontSize: fontPixel(11),
    textDayFontSize: fontPixel(12),
    textDayStyle: {
      textAlign: 'center',
      textAlignVertical: 'center',
      includeFontPadding: false,
      lineHeight: fontPixel(14),
    },
    dayTextColor: '#3E4E7C',
    textDisabledColor: '#C7CFDF',
    selectedDayBackgroundColor: '#0D1D9C',
    selectedDayTextColor: '#FFFFFF',
    arrowColor: '#0D1D9C',
    'stylesheet.day.basic': {
      base: {
        width: widthPixel(32),
        height: heightPixel(32),
        alignItems: 'center',
        justifyContent: 'center',
      },
      text: {
        textAlign: 'center',
        textAlignVertical: 'center',
        includeFontPadding: false,
        lineHeight: fontPixel(14),
      },
      selectedText: {
        textAlign: 'center',
        textAlignVertical: 'center',
        includeFontPadding: false,
        lineHeight: fontPixel(14),
      },
    },
  },
});
