import React from 'react';
import {
  FlatList,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { heightPixel } from '../../../utility/fonts';
import { styles } from '../settlementStyles';

const YEAR_ITEM_HEIGHT = heightPixel(40);

const SettlementMonthYearModal = ({
  visible,
  months,
  years,
  selectedMonthIndex,
  selectedYear,
  onSelectMonth,
  onSelectYear,
  onCancel,
  onDone,
}) => {
  const [activeDropdown, setActiveDropdown] = React.useState(null);
  const yearListRef = React.useRef(null);

  React.useEffect(() => {
    if (!visible) {
      setActiveDropdown(null);
    }
  }, [visible]);

  const selectedYearIndex = React.useMemo(() => {
    const index = years.findIndex(year => year === selectedYear);
    return index >= 0 ? index : 0;
  }, [years, selectedYear]);

  React.useEffect(() => {
    if (!visible) {
      return;
    }

    const timer = setTimeout(() => {
      yearListRef.current?.scrollToOffset({
        offset: selectedYearIndex * YEAR_ITEM_HEIGHT,
        animated: false,
      });
    }, 0);

    return () => clearTimeout(timer);
  }, [selectedYearIndex, visible]);

  const handleYearScrollEnd = React.useCallback(
    event => {
      const offsetY = event.nativeEvent.contentOffset.y;
      const nextIndex = Math.round(offsetY / YEAR_ITEM_HEIGHT);
      const clampedIndex = Math.min(
        Math.max(nextIndex, 0),
        Math.max(0, years.length - 1),
      );
      const nextYear = years[clampedIndex];

      if (typeof nextYear === 'number' && nextYear !== selectedYear) {
        onSelectYear(nextYear);
      }
    },
    [onSelectYear, selectedYear, years],
  );

  const selectedMonthLabel = months[selectedMonthIndex] || 'Select Month';

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.modalBackdrop}>
          <TouchableWithoutFeedback>
            <View style={styles.monthYearModalCard}>
              <Text style={styles.modalTitle}>Select Month & Year</Text>

              <View style={styles.modalFieldGroup}>
                <Text style={styles.modalFieldLabel}>Month</Text>
                <TouchableOpacity
                  style={styles.modalSelectorButton}
                  onPress={() =>
                    setActiveDropdown(current =>
                      current === 'month' ? null : 'month',
                    )
                  }
                >
                  <Text style={styles.modalSelectorValue}>
                    {selectedMonthLabel}
                  </Text>
                  <Feather
                    name={
                      activeDropdown === 'month' ? 'chevron-up' : 'chevron-down'
                    }
                    size={heightPixel(14)}
                    color="#5C5C5C"
                  />
                </TouchableOpacity>

                {activeDropdown === 'month' ? (
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.modalDropdownList}
                    contentContainerStyle={styles.modalDropdownListContent}
                  >
                    {months.map((month, index) => {
                      const isActive = index === selectedMonthIndex;

                      return (
                        <TouchableOpacity
                          key={month}
                          style={[
                            styles.durationOptionItem,
                            isActive ? styles.durationOptionItemActive : null,
                          ]}
                          onPress={() => {
                            onSelectMonth(index);
                            setActiveDropdown(null);
                          }}
                        >
                          <Text
                            style={[
                              styles.durationOptionText,
                              isActive ? styles.durationOptionTextActive : null,
                            ]}
                          >
                            {month}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>
                ) : null}
              </View>

              <View style={styles.modalFieldGroup}>
                <Text style={styles.modalFieldLabel}>Year</Text>

                <View style={styles.yearDialerWrap}>
                  <FlatList
                    ref={yearListRef}
                    data={years}
                    keyExtractor={item => String(item)}
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    decelerationRate="fast"
                    snapToInterval={YEAR_ITEM_HEIGHT}
                    getItemLayout={(_, index) => ({
                      length: YEAR_ITEM_HEIGHT,
                      offset: YEAR_ITEM_HEIGHT * index,
                      index,
                    })}
                    contentContainerStyle={styles.yearDialerContent}
                    onMomentumScrollEnd={handleYearScrollEnd}
                    onScrollEndDrag={handleYearScrollEnd}
                    renderItem={({ item, index }) => {
                      const isActive = item === selectedYear;

                      return (
                        <TouchableOpacity
                          style={styles.yearDialerItem}
                          onPress={() => {
                            onSelectYear(item);
                            yearListRef.current?.scrollToOffset({
                              offset: index * YEAR_ITEM_HEIGHT,
                              animated: true,
                            });
                          }}
                        >
                          <Text
                            style={[
                              styles.yearDialerText,
                              isActive ? styles.yearDialerTextActive : null,
                            ]}
                          >
                            {item}
                          </Text>
                        </TouchableOpacity>
                      );
                    }}
                  />

                  <View
                    pointerEvents="none"
                    style={styles.yearDialerHighlight}
                  />
                </View>
              </View>

              <View style={styles.modalActionRow}>
                <TouchableOpacity
                  style={[styles.modalActionButton, styles.modalCancelButton]}
                  onPress={onCancel}
                >
                  <Text style={styles.modalCancelButtonText}>Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.modalActionButton, styles.modalDoneButton]}
                  onPress={onDone}
                >
                  <Text style={styles.modalDoneButtonText}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default SettlementMonthYearModal;
