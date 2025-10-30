"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { createAlert} from "@/app/components/actions/alertActions";
import AddButton from "@/components/ui/AddButton";

export const HeaderAlert = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const handleSubmit = async (formData: FormData) => {
        setIsLoading(true);
        try {
            await createAlert(formData);
            setOpen(false);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-background h-[10vh] items-center justify-items-center flex justify-between">
            <div className="w-32 ml-4">
                <img src="/Ctlight.png" />
            </div>

            <div className="p-4">
                <Dialog>

                    <DialogTrigger asChild>
                        <AddButton />
                    </DialogTrigger>

                    <DialogContent>
                        <form action={createAlert}>
                            <DialogHeader className="mb-5">
                                <DialogTitle>Adicionar Item</DialogTitle>
                            </DialogHeader>

                            <div className="grid gap-2 h-[60vh] custom-scrollbar overflow-y-auto p-4 border rounded-lg  var(--input)">

                                <Input id="name" name="name" placeholder="Nome:" />

                                <Input id="responsavel" name="responsavel" placeholder="Responsavel:" />

                                <Input id="dataAprovacao" name="dataAprovacao" placeholder="Data Aprovação:" />

                                <Input id="tipoCobranca" name="tipoCobranca" placeholder="Tipo Cobrança:"/>

                                <Input id="ptax" name="ptax" placeholder="PTAX:"/>

                                <Input id="orcado" name="orcado" placeholder="Orcado:"/>

                                <Input id="realizado" name="realizado" placeholder="Reaalizado:"/>

                                <Input id="variacao" name="variacao" placeholder="Variação:"/>

                                <Input id="horaOrcadas" name="horaOrcadas" placeholder="Horas orcadas:" />

                                <Input id="valorHora" name="valorHora" placeholder="Valor Hora:" />

                                <Input id="obs" name="obs" placeholder="OBS:"/>

                                <Input id="status" name="status" placeholder="Status:"/>

                                <Input id="prioridade" name="prioridade" placeholder="Prioridade:" />
                            </div>

                            <DialogFooter className="mt-10">
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button type="submit">Salvar</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};
