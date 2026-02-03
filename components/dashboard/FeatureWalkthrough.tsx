'use client';

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb, CheckCircle2, Zap } from "lucide-react"

export default function FeatureWalkthrough() {
    return (
        <Card className="bg-slate-900/50 border-slate-800 backdrop-blur mt-8">
            <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-100 flex items-center gap-2">
                    <Lightbulb className="h-6 w-6 text-amber-400" />
                    Perché Ristrutturissima Enterprise OS?
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                    <div>
                        <p className="text-slate-400 mb-4">
                            Immagina un controllo totale sui cantieri, aggiornato in tempo reale.
                            Ecco come le nostre funzionalità principali trasformano la gestione operativa:
                        </p>
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="item-1" className="border-slate-800">
                                <AccordionTrigger className="text-slate-200 hover:text-blue-400">
                                    <div className="flex items-center gap-2">
                                        <Zap className="h-4 w-4 text-blue-500" />
                                        Timbratura GPS Intelligente
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="text-slate-400">
                                    Dimentica i fogli presenze cartacei. Il sistema rileva automaticamente se l'operaio è nel raggio del cantiere.
                                    Cliccando "INIZIA TURNO" dall'app, la dashboard si aggiorna istantaneamente, offrendo una visione precisa della forza lavoro attiva.
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-2" className="border-slate-800">
                                <AccordionTrigger className="text-slate-200 hover:text-emerald-400">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                                        Riconciliazione Spese Automatica
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="text-slate-400">
                                    Il problema principale della contabilità cantieri è l'allineamento tra scontrini e movimenti bancari.
                                    La nostra sezione "Smart Reconciliation" usa l'IA per abbinare le richieste di rimborso (caricate via App) con i feed bancari reali.
                                    Basta un click su "Approva Abbinamento" per chiudere il cerchio.
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
