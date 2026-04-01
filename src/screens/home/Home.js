import React from 'react';
import {
  Animated,
  Easing,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import { fontPixel, heightPixel, widthPixel } from '../../utility/fonts';
import { useNavigation } from '@react-navigation/native';
import TripsSection from './components/TripsSection';
import { tripsByRange } from './tripsByRange';

const ranges = ['Today', 'Week', 'Month'];
const TOGGLE_PADDING = widthPixel(4);
const GRADIENT_COLORS = ['#000088', '#420087'];
const overviewByRange = {
  Today: {
    outstanding: 2450,
    tripsDone: 12,
    tripsTotal: 15,
    loginHours: '8.5',
    subtitle: 'Track Live Performance and payout process.',
  },
  Week: {
    outstanding: 13300,
    tripsDone: 68,
    tripsTotal: 80,
    loginHours: '46.2',
    subtitle: 'Track weekly performance and payout process.',
  },
  Month: {
    outstanding: 54250,
    tripsDone: 284,
    tripsTotal: 330,
    loginHours: '187.4',
    subtitle: 'Track monthly performance and payout process.',
  },
};
const metricsByRange = {
  Today: [
    {
      key: 'loginHours',
      title: 'Login Hours',
      value: '8.5h',
      progress: 0.88,
      color: '#0B7DE3',
      icon: 'clock',
    },
    {
      key: 'trips',
      title: 'Trips',
      value: '12',
      progress: 0.42,
      color: '#7611D2',
      icon: 'map',
    },
    {
      key: 'acceptance',
      title: 'Acceptance',
      value: '92%',
      progress: 0.92,
      color: '#0D9D3C',
      icon: 'check-circle',
    },
    {
      key: 'attendance',
      title: 'Attendance',
      value: '85%',
      progress: 0.85,
      color: '#F2A000',
      icon: 'book-open',
    },
  ],
  Week: [
    {
      key: 'loginHours',
      title: 'Login Hours',
      value: '46.2h',
      progress: 0.82,
      color: '#0B7DE3',
      icon: 'clock',
    },
    {
      key: 'trips',
      title: 'Trips',
      value: '68',
      progress: 0.67,
      color: '#7611D2',
      icon: 'map',
    },
    {
      key: 'acceptance',
      title: 'Acceptance',
      value: '90%',
      progress: 0.9,
      color: '#0D9D3C',
      icon: 'check-circle',
    },
    {
      key: 'attendance',
      title: 'Attendance',
      value: '84%',
      progress: 0.84,
      color: '#F2A000',
      icon: 'book-open',
    },
  ],
  Month: [
    {
      key: 'loginHours',
      title: 'Login Hours',
      value: '187.4h',
      progress: 0.79,
      color: '#0B7DE3',
      icon: 'clock',
    },
    {
      key: 'trips',
      title: 'Trips',
      value: '284',
      progress: 0.73,
      color: '#7611D2',
      icon: 'map',
    },
    {
      key: 'acceptance',
      title: 'Acceptance',
      value: '88%',
      progress: 0.88,
      color: '#0D9D3C',
      icon: 'check-circle',
    },
    {
      key: 'attendance',
      title: 'Attendance',
      value: '82%',
      progress: 0.82,
      color: '#F2A000',
      icon: 'book-open',
    },
  ],
};
const outstandingBreakdownByRange = {
  Today: {
    balanceForward: 0,
    totalCashCollected: 0,
    totalCashDeposited: 1596,
  },
  Week: {
    balanceForward: 1200,
    totalCashCollected: 8420,
    totalCashDeposited: 7810,
  },
  Month: {
    balanceForward: 3200,
    totalCashCollected: 33110,
    totalCashDeposited: 30740,
  },
};
const financialRows = [
  {
    key: 'uberEarning',
    label: 'Uber Earning',
    icon: 'truck',
    iconColor: '#5B21C9',
  },
  {
    key: 'cashCollection',
    label: 'Cash Collection',
    icon: 'eye',
    iconColor: '#5B21C9',
  },
  {
    key: 'cashDeposited',
    label: 'Cash Deposited',
    icon: 'eye',
    iconColor: '#5B21C9',
  },
  {
    key: 'adjustment',
    label: 'Adjustment',
    icon: 'sliders',
    iconColor: '#5B21C9',
  },
  {
    key: 'balanceUberCollection',
    label: 'Balance Uber Collection',
    icon: 'corner-up-left',
    iconColor: '#11A14B',
    highlight: 'green',
  },
  {
    key: 'cngAllowance',
    label: 'CNG Allowance',
    icon: 'zap',
    iconColor: '#5B21C9',
  },
  {
    key: 'petrolAllowance',
    label: 'Petrol Allowance',
    icon: 'droplet',
    iconColor: '#5B21C9',
  },
  {
    key: 'fuelCardAdvance',
    label: 'Fuel Card Advance',
    icon: 'credit-card',
    iconColor: '#5B21C9',
  },
  {
    key: 'balanceCashWithDriver',
    label: 'Balance Cash With Driver',
    icon: 'refresh-cw',
    iconColor: '#D99100',
    highlight: 'orange',
  },
];
const financialByRange = {
  Today: {
    uberEarning: 0,
    cashCollection: 0,
    cashDeposited: 0,
    adjustment: 0,
    balanceUberCollection: 0,
    cngAllowance: 0,
    petrolAllowance: 0,
    fuelCardAdvance: 0,
    balanceCashWithDriver: 0,
  },
  Week: {
    uberEarning: 12540,
    cashCollection: 2480,
    cashDeposited: 2100,
    adjustment: -180,
    balanceUberCollection: 200,
    cngAllowance: 780,
    petrolAllowance: 420,
    fuelCardAdvance: 1500,
    balanceCashWithDriver: 380,
  },
  Month: {
    uberEarning: 54250,
    cashCollection: 9630,
    cashDeposited: 9110,
    adjustment: -760,
    balanceUberCollection: 520,
    cngAllowance: 3240,
    petrolAllowance: 1790,
    fuelCardAdvance: 6900,
    balanceCashWithDriver: 1110,
  },
};

const Home = () => {
  const [selectedRange, setSelectedRange] = React.useState('Week');
  const [toggleWidth, setToggleWidth] = React.useState(0);
  const animatedIndex = React.useRef(
    new Animated.Value(ranges.indexOf('Week')),
  ).current;

  const navigation = useNavigation();

  const segmentWidth = toggleWidth
    ? (toggleWidth - TOGGLE_PADDING * 2) / ranges.length
    : 0;
  const activeOverview = overviewByRange[selectedRange];
  const activeMetrics = metricsByRange[selectedRange];
  const activeOutstandingBreakdown = outstandingBreakdownByRange[selectedRange];
  const activeFinancial = financialByRange[selectedRange];
  const activeTrips = tripsByRange[selectedRange] || [];
  const overviewLabel =
    selectedRange === 'Today'
      ? "Today's Overview"
      : `${selectedRange}'s Overview`;
  const tripsSectionTitle =
    selectedRange === 'Today' ? "Today's Trips" : `${selectedRange}'s Trips`;
  const formattedOutstanding =
    activeOverview.outstanding.toLocaleString('en-IN');
  const payableAmount =
    activeOutstandingBreakdown.balanceForward +
    activeOutstandingBreakdown.totalCashCollected -
    activeOutstandingBreakdown.totalCashDeposited;
  const getFormattedAmount = value =>
    Number(value).toLocaleString('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  const syncDate = React.useMemo(
    () =>
      new Date().toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
    [],
  );
  const currentMonthLabel = React.useMemo(
    () =>
      new Date().toLocaleDateString('en-GB', {
        month: 'long',
        year: 'numeric',
      }),
    [],
  );

  React.useEffect(() => {
    const nextIndex = ranges.indexOf(selectedRange);
    Animated.timing(animatedIndex, {
      toValue: nextIndex,
      duration: 220,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [selectedRange, animatedIndex]);

  return (
    <View style={styles.container}>
      <LinearGradient colors={GRADIENT_COLORS} style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={styles.headerIconWrap}
        >
          <Feather name="menu" size={heightPixel(24)} color="white" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Dashboard</Text>

        <View style={styles.headerIconWrap}>
          <Ionicons
            name="notifications-outline"
            size={heightPixel(24)}
            color="white"
          />
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.mainContent}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.mainContentInner}
      >
        <View
          style={styles.toggleWrap}
          onLayout={event => {
            setToggleWidth(event.nativeEvent.layout.width);
          }}
        >
          {segmentWidth > 0 ? (
            <Animated.View
              style={[
                styles.togglePill,
                {
                  width: segmentWidth,
                  transform: [
                    {
                      translateX: Animated.multiply(
                        animatedIndex,
                        segmentWidth,
                      ),
                    },
                  ],
                },
              ]}
            >
              <LinearGradient
                colors={GRADIENT_COLORS}
                style={styles.togglePillGradient}
              />
            </Animated.View>
          ) : null}

          {ranges.map(range => (
            <TouchableOpacity
              key={range}
              activeOpacity={0.85}
              style={styles.toggleItem}
              onPress={() => setSelectedRange(range)}
            >
              <Text
                style={[
                  styles.toggleText,
                  selectedRange === range ? styles.toggleTextActive : null,
                ]}
              >
                {range}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <LinearGradient colors={GRADIENT_COLORS} style={styles.overviewCard}>
          <View style={styles.overviewTopRow}>
            <View>
              <Text style={styles.overviewLabel}>{overviewLabel}</Text>
              <Text style={styles.overviewTitle}>Drive Smarter</Text>
            </View>

            <View>
              <Text style={styles.outstandingLabel}>Outstanding</Text>
              <Text style={styles.outstandingValue}>
                {'\u20B9'} {formattedOutstanding}
              </Text>
            </View>
          </View>

          <Text style={styles.overviewSubtitle}>{activeOverview.subtitle}</Text>

          <View style={styles.metricsRow}>
            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Trips Done</Text>
              <Text style={styles.metricValue}>
                {activeOverview.tripsDone}/{activeOverview.tripsTotal}
              </Text>
            </View>

            <View style={styles.metricCard}>
              <Text style={styles.metricLabel}>Login Hours</Text>
              <Text style={styles.metricValue}>
                {activeOverview.loginHours}
              </Text>
            </View>
          </View>
        </LinearGradient>

        <View style={styles.performanceWrap}>
          <View style={styles.performanceHeader}>
            <Text style={styles.syncLabel}>
              Uber Last sync date time duration
            </Text>
            <Text style={styles.syncDate}>{syncDate}</Text>
          </View>

          <View style={styles.performanceGrid}>
            {activeMetrics.map(metric => (
              <View key={metric.key} style={styles.performanceCard}>
                <View style={styles.performanceTop}>
                  <Feather
                    name={metric.icon}
                    size={heightPixel(20)}
                    color={metric.color}
                  />
                  <View style={styles.performanceTextWrap}>
                    <Text style={styles.performanceTitle}>{metric.title}</Text>
                    <Text style={styles.performanceValue}>{metric.value}</Text>
                  </View>
                </View>

                <View style={styles.progressTrack}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${Math.min(
                          100,
                          Math.max(0, metric.progress * 100),
                        )}%`,
                        backgroundColor: metric.color,
                      },
                    ]}
                  />
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.financialWrap}>
          <Text style={styles.financialHeading}>Driver Financial</Text>

          <View style={styles.financialCard}>
            <View style={styles.financialList}>
              {financialRows.map((row, index) => (
                <View
                  key={row.key}
                  style={[
                    styles.financialRow,
                    index === financialRows.length - 1
                      ? styles.financialRowLast
                      : null,
                    row.highlight === 'green' ? styles.financialRowGreen : null,
                    row.highlight === 'orange'
                      ? styles.financialRowOrange
                      : null,
                  ]}
                >
                  <View style={styles.financialLeft}>
                    <Feather
                      name={row.icon}
                      size={heightPixel(16)}
                      color={row.iconColor}
                    />
                    <Text style={styles.financialLabel}>{row.label}</Text>
                  </View>

                  <Text style={styles.financialAmount}>
                    {'\u20B9'} {getFormattedAmount(activeFinancial[row.key])}
                  </Text>
                </View>
              ))}
            </View>

            <View style={styles.outstandingBreakdownCard}>
              <View style={styles.outstandingBreakdownHeader}>
                <Text style={styles.outstandingBreakdownTitle}>
                  Current Outstanding
                </Text>
                <Text style={styles.outstandingBreakdownMonth}>
                  ({currentMonthLabel})
                </Text>
              </View>

              <View style={styles.outstandingBreakdownRow}>
                <Text style={styles.outstandingBreakdownLabel}>
                  Balance Forward
                </Text>
                <Text style={styles.outstandingBreakdownAmount}>
                  {'\u20B9'}{' '}
                  {getFormattedAmount(
                    activeOutstandingBreakdown.balanceForward,
                  )}
                </Text>
              </View>

              <View style={styles.outstandingBreakdownRow}>
                <Text style={styles.outstandingBreakdownLabel}>
                  Total Cash Collected
                </Text>
                <Text style={styles.outstandingBreakdownAmount}>
                  {'\u20B9'}{' '}
                  {getFormattedAmount(
                    activeOutstandingBreakdown.totalCashCollected,
                  )}
                </Text>
              </View>

              <View style={styles.outstandingBreakdownRow}>
                <Text style={styles.outstandingBreakdownLabel}>
                  Total Cash Deposited
                </Text>
                <Text style={styles.outstandingBreakdownAmount}>
                  {'\u20B9'}{' '}
                  {getFormattedAmount(
                    activeOutstandingBreakdown.totalCashDeposited,
                  )}
                </Text>
              </View>

              <View style={styles.outstandingBreakdownDivider} />

              <View style={styles.outstandingBreakdownRow}>
                <Text style={styles.outstandingBreakdownPayableLabel}>
                  Payable Amount
                </Text>
                <Text style={styles.outstandingBreakdownPayableAmount}>
                  {'\u20B9'} {getFormattedAmount(payableAmount)}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <TripsSection title={tripsSectionTitle} trips={activeTrips} />

      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  mainContent: {
    flex: 1,
    width: '100%',
    paddingHorizontal: widthPixel(12),
  },
  mainContentInner: {
    paddingBottom: heightPixel(20),
  },
  header: {
    height: heightPixel(70),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: widthPixel(20),
  },
  headerIconWrap: {
    height: heightPixel(38),
    width: widthPixel(38),
    borderColor: '#6420AA',
    borderWidth: 1,
    borderRadius: widthPixel(50),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: fontPixel(20),
    color: 'white',
  },
  toggleWrap: {
    width: '95%',
    marginTop: heightPixel(10),
    backgroundColor: 'white',
    borderRadius: widthPixel(26),
    borderWidth: 1,
    borderColor: '#D3D3D3',
    padding: TOGGLE_PADDING,
    flexDirection: 'row',
    position: 'relative',
    overflow: 'hidden',
  },
  togglePill: {
    position: 'absolute',
    top: TOGGLE_PADDING,
    left: TOGGLE_PADDING,
    height: heightPixel(40),
    borderRadius: widthPixel(22),
    overflow: 'hidden',
  },
  togglePillGradient: {
    flex: 1,
  },
  toggleItem: {
    flex: 1,
    height: heightPixel(40),
    borderRadius: widthPixel(22),
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleText: {
    color: '#2B2B2B',
    fontSize: fontPixel(16),
  },
  toggleTextActive: {
    color: '#FFFFFF',
  },
  overviewCard: {
    marginTop: heightPixel(14),
    borderRadius: widthPixel(12),
    paddingHorizontal: widthPixel(16),
    paddingVertical: heightPixel(14),
  },
  overviewTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  overviewLabel: {
    color: '#FFFFFF',
    fontSize: fontPixel(12),
  },
  overviewTitle: {
    color: '#FFFFFF',
    fontSize: fontPixel(18),
    fontWeight: '700',
    marginTop: heightPixel(3),
  },
  outstandingLabel: {
    color: '#FFFFFF',
    fontSize: fontPixel(12),
    textAlign: 'right',
  },
  outstandingValue: {
    color: '#FFFFFF',
    fontSize: fontPixel(18),
    fontWeight: '700',
    marginTop: heightPixel(2),
  },
  overviewSubtitle: {
    color: '#FFFFFF',
    fontSize: fontPixel(12),
    marginTop: heightPixel(8),
  },
  metricsRow: {
    marginTop: heightPixel(16),
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: widthPixel(12),
  },
  metricCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: widthPixel(10),
    paddingHorizontal: widthPixel(12),
    paddingVertical: heightPixel(12),
  },
  metricLabel: {
    color: '#FFFFFF',
    fontSize: fontPixel(12),
  },
  metricValue: {
    color: '#FFFFFF',
    fontSize: fontPixel(20),
    fontWeight: '700',
    marginTop: heightPixel(2),
  },
  outstandingBreakdownCard: {
    borderTopWidth: 1,
    borderTopColor: '#D8D1E3',
    backgroundColor: 'rgba(232, 224, 245, 0.95)',
    paddingHorizontal: widthPixel(12),
    paddingVertical: heightPixel(10),
  },
  outstandingBreakdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: heightPixel(8),
  },
  outstandingBreakdownTitle: {
    color: '#1F1F1F',
    fontSize: fontPixel(12),
    fontWeight: '600',
  },
  outstandingBreakdownMonth: {
    color: '#3E3E3E',
    fontSize: fontPixel(11),
    fontWeight: '500',
  },
  outstandingBreakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: heightPixel(6),
  },
  outstandingBreakdownLabel: {
    color: '#5B5B5B',
    fontSize: fontPixel(11),
  },
  outstandingBreakdownAmount: {
    color: '#202020',
    fontSize: fontPixel(12),
    fontWeight: '600',
  },
  outstandingBreakdownDivider: {
    borderTopWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#8E839E',
    marginVertical: heightPixel(6),
  },
  outstandingBreakdownPayableLabel: {
    color: '#1F1F1F',
    fontSize: fontPixel(12),
    fontWeight: '700',
  },
  outstandingBreakdownPayableAmount: {
    color: '#1F1F1F',
    fontSize: fontPixel(14),
    fontWeight: '700',
  },
  performanceWrap: {
    marginTop: heightPixel(12),
    backgroundColor: 'transparent',
    borderRadius: widthPixel(12),
    paddingHorizontal: widthPixel(10),
    paddingVertical: heightPixel(10),
  },
  performanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: heightPixel(8),
  },
  syncLabel: {
    color: '#666666',
    fontSize: fontPixel(11),
  },
  syncDate: {
    color: '#666666',
    fontSize: fontPixel(11),
    fontWeight: '500',
  },
  performanceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: heightPixel(10),
  },
  performanceCard: {
    width: '48.5%',
    borderWidth: 1,
    borderColor: '#CFCFCF',
    borderRadius: widthPixel(10),
    paddingHorizontal: widthPixel(10),
    paddingVertical: heightPixel(8),
  },
  performanceTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  performanceTextWrap: {
    marginLeft: widthPixel(9),
  },
  performanceTitle: {
    color: '#4A4A4A',
    fontSize: fontPixel(11),
  },
  performanceValue: {
    color: '#1C1C1C',
    fontSize: fontPixel(18),
    fontWeight: '700',
    marginTop: heightPixel(1),
  },
  progressTrack: {
    marginTop: heightPixel(8),
    height: heightPixel(6),
    width: '100%',
    borderRadius: widthPixel(6),
    backgroundColor: '#E0E0E0',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: widthPixel(6),
  },
  financialWrap: {
    marginTop: heightPixel(14),
  },
  financialCard: {
    borderWidth: 1,
    borderColor: '#DEDEDE',
    borderRadius: widthPixel(8),
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
  },
  financialHeading: {
    color: '#111111',
    fontSize: fontPixel(14),
    fontWeight: '600',
    marginBottom: heightPixel(8),
  },
  financialList: {
    backgroundColor: '#FFFFFF',
  },
  financialRow: {
    minHeight: heightPixel(36),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: widthPixel(12),
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  financialRowLast: {
    borderBottomWidth: 0,
  },
  financialRowGreen: {
    backgroundColor: '#E3F3DD',
  },
  financialRowOrange: {
    backgroundColor: '#F8EEDB',
  },
  financialLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  financialLabel: {
    marginLeft: widthPixel(10),
    color: '#5B5B5B',
    fontSize: fontPixel(12),
    fontWeight: '500',
  },
  financialAmount: {
    color: '#1F1F1F',
    fontSize: fontPixel(13),
    fontWeight: '700',
  },
});
