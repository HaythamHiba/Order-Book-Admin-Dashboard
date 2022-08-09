import React,{useRef} from "react"
import PerfectScrollbar from "react-perfect-scrollbar"
import {
  Input,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle
} from "reactstrap"
import { Send } from "react-feather"
import senderImg from "../../../assets/img/portrait/small/avatar-s-11.jpg"
import receiverImg from "../../../assets/img/portrait/small/avatar-s-11.jpg"
import reactDom from "react-dom"
import { useTranslation } from "utility/language"
export default function ChatWidget({send,owner_id,conversation}) {
  const ref=useRef(null);
  const t=useTranslation();


  const messages =React.useMemo(()=>[
      ...conversation
  ],[conversation]) 
  const [message,setMessage]=React.useState("");

  React.useEffect(() => {
    if(ref.current){

      const chatContainer = reactDom.findDOMNode(ref.current)
      chatContainer.scrollTop = chatContainer.scrollHeight
    }
  },[conversation] );




  let renderChatList = messages.map((chat, i) => {
    return (
      <div
        key={i}
        className={`chat ${chat.user_id===owner_id ? "chat-right" : "chat-left"}`}
      >
        
        <div className="chat-avatar">
          <div className="avatar m-0">
            <img
              src={chat.user_id===owner_id ? senderImg : receiverImg}
              alt="chat avatar"
              height="40"
              width="40"
            />
          </div>
        </div>
        <div className="chat-body">
          <div className="chat-content">
            <p>{chat.message_text}</p>
          </div>
            <p className="chat-content-footer">{chat.created_at}</p>
        </div>
         
       
      </div>
    )
  })

  return (
    <Card className="chat-application chat-widget">
      <CardHeader>
        <CardTitle>Chat</CardTitle>
      </CardHeader>
      <div className="chat-app-window">
        <PerfectScrollbar
          className="user-chats widget-user-chat"
          options={{
            wheelPropagation: false
          }}
          ref={ref}
         
        >
          <div   className="chats">{renderChatList}</div>
          
        </PerfectScrollbar>
        <div    className="chat-footer">
          <CardBody className="d-flex justify-content-around">
            <Input
              className="mr-50"
              placeholder={t("type_your_message")}
              value={message}
              onChange={e =>
                  setMessage(e.target.value)
              }
            />
            <Button
              className="btn-icon"
              color="primary"
              onClick={()=>{send({message_text:message,created_at:"1/1/2555 12:40",user_id:owner_id});setMessage("")}}
              disabled={message.length===0}
            >
              <Send size={15} />
            </Button>
          </CardBody>
        </div>
      </div>
    </Card>
  )
}
