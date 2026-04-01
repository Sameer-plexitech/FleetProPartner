export const ATTENDANCE_LEGEND = [
  {
    key: 'pwc',
    label: 'PWC : 0',
    bg: '#E5F7EA',
    text: '#1B9A45',
  },
  {
    key: 'p',
    label: 'P : 0',
    bg: '#E8F1FF',
    text: '#2E65C8',
  },
  {
    key: 'a',
    label: 'A : 0',
    bg: '#FFE9E6',
    text: '#D64A2F',
  },
  {
    key: 'l',
    label: 'L : 0',
    bg: '#FFEEDA',
    text: '#D18A27',
  },
];

export const ATTENDANCE_CONFIG = {
  initialDate: new Date().toISOString().slice(0, 10),
  markedDates: {
    [new Date().toISOString().slice(0, 10)]: {
      selected: true,
      selectedColor: '#0D1D9C',
      selectedTextColor: '#FFFFFF',
    },
  },
};
