import { FormData } from "@/schemas/resumeSchema";
import { FieldArrayNamesResumeForm } from "@/types/FieldArrayNamesResumeForm";
import { Control, useFieldArray } from "react-hook-form";

export const useDynamicFieldArrays = (control: Control<FormData>, fieldArrayNames: FieldArrayNamesResumeForm[]) => {
    return fieldArrayNames.reduce((acc, name) => {
            acc[name] = useFieldArray({control, name});
            return acc;
        }, {} as Record<FieldArrayNamesResumeForm, ReturnType<typeof useFieldArray>> //*
    );  
}

/*
objeto resultante será um Record onde:
Chaves são do tipo FieldArrayNamesResumeForm.
Valores são do tipo retornado por useFieldArray
*/