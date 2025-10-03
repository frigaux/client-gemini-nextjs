'use client'

import {Schema, Type} from "@google/genai";
import NoeudTableau from "@/app/ui/noeud/affichage/noeudTableau";
import NoeudObjet from "@/app/ui/noeud/affichage/noeudObjet";
import NoeudTypePrimitif from "@/app/ui/noeud/affichage/noeudTypePrimitif";

function afficherNoeud(schema: Schema | undefined) {
    if (!schema || !schema.type) {
        return <></>;
    }
    switch (schema.type) {
        case Type.ARRAY:
            return <NoeudTableau schema={schema}/>
        case Type.OBJECT:
            return <NoeudObjet schema={schema}/>
        default:
            return <NoeudTypePrimitif schema={schema}/>
    }
}

export default function Noeud({schema}: { schema: Schema | undefined }) {
    return (afficherNoeud(schema))
}