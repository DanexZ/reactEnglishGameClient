import { useState } from "react";
import { FormInput } from "../../data/types/FormInput";
import { FormInputState } from "../../data/types/FormInputState";
import { validateConfirmField } from "../../validators/validateConfirmField";
import { useInitialFieldState } from "../useLiveValidation";

export const useConfirmField = (fieldToConfirm: FormInputState): FormInput => {

    const [input, setInput] = useState(useInitialFieldState());

    const confirmField: FormInput = {
        state: input,
        setState: setInput,
        validator: (currentValue: string) => validateConfirmField(fieldToConfirm.ref.current.value, currentValue)
    }

    return confirmField

}