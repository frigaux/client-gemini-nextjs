'use client'

import {Schema} from "@google/genai";
import Attribut from "@/app/ui/noeud/affichage/attribut";

export default function Attributs({records}: {
    records: Record<string, Schema>
}) {
    function changeKey(entry: [string, Schema], newKey: string) {
        Object.defineProperty(records, newKey, {
            value: entry[1],
            writable: true,
            enumerable: true,
            configurable: true,
        });
        delete records[entry[0]];
        entry[0] = newKey;
    }

    return (
        Object.entries(records).map(entry =>
            <Attribut key={entry[0]} record={entry} onChangeKey={(newKey) => changeKey(entry, newKey)}/>
        )
    )
}