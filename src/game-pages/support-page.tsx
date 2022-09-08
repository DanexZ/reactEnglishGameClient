import React, { useContext, useState } from "react";
import AppStateContext from "../context/AppStateContext";
import { Conversation } from "../data/models";
import AppStateInterface from "../data/types/AppStateInterface";
import ConversationsList from "../components/ConversationsList";
import ConversationPage from "./conversation-page";

const SupportPage = () => {

    const appState: AppStateInterface = useContext(AppStateContext);
    const [conversation, setConversation]: [Conversation | null, Function] = useState(null);

    
    return (
        <React.Fragment>
            {!conversation && <ConversationsList appState={appState} setConversation={setConversation} />}
            {conversation && <ConversationPage appState={appState} conversation={conversation} setConversation={setConversation} /> }
        </React.Fragment>
    )
}

export default SupportPage