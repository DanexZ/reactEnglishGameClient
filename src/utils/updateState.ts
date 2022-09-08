export const updateState = (setState: Function, key: string, newValue: any) => {

    setState( (prevState: any) => {
        const copy = Object.assign({}, prevState);  
        copy[key] = newValue;                                   
        return copy;
    });
}