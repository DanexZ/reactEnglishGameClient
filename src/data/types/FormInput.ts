import { FormInputState } from "./FormInputState"

export interface FormInput {
    validator: Function
    state: FormInputState
    setState: Function
    afterDelayFn?: Function
    noAsync?: boolean
}