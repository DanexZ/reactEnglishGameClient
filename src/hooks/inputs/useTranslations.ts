import { useState } from "react";
import { FormInput } from "../../data/types/FormInput";
import { validateTranslations } from "../../validators/validateTranslations";
import { useInitialFieldState } from "../useLiveValidation";

export const useTranslations = (): FormInput => {

    const [input, setInput] = useState(useInitialFieldState());

    const translation: FormInput = {
        state: input,
        setState: setInput,
        validator: validateTranslations
    }

    return translation

}