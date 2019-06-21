import React, {Component} from 'react';
// import DialogWindow from './DialogWindow'
// import io from 'socket.io-client';
// import io from 'autobahn-browser/autobahn'
// import {USER_CONNECTED, LOGOUT} from './Events';
import Login from './Login'
import * as autobahn from "autobahn-browser";
import {List} from "semantic-ui-react";

const socketURL = 'ws://localhost:3040';
class Not extends Component {

    constructor(props) {
        super(props);

        this.state = {
            session: null,
            user: null,
            isOpen: false,
            topicSub: '',
            topicPub: '',
            msg: [],
            message: '',
            subState: ['qwe']
        };
        this.handleChange = this.handleChange.bind(this);
        this.publish = this.publish.bind(this);
        this.subscribe = this.subscribe.bind(this);
    }

    componentWillMount() {
        // this.initSocket();
        this.connect();
    }
    // componentDidMount(): void {
    //     this.connect.onopen();
    // };

    connect = () => {
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
            // console.log(details)

            this.setState({
                session: session,
                isOpen: true
            });
            // console.log(this.state)
        };
        session.open();

    };

    subscribe = (session, topic) => {
        let sub = '';
        console.log(this, 'sub');


        session.subscribe(topic, function (uri, payload) {
            // this.setState({socketState: payload.msg});
            this.setState({subState: [...this.state.subState, uri[0]]})

        }).then((subscription) => {
                sub = subscription;
                // console.log(this.state.subState)
                // console.log(sub);
                // this.setState({subState: [...this.state.subState, uri[0]]})
                // session.unsubscribe(sub).then( () => console.log('ok'),function (error) {
                // publish failed
                // });
            },
            function (error) {
                // publish failed
            });
    };






                // let sub = ''
                // session.subscribe("channel", function (uri, payload) {
                //     // this.setState({socketState: payload.msg});
                //     // console.log(sub)
                // }).then((subscription) => {
                //         sub = subscription;
                //         console.log(sub);
                //         // session.unsubscribe(sub).then( () => console.log('ok'),function (error) {
                //         // publish failed
                //         // });
                //     },
                //     function (error) {
                //         // publish failed
                //     });
                // session.publish("channel", [{
                //     msg: "I'm leaving..."
                // }]);







                publish = (session, topic, argc, options) => {
                    session.publish(topic, argc, {}, {acknowledge: true})
                        .then(() => {
                        // function (publication) {
                            // publish was successful
                            // console.log(' pub ', publication, argc);
                            this.setState({msg: [...this.state.msg, argc[0]]});
                            console.log(this.state)
                        }
                        // function (error) {
                        //     console.log(error)
                        // }
                        );
                };








                // session.publish('com.myapp.hello', ['Hello'], {}, {acknowledge: true}).then(
                //     function (publication) {
                //         // publish was successful
                //         console.log(' pub ' , publication )
                //     },
                //     function (error) {
                //         // publish failed
                //     });

                // session.publish('topic', [' qwe'], {}, {acknowledge: true}).then(
                //     function (publication) {
                //         console.log('pub', publication)
                //     },
                //     function (error) {
                //         console.log(error)
                //     }
                // );

                // session.unsubscribe(sub).then( () => console.log('ok'),function (error) {
                //     // publish failed
                // });

                // let done = [];
                // let counter = 0;
                //     console.log("publishing to topic 'com.myapp.topic1': " + counter);
                //     let topics = [
                //         'com.example.topic1',
                //         'com.example.topic2',
                //         'com.foobar.topic1',
                //         'com.foobar.topic2'
                //     ];
                //
                //     topics.forEach(function (topic) {
                //         done.push(session.publish(topic, null, null, {acknowledge: true}).then(
                //             function () {
                //                 console.log("ok, published to topic " + topic);
                //             },
                //             function (e) {
                //                 console.log("could not publish to topic " + topic + ": " + e.error);
                //             }
                //         )
                //             .catch((e) => {
                //                 console.log(e);
                //             }));
                //     });

                // console.log(session.id)
            // };
            // session.open();

        // };
    // };

    // List = () => {
    //     let li = this.state.subState.map( (item, index)=> {
    //         return(
    //             <li key={index}>
    //                 {item}
    //             </li>
    //         )
    //     } )
    // };

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    handleSubmit = (e) => {
        e.preventDefault();
    };
    render() {

        // const List = () => {
        let li = this.state.subState.map((item, index) => {
            return (
                <li key={index}>
                    {item}
                </li>
            )
        });
        // }
        // console.log(List.li)
        // const {socket, user} = this.state;
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input name={'topicSub'} onChange={this.handleChange}/>
                    <button onClick={() => {this.subscribe(this.state.session, this.state.topicSub)}}>subscribe</button>
                </form>
                <form onSubmit={this.handleSubmit}>
                    <input name={'topicPub'} onChange={this.handleChange}/>
                    <input name={'message'} onChange={this.handleChange}/>
                    <button onClick={() => {this.publish(this.state.session, this.state.topicPub, [this.state.message])}}>publish</button>
                </form>
                <ul>
                    {li}
                </ul>
            </div>
        )
    }
}
export default Not;