import React, { useMemo } from "react";
import { UserWord } from "../../data/models";
import "./ProblematicWords.scss";

const ProblematicWords = ({userWords}: {userWords: UserWord[]}) => {

    const problematicWords = useMemo(() => {

        const problematicWords = [];

        const words = [...userWords];

        words.sort((a, b) => a.power - b.power);

        for ( let i=0; i<10; i++ ) if ( words[i] && words[i].power < 100 ) problematicWords.push( words[i] );
    
        return problematicWords;

    }, [userWords]);


    return (
        <div className="problematicWords">
            {problematicWords.map((word: UserWord) => <div key={word.name} className="problematicWord">{word.name}</div>)}
        </div>
    )
}

export default ProblematicWords