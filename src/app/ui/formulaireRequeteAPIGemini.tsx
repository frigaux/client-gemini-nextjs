'use client'

import {useState} from "react";
import {Schema, Type} from "@google/genai";
import Noeud from "@/app/ui/noeud/affichage/noeud";
import CreerNoeud from "@/app/ui/noeud/edition/creerNoeud";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import fetchGemini from "@/app/lib/gemini";

export default function FormulaireRequeteAPIGemini({onSoumission}: {
    onSoumission: (requete: Promise<object | string>) => void
}) {
    const [requete, setRequete] = useState<string>();
    const [responseSchema, setResponseSchema] = useState<Schema>();


    function afficherSchema() {
        if (responseSchema) {
            return <Noeud schema={responseSchema}/>;
        } else {
            return <CreerNoeud
                types={[Type.ARRAY, Type.OBJECT, Type.STRING, Type.NUMBER, Type.INTEGER, Type.BOOLEAN]}
                onCreationTerminee={(s) => setResponseSchema(s)}/>;
        }
    }

    function soumettre() {
        if (requete && responseSchema) {
            onSoumission(fetchGemini(requete, responseSchema));
        }
    }

    return (
        <form>
            <div>
                <span className="p-float-label">
                    <InputText value={requete} required={true} size={50}
                               onChange={(e) => {
                                   setRequete(e.target.value);
                               }}/>
                    <label>Requête</label>
                </span>
                <Button type="button" label="Soumettre" onClick={event => soumettre()}/>
            </div>
            {afficherSchema()}
        </form>
    )
}