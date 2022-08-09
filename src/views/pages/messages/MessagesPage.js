// import { useGetShops } from 'api/shops'
// import React from 'react'
// import { Col, Row } from 'reactstrap'
// import { StatusCard } from "components/StatusCard";
// import Shops from './shops/Shops';
// import ShopConversation from './conversation/ShopConversation';


// export default function MessagesPage() {
//     const {data,isLoading,isError}=useGetShops();
//     const [selectedShop,setSelectedShop]=React.useState("");
//     const [messages,setMessages]=React.useState([ 
//         {
//             user_id:50,
//             message_text:"hello",
//             created_at:"1/1/2001 14:20"

//         },
//         {
//             user_id:50,
//             message_text:"hello",
//             created_at:"1/1/2001 14:20"

//         },
//         {
//             user_id:1,
//             message_text:"hello",
//             created_at:"1/1/2001 14:20"

//         },
//         {
//             user_id:50,
//             message_text:"hello",
//             created_at:"1/1/2001 14:20"

//         },   {
//             user_id:50,
//             message_text:"hello",
//             created_at:"1/1/2001 14:20"

//         },   {
//             user_id:50,
//             message_text:"hello",
//             created_at:"1/1/2001 14:20"

//         },
//         {
//             user_id:50,
//             message_text:"hello",
//             created_at:"1/1/2001 14:20"

//         },
//         {
//             user_id:50,
//             message_text:"hello",
//             created_at:"1/1/2001 14:20"

//         },
//         {
//             user_id:50,
//             message_text:"hello",
//             created_at:"1/1/2001 14:20"

//         }
//     ]);

//     if(!data){
//         return <StatusCard isLoading={isLoading} isError={isError}/>
//     }
//     const handleShopClicked=(id)=>{
//         console.log(id);
//         setSelectedShop(id);
//     }
//     const handleSendMessage=(message)=>{
//             setMessages(prev=>[...prev,message])
//     }
   
//   return (
//     <Row >
//         <Col xs={4}>
//         <Shops data={data?.shops} ClickedShop={handleShopClicked}/>

//         </Col>
//         <Col xs={8}>
//         <ShopConversation selectedShop={selectedShop}   data={messages} clicked={handleSendMessage}/>

//         </Col>
//     </Row>
//   )
// }

import React from 'react'
import { useTranslation } from 'utility/language'

export default function MessagesPage() {
    const t=useTranslation();
  return (
    <div>{t("comming_soon")}</div>
  )
}
