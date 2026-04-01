import React from 'react';
import { Animated, Easing, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../transactionHistoryStyles';

const HistoryTabs = ({ tabs, activeTabKey, onTabPress }) => {
  const [tabsWidth, setTabsWidth] = React.useState(0);
  const activeTabIndex = React.useMemo(() => {
    const index = tabs.findIndex(tab => tab.key === activeTabKey);
    return index >= 0 ? index : 0;
  }, [activeTabKey, tabs]);
  const animatedIndex = React.useRef(
    new Animated.Value(activeTabIndex),
  ).current;

  const tabWidth = tabs.length > 0 ? tabsWidth / tabs.length : 0;

  React.useEffect(() => {
    Animated.timing(animatedIndex, {
      toValue: activeTabIndex,
      duration: 220,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [activeTabIndex, animatedIndex]);

  return (
    <View
      style={styles.tabsWrap}
      onLayout={event => setTabsWidth(event.nativeEvent.layout.width)}
    >
      {tabWidth > 0 ? (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.tabIndicator,
            {
              width: tabWidth,
              transform: [
                {
                  translateX: Animated.multiply(animatedIndex, tabWidth),
                },
              ],
            },
          ]}
        />
      ) : null}

      {tabs.map(tab => {
        const isActive = activeTabKey === tab.key;

        return (
          <TouchableOpacity
            key={tab.key}
            style={styles.tabButton}
            onPress={() => onTabPress(tab.key)}
          >
            <Text
              style={[styles.tabLabel, isActive ? styles.tabLabelActive : null]}
            >
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default HistoryTabs;
