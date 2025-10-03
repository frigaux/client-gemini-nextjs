'use client'

import {useState} from "react";

export default function ResultatAPIGemini({requete}: { requete: Promise<object | string> }) {
    const [erreur, setErreur] = useState<string>();
    const [resultat, setResultat] = useState<string>();

    requete
        .then(value => setResultat(JSON.stringify(value, null, 2)))
        .catch(reason => setErreur(reason));

    return (
        <div className="resultat">
            {!erreur && !resultat ? <div className="chargement">Chargement...</div> : ''}
            <div className="erreur">{erreur}</div>
            <pre className="succes">{resultat}</pre>
        </div>
    );
}
