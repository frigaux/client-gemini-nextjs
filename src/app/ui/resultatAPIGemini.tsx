'use client'

import {useState} from "react";

export default function ResultatAPIGemini({reponse}: { reponse: Promise<object | string> | undefined }) {
    const [erreur, setErreur] = useState<string>();
    const [resultat, setResultat] = useState<string>();

    if (reponse) {
        reponse
            .then(value => setResultat(JSON.stringify(value, null, 2)))
            .catch(reason => setErreur(reason));
    }

    return (
        <div className="resultat">
            <div className="erreur">{erreur}</div>
            <div className="succes">{resultat}</div>
        </div>
    );
}
