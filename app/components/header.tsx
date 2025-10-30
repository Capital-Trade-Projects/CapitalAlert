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
import { createAlert } from "./actions/alertActions";
import AddButton from "@/components/ui/AddButton";
import { Save } from "lucide-react";
import SaveButton from "@/components/ui/SaveButton";
import CancelBtn from "@/components/ui/CancelBtn";


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
        <div className="bg-background h-[10vh] flex items-center justify-between px-4 m-2 rounded-sm">
            <img src="./icon_capital_L_branco.svg" alt="logo" className="h-[8vh]" />
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <AddButton />
                </DialogTrigger>
                <DialogContent>
                    <form action={handleSubmit} className="max-w-lg mx-auto">
                        <DialogHeader>
                            <DialogTitle>Adicionar Item</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-3 mb-4 grid-cols-2 h-[32vh] overflow-auto custom-scrollbar">
                            <div>
                                <label htmlFor="name" className="block mb-1 text-xs font-medium text-white dark:text-black">Nome</label>
                                <input type="text" id="name" name="name" className="bg-gray-50 border border-gray-300 text-black text-xs rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5" placeholder="Nome" required />
                            </div>
                            <div>
                                <label htmlFor="responsavel" className="block mb-1 text-xs font-medium text-white dark:text-black">Responsável</label>
                                <input type="text" id="responsavel" name="responsavel" className="bg-gray-50 border border-gray-300 text-black text-xs rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5" placeholder="Responsável" required />
                            </div>
                            <div>
                                <label htmlFor="dataAprovacao" className="block mb-1 text-xs font-medium text-white dark:text-black">Data de aprovação</label>
                                <input type="date" id="dataAprovacao" name="dataAprovacao" className="bg-gray-50 border border-gray-300 text-black text-xs rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5" required />
                            </div>
                            <div>
                                <label htmlFor="tipoCobranca" className="block mb-1 text-xs font-medium text-white dark:text-black">Tipo de Cobrança</label>
                                <select id="tipoCobranca" name="tipoCobranca" className="bg-gray-50 border border-gray-300 text-black text-xs rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5" >
                                    <option>Mensal</option>
                                    <option>Semestral</option>
                                    <option>Anual</option>
                                </select>                            
                            </div>
                            <div>
                                <label htmlFor="ptax" className="block mb-1 text-xs font-medium text-white dark:text-black">PTAX</label>
                                <select id="ptax" name="ptax" className="bg-gray-50 border border-gray-300 text-black text-xs rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5" required >
                                    <option>Dólar</option>
                                    <option>Euro</option>
                                    <option>Real</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="orcado" className="block mb-1 text-xs font-medium text-white dark:text-black">Orçado</label>
                                <input type="text" id="orcado" name="orcado" className="bg-gray-50 border border-gray-300 text-black text-xs rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5" placeholder="Orçado" required />
                            </div>
                            <div>
                                <label htmlFor="horaOrcadas" className="block mb-1 text-xs font-medium text-white dark:text-black">Horas Orçadas</label>
                                <input type="text" id="horaOrcadas" name="horaOrcadas" className="bg-gray-50 border border-gray-300 text-black text-xs rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5" placeholder="Horas orçadas" required />
                            </div>
                            <div>
                                <label htmlFor="valorHora" className="block mb-1 text-xs font-medium text-white dark:text-black">Valor Hora</label>
                                <input type="text" id="valorHora" name="valorHora" className="bg-gray-50 border border-gray-300 text-black text-xs rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5" placeholder="Valor Hora" required />
                            </div>
                        </div>
                        <div className="grid gap-3 mb-4 grid-cols-2">
                            <div>
                                <label htmlFor="prioridade" className="block mb-1 text-xs font-medium text-white dark:text-black">Prioridade</label>
                                <select id="prioridade" name="prioridade" className="bg-gray-50 border border-gray-300 text-black text-xs rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5">
                                    <option>Baixa</option>
                                    <option>Média</option>
                                    <option>Alta</option>
                                    <option>Critico</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="status" className="block mb-1 text-xs font-medium text-white dark:text-black">Status</label>
                                <select id="status" name="status" className="bg-gray-50 border border-gray-300 text-black text-xs rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5">
                                    <option>Em Andamento</option>
                                    <option>Pendente</option>
                                    <option>Concluído</option>
                                    <option>Cancelado</option>
                                </select>
                            </div>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="obs" className="block mb-1 text-xs font-medium text-white dark:text-black">OBS</label>
                            <input type="text" id="obs" name="obs" className="bg-gray-50 border border-gray-300 text-black text-xs rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5" placeholder="Obs" />
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <CancelBtn />
                            </DialogClose>
                            <SaveButton type="submit" loading={isLoading} />
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};
