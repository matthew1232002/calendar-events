import React, { useContext } from 'react';
import { Day } from '../Day';
import { Main } from './Month.styled';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import GlobalContext from 'context/GlobalContext';
import { EventActionsType, EventItem } from 'types';
import { MonthProps } from './types';
import { CALENDAR_ID } from '../../constants';

export function Month({ month }: MonthProps) {
  const { filteredEvents, dispatchCalEvent } = useContext(GlobalContext);

  const renderDays = () => {
    return month.map((row, i) => (
      <React.Fragment key={i}>
        {row.map((day, idx) => {
          const events = filteredEvents.filter((evt) => evt.day === day.valueOf());
          return <Day day={day} key={idx} rowIdx={i} dayEvents={events} />;
        })}
      </React.Fragment>
    ));
  };

  const handleOnDragEnd = (result: DropResult) => {
    const { destination, draggableId, source } = result;
    if (!destination) return;

    if (source.droppableId !== destination.droppableId) {
      const currentEvt: EventItem = filteredEvents.find((item) => item.id === +draggableId)!;
      currentEvt.day = +destination.droppableId;
      const destinationEvents = filteredEvents.filter((item) => item.day === currentEvt.day);
      const destinationUpdated = destinationEvents.filter((item) => item.id !== currentEvt.id);
      destinationUpdated.splice(destination.index, 0, currentEvt);
      const eventsWithoutCurr = filteredEvents.filter((item) => item.id !== currentEvt.id);
      const reorderedEvents = [...new Set([...destinationUpdated, ...eventsWithoutCurr])];
      return dispatchCalEvent({ type: EventActionsType.IMPORT, payload: reorderedEvents });
    }

    const currentEvt: EventItem = filteredEvents.find((item) => item.id === +draggableId)!;
    currentEvt.day = +destination.droppableId;
    const reorderedEvents = filteredEvents.filter((item) => item.id !== currentEvt.id);
    reorderedEvents.splice(destination.index, 0, currentEvt);
    dispatchCalEvent({ type: EventActionsType.IMPORT, payload: reorderedEvents });
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Main id={CALENDAR_ID}>{renderDays()}</Main>
    </DragDropContext>
  );
}
