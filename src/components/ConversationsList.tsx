import React, { useContext, useState } from "react";
import AppDispatchContext from "../context/AppDispatchContext";
import { AppAction } from "../data/actions/AppAction";
import { Conversation } from "../data/models";
import AppStateInterface from "../data/types/AppStateInterface";
import { useInitialFieldState, useLiveValidation } from "../hooks/useLiveValidation";
import Alert from "../lib/Alert";
import { createAsyncConversation } from "../lib/api";
import { getDate } from "../utils/date/getDate";
import { updateState } from "../utils/updateState";
import SinglePageWrapper from "./shared/SinglePageWrapper";
import TransparentBox from "./shared/TransparentBox/TransparentBox";

const ConversationsList = ({appState, setConversation} : {appState: AppStateInterface, setConversation: Function}) => {

    const appDispatch: Function = useContext(AppDispatchContext);

    const [conversationTitle, setConversationTitle] = useState(useInitialFieldState());
    const [message, setMessage] = useState(useInitialFieldState());

    const { getFormErrors }: any = useLiveValidation({
        
        conversationTitle: {
            state: conversationTitle,
            setState: setConversationTitle,
            ...conversationTitle
        },

        message: {
            state: message,
            setState: setMessage,
            ...message
        }

    });



    const handleSubmit = () => {

        const errors = getFormErrors();

        if (!errors.length) {

            createAsyncConversation(appState.user.id, conversationTitle.value, message.value, appState.user.token, {

                next: (data: any) => {

                    if (data.success) {

                        const createdConversation: Conversation = {
                            id: data.conversation_id,
                            title: conversationTitle.value,
                            author_id: appState.user.id,
                            created_at: getDate({date: new Date()}),
                            status: "new",
                            comments: [{
                                conversation_id: data.conversation_id,
                                author_id: appState.user.id,
                                content: message.value,
                                created_at: getDate({date: new Date()})
                            }]
                        }

                        const action: AppAction = {type: "addUserConversation", payload: createdConversation}
                        appDispatch(action);

                        new Alert("success", "Zgłoszenie zostało zapisane w naszej bazie danych");

                        updateState(setConversationTitle, "value", "");
                        updateState(setMessage, "value", "");
                    }               
                }

            }); 
        }
    }



    return (
        <SinglePageWrapper>
            <div className="blueBar flex raisedText">
                Jeśli dostrzegasz pewne błędy w aplikacji powiadom nas o tym
            </div>

            <TransparentBox extraClass="noPopup">

                <h3>Nowa wiadomość</h3>
                <div className="inputBox">
                    <div ref={conversationTitle.errorRef} className="alert alert-danger small liveValidateMessage">{conversationTitle.error}</div> 
                    <input
                        type="text"
                        ref={conversationTitle.ref} 
                        value={conversationTitle.value} 
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateState(setConversationTitle, "value", e.target.value)}
                        required
                        autoFocus 
                    />
                    <label>Tytuł wiadomości</label>
                </div>
                <div className="inputBox">
                    <div ref={message.errorRef} className="alert alert-danger small liveValidateMessage">{message.error}</div> 
                    <textarea
                        ref={message.ref}
                        value={message.value}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateState(setMessage, "value", e.target.value)}
                    ></textarea>
                    <label>Wiadomość</label>
                </div>
                <button className="btn btn_blue" onClick={handleSubmit}>Wyślij</button>

                {appState.user.conversations.length > 0 && 
                    <React.Fragment>
                        <h3>Twoje wiadomości</h3>

                        <ul className="conversations">
                            {appState.user.conversations.map((conversation: Conversation, index: number) => {
                                return (
                                    <li key={`${index}${conversation.title}`} className="conversationRow">
                                        <button className="btn btn_blue conversationBtn" onClick={() => setConversation(conversation)}>Zobacz</button>
                                        <div>{conversation.title}</div>
                                    </li>
                                )
                            })}
                        </ul>
                    </React.Fragment>
                }
            </TransparentBox> 
        </SinglePageWrapper>
    )
}

export default ConversationsList