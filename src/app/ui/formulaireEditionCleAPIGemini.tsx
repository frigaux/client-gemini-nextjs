'use client'

import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {Controller, useForm} from "react-hook-form";
import {chargerCleAPIGemini, enregistrerCleAPIGemini} from "@/app/lib/gemini";

type FormInputs = { cle: string };

export default function FormulaireEditionCleAPIGemini({onEditionTerminee}: { onEditionTerminee: (cle: string) => void }) {
    const {control, handleSubmit} = useForm<FormInputs>({
        defaultValues: {
            cle: chargerCleAPIGemini() || ""
        },
    });

    function enregistrerCle(formData: FormInputs) {
        if (formData.cle) {
            enregistrerCleAPIGemini(formData.cle);
            onEditionTerminee(formData.cle);
        }
    }

    return (
        <form onSubmit={handleSubmit(enregistrerCle)}>
            <Controller name="cle" control={control}
                        render={({field}) => (
                            <InputText id={field.name} value={field.value} placeholder="clé" required={true}
                                       onChange={(e) => field.onChange(e.target.value)}/>
                        )}/>
            <Button type="submit" label="Enregistrer"/>
        </form>
    )
}