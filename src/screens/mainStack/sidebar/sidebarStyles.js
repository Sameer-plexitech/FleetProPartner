import { StyleSheet } from 'react-native';
import { fontPixel, heightPixel, widthPixel } from '../../../utility/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    height: heightPixel(72),
    justifyContent: 'center',
    paddingHorizontal: widthPixel(22),
  },
  headerInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerIconButton: {
    height: heightPixel(38),
    width: widthPixel(38),
    borderRadius: widthPixel(50),
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: fontPixel(14),
    fontWeight: '500',
  },
  scrollContent: {
    paddingHorizontal: widthPixel(10),
    paddingBottom: heightPixel(10),
  },
  profileCard: {
    borderWidth: 1,
    borderColor: '#D9D9D9',
    borderRadius: widthPixel(8),
    paddingHorizontal: widthPixel(24),
    paddingVertical: heightPixel(24),
    backgroundColor: '#FFFFFF',
    marginTop: heightPixel(10),
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileAvatar: {
    height: heightPixel(90),
    width: widthPixel(90),
    borderRadius: widthPixel(50),
    backgroundColor: '#1E1E1E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileAvatarText: {
    color: '#FFFFFF',
    fontSize: fontPixel(18),
    fontWeight: '700',
  },
  profileInfoWrap: {
    marginLeft: widthPixel(10),
    flex: 1,
  },
  profileName: {
    color: '#111111',
    fontSize: fontPixel(20),
    fontWeight: '600',
  },
  profileCodeRow: {
    marginTop: heightPixel(2),
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileCode: {
    color: '#3A3A3A',
    marginLeft: widthPixel(5),
    fontSize: fontPixel(16),
    fontWeight: '600',
  },
  profileLastLogin: {
    marginTop: heightPixel(3),
    color: '#111111',
    fontSize: fontPixel(13),
  },
  menuCard: {
    marginTop: heightPixel(12),
    borderWidth: 1,
    borderColor: '#DCDCDC',
    borderRadius: widthPixel(10),
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  menuItem: {
    minHeight: heightPixel(42),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: widthPixel(16)
    // borderBottomWidth: 1,
    // borderBottomColor: '#ECECEC',
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemIconWrap: {
    // width: widthPixel(16),
    alignItems: 'center',
  },
  menuItemLabel: {
    marginLeft: widthPixel(10),
    color: '#1B1B1B',
    fontSize: fontPixel(14),
    fontWeight: '500',
  },
  footer: {
    paddingHorizontal: widthPixel(10),
    paddingTop: heightPixel(10),
  },
  logoutButton: {
    height: heightPixel(44),
    borderRadius: widthPixel(8),
    backgroundColor: '#352487',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: fontPixel(13),
    fontWeight: '700',
  },
});
