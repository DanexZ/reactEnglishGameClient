import { useContext } from "react";
import SinglePageWrapper from "../../components/shared/SinglePageWrapper";
import { AppStateContext } from "../../context/AppStateContext";
import { User } from "../../data/models";
import { AppStateInterface } from "../../data/types/AppStateInterface";
import "./RankingPage.scss";

const RankingPage = () => {

    const appState: AppStateInterface = useContext(AppStateContext);

    return (
        <SinglePageWrapper additionClasses="rankingPage">

            <div className="blueBar flex raisedText">
                <div>Ranga</div>
                <div>User</div>
                <div>Level</div>
                <div>Tests</div>
                <div>Words</div>
                <div>Points</div>
            </div>

            <ul className="rankingList">
                {appState.users.map((user: User, index: number) => {
                    return (
                        <li key={`${user.nick}`} className={`rankingRow flex${(user.id === appState.user.id) ? " gold" : ""}`}>

                            <div className="raisedText">{index+1}</div>
                            <div>{user.nick}</div>
                            <div>{user.level}</div>
                            <div></div>
                            <div></div>
                            <div>{user.points}</div>
                            
                        </li>
                    )
                })}
            </ul>

        </SinglePageWrapper>
    )
}

export default RankingPage