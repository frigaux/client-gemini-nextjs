'use client'

export default function Actions(
    {onEditionCleAPI, onAffichageFormulaireRequeteAPI}: {
        onEditionCleAPI: () => void,
        onAffichageFormulaireRequeteAPI: () => void
    }
) {
    return (
        <div className={"actions"}>
            <span className="pi pi-pencil" onClick={onEditionCleAPI} title={"Modifier la clé de l'API Gemini"}></span>
            <span className="pi pi-search" onClick={onAffichageFormulaireRequeteAPI}
                  title={"Lancer une requête à l'API Gemini"}></span>
        </div>
    );
}
