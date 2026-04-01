import React from 'react';
import { ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SettlementsHeader from './components/SettlementsHeader';
import SettlementSelector from './components/SettlementSelector';
import SettlementSummaryCard from './components/SettlementSummaryCard';
import SettlementTabs from './components/SettlementTabs';
import SettlementRowsCard from './components/SettlementRowsCard';
import SettlementDropdownModal from './components/SettlementDropdownModal';
import SettlementMonthYearModal from './components/SettlementMonthYearModal';
import {
  DRIVER_SUMMARY,
  DURATION_OPTIONS,
  KPI_FIELDS,
  MONTH_OPTIONS,
  SETTLEMENT_ROWS_BY_TAB,
  SETTLEMENT_TABS,
} from './settlementsData';
import { styles } from './settlementStyles';
import { _getVerticalPadding } from '../../utility/Helper';

const Settlements = () => {
  const currentDate = React.useMemo(() => new Date(), []);
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const navigation = useNavigation();
  const [selectedDuration, setSelectedDuration] = React.useState(
    DURATION_OPTIONS[2],
  );
  const [selectedMonthYear, setSelectedMonthYear] = React.useState({
    month: currentMonth,
    year: currentYear,
  });
  const [pendingMonthYear, setPendingMonthYear] = React.useState({
    month: currentMonth,
    year: currentYear,
  });
  const [activeDropdown, setActiveDropdown] = React.useState(null);
  const [isMonthYearModalVisible, setIsMonthYearModalVisible] =
    React.useState(false);
  const [activeTabKey, setActiveTabKey] = React.useState('income');

  const activeRows = SETTLEMENT_ROWS_BY_TAB[activeTabKey] || [];
  const yearOptions = React.useMemo(() => {
    const startYear = 2020;
    const endYear = currentYear + 5;
    const years = [];

    for (let year = startYear; year <= endYear; year += 1) {
      years.push(year);
    }

    if (!years.includes(selectedMonthYear.year)) {
      years.push(selectedMonthYear.year);
    }

    years.sort((a, b) => a - b);

    return years;
  }, [currentYear, selectedMonthYear.year]);

  const selectedMonthLabel = React.useMemo(
    () =>
      `${MONTH_OPTIONS[selectedMonthYear.month].slice(0, 3)}, ${
        selectedMonthYear.year
      }`,
    [selectedMonthYear.month, selectedMonthYear.year],
  );

  const handleDurationPress = () => {
    setActiveDropdown('duration');
  };
  const handleMonthPress = () => {
    setPendingMonthYear(selectedMonthYear);
    setIsMonthYearModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <SettlementsHeader
        onMenuPress={() => navigation.openDrawer()}
        onNotificationPress={() => null}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.filterRow}>
          <SettlementSelector
            label="Select Duration"
            value={selectedDuration}
            onPress={handleDurationPress}
          />
          <SettlementSelector
            label="Select Month"
            value={selectedMonthLabel}
            onPress={handleMonthPress}
          />
        </View>

        {_getVerticalPadding(20)}

        <SettlementSummaryCard
          driverSummary={DRIVER_SUMMARY}
          kpiFields={KPI_FIELDS}
        />

        <SettlementTabs
          tabs={SETTLEMENT_TABS}
          activeTabKey={activeTabKey}
          onTabPress={setActiveTabKey}
        />

        <SettlementRowsCard rows={activeRows} />
      </ScrollView>

      <SettlementDropdownModal
        visible={activeDropdown === 'duration'}
        title="Select Duration"
        options={DURATION_OPTIONS}
        selectedOption={selectedDuration}
        onSelect={option => {
          setSelectedDuration(option);
          setActiveDropdown(null);
        }}
        onClose={() => setActiveDropdown(null)}
      />

      <SettlementMonthYearModal
        visible={isMonthYearModalVisible}
        months={MONTH_OPTIONS}
        years={yearOptions}
        selectedMonthIndex={pendingMonthYear.month}
        selectedYear={pendingMonthYear.year}
        onSelectMonth={month =>
          setPendingMonthYear(prev => ({ ...prev, month }))
        }
        onSelectYear={year => setPendingMonthYear(prev => ({ ...prev, year }))}
        onCancel={() => {
          setPendingMonthYear(selectedMonthYear);
          setIsMonthYearModalVisible(false);
        }}
        onDone={() => {
          setSelectedMonthYear(pendingMonthYear);
          setIsMonthYearModalVisible(false);
        }}
      />
    </View>
  );
};

export default Settlements;
