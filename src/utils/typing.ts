import { TYPING_SPEED } from "../data/constants";

export const typing = (s: string[], setRootaSentence: Function) => {

    const arr = [...s]; 

    if ( arr.length > 0 ) {
        setTimeout(() => {

            setRootaSentence((prevState: any) => `${prevState}${arr[0]}`);
            s.splice(0, 1);
            typing(s, setRootaSentence);            
            
        }, TYPING_SPEED);
    }

}