import React from 'react';
import { ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SettlementsHeader from './components/SettlementsHeader';
import SettlementSelector from './components/SettlementSelector';
import SettlementSummaryCard from './components/SettlementSummaryCard';
import SettlementTabs from './components/SettlementTabs';
import SettlementRowsCard from './components/SettlementRowsCard';
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
  const navigation = useNavigation();
  const [selectedDurationIndex, setSelectedDurationIndex] = React.useState(2);
  const [selectedMonthIndex, setSelectedMonthIndex] = React.useState(2);
  const [activeTabKey, setActiveTabKey] = React.useState('income');

  const activeRows = SETTLEMENT_ROWS_BY_TAB[activeTabKey] || [];

  const handleDurationPress = () => {
    setSelectedDurationIndex(current =>
      current === DURATION_OPTIONS.length - 1 ? 0 : current + 1,
    );
  };
  const handleMonthPress = () => {
    setSelectedMonthIndex(current =>
      current === MONTH_OPTIONS.length - 1 ? 0 : current + 1,
    );
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
            value={DURATION_OPTIONS[selectedDurationIndex]}
            onPress={handleDurationPress}
          />
          <SettlementSelector
            label="Select Month"
            value={MONTH_OPTIONS[selectedMonthIndex]}
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
    </View>
  );
};

export default Settlements;
