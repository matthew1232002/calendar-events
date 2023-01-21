import dayjs from 'dayjs';
import React, { ChangeEvent, useContext, useState } from 'react';
import GlobalContext from 'context/GlobalContext';
import {
  Main,
  ArrowLeft,
  ArrowRight,
  CurrentDate,
  SearchByText,
  Input,
  Button,
  EventItemStyled,
  EventsContainer,
} from './Header.styled';
import { EventActionsType, EventItem } from 'types';
import { exportDataJson, getElementAsImage } from 'utils';
import { messages } from './messages';
import { CALENDAR_ID } from '../../constants';

export function Header() {
  const { monthIndex, setMonthIndex, filteredEvents, dispatchCalEvent } = useContext(GlobalContext);
  const [filteredByTitle, setFilteredByTitle] = useState<EventItem[]>([]);

  const handlePrevMonth = () => {
    setMonthIndex(monthIndex - 1);
  };
  const handleNextMonth = () => {
    setMonthIndex(monthIndex + 1);
  };
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    if (!value) return setFilteredByTitle([]);
    setFilteredByTitle(filteredEvents.filter((evt) => evt.title.includes(value)));
  };
  const importData = (e: ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    fileReader.readAsText((e.target as any).files[0], 'UTF-8');
    fileReader.onload = (e) => {
      const value = e.target!.result;
      if (typeof value === 'string') {
        const result = JSON.parse(value);
        dispatchCalEvent({ type: EventActionsType.IMPORT, payload: result });
      }
    };
  };

  return (
    <Main>
      <ArrowLeft onClick={handlePrevMonth} />
      <ArrowRight onClick={handleNextMonth} />
      <CurrentDate>{dayjs(new Date(dayjs().year(), monthIndex)).format('MMMM YYYY')}</CurrentDate>
      <SearchByText>
        <Input onChange={onChangeHandler} />
        <EventsContainer>
          {filteredByTitle.map(({ label, title }, idx) => (
            <EventItemStyled key={idx} style={{ background: label[0] }}>
              {title}
            </EventItemStyled>
          ))}
        </EventsContainer>
      </SearchByText>
      <Button onClick={() => exportDataJson(filteredEvents)}>{messages.exportData}</Button>
      <Button>
        <label htmlFor="file">{messages.importData}</label>
        <input type="file" id="file" accept=".json" hidden onChange={importData} />
      </Button>
      <Button onClick={() => getElementAsImage(CALENDAR_ID)}>{messages.getImage}</Button>
    </Main>
  );
}
