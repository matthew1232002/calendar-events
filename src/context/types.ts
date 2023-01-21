import { EventActionsType, EventItem } from 'types';
import { ReactNode } from 'react';
import { Dayjs } from 'dayjs';

export interface LabelType {
  label: string;
  checked: boolean;
}

interface DispatchEventType {
  type: string;
  payload: EventItem | EventItem[];
}

export interface GlobalContextType {
  monthIndex: number;
  setMonthIndex: (index: number) => void;
  daySelected: Dayjs;
  setDaySelected: (day: Dayjs) => void;
  showEventModal: boolean;
  setShowEventModal: (isShow: boolean) => void;
  dispatchCalEvent: ({ type, payload }: DispatchEventType) => void;
  savedEvents: EventItem[];
  selectedEvent: EventItem | null;
  setSelectedEvent: (evt: EventItem | null) => void;
  setLabels: (labels: LabelType[]) => void;
  labels: LabelType[];
  updateLabel: ({ label, checked }: LabelType) => void;
  filteredEvents: EventItem[];
  holidayEvents: EventItem[];
}

export interface ContextProviderProps {
  children: ReactNode;
}

export interface HolidayResponse {
  localName: string;
  date: string;
}

export interface EventsAction {
  type: EventActionsType;
  payload: EventItem | EventItem[];
}
