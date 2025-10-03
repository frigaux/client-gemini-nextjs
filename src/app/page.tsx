'use client'

import fetchGemini, {chargerCleAPIGemini} from "@/app/lib/gemini";
import FormulaireEditionCleAPIGemini from "./ui/formulaireEditionCleAPIGemini";
import {Suspense, useEffect, useState} from "react";
import Actions from "@/app/ui/actions";
import FormulaireRequeteAPIGemini from "@/app/ui/formulaireRequeteAPIGemini";
import {Schema} from "@google/genai";
import ResultatAPIGemini from "@/app/ui/resultatAPIGemini";

export default function Home() {
    const [afficherFormulaireCleAPI, setAfficherFormulaireCleAPI] = useState<boolean>(false);
    const [afficherFormulaireRequeteAPI, setAfficherFormulaireRequeteAPI] = useState<boolean>(false);
    const [reponse, setReponse] = useState<Promise<object | string> | undefined>(undefined);

    useEffect(() => {
        setAfficherFormulaireCleAPI(chargerCleAPIGemini() === undefined);
    }, []);

    function onEditionCleAPI() {
        setAfficherFormulaireCleAPI(true);
    }

    function onEditionCleAPITerminee() {
        setAfficherFormulaireCleAPI(false);
    }

    function onAffichageFormulaireRequeteAPI() {
        setAfficherFormulaireRequeteAPI(true);
    }

    function onSoumissionRequeteAPI(requete: string, schema: Schema) {
        setAfficherFormulaireRequeteAPI(false);
        console.log('Requête : ', requete, 'Schéma :', schema);
        setReponse(fetchGemini(requete, schema));
    }

    function formulaires() {
        if (afficherFormulaireCleAPI) {
            return <FormulaireEditionCleAPIGemini onEditionTerminee={onEditionCleAPITerminee}/>;
        }
        if (afficherFormulaireRequeteAPI) {
            return <FormulaireRequeteAPIGemini onSoumission={onSoumissionRequeteAPI}/>;
        }
        return <Actions onEditionCleAPI={onEditionCleAPI}
                        onAffichageFormulaireRequeteAPI={onAffichageFormulaireRequeteAPI}/>;
    }

    function resultat() {
        return <Suspense fallback={<span>Chargement...</span>}>
            <ResultatAPIGemini reponse={reponse}/>
        </Suspense>;
    }

    return (
        <>
            <div>{formulaires()}</div>
            <div>{resultat()}</div>
        </>
    );
}
