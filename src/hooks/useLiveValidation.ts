import React, { useRef, useEffect, useContext } from "react";
import { checkAsyncEmail, checkAsyncPhrase, checkAsyncUsername, checkAsyncWord } from "../lib/api";
import { updateState } from "../utils/updateState";
import { validatePassword } from "../validators/validatePassword";
import { validateEmail } from "../validators/validateEmail";
import { validateUserName } from "../validators/validateUserName";
import { validateConfirmField } from "../validators/validateConfirmField";
import { validatePhrase } from "../validators/validatePhrase";
import { validateTranslation } from "../validators/validateTranslation";
import { AppStateInterface } from "../data/types/AppStateInterface";
import { AppStateContext } from "../context/AppStateContext";
import { validateWord } from "../validators/validateWord";
import { validateTranslations } from "../validators/validateTranslations";
import { validateConversationTitle } from "../validators/validateConversationTitle";
import { validateMessage } from "../validators/validateMessage";


export interface FieldHandlerInterface {
    validator: Function
    state: any
    setState: Function
    afterDelayFn?: Function
    noAsync?: boolean
}


export const useInitialFieldState = () => {

    return {
        error: "",
        value: "", 
        timer: setTimeout(() => {}, 0),
        ref: useRef(null!),
        errorRef: useRef<HTMLDivElement>(null!)
    }
}


export interface inputs {
    userName?: any
    email?: any
    password?: any 
    fieldToConfirm?: any
    confirmField?: any
    phrase?: any
    word?: any
    translation?: any
    translations?: any
    conversationTitle?: any
    message?: any
}


export const useLiveValidation = (inputs: inputs) => {

    const appState: AppStateInterface = useContext(AppStateContext);

    const userName = inputs["userName"];
    const email = inputs["email"];
    const password = inputs["password"];
    const fieldToConfirm = inputs["fieldToConfirm"];
    const confirmField = inputs["confirmField"];
    const phrase = inputs["phrase"];
    const word = inputs["word"];
    const translation = inputs["translation"];
    const translations = inputs["translations"];
    const conversationTitle = inputs["conversationTitle"];
    const message = inputs["message"];



    const userNameProps: FieldHandlerInterface = {
        validator: validateUserName,
        afterDelayFn: (value: string) => checkAsyncUsername(value, {
            next: (data: any) => {
                if (data.alreadyExists) updateState(userName.setState, "error", "Ta nazwa użytkownika jest już zajęta");
            }
        }),
        state: userName?.state,
        setState: userName?.setState
    }

    const emailProps: FieldHandlerInterface = {
        validator: validateEmail,
        afterDelayFn: (value: string) => checkAsyncEmail(value, {
            next: (data: any) => {
                if (data.alreadyExists) updateState(email.setState, "error", "Ten e-mail jest już zajęty");
            }
        }),
        state: email?.state,
        setState: email?.setState,
        noAsync: email?.noAsync
    }

    const passwordProps: FieldHandlerInterface = {
        validator: validatePassword,
        state: password?.state,
        setState: password?.setState
    }

    const confirmFieldProps: FieldHandlerInterface = {
        validator: (currentValue: string) => validateConfirmField(fieldToConfirm.ref.current.value, currentValue),
        state: confirmField?.state,
        setState: confirmField?.setState
    }

    const phraseProps: FieldHandlerInterface = {
        validator: validatePhrase,
        afterDelayFn: (value: string) => checkAsyncPhrase(appState.user.id, value, appState.user.token, {
            next: (data: any) => {
                if (data.alreadyExists) updateState(phrase.setState, "error", "Posiadasz już tą frazę w kolekcji");
            }
        }),
        state: phrase?.state,
        setState: phrase?.setState
    }

    const wordProps: FieldHandlerInterface = {
        validator: validateWord,
        afterDelayFn: (value: string) => checkAsyncWord(appState.user.id, value, appState.user.token, {
            next: (data: any) => {
                if (data.alreadyExists) updateState(word.setState, "error", "Dodano już to słówko lub musisz je zdobyć");
            }
        }),
        state: word?.state,
        setState: word?.setState
    }

    const translationProps: FieldHandlerInterface = {
        validator: validateTranslation,
        state: translation?.state,
        setState: translation?.setState
    }

    const translationsProps: FieldHandlerInterface = {
        validator: validateTranslations,
        state: translations?.state,
        setState: translations?.setState
    }

    const conversationTitleProps: FieldHandlerInterface = {
        validator: validateConversationTitle,
        state: conversationTitle?.state,
        setState: conversationTitle?.setState
    }

    const messageProps: FieldHandlerInterface = {
        validator: validateMessage,
        state: message?.state,
        setState: message?.setState
    }

    const fieldsInterfaces: FieldHandlerInterface[] = [];

    if (userName) fieldsInterfaces.push(userNameProps);
    if (email) fieldsInterfaces.push(emailProps);
    if (password) fieldsInterfaces.push(passwordProps);
    if (confirmField) fieldsInterfaces.push(confirmFieldProps);
    if (phrase) fieldsInterfaces.push(phraseProps);
    if (word) fieldsInterfaces.push(wordProps);
    if (translation) fieldsInterfaces.push(translationProps);
    if (translations) fieldsInterfaces.push(translationsProps);
    if (conversationTitle) fieldsInterfaces.push(conversationTitleProps);
    if (message) fieldsInterfaces.push(messageProps);


    const getFormErrors = (): string[] => {
        
        const errors: string[] = [];

        fieldsInterfaces.forEach((fieldProps: FieldHandlerInterface) => {
            fieldValidationHandler(fieldProps.state.ref.current.value, fieldProps);

            if (fieldProps.state.error) errors.push(fieldProps.state.error);
        });
        
        return errors;
    }



    const fieldValidationHandler = (currentValue: string, field: FieldHandlerInterface) => {

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

    const isThereError = (fieldProps: FieldHandlerInterface) => {

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
    useEffect(() => isThereError(translation), [translation?.state.error]);
    useEffect(() => isThereError(translations), [translations?.state.error]);
    useEffect(() => isThereError(conversationTitle), [conversationTitle?.state.error]);
    useEffect(() => isThereError(message), [message?.state.error]);


    useEffect(() => {

        fieldsInterfaces.forEach( (fieldProps: FieldHandlerInterface) => {
            fieldProps.state.ref.current.onkeyup = (e: any) => fieldValidationHandler(e.target.value, fieldProps);
            fieldProps.state.ref.current.onblur = (e: any) => fieldValidationHandler(e.target.value, fieldProps);
        });

    }, []); 


    return { getFormErrors };
}