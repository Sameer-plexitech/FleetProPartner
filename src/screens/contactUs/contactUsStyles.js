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
    paddingHorizontal: widthPixel(18),
    paddingTop: heightPixel(10),
    paddingBottom: heightPixel(20),
  },
  selectorWrap: {
    marginBottom: heightPixel(10),
  },
  selectorLabel: {
    color: '#666666',
    fontSize: fontPixel(12),
    marginBottom: heightPixel(4),
  },
  selectorButton: {
    height: heightPixel(43),
    borderWidth: 1,
    borderColor: '#D8D8D8',
    borderRadius: widthPixel(4),
    backgroundColor: '#FFFFFF',
    paddingHorizontal: widthPixel(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectorValue: {
    color: '#2F2F2F',
    fontSize: fontPixel(14),
    fontWeight: '500',
  },
  cardList: {
    rowGap: heightPixel(10),
  },
  contactCard: {
    borderWidth: 1,
    borderColor: '#DADADA',
    borderRadius: widthPixel(8),
    backgroundColor: '#FFFFFF',
    paddingHorizontal: widthPixel(10),
    paddingVertical: heightPixel(12),
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrap: {
    height: heightPixel(51),
    width: widthPixel(51),
    borderRadius: widthPixel(50),
    backgroundColor: '#E8E1F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    marginLeft: widthPixel(12),
    flex: 1,
  },
  cardTitle: {
    color: '#1E1E1E',
    fontSize: fontPixel(16),
    fontWeight: '700',
  },
  cardSubtitle: {
    marginTop: heightPixel(2),
    color: '#4A4A4A',
    fontSize: fontPixel(12),
  },
  cardValue: {
    marginTop: heightPixel(2),
    color: '#4A2AA8',
    fontSize: fontPixel(12),
    fontWeight: '600',
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: widthPixel(16),
  },
  modalCard: {
    width: '100%',
    maxHeight: '65%',
    backgroundColor: '#FFFFFF',
    borderRadius: widthPixel(10),
    borderWidth: 1,
    borderColor: '#E3E3E3',
    paddingHorizontal: widthPixel(14),
    paddingVertical: heightPixel(14),
  },
  modalTitle: {
    color: '#1D1D1D',
    fontSize: fontPixel(14),
    fontWeight: '700',
  },
  modalList: {
    marginTop: heightPixel(10),
  },
  modalListContent: {
    rowGap: heightPixel(8),
    paddingBottom: heightPixel(4),
  },
  modalOption: {
    minHeight: heightPixel(40),
    borderWidth: 1,
    borderColor: '#DFDFDF',
    borderRadius: widthPixel(8),
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalOptionActive: {
    borderColor: '#000088',
    backgroundColor: '#EDF0FF',
  },
  modalOptionText: {
    color: '#2E2E2E',
    fontSize: fontPixel(12),
    fontWeight: '500',
  },
  modalOptionTextActive: {
    color: '#000088',
    fontWeight: '700',
  },
});
