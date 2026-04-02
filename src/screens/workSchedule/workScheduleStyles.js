import { StyleSheet } from 'react-native';
import { fontPixel, heightPixel, widthPixel } from '../../utility/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    paddingHorizontal: widthPixel(21),
    paddingTop: heightPixel(8),
    paddingBottom: heightPixel(16),
  },
  rosterCard: {
    // borderWidth: 1,
    // borderColor: '#DCDCDC',
    borderRadius: widthPixel(6),
    backgroundColor: '#FFFFFF',
    // paddingHorizontal: widthPixel(10),
    // paddingVertical: heightPixel(10),
  },
  rosterTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: heightPixel(10),
  },
  rosterTitle: {
    color: '#2B0187',
    fontSize: fontPixel(16),
    fontWeight: '700',
  },
  rosterHoursRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#D4D4D4',
    padding: widthPixel(14),
    borderRadius: widthPixel(10)
  },
  rosterLabel: {
    color: '#A0A0A0',
    fontSize: fontPixel(12),
  },
  rosterHoursValue: {
    marginTop: heightPixel(1),
    color: '#101010',
    fontSize: fontPixel(14),
    fontWeight: '700',
  },
  daysWrap: {
    alignItems: 'flex-start',
  },
  dayCircleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: heightPixel(2),
  },
  dayCircle: {
    width: widthPixel(16),
    height: heightPixel(16),
    borderRadius: widthPixel(8),
    backgroundColor: '#F1F1F1',
    borderWidth: 1,
    borderColor: '#DEDEDE',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: widthPixel(3),
  },
  dayText: {
    color: '#666666',
    fontSize: fontPixel(8),
    fontWeight: '600',
  },
  sectionTitle: {
    marginTop: heightPixel(10),
    color: '#1E1E7C',
    fontSize: fontPixel(16),
    fontWeight: '700',
  },
  requestCard: {
    marginTop: heightPixel(8),
    borderWidth: 1,
    borderColor: '#DCDCDC',
    borderRadius: widthPixel(6),
    backgroundColor: '#FFFFFF',
    paddingHorizontal: widthPixel(13),
    paddingVertical: heightPixel(13),
  },
  requestTopRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  requestDateWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: widthPixel(50),
  },
  requestDateItem: {
    marginRight: widthPixel(10),
  },
  requestDateLabel: {
    color: '#8E8E8E',
    fontSize: fontPixel(12),
  },
  requestDateValue: {
    marginTop: heightPixel(1),
    color: '#2A2A2A',
    fontSize: fontPixel(16),
  },
  statusBadge: {
    minWidth: widthPixel(56),
    height: heightPixel(20),
    borderRadius: widthPixel(10),
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: widthPixel(8),
  },
  statusText: {
    fontSize: fontPixel(9),
    fontWeight: '700',
  },
  remarksLabel: {
    marginTop: heightPixel(8),
    color: '#8E8E8E',
    fontSize: fontPixel(14),
  },
  remarksText: {
    marginTop: heightPixel(2),
    color: '#3C3C3C',
    fontSize: fontPixel(16),
  },
  requestDivider: {
    marginTop: heightPixel(8),
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  recordingRow: {
    marginTop: heightPixel(8),
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    padding: widthPixel(13),
    borderColor:"#DDDDDD",
    borderRadius: widthPixel(6)
  },
  playWrap: {
    width: widthPixel(26),
    height: heightPixel(26),
    borderRadius: widthPixel(50),
    backgroundColor: '#4B2AAA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recordingTextWrap: {
    marginLeft: widthPixel(6),
  },
  recordingTitle: {
    color: '#666666',
    fontSize: fontPixel(12),
    fontWeight: '600',
  },
  recordingTime: {
    marginTop: heightPixel(1),
    color: '#666666',
    fontSize: fontPixel(10),
  },
  footer: {
    paddingHorizontal: widthPixel(21),
    paddingTop: heightPixel(8),
    backgroundColor: 'white',
  },
  applyButton: {
    height: heightPixel(38),
    borderRadius: widthPixel(4),
    backgroundColor: '#3D2A92',
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: fontPixel(12),
    fontWeight: '700',
  },
});
