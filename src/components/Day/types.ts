import { Dayjs } from 'dayjs';
import { EventItem } from '../../types';

export interface DayProps {
  day: Dayjs;
  rowIdx: number;
  dayEvents: EventItem[];
}
