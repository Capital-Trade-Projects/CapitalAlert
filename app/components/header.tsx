"use client";

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
import { Label } from "@/components/ui/label";
import { createAlert, deleteAlert, updateAlert } from "@/app/components/actions/alertActions";

export const HeaderAlert = () => {
    return (
        <div className="bg-amber-500 h-[10vh] items-center justify-items-center flex justify-between">
            <div className="text-center p-3 text-2xl">Capital Trade</div>

            <div className="p-4">
                <Dialog>

                    <DialogTrigger asChild>
                        <Button variant="outline">Add Item</Button>
                    </DialogTrigger>

                    <DialogContent>
                        <form action={createAlert}>
                            <DialogHeader>
                                <DialogTitle>Adicionar Item</DialogTitle>
                            </DialogHeader>

                            <div className="grid gap-3">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" name="name" />

                                <Label htmlFor="responsavel">Responsavel</Label>
                                <Input id="responsavel" name="responsavel" />

                                <Label htmlFor="dataAprovacao">Data de Aprovação</Label>
                                <Input id="dataAprovacao" name="dataAprovacao" />

                                <Label htmlFor="tipoCobranca">Tipo de Cobrança</Label>
                                <Input id="tipoCobranca" name="tipoCobranca" />

                                <Label htmlFor="ptax">PTAX</Label>
                                <Input id="ptax" name="ptax" />

                                <Label htmlFor="orcado">Orçado</Label>
                                <Input id="orcado" name="orcado" />

                                <Label htmlFor="realizado">Realizado</Label>
                                <Input id="realizado" name="realizado" />

                                <Label htmlFor="variacao">Variação</Label>
                                <Input id="variacao" name="variacao" />

                                <Label htmlFor="horaOrcadas">Horas Orçadas</Label>
                                <Input id="horaOrcadas" name="horaOrcadas" />

                                <Label htmlFor="valorHora">Valor Hora</Label>
                                <Input id="valorHora" name="valorHora" />

                                <Label htmlFor="obs">OBS</Label>
                                <Input id="obs" name="obs" />

                                <Label htmlFor="status">Status</Label>
                                <Input id="status" name="status" />

                                <Label htmlFor="prioridade">Prioridade</Label>
                                <Input id="prioridade" name="prioridade" />
                            </div>

                            <DialogFooter>
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
