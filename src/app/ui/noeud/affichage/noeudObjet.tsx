'use client'

import {Schema, Type} from "@google/genai";
import {useState} from "react";
import {InputText} from "primereact/inputtext";
import CreerNoeud from "@/app/ui/noeud/edition/creerNoeud";
import Attributs from "@/app/ui/noeud/affichage/attributs";

export default function NoeudObjet({schema}: { schema: Schema }) {
    const [description, setDescription] = useState<string>(schema.description!);
    const [properties, setProperties] = useState<Record<string, Schema>>(schema.properties!);

    return (
        <div className="noeud">
            <span className="p-float-label">
                    <InputText value={description} required={true}
                               onChange={(e) => {
                                   schema.description = e.target.value;
                                   setDescription(e.target.value);
                               }}/>
                    <label>Description de l&apos;objet</label>
            </span>
            <div className="attributs">
                <Attributs records={properties}/>
                <CreerNoeud
                    types={[Type.ARRAY, Type.OBJECT, Type.STRING, Type.NUMBER, Type.INTEGER, Type.BOOLEAN]}
                    onCreationTerminee={(s) => {
                        schema.properties = JSON.parse(JSON.stringify(schema.properties));
                        Object.defineProperty(schema.properties, `attribut${Object.keys(schema.properties || {}).length}`, {
                            value: s,
                            writable: true,
                            enumerable: true,
                            configurable: true,
                        });
                        setProperties(schema.properties!);
                    }}/>
            </div>
        </div>
    )
}