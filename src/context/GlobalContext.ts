import React from 'react';
import { GlobalContextType } from './types';
import { EventItem } from '../types';
import dayjs from 'dayjs';

const GlobalContext = React.createContext<GlobalContextType>({
  monthIndex: 0,
  setMonthIndex: (index) => {},
  daySelected: dayjs(),
  setDaySelected: (day) => {},
  showEventModal: false,
  setShowEventModal: (isShow) => {},
  dispatchCalEvent: ({ type, payload }) => {},
  savedEvents: [],
  selectedEvent: null,
  setSelectedEvent: (evt: EventItem | null) => {},
  setLabels: (labels) => {},
  labels: [],
  updateLabel: ({ label, checked }) => {},
  filteredEvents: [],
  holidayEvents: [],
});

export default GlobalContext;
