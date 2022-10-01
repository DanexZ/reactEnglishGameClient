import { useContext, useEffect, useState } from "react";
import { TestWord, Translation, UserTest } from "../../data/models";
import TestRow from "../../components/tests-page-layout/TestRow";
import { AppStateInterface } from "../../data/types/AppStateInterface";
import { AppStateContext } from "../../context/AppStateContext";
import { ExamStatus } from "../../data/types/ExamStatus";

interface TW {
    word: string
    word_id: number
    status: ExamStatus
    translations: Translation[]
}

const FinishedTest = ({chosenTest, setChosenTest}: {chosenTest: UserTest, setChosenTest: Function}) => {

    const appState: AppStateInterface = useContext(AppStateContext);
    const [testWords, setTestWords]: [TW[], Function] = useState([]);

    useEffect(() => {

        const words: TW[] = [];

        chosenTest.words.forEach((testWord: TestWord) => {

            const word: TW = {
                word: "",
                word_id: testWord.word_id,
                translations: [],
                status: testWord.status
            }

            for (let i=0; i<appState.words.length; i++) {

                if( testWord.word_id === appState.words[i].id) {
                    
                    for (let m=0; m<appState.words[i].translations.length; m++) {
                        word.word = appState.words[i].name
                        word.translations.push(appState.words[i].translations[m]);
                    }

                    words.push(word)

                    break;
                }
            }
        });

        setTestWords(words);


    }, []);



    return (
        <div className="testView finishedTest">
            <span className="exit" onClick={() => setChosenTest(null)}>x</span>
            <ul>
                {testWords.map((word: TW, rowIndex: number) => {
                    return (
                        <TestRow 
                            key={`${word.translations[0].polish}${rowIndex}`} 
                            translations={word.translations} 
                            rowIndex={rowIndex}
                            word={word.word}
                        >

                            {word.status !== "passed" && 
                                <div>
                                    <img src="/images/uncorrect.png" alt="uncorrect" />
                                </div>
                            }

                            {word.status === "passed" && 
                                <div>
                                    <img src="/images/correct.png" alt="correct" />
                                </div>
                            }
                    
                        </TestRow>
                    )
                } )}
            </ul>
        </div>
    )
}

export default FinishedTest