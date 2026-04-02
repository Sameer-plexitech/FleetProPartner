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
    fontSize: fontPixel(20),
  },
  content: {
    paddingHorizontal: widthPixel(26),
    paddingTop: heightPixel(22),
    paddingBottom: heightPixel(16),
    alignItems: 'center',
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  brandFleet: {
    color: '#1D3FB5',
    fontSize: fontPixel(30),
    fontWeight: '700',
  },
  brandPro: {
    color: '#E01E27',
    fontSize: fontPixel(30),
    fontWeight: '700',
    marginLeft: widthPixel(3),
  },
  brandTag: {
    color: '#1D3FB5',
    fontSize: fontPixel(11),
    fontWeight: '700',
    marginLeft: widthPixel(2),
    marginBottom: heightPixel(4),
  },
  profileWrap: {
    marginTop: heightPixel(35),
    alignItems: 'center',
  },
  avatar: {
    height: heightPixel(141),
    width: widthPixel(141),
    borderRadius: widthPixel(70.5),
    backgroundColor: '#17223B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: fontPixel(20),
    fontWeight: '700',
  },
  profileLineTop: {
    marginTop: heightPixel(17),
    color: '#6F6F6F',
    fontSize: fontPixel(12),
  },
  profileLineMid: {
    marginTop: heightPixel(1),
    color: '#1E1E1E',
    fontSize: fontPixel(14),
    fontWeight: '600',
  },
  profileLineBottom: {
    marginTop: heightPixel(1),
    color: '#1E1E1E',
    fontSize: fontPixel(14),
    fontWeight: '600',
  },
  formWrap: {
    width: '100%',
    marginTop: heightPixel(34),
  },
  amountLabel: {
    color: '#9A9A9A',
    fontSize: fontPixel(12),
    marginBottom: heightPixel(4),
  },
  inputWrap: {
    height: heightPixel(43),
    borderWidth: 1,
    borderColor: '#DDDDDD',
    borderRadius: widthPixel(3),
    backgroundColor: '#FFFFFF',
    paddingHorizontal: widthPixel(10),
    flexDirection: 'row',
    alignItems: 'center',
  },
  rupeeText: {
    color: 'black',
    fontSize: fontPixel(13),
    fontWeight: '700',
  },
  amountInput: {
    flex: 1,
    marginLeft: widthPixel(6),
    color: '#1A1A1A',
    fontSize: fontPixel(12),
    paddingVertical: 0,
  },
  submitButton: {
    height: heightPixel(50),
    borderRadius: widthPixel(7),
    width: '100%',
    backgroundColor: '#352487',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: fontPixel(18),
  },
});
