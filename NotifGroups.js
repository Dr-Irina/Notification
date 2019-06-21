import React , {useState, useEffect} from 'react';
import {Card, Feed } from "semantic-ui-react";


const NotifGroups = (props, prevprops) => {
    console.log(props.notif)

    const [notif, setNotif] = useState(props.notif)
    function propsChange(oldprops, newprops) {
        // oldprops = notif;
        // newprops = props;
        if(oldprops !== newprops) {
            console.log(typeof props.notif, 'props notif')
            console.log(notif, 'notif')
            let x = props.notif;
            console.log(x.lenght, 'props notif lemgjt')
            // setNotif([...notif, props.notif[props.notif.lenght - 1]]);
        } else {
        console.log(notif)

    }
    }
    propsChange(notif, props.notif);
    // useEffect(() => {
    //     setNotif(props.notif);
    //
    // }, [props]);

    let NotifList = notif.map((item, index) => {
        // console.log(item)
        return(
            //<Card.Group>
            //{/*<Card>*/}
            //  {/*/<Feed>*/}
            // {/*    <Feed.Event>*/}
            //       {/*<Feed.Label image={props.props.img}/>*/}
            //     {/*<Feed.Content>*/}
            //       {/*<Feed.Date>{props.props.date}</Feed.Date>*/}
            //     {/*<Feed.Summary>*/}
            //       {/*<a href={props.props.userUrl}>{props.props.user}</a> опубликовал(а) новый пост в группе <a href={props.props.groupUrl}>{props.props.nameGroup}</a>*/}

            <p>{item}</p>
            //                        {/*</Feed.Summary>*/}
            //                  {/*</Feed.Content>*/}
            //            {/*</Feed.Event>*/}
            //      {/*</Feed>*/}
            //{/*</Card>*/}
            //   {/*// </Card.Group>*/}
        )
    } );

    return(
        <Card.Group style={{marginTop: '10%'}}>
            {NotifList}
        </Card.Group>
    )

};
export default NotifGroups;