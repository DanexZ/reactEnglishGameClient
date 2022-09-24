export interface FormInputState {
    error: string
    value: string
    timer: ReturnType<typeof setTimeout>
    ref: any
    errorRef: React.MutableRefObject<HTMLDivElement>
}