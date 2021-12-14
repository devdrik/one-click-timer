import Talbe from '../components/Table'
import ActiveTime from '../components/ActiveTime'
import ActiveToggler from '../components/ActiveToggler'
import { useState } from 'react';
import SockJsClient from "react-stomp";
import { WEBSOCKET_URL, topics } from '../config/config'

const Main = () => {

  const [date, setDate] = useState(new Date());
  const [state, setState] = useState("off")

  const onMessageReceive = (msg, topic) => {
    switch (topic) {
      case topics.status:
        setState(msg);
        break;
    
      default:
        break;
    }
  }

  return (
    <>
      <ActiveToggler state={state} setState={setState} />
      <ActiveTime selectedDate={date} setSelectedDate={setDate} state={state}/>
      <Talbe selectedDate={date} state={state} />
      <SockJsClient url={ WEBSOCKET_URL } topics={[topics.status]}
        onMessage={ onMessageReceive } ref={ (client) => {}}
        onConnect={ () => {} }
        onDisconnect={ () => {} }
        debug={ false }/>
    </>
  );
}

export default Main;
