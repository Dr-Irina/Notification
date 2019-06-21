import React, {useState, useEffect} from 'react';
import * as autobahn from "autobahn-browser";
import NotifGroups from './NotifGroups'

function Notif()  {
  const [openSession, setOpenSession] = useState(null);
  const [topicSub, setTopicSub] = useState('');
  const [topicPub, setTopicPub] = useState('');
  const [msg, setMsg] = useState([]);
  const [message, setMessage] = useState('');
  const [subState, setSubState] = useState(['qwe']);

  const  connect = () => {
      const session = new autobahn.Connection({
          url: 'ws://127.0.0.1:3040',
          realm: 'realm1',
          authid: 'user',
          authmethods: ["wampcra"],
          // onchallenge: onchallenge
          socketState: ''
      });

      // const onopen = (session) => {
      session.onopen = (session, details) => {
          console.log('Connected!!!!', session);
          setOpenSession(session);
      };
      session.open();

  };
  useEffect(() => {
      connect();
  },[]);

  const subscribe = (session, topic) => {
      let sub = '';
      session.subscribe(topic, function (uri, payload) {
          subState.unshift(uri[0])
          setSubState([...subState, uri[0]]);
          // setSubState(subState);
          console.log(subState, 'test1');

      }).then((subscription) => {
              sub = subscription;
              console.log('test2')
          },
          function (error) {
              // publish failed
          }).then(() => {
                setSubState(subState);
      });
  };

  const publish = (session, topic, argc, options) => {
      session.publish(topic, argc, {}, {acknowledge: true, exclude_me: false})
          .then(() => {
              setMsg([...msg, argc[0]])
              },
              function (error) {
                  console.log(error)
              }
          );
  };
  const handleChange1 = (e) => {
        setTopicSub(e.target.value);
    };
  const handleChange2 = (e) => {
        setTopicPub(e.target.value);
    };
    const handleChange3 = (e) => {
        setMessage(e.target.value);
    };

  const handleSubmit = (e) => {
        e.preventDefault();
    };

  let li = subState.map((item, index) => {
        return (
            <li key={index}>
                {item}
            </li>
        )
    });

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name={'topicSub'} onChange={handleChange1}/>
                <button onClick={() => {subscribe(openSession, topicSub)}}>subscribe</button>
            </form>
            <form onSubmit={handleSubmit}>
                <input name={'topicPub'} onChange={handleChange2}/>
                <input name={'message'} onChange={handleChange3}/>
                <button onClick={() => {publish(openSession, topicPub, [message])}}>publish</button>
            </form>
            <NotifGroups notif={subState}/>
        </div>
    )
}
export default Notif;
