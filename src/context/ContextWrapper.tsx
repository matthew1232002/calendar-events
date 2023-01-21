import React, { useState, useEffect, useReducer, useMemo } from 'react';
import GlobalContext from './GlobalContext';
import { EventActionsType, EventItem } from 'types';
import dayjs, { Dayjs } from 'dayjs';
import { ContextProviderProps, EventsAction, HolidayResponse, LabelType } from './types';

function savedEventsReducer(state: EventItem[], { type, payload }: EventsAction) {
  switch (type) {
    case EventActionsType.IMPORT:
      return [...(payload as EventItem[])];
    case EventActionsType.PUSH:
      return [...state, payload];
    case EventActionsType.UPDATE:
      return state.map((evt) => (evt.id === (payload as EventItem).id ? payload : evt));
    case EventActionsType.DELETE:
      return state.filter((evt) => evt.id !== (payload as EventItem).id);
    default:
      throw new Error();
  }
}
function initEvents(): EventItem[] {
  const storageEvents = localStorage.getItem('savedEvents');
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  return parsedEvents;
}

export default function ContextWrapper({ children }: ContextProviderProps) {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [daySelected, setDaySelected] = useState<Dayjs>(dayjs());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [labels, setLabels] = useState<any>([]);
  const [holidayEvents, setHolidayEvents] = useState([]);
  const [savedEvents, dispatchCalEvent] = useReducer(
    savedEventsReducer,
    // @ts-ignore
    [],
    initEvents
  );

  const filteredEvents = useMemo(() => {
    return savedEvents.filter((evt: EventItem) => {
      let isContainLabel = false;
      const arr = labels.filter((lbl: LabelType) => lbl.checked).map((lbl: LabelType) => lbl.label);
      arr.forEach((item: string) => {
        if (evt.label.join('').includes(item)) isContainLabel = true;
      });
      return isContainLabel;
    });
  }, [savedEvents, labels]);

  useEffect(() => {
    localStorage.setItem('savedEvents', JSON.stringify(savedEvents));
  }, [savedEvents]);

  useEffect(() => {
    fetch('https://date.nager.at/api/v3/PublicHolidays/2023/UA')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setHolidayEvents(() => {
          const holidays = data.map((item: HolidayResponse) => ({
            title: item.localName,
            label: ['red'],
            day: dayjs(item.date).valueOf(),
            id: dayjs(item.date).valueOf(),
          }));
          localStorage.setItem('holidayEvents', JSON.stringify(holidays));
          return holidays;
        });
      });
  }, []);

  useEffect(() => {
    setLabels((prevLabels: LabelType[]) => {
      return [
        ...new Set(
          savedEvents
            .map((evt: EventItem) => {
              return evt.label;
            })
            .flat()
        ),
      ].map((label) => {
        const currentLabel = prevLabels.find((lbl) => lbl.label === label);
        return {
          label,
          checked: currentLabel ? currentLabel.checked : true,
        };
      });
    });
  }, [savedEvents]);

  useEffect(() => {
    if (!showEventModal) {
      setSelectedEvent(null);
    }
  }, [showEventModal]);

  function updateLabel(label: LabelType) {
    setLabels(labels.map((lbl: LabelType) => (lbl.label === label.label ? label : lbl)));
  }

  return (
    <GlobalContext.Provider
      value={{
        monthIndex,
        setMonthIndex,
        daySelected,
        setDaySelected,
        showEventModal,
        setShowEventModal,
        dispatchCalEvent,
        selectedEvent,
        setSelectedEvent,
        savedEvents,
        setLabels,
        labels,
        updateLabel,
        filteredEvents,
        holidayEvents,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
