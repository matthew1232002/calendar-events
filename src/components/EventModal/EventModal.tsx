import React, { ChangeEvent, FormEvent, MouseEvent, useContext, useState } from 'react';
import GlobalContext from 'context/GlobalContext';
import Select from 'react-select';
import {
  Main,
  Form,
  ModalHeader,
  Controllers,
  ModalBtn,
  EvtDate,
  InputStyled,
  Footer,
  SaveBtn,
  Info,
  InfoContent,
} from './EventModal.styled';
import { COLOUR_OPTIONS, COLOUR_STYLES } from './constants';
import { EventActionsType } from 'types';
import { messages } from './messages';

export function EventModal() {
  const { setShowEventModal, daySelected, dispatchCalEvent, selectedEvent } =
    useContext(GlobalContext);
  const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : '');
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent ? selectedEvent.label : undefined
  );

  const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!selectedLabel || !selectedLabel.length) return;
    const calendarEvent = {
      title,
      label: selectedLabel,
      day: daySelected!.valueOf(),
      id: selectedEvent ? selectedEvent.id : Date.now(),
    };
    if (selectedEvent) {
      dispatchCalEvent({ type: EventActionsType.UPDATE, payload: calendarEvent });
    } else {
      dispatchCalEvent({ type: EventActionsType.PUSH, payload: calendarEvent });
    }

    setShowEventModal(false);
  };

  const onSelectHandler = (options: any) => {
    const values = options && options.map((option: HTMLInputElement) => option.value);
    setSelectedLabel(values);
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setTitle(value);
  };

  const onRemoveHandler = (e: MouseEvent<HTMLButtonElement>) => {
    dispatchCalEvent({
      type: EventActionsType.DELETE,
      payload: selectedEvent!,
    });
    setShowEventModal(false);
  };

  return (
    <Main>
      <Form>
        <ModalHeader>
          <Controllers>
            {selectedEvent && (
              <ModalBtn type="button" onClick={onRemoveHandler}>
                {messages.delete}
              </ModalBtn>
            )}
            <ModalBtn type="button" onClick={() => setShowEventModal(false)}>
              {messages.close}
            </ModalBtn>
          </Controllers>
        </ModalHeader>
        <Info>
          <InfoContent>
            <Select
              onChange={onSelectHandler}
              defaultValue={selectedLabel?.map((lbl) => ({
                value: lbl,
                label: lbl,
                color: lbl,
              }))}
              closeMenuOnSelect={false}
              isMulti
              options={COLOUR_OPTIONS}
              styles={COLOUR_STYLES}
            />
            <EvtDate>{daySelected!.format('dddd, MMMM DD')}</EvtDate>
            <InputStyled value={title} onChange={onChangeHandler} />
          </InfoContent>
        </Info>
        <Footer>
          <SaveBtn type="submit" onClick={handleSubmit}>
            {messages.save}
          </SaveBtn>
        </Footer>
      </Form>
    </Main>
  );
}
