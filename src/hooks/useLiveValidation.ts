import { useRef, useEffect } from "react";
import { updateState } from "../utils/updateState";
import { FormInput } from "../data/types/FormInput";
import { FormInputState } from "../data/types/FormInputState";


export const useInitialFieldState = (): FormInputState => {

    return {
        error: "",
        value: "", 
        timer: setTimeout(() => {}, 0),
        ref: useRef(null!),
        errorRef: useRef<HTMLDivElement>(null!)
    }
}


export interface inputs {
    userName?: FormInput
    email?: FormInput
    password?: FormInput 
    confirmField?: FormInput
    phrase?: FormInput
    word?: FormInput
    translations?: FormInput
    conversationTitle?: FormInput
    message?: FormInput
}


export const useLiveValidation = (inputs: inputs) => {

    const userName = inputs["userName"];
    const email = inputs["email"];
    const password = inputs["password"];
    const confirmField = inputs["confirmField"];
    const phrase = inputs["phrase"];
    const word = inputs["word"];
    const translations = inputs["translations"];
    const conversationTitle = inputs["conversationTitle"];
    const message = inputs["message"];

    const fieldsInterfaces: FormInput[] = [];

    if (userName) fieldsInterfaces.push(userName);
    if (email) fieldsInterfaces.push(email);
    if (password) fieldsInterfaces.push(password);
    if (confirmField) fieldsInterfaces.push(confirmField);
    if (phrase) fieldsInterfaces.push(phrase);
    if (word) fieldsInterfaces.push(word);
    if (translations) fieldsInterfaces.push(translations);
    if (conversationTitle) fieldsInterfaces.push(conversationTitle);
    if (message) fieldsInterfaces.push(message);
    


    const getFormErrors = (): string[] => {
        
        const errors: string[] = [];

        fieldsInterfaces.forEach((fieldProps: FormInput) => {
            fieldValidationHandler(fieldProps.state.ref.current.value, fieldProps);

            if (fieldProps.state.error) errors.push(fieldProps.state.error);
        });
        
        return errors;
    }



    const fieldValidationHandler = (currentValue: string, field: FormInput) => {

        clearTimeout(field.state.timer);

        if (!currentValue) return updateState(field.setState, "error", "");

        field.state.timer = setTimeout(() => {

            const errorMsg: string = field.validator(currentValue);

            if (errorMsg) return updateState(field.setState, "error", errorMsg);

            updateState(field.setState, "error", "");
            if (field.afterDelayFn && !field.noAsync) field.afterDelayFn(currentValue);

        }, 900)
    }



    const showValidateMessage = (ref: any) => ref.current.classList.add('liveValidateMessage--visible');
    const hideValidateMessage = (ref: any) => ref.current.classList.remove('liveValidateMessage--visible');

    const isThereError = (fieldProps?: FormInput) => {

        if (!fieldProps) return

        if (fieldProps.state.error && !fieldProps.state.errorRef.current.classList.contains("liveValidateMessage--visible")) {
            return showValidateMessage(fieldProps.state.errorRef);
        }

        if (!fieldProps.state.error && fieldProps.state.errorRef.current.classList.contains("liveValidateMessage--visible")) {
            return hideValidateMessage(fieldProps.state.errorRef);
        }
    }



    useEffect(() => isThereError(userName), [userName?.state.error]);
    useEffect(() => isThereError(email), [email?.state.error]);
    useEffect(() => isThereError(password), [password?.state.error]);
    useEffect(() => isThereError(confirmField), [confirmField?.state.error]);
    useEffect(() => isThereError(phrase), [phrase?.state.error]);
    useEffect(() => isThereError(word), [word?.state.error]);
    useEffect(() => isThereError(translations), [translations?.state.error]);
    useEffect(() => isThereError(conversationTitle), [conversationTitle?.state.error]);
    useEffect(() => isThereError(message), [message?.state.error]);


    useEffect(() => {

        fieldsInterfaces.forEach( (fieldProps: FormInput) => {
            fieldProps.state.ref.current.onkeyup = (e: React.ChangeEvent<HTMLInputElement>) => fieldValidationHandler(e.target.value, fieldProps);
            fieldProps.state.ref.current.onblur = (e: React.ChangeEvent<HTMLInputElement>) => fieldValidationHandler(e.target.value, fieldProps);
        });

    }, []); 


    return { getFormErrors };
}