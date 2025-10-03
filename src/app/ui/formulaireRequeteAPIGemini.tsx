'use client'

import {useState} from "react";
import {Schema, Type} from "@google/genai";
import Noeud from "@/app/ui/noeud/affichage/noeud";
import CreerNoeud from "@/app/ui/noeud/edition/creerNoeud";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";

export default function FormulaireRequeteAPIGemini({onSoumission}: {
    onSoumission: (requete: string, schema: Schema) => void
}) {
    const [requete, setRequete] = useState<string>();
    const [schema, setSchema] = useState<Schema>();


    function afficherSchema() {
        if (schema) {
            return <Noeud schema={schema}/>;
        } else {
            return <CreerNoeud
                types={[Type.ARRAY, Type.OBJECT, Type.STRING, Type.NUMBER, Type.INTEGER, Type.BOOLEAN]}
                onCreationTerminee={(s) => setSchema(s)}/>;
        }
    }

    function soumettre() {
        if (requete && schema) {
            onSoumission(requete, schema);
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