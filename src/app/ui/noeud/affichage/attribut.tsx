'use client'

import {Schema} from "@google/genai";
import {useState} from "react";
import {InputText} from "primereact/inputtext";
import Noeud from "@/app/ui/noeud/affichage/noeud";

export default function Attribut({record, onChangeKey}: {
    record: [string, Schema], onChangeKey: (newKey: string) => void
}) {
    const [nomAttribut, setNomAttribut] = useState<string>(record[0] || '');

    return (
        <div className="attribut">
            <span className="p-float-label">
                    <InputText value={nomAttribut} required={true}
                               onChange={(e) => {
                                   setNomAttribut(e.target.value);
                                   onChangeKey(e.target.value);
                               }}/>
                    <label>Clé de l&apos;attribut</label>
            </span>
            <Noeud schema={record?.[1]}/>
        </div>
    )
}