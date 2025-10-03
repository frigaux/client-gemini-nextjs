'use client'

import {Schema, Type} from "@google/genai";
import {useState} from "react";
import {InputText} from "primereact/inputtext";
import {Dropdown} from "primereact/dropdown";

export default function NoeudTypePrimitif({schema}: { schema: Schema }) {
    const [description, setDescription] = useState<string>(schema.description!);
    const [type, setType] = useState<Type>(schema.type || Type.STRING);

    const types = [
        {label: 'Chaîne', value: Type.STRING},
        {label: 'Nombre', value: Type.NUMBER},
        {label: 'Entier', value: Type.INTEGER},
        {label: 'Booléen', value: Type.BOOLEAN}
    ];

    return (
        <div className="noeud">
            <span className="p-float-label">
                    <InputText value={description} required={true}
                               onChange={(e) => {
                                   schema.description = e.target.value;
                                   setDescription(e.target.value);
                               }}/>
                    <label>Description type primitif</label>
            </span>
            <span className="p-float-label">
                    <Dropdown value={type} options={types} onChange={(e) => {
                        schema.type = e.value;
                        setType(e.value);
                    }}/>
                    <label>Type</label>
            </span>
        </div>
    )
}