export const HISTORY_TABS = [
  {
    key: 'securityDeposit',
    label: 'Security Deposit',
  },
  {
    key: 'driverPaid',
    label: 'Driver Paid',
  },
  {
    key: 'collectedPayment',
    label: 'Collected Payment',
  },
];

export const SUMMARY_BY_TAB = {
  securityDeposit: {
    title: 'Security Deposit Til Date',
    amount: 7055,
  },
  driverPaid: {
    title: 'Driver Paid Til Date',
    amount: 9055,
  },
  collectedPayment: {
    title: 'Collected Payment Til Date',
    amount: 8250,
  },
};

export const TRANSACTIONS_BY_TAB = {
  securityDeposit: [
    {
      id: 'sd-1',
      title: 'Security Deposit',
      month: 2,
      year: 2026,
      monthLabel: 'Mar, 2026',
      referenceId: 'Ref : 809546458345587',
      amount: 1250,
      amountTypeLabel: 'Tid',
    },
    {
      id: 'sd-2',
      title: 'Security Deposit',
      month: 1,
      year: 2026,
      monthLabel: 'Feb, 2026',
      referenceId: 'Ref : 809546458345588',
      amount: 900,
      amountTypeLabel: 'Tid',
    },
    {
      id: 'sd-3',
      title: 'Security Deposit',
      month: 11,
      year: 2025,
      monthLabel: 'Dec, 2025',
      referenceId: 'Ref : 809546458345589',
      amount: 450,
      amountTypeLabel: 'Tid',
    },
  ],
  driverPaid: [
    {
      id: 'dp-1',
      title: 'Driver Paid',
      month: 2,
      year: 2026,
      monthLabel: 'Mar, 2026',
      referenceId: 'Ref : 809546458345587',
      amount: 1755,
      amountTypeLabel: 'Tid',
    },
    {
      id: 'dp-2',
      title: 'Driver Paid',
      month: 1,
      year: 2026,
      monthLabel: 'Feb, 2026',
      referenceId: 'Ref : 809546458345592',
      amount: 2300,
      amountTypeLabel: 'Tid',
    },
    {
      id: 'dp-3',
      title: 'Driver Paid',
      month: 1,
      year: 2026,
      monthLabel: 'Feb, 2026',
      referenceId: 'Ref : 809546458345593',
      amount: 5000,
      amountTypeLabel: 'Tid',
    },
    {
      id: 'dp-4',
      title: 'Driver Paid',
      month: 11,
      year: 2025,
      monthLabel: 'Dec, 2025',
      referenceId: 'Ref : 809546458345594',
      amount: 1020,
      amountTypeLabel: 'Tid',
    },
  ],
  collectedPayment: [
    {
      id: 'cp-1',
      title: 'Collected Payment',
      month: 2,
      year: 2026,
      monthLabel: 'Mar, 2026',
      referenceId: 'Ref : 809546458345587',
      amount: 1490,
      amountTypeLabel: 'Tid',
    },
    {
      id: 'cp-2',
      title: 'Collected Payment',
      month: 1,
      year: 2026,
      monthLabel: 'Feb, 2026',
      referenceId: 'Ref : 809546458345590',
      amount: 3250,
      amountTypeLabel: 'Tid',
    },
    {
      id: 'cp-3',
      title: 'Collected Payment',
      month: 11,
      year: 2025,
      monthLabel: 'Dec, 2025',
      referenceId: 'Ref : 809546458345593',
      amount: 3510,
      amountTypeLabel: 'Tid',
    },
  ],
};
