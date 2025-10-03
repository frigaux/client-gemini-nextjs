'use client'

import {Schema, Type} from "@google/genai";
import {InputText} from "primereact/inputtext";
import {useState} from "react";
import Noeud from "@/app/ui/noeud/affichage/noeud";
import CreerNoeud from "@/app/ui/noeud/edition/creerNoeud";

export default function NoeudTableau({schema}: { schema: Schema }) {
    const [description, setDescription] = useState<string>(schema.description!);
    const [items, setItems] = useState<Schema>(schema.items!);

    function afficherElements() {
        if (items.type) {
            return <Noeud schema={schema.items}/>;
        } else {
            return <CreerNoeud
                types={[Type.OBJECT, Type.STRING, Type.NUMBER, Type.INTEGER, Type.BOOLEAN]}
                onCreationTerminee={(s) => {
                    schema.items = s;
                    setItems(s);
                }}/>;
        }
    }

    return (
        <div className="noeud">
            <span className="p-float-label">
                    <InputText value={description} required={true}
                               onChange={(e) => {
                                   schema.description = e.target.value;
                                   setDescription(e.target.value);
                               }}/>
                    <label>Description tableau</label>
            </span>
            {afficherElements()}
        </div>
    )
}