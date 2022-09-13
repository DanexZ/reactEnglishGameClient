import LevelRequirementsIterface from "../data/level-requirements-interface";
import { establichRequirementsForLevels } from "./establishRequirementsForLevels";
import LevelRow from "../components/collect-words-layout/LevelRow/LevelRow";
import { AppStateInterface } from "../data/types/AppStateInterface";
import { round } from "./round";
import { UserTest, UserWord } from "../data/models";


const checkLevelOfTest = (test_words_nr: number) => (test_words_nr/2) - 2;


export const createLevelsRow = (level_nr: number, appState: AppStateInterface, setRemainingWords: Function) => {

    const userWords: UserWord[] = [...appState.user.words];
    const userTests: UserTest[] = [...appState.user.tests];


    const requirements: LevelRequirementsIterface = {
        requiredWords: 0,
        wordsAfterLevel: 5,
        requiredPoints: 0,
        requiredTests: 0,
        requiredEfficiency: 0
    }


    const calculateGainedWords = () => {

        let gainedWords: number = 0;

        if(userWords.length >= requirements.wordsAfterLevel) {
            gainedWords = requirements.wordsAfterLevel
        } else {
            gainedWords = userWords.length
        }

        return gainedWords
    }


    let userPassedTestsOnSpecyficLevel: number = 0;

    for (let i=0; i<userTests.length; i++) {

        let singleTestlevel = checkLevelOfTest(userTests[i].words.length);

        if (level_nr === singleTestlevel && userTests[i].status === "passed") {
            userPassedTestsOnSpecyficLevel++;
        }
    }


    establichRequirementsForLevels(requirements, level_nr);

    const gainedWords = calculateGainedWords();
    const progress = round((gainedWords/requirements.wordsAfterLevel) * 100);
    

    return <LevelRow

            key={`level${level_nr}`}
            level={level_nr}
            userWords={userWords.length}
            requiredWords={requirements.requiredWords}
            userPoints={appState.user.points}
            requiredPoints={requirements.requiredPoints}
            userEfficiency={appState.user.efficiency}
            requiredEfficiency={requirements.requiredEfficiency}
            passedTests={userPassedTestsOnSpecyficLevel}
            requiredTests={requirements.requiredTests}
            progressLabel={`Gained words: ${gainedWords}/${requirements.wordsAfterLevel}`}
            progress={progress}
            isLevelUnlocked={
                userWords.length >= requirements.requiredWords &&
                appState.user.points >= requirements.requiredPoints &&
                appState.user.efficiency >= requirements.requiredEfficiency &&
                userPassedTestsOnSpecyficLevel >= requirements.requiredTests
            }
            isLevelFinished={userWords.length >= requirements.wordsAfterLevel}
            remainingWords={requirements.wordsAfterLevel - userWords.length}
            setRemainingWords={setRemainingWords}
        />
}