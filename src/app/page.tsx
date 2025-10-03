'use client'

import {chargerCleAPIGemini} from "@/app/lib/gemini";
import FormulaireEditionCleAPIGemini from "./ui/formulaireEditionCleAPIGemini";
import {useEffect, useState} from "react";
import Actions from "@/app/ui/actions";
import FormulaireRequeteAPIGemini from "@/app/ui/formulaireRequeteAPIGemini";
import ResultatAPIGemini from "@/app/ui/resultatAPIGemini";

export default function Home() {
    const [afficherFormulaireCleAPI, setAfficherFormulaireCleAPI] = useState<boolean>(false);
    const [afficherFormulaireRequeteAPI, setAfficherFormulaireRequeteAPI] = useState<boolean>(false);
    const [requete, setRequete] = useState<Promise<object | string> | undefined>(undefined);

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

    function onSoumissionRequeteAPI(req: Promise<object | string>) {
        setAfficherFormulaireRequeteAPI(false);
        setRequete(req);
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

    return (
        <>
            <div>{formulaires()}</div>
            <div>{requete ? <ResultatAPIGemini requete={requete}/> : ''}</div>
        </>
    );
}
