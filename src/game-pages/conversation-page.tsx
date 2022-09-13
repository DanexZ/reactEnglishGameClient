import React, { useContext, useMemo, useState } from "react";
import SinglePageWrapper from "../components/shared/SinglePageWrapper";
import TransparentBox from "../components/shared/TransparentBox/TransparentBox";
import { AppDispatchContext } from "../context/AppDispatchContext";
import { AppAction } from "../data/actions/AppAction";
import { Conversation, Comment } from "../data/models";
import { AppStateInterface } from "../data/types/AppStateInterface";
import { useInitialFieldState, useLiveValidation } from "../hooks/useLiveValidation";
import Alert from "../lib/Alert";
import { addAsyncComment } from "../lib/api";
import { getDate } from "../utils/date/getDate";
import { updateState } from "../utils/updateState";

interface Props {
    appState: AppStateInterface
    conversation: Conversation,
    setConversation: Function
}

const ConversationPage = ({appState, conversation, setConversation}: Props) => {

    const appDispatch: Function = useContext(AppDispatchContext);


    const [message, setMessage] = useState(useInitialFieldState());

    const { getFormErrors }: any = useLiveValidation({
       
        message: {
            state: message,
            setState: setMessage,
            ...message
        }

    });




    const handleSubmit = () => {

        const errors = getFormErrors();

        if (!errors.length) {

            addAsyncComment(appState.user.id, conversation.id, message.value, appState.user.token, {

                next: (data: any) => {

                    if (data.success) {

                        const createdComment: Comment = {
                                conversation_id: conversation.id,
                                author_id: appState.user.id,
                                content: message.value,
                                created_at: getDate({date: new Date()})
                            }
                        
                        const action: AppAction = {type: "addUserComment", payload: createdComment}
                        appDispatch(action);

                        updateState(setConversation, "comments", [...conversation.comments, createdComment]);

                        new Alert("success", "Twoja wiadomość została zapisana w tym wątku");

                        updateState(setMessage, "value", "");
                    }               
                }

            }); 
        }
    }




    return (
        <SinglePageWrapper>
            <div className="blueBar flex raisedText">
                Wątek: {conversation.title}
            </div>

            <TransparentBox extraClass="noPopup" exitFn={() => setConversation(null)}>

                {conversation.comments.map((comment: Comment) => {
                    return (
                        <React.Fragment key={`content${comment.content}`}>
                            <div className="conversationRow">
                                <div className="nick">{(comment.author_id === appState.user.id) ? appState.user.nick : "admin"}</div>
                                <div className="mL">
                                    {comment.content}
                                </div>
                            </div>
                            <div className="date">
                                {getDate({date: comment.created_at})}
                            </div>
                        </React.Fragment>
                    )
                })}
                
                <h3 style={{marginTop: "1.5rem"}}>Nowa wiadomość</h3>
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

            </TransparentBox>
        </SinglePageWrapper>
    )
}

export default ConversationPage