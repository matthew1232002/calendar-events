import dayjs from 'dayjs';
import React, { useContext, useState, useEffect, MouseEvent } from 'react';
import GlobalContext from 'context/GlobalContext';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { EventItem } from 'types';
import { getCurrentDayClass } from './utils';
import { Main, DayName, DayHeader, DayNum, EvtItem, EventsContainer } from './Day.styled';
import { DayProps } from './types';

export function Day({ day, rowIdx, dayEvents }: DayProps) {
  const [holidays, setHolidays] = useState<EventItem[]>([]);
  const { setDaySelected, setShowEventModal, setSelectedEvent, holidayEvents } =
    useContext(GlobalContext);

  useEffect(() => {
    const events = holidayEvents.filter(
      (evt) => dayjs(evt.day).format('DD-MM-YY') === day.format('DD-MM-YY')
    );

    setHolidays(events);
  }, [holidayEvents, day]);

  const handleOpenModal = (e: MouseEvent<HTMLDivElement>) => {
    setDaySelected(day);
    setShowEventModal(true);
  };

  return (
    <Main>
      <DayHeader>
        {rowIdx === 0 && <DayName>{day.format('ddd').toUpperCase()}</DayName>}
        <DayNum style={{ ...getCurrentDayClass(day) }}>{day.format('DD')}</DayNum>
      </DayHeader>
      <Droppable droppableId={String(day.valueOf())}>
        {(provided) => (
          <EventsContainer
            {...provided.droppableProps}
            ref={provided.innerRef}
            onClick={handleOpenModal}
          >
            {holidays.map((evt, idx) => (
              <EvtItem key={idx} bgColor={evt.label[0]}>
                {evt.title}
              </EvtItem>
            ))}
            {dayEvents.map((evt, idx) => (
              <Draggable key={String(evt.id)} draggableId={String(evt.id)} index={idx}>
                {(provided) => (
                  <EvtItem
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    bgColor={evt.label[0]}
                    onClick={() => setSelectedEvent(evt)}
                  >
                    {evt.title}
                    {' | '}
                    labels: {evt.label.join(' ')}
                  </EvtItem>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </EventsContainer>
        )}
      </Droppable>
    </Main>
  );
}
