import React from 'react';
import { Animated, Easing, FlatList, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MonthFilter from './components/MonthFilter';
import HistoryTabs from './components/HistoryTabs';
import TransactionSummaryCard from './components/TransactionSummaryCard';
import TransactionHistoryHeader from './components/TransactionHistoryHeader';
import TransactionListItem from './components/TransactionListItem';
import TransactionFooterActions from './components/TransactionFooterActions';
import MonthYearPickerModal from './components/MonthYearPickerModal';
import {
  HISTORY_TABS,
  SUMMARY_BY_TAB,
  TRANSACTIONS_BY_TAB,
} from './transactionHistoryData';
import { styles } from './transactionHistoryStyles';

const RowSeparator = () => <View style={styles.rowSeparator} />;
const MONTH_NAMES = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const TransactionHistory = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const [activeTabKey, setActiveTabKey] = React.useState('driverPaid');
  const [isMonthPickerVisible, setIsMonthPickerVisible] = React.useState(false);
  const [appliedMonthYear, setAppliedMonthYear] = React.useState({
    month: 2,
    year: 2026,
  });
  const [pendingMonthYear, setPendingMonthYear] = React.useState({
    month: 2,
    year: 2026,
  });
  const contentTransition = React.useRef(new Animated.Value(1)).current;

  const allAvailableYears = React.useMemo(() => {
    const years = new Set([new Date().getFullYear()]);
    Object.values(TRANSACTIONS_BY_TAB)
      .flat()
      .forEach(transaction => {
        if (typeof transaction.year === 'number') {
          years.add(transaction.year);
        }
      });

    return Array.from(years).sort((a, b) => b - a);
  }, []);

  const formatMonthYear = React.useCallback(
    monthYear => `${MONTH_NAMES[monthYear.month]}, ${monthYear.year}`,
    [],
  );

  const selectedMonth = formatMonthYear(pendingMonthYear);
  const activeTransactions = React.useMemo(() => {
    const transactions = TRANSACTIONS_BY_TAB[activeTabKey] || [];

    return transactions.filter(
      transaction =>
        transaction.month === appliedMonthYear.month &&
        transaction.year === appliedMonthYear.year,
    );
  }, [activeTabKey, appliedMonthYear.month, appliedMonthYear.year]);

  const baseSummary = SUMMARY_BY_TAB[activeTabKey] || SUMMARY_BY_TAB.driverPaid;
  const totalAmountForMonth = React.useMemo(
    () =>
      activeTransactions.reduce(
        (totalAmount, transaction) =>
          totalAmount + (Number(transaction.amount) || 0),
        0,
      ),
    [activeTransactions],
  );
  const activeSummary = React.useMemo(
    () => ({
      title: `${baseSummary.title} (${formatMonthYear(appliedMonthYear)})`,
      amount: totalAmountForMonth,
    }),
    [appliedMonthYear, baseSummary.title, formatMonthYear, totalAmountForMonth],
  );

  const runContentTransition = React.useCallback(
    updateAction => {
      contentTransition.stopAnimation();
      Animated.timing(contentTransition, {
        toValue: 0,
        duration: 120,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (!finished) {
          return;
        }

        updateAction();
        contentTransition.setValue(0);
        Animated.timing(contentTransition, {
          toValue: 1,
          duration: 220,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }).start();
      });
    },
    [contentTransition],
  );

  const handleMonthPress = () => {
    setIsMonthPickerVisible(true);
  };

  const handleMonthApplyPress = () => {
    if (
      pendingMonthYear.month === appliedMonthYear.month &&
      pendingMonthYear.year === appliedMonthYear.year
    ) {
      return;
    }

    runContentTransition(() => {
      setAppliedMonthYear(pendingMonthYear);
    });
  };

  const handleTabPress = tabKey => {
    if (tabKey === activeTabKey) {
      return;
    }

    runContentTransition(() => {
      setActiveTabKey(tabKey);
    });
  };

  const animatedContentStyle = React.useMemo(
    () => ({
      opacity: contentTransition,
      transform: [
        {
          translateY: contentTransition.interpolate({
            inputRange: [0, 1],
            outputRange: [8, 0],
          }),
        },
      ],
    }),
    [contentTransition],
  );

  return (
    <View style={styles.container}>
      <TransactionHistoryHeader
        onMenuPress={() => navigation.openDrawer()}
        onNotificationPress={() => null}
      />

      <View style={styles.contentWrap}>
        <View style={styles.headerControlsWrap}>
          <MonthFilter
            selectedMonth={selectedMonth}
            onMonthPress={handleMonthPress}
            onApplyPress={handleMonthApplyPress}
          />

          <HistoryTabs
            tabs={HISTORY_TABS}
            activeTabKey={activeTabKey}
            onTabPress={handleTabPress}
          />
        </View>

        <Animated.View
          style={[styles.animatedContentWrap, animatedContentStyle]}
        >
          <TransactionSummaryCard summary={activeSummary} />

          <FlatList
            data={activeTransactions}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <TransactionListItem item={item} />}
            ItemSeparatorComponent={RowSeparator}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyStateWrap}>
                <Text style={styles.emptyStateText}>
                  No transactions found for this month.
                </Text>
              </View>
            }
          />
        </Animated.View>
      </View>

      <MonthYearPickerModal
        visible={isMonthPickerVisible}
        selectedMonth={pendingMonthYear.month}
        selectedYear={pendingMonthYear.year}
        years={allAvailableYears}
        onSelectMonth={month =>
          setPendingMonthYear(prev => ({ ...prev, month }))
        }
        onSelectYear={year => setPendingMonthYear(prev => ({ ...prev, year }))}
        onCancel={() => {
          setPendingMonthYear(appliedMonthYear);
          setIsMonthPickerVisible(false);
        }}
        onDone={() => setIsMonthPickerVisible(false)}
      />

      <TransactionFooterActions
        onPayNowPress={() => null}
        onCollectPaymentPress={() => null}
        footerPaddingBottom={Math.max(insets.bottom, 10)}
      />
    </View>
  );
};

export default TransactionHistory;
