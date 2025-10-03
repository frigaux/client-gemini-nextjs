'use client'

import {Schema, Type} from "@google/genai";
import {Dropdown} from "primereact/dropdown";
import {useState} from "react";
import {Button} from "primereact/button";

export default function CreerNoeud({types, onCreationTerminee}: {
    types: Array<Type>,
    onCreationTerminee: (schema: Schema) => void
}) {
    const [type, setType] = useState<Type>(types[0]);

    function creerNoeud() {
        switch (type) {
            case Type.ARRAY:
                return onCreationTerminee({
                    description: "",
                    type: Type.ARRAY,
                    items: {}
                });
            case Type.OBJECT:
                return onCreationTerminee({
                    description: "",
                    type: Type.OBJECT,
                    properties: {}
                });
            default:
                return onCreationTerminee({
                    description: "",
                    type
                });
        }
    }

    function options() {
        return types.map(type => {
            switch (type) {
                case Type.ARRAY:
                    return {label: 'Tableau', value: type};
                case Type.OBJECT:
                    return {label: 'Objet', value: type};
                case Type.STRING:
                    return {label: 'Chaîne', value: type};
                case Type.NUMBER:
                    return {label: 'Nombre', value: type};
                case Type.INTEGER:
                    return {label: 'Entier', value: type};
                case Type.BOOLEAN:
                    return {label: 'Booléen', value: type};
            }
        });
    }

    return (
        <div className="nouveau-noeud">
            <span className="p-float-label">
                    <Dropdown value={type} options={options()} onChange={(e) => {
                        setType(e.value);
                    }}/>
                    <label>Type</label>
            </span>
            <Button type="button" label="Ajouter" onClick={event => creerNoeud()}/>
        </div>
    )
}