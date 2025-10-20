import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import prisma from "@/lib/prisma"

export const HeaderAlert = async () => {
    const alerts = await prisma.alert.findMany()
    return (
        <div className="bg-amber-500 h-[10vh] items-center justify-items-center flex justify-between">
            <div className="text-center p-3 text-2xl">
                Capital Trade
            </div>

            <div className="p-4">
                <Dialog>
                    <form>
                        <DialogTrigger asChild>
                            <Button variant="outline">Add Item</Button>
                        </DialogTrigger>
                        <DialogContent className="">
                            <DialogHeader>
                                <DialogTitle>Edit profile</DialogTitle>
                                <DialogDescription>
                                    Make changes to your profile here. Click save when you&apos;re
                                    done.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid h-[20v]">
                                <div className="grid gap-3">
                                    {alerts.map((alert) => (
                                        <li key={alert.id}></li>
                                    ))}
                                    {/* <Label htmlFor="name-1">Name</Label>
                                    <Input id="name" name="name" defaultValue="" />
                                    <Label htmlFor="name-1">Responsavel</Label>
                                    <Input id="responsavel" name="name" defaultValue="" />
                                    <Label htmlFor="name-1">Data de Aprovação</Label>
                                    <Input id="dataAprovacao" name="name" defaultValue="" />
                                    <Label htmlFor="name-1">Tipo de Cobrança</Label>
                                    <Input id="tipoCobranca" name="name" defaultValue="" />
                                    <Label htmlFor="name-1">PTAX</Label>
                                    <Input id="ptax" name="name" defaultValue="" />
                                    <Label htmlFor="name-1">Orçado</Label>
                                    <Input id="orcado" name="name" defaultValue="" />
                                    <Label htmlFor="name-1">Horas Orçadas</Label>
                                    <Input id="horaOrcadas" name="name" defaultValue="" />
                                    <Label htmlFor="name-1">Valor Hora</Label>
                                    <Input id="valorHora" name="name" defaultValue="" />
                                    <Label htmlFor="name-1">OBS</Label>
                                    <Input id="obs" name="name" defaultValue="" />
                                    <Label htmlFor="name-1">Status</Label>
                                    <Input id="status" name="name" defaultValue="" />
                                    <Label htmlFor="name-1">Prioridade</Label>
                                    <Input id="prioridade" name="name" defaultValue="" /> */}
                                </div>
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button type="submit">Save changes</Button>
                            </DialogFooter>
                        </DialogContent>
                    </form>
                </Dialog>
            </div>

        </div>
    )
}