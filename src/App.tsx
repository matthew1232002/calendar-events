import React, { useState, useContext, useEffect } from 'react';
import { getMonth } from './utils';
import GlobalContext from './context/GlobalContext';
import { EventModal } from './components/EventModal';
import { Main, Wrapper } from './App.styled';
import { Header } from 'components/Header';
import { Sidebar } from 'components/Sidebar';
import { Month } from 'components/Month';

function App() {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const { monthIndex, showEventModal } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <>
      {showEventModal && <EventModal />}

      <Wrapper>
        <Header />
        <Main>
          <Sidebar />
          <Month month={currentMonth} />
        </Main>
      </Wrapper>
    </>
  );
}

export default App;
