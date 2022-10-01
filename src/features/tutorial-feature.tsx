import React, { useContext, useEffect } from "react";
import { speak } from "../utils/speak";
import { AppAction } from "../data/actions/AppAction";
import { AppDispatchContext } from "../context/AppDispatchContext";
import { AppStateContext } from "../context/AppStateContext";
import { TutorialView } from "../components/TutorialView/TutorialView";
import { ANIMATIONS, PAGES } from "../data/constants";
import { useTalkingContainer } from "../hooks/useTalkingContainer";
import TalkingContainer from "../components/TalkingContainer/TalkingContainer";
import { SpeakUsingTalkingContainer } from "../data/types/SpeakData";
import Scrolling from "../utils/Scrolling";
import { verticalScroll } from "../utils/verticalScroll";

const TutorialFeature = () => {

    const appDispatch = useContext(AppDispatchContext);
    const appState = useContext(AppStateContext);

    const showTalkingContainerImmediately = false;
    const [refs, rootaSentence, setRootaSentence]:any = useTalkingContainer(showTalkingContainerImmediately);




    const startTutorial = () => {

        const actions: AppAction[] = [
            {type: "setTutorialStage", payload: 1},
            {type: "toggleTalkingContainer"}
        ]

        appDispatch(actions[0]);
        appDispatch(actions[1]);
    }




    useEffect(() => {

        const callbacks: any[] = [

            () => {

                const action: AppAction = {type: "setTutorialStage", payload: 2}
                appDispatch(action);

                data.txtToSay = `Here you can see how many words you have already known. Obviously,
                now it is 0. Don't worry. Soon it will change.`;

                speak(data);
            },


            () => {

                const action: AppAction = {type: "setTutorialStage", payload: 3}
                appDispatch(action);

                data.txtToSay = "When you will collect words, they will appear in this tab. Let's see there.";
                speak(data);
            },


            () => {

                const actions: AppAction[] = [
                    {type: "setTutorialStage", payload: 4},
                    {type: "setCurrentTab", payload: PAGES.USER_WORDS}
                ];

                appDispatch(actions[0]);
                appDispatch(actions[1]);

                data.txtToSay = `Ok, we are located in the words tab now. In this place are some interesting things. 
                Firstly and foremost you will see here statistics of your pronunciation of your words. Do you wonder what I mean? 
                Well, this application will record all your mistakes while speaking words both during trainings and during tests. 
                For now everything is empty.`;

                speak(data);
            },


            () => {

                const action: AppAction = {type: "setTutorialStage", payload: 5}
                appDispatch(action);

                data.txtToSay = `You will be able to do memory exercises by clicking on this blue button.`;
                speak(data);
            },


            () => {

                const action: AppAction = {type: "setTutorialStage", payload: 6}
                appDispatch(action);

                data.txtToSay = `The tests will be carried out here. You'll find out how they work a bit later. 
                Now I will show you how you will collect words. Make sure you have microphone turned on.`;

                speak(data);
            },


            () => {

                const action: AppAction = {type: "setTutorialStage", payload: 7}
                    appDispatch(action);

                setTimeout(() => {
                    const action: AppAction = {type: "setTutorialStage", payload: 8}
                    appDispatch(action);
                }, 3200);
                
                data.txtToSay = `Ok, for this purpose we are going to a Collect tab, right here.`;
                speak(data);
            },


            () => {

                const actions: AppAction[] = [
                    {type: "setTutorialStage", payload: 9},
                    {type: "setCurrentTab", payload: PAGES.COLLECT}
                ];

                appDispatch(actions[0]);
                appDispatch(actions[1]);

                data.txtToSay = `Ok, now we are located in a Game tab, let's see what we have here.`;
                speak(data);
            },


            () => {

                const actions: AppAction = {type: "setTutorialStage", payload: 10}
                appDispatch(actions);


                const scrolling = new Scrolling(10, 50);

                setTimeout(() => {
                    scrolling.clear();

                    data.txtToSay = `Oh, we've got some levels here. Ok, let's back to the top.`;
                    speak(data)

                }, 2000)
            },


            () => {
                
                verticalScroll(-400);

                setTimeout(() => {

                    data.txtToSay = `Look, only the first level is unlocked. That's because you have met all conditions of this level.`;
                    speak(data);

                }, 1500)
            },


            () => {

                const actions: AppAction = {type: "setTutorialStage", payload: 12}
                appDispatch(actions);

                data.txtToSay = `Look, the first condition is to have 0 words. Well it is starting level so obviously you have got that.`
                speak(data);

            },


            () => {

                const actions: AppAction = {type: "setTutorialStage", payload: 13}
                appDispatch(actions);

                verticalScroll(300);

                data.txtToSay = `But look here for another hand. 
                In this case you have to get five and as you can see this is not met. That's why there is no a blue button.`

                speak(data);

            },


            () => {

                const actions: AppAction = {type: "setTutorialStage", payload: 14}
                appDispatch(actions);

                verticalScroll(-300);

                data.txtToSay = `The next condition is related to points.`
                speak(data);

            },


            () => {

                const actions: AppAction = {type: "setTutorialStage", payload: 15}
                appDispatch(actions);

                data.txtToSay = `Next we have an efficiency. 
                This application measures your efficiency in speaking words. Be careful not to make mistakes too often.`
                
                speak(data);

            },


            () => {

                const actions: AppAction = {type: "setTutorialStage", payload: 16}
                appDispatch(actions);

                data.txtToSay = `The last condition is tests. 
                Tests will be required from you only from the third level, so don't take your time about it now.`

                speak(data);

            },


            () => {

                const actions: AppAction = {type: "setTutorialStage", payload: 17}
                appDispatch(actions);

                data.txtToSay = `For now go into the first level. Is your microphone turned on? If yes, go.`

                speak(data);

            },


            () => {

                const actions: AppAction[] = [
                    {type: "setTutorialStage", payload: 0},
                    {type: "toggleTalkingContainer"}
                ]
        
                appDispatch(actions[0]);
                appDispatch(actions[1]);
            }
        ];


        const data: SpeakUsingTalkingContainer = { 
            txtToSay: appState.RootaTexts[7].content,
            setRootaSentence,
            rootaSentenceRef: refs.rootaSentenceRef,
            forwardBtnRef: refs.forwardBtnRef,
            finishBtnRef: refs.finishBtnRef, 
            callbacks
        }
        

        if(appState.tutorialStage === 1) {
            setTimeout(() => {
                speak(data);
            }, ANIMATIONS.TALKING_CONTAINER_ROLLING.duration)
        }


    }, [appState.tutorialStage]);



    return (
        <React.Fragment>
            {!appState.tutorialStage && <TutorialView onClickFn={startTutorial} />}
            <TalkingContainer refs={refs} rootaSentence={rootaSentence} />
        </React.Fragment>
    )

}

export default TutorialFeature

