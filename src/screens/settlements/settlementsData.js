export const DURATION_OPTIONS = ['Daily', 'Weekly', 'Monthly'];
export const MONTH_OPTIONS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const SETTLEMENT_TABS = [
  {
    key: 'income',
    label: 'Income',
  },
  {
    key: 'deduction',
    label: 'Deduction',
  },
  {
    key: 'cash',
    label: 'Cash',
  },
  {
    key: 'payment',
    label: 'Payment',
  },
];

export const DRIVER_SUMMARY = {
  driverName: 'Manoj Sharma',
  carNumber: 'MH026673',
  scheme: 'Scheme',
};

export const KPI_FIELDS = [
  {
    key: 'userWebDays',
    label: 'User Web Days',
    value: '0.00',
  },
  {
    key: 'offlineWebDays',
    label: 'Offline Web Days',
    value: '0.00',
  },
  {
    key: 'loginHrs',
    label: 'Login Hrs',
    value: '0.00',
  },
  {
    key: 'offlineHrs',
    label: 'Offline Hrs',
    value: '0.00',
  },
  {
    key: 'tripDone',
    label: 'Trip Done',
    value: '0.00',
  },
  {
    key: 'demandTrip',
    label: 'Demand Trip',
    value: '0.00',
  },
  {
    key: 'totalTripEco',
    label: 'Total Trips Eco',
    value: '0.00',
  },
  {
    key: 'acceptanceRate',
    label: 'Acceptance Rate',
    value: '0.00',
  },
  {
    key: 'cancellationRun',
    label: 'Cancellation Run',
    value: '0.00',
  },
  {
    key: 'rating',
    label: 'Rating',
    value: '0.00',
  },
];

export const SETTLEMENT_ROWS_BY_TAB = {
  income: [
    { id: 'A', title: 'Uber Earning', amount: 0 },
    { id: 'B', title: 'Other Revenue', amount: 0 },
    { id: 'C', title: 'Toll Refund', amount: 0 },
    { id: 'D', title: 'Gross Revenue', amount: 0 },
    { id: 'E', title: 'Sharing(5%)', amount: 0 },
    { id: 'F', title: 'Driver Partner Share', amount: 0 },
    { id: 'G', title: 'Trip', amount: 0 },
    { id: 'H', title: 'Trip Base Revenue (TBR)', amount: 0 },
    { id: 'I', title: 'Revenue Base Incentive (RBI)', amount: 0 },
    { id: 'J', title: 'Referral', amount: 0 },
    { id: 'K', title: 'Joining Bonus', amount: 0 },
    { id: 'L', title: 'Retention Bonus', amount: 0 },
    { id: 'M', title: 'Adjustment', amount: 0 },
    { id: 'N', title: 'Attendance Bonus', amount: 0 },
    { id: 'O', title: 'Additional Addon', amount: 0 },
    { id: 'P', title: 'Subtotal Income', amount: 0, isStrong: true },
  ],
  deduction: [
    { id: 'A', title: 'Fuel Card Advance', amount: 0 },
    { id: 'B', title: 'Penalty', amount: 0 },
    { id: 'C', title: 'Damage Recovery', amount: 0 },
    { id: 'D', title: 'Insurance', amount: 0 },
    { id: 'E', title: 'Other Deductions', amount: 0 },
  ],
  cash: [
    { id: 'A', title: 'Cash Collected', amount: 0 },
    { id: 'B', title: 'Cash Deposited', amount: 0 },
    { id: 'C', title: 'Cash In Hand', amount: 0, isStrong: true },
  ],
  payment: [
    { id: 'A', title: 'Net Payable', amount: 0, isStrong: true },
    { id: 'B', title: 'Paid Amount', amount: 0 },
    { id: 'C', title: 'Balance', amount: 0 },
  ],
};
