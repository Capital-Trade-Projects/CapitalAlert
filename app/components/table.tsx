"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { AlertItems } from "@/lib/generated/prisma";
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
import { deleteAlert, updateAlert } from "./actions/alertActions";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type TableAlertProp = {
  alerts: AlertItems[];
};

export const TableAlert = ({ alerts }: TableAlertProp) => {
const [toggle, setToggle] = useState<string[]>([]);
  const [selectedAlert, setSelectedAlert] = useState<AlertItems | null>(null);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const handleSelect = (id: string, checked: boolean) => {
    setToggle((prev) =>
      checked ? [...prev, id] : prev.filter((itemId) => itemId !== id)
    );
  };

  const handleRowClick = (alert: AlertItems) => {
    setSelectedAlert(alert);
    setOpen(true);
  };

  const router = useRouter();

  async function handleSubmit(formData:FormData) {
    await updateAlert(formData)
    router.refresh()
    setOpen(false)
  }

  async function handleDelete(formData:FormData) {
    await deleteAlert(formData)
    router.refresh()
    setOpenDelete(false)
  }

  console.log(toggle, 'deu bom')

  return (
    <>
      {/* 🔹 Diálogo (renderizado fora da tabela, controlado por estado) */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalhes do Alerta</DialogTitle>
          </DialogHeader>

          {selectedAlert ? (
            <form action = {handleSubmit}>
                <input type="hidden" name="id" value={selectedAlert.id} />
            <div className="space-y-2 text-sm text-black">
              <p><strong>id:</strong> {selectedAlert.id}</p>
              <p><strong>Nome:</strong> <Input id="name" name="name" /> </p>
              <p><strong>Responsável:</strong> <Input id="responsavel" name="responsavel" /></p>
              <p><strong>Data de Aprovação:</strong> <Input id="dataAprovacao" name="dataAprovacao" /></p>
              <p><strong>Tipo de Cobrança:</strong> <Input id="tipoCobranca" name="tipoCobranca" /></p>
              <p><strong>PTAX:</strong> <Input id="ptax" name="ptax" /></p>
              <p><strong>Orçado:</strong> <Input id="orcado" name="orcado" /></p>
              <p><strong>Realizado:</strong> <Input id="realizado" name="realizado" /></p>
              <p><strong>Variação:</strong> <Input id="variacao" name="variacao" /></p>
              <p><strong>Horas Orçadas:</strong> <Input id="horaOrcadas" name="horaOrcadas" /></p>
              <p><strong>Valor Hora:</strong> <Input id="valorHora" name="valorHora" /></p>
              <p><strong>OBS:</strong> <Input id="obs" name="obs" /></p>
              <p><strong>Status:</strong> <Input id="status" name="status" /></p>
              <p><strong>Prioridade:</strong> <Input id="prioridade" name="prioridade" /></p>
            </div>
            <DialogFooter className="m-2">
                 <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                 </DialogClose>
                      <Button type="submit">Salvar</Button>
            </DialogFooter>
            </form>
          ) : (
            <p>Nenhum alerta selecionado.</p>
          )}
        </DialogContent>
      </Dialog>

      {/* 🔹 Tabela */}
      <div className="font-sans items-center justify-items-center text-white custom-scrollbar">
        <Table>
          <TableCaption>Capital Trade.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] text-white">Selecionar</TableHead>
              <TableHead className="text-white">Name</TableHead>
              <TableHead className="text-white">Responsável</TableHead>
              <TableHead className="text-white">Data de Aprovação</TableHead>
              <TableHead className="text-white">Tipo de Cobrança</TableHead>
              <TableHead className="text-white">PTAX</TableHead>
              <TableHead className="text-white">Orçado</TableHead>
              <TableHead className="text-white">Horas Orçadas</TableHead>
              <TableHead className="text-white">Valor Hora</TableHead>
              <TableHead className="text-white">OBS</TableHead>
              <TableHead className="text-white">Status</TableHead>
              <TableHead className="text-white">Prioridade</TableHead>
              <TableHead className="text-right text-white">Automação</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="bg-gray-900">
            {alerts.map((alert) => (
              <TableRow
                key={alert.id}
                className="cursor-pointer hover:bg-gray-800 transition"
                onClick={() => handleRowClick(alert)} // 👈 abre o diálogo com os dados do alerta
              >
                <TableCell>
                  <Checkbox
                    checked={toggle.includes(String(alert.id))}
                    onCheckedChange={(checked) =>
                      handleSelect(String(alert.id), !!checked)
                    }
                    onClick={(e) => e.stopPropagation()} // impede o clique no checkbox de abrir o modal
                  />
                </TableCell>
                <TableCell className="font-medium">{alert.name}</TableCell>
                <TableCell>{alert.responsavel}</TableCell>
                <TableCell>{alert.dataAprovacao}</TableCell>
                <TableCell>{alert.tipoCobranca}</TableCell>
                <TableCell>{alert.ptax}</TableCell>
                <TableCell>{alert.orcado}</TableCell>
                <TableCell>{alert.horaOrcadas}</TableCell>
                <TableCell>{alert.valorHora}</TableCell>
                <TableCell>{alert.obs}</TableCell>
                <TableCell>{alert.status}</TableCell>
                <TableCell>{alert.prioridade}</TableCell>
                <TableCell className="text-right">Anexo Aqui</TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter className="bg-black">
            {toggle ? (
            <div className="p-4">
                <Dialog open={openDelete} onOpenChange={setOpenDelete}>

                    <DialogTrigger asChild>
                        <Button variant="outline">Delete Item</Button>
                    </DialogTrigger>

                    <DialogContent className="h-30">
                        <form action={handleDelete}>
                            <input type="hidden" name="id" value={toggle} />
                            <DialogHeader>
                                <DialogTitle>Delete Item</DialogTitle>
                            </DialogHeader>
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
            ): (
                <p>Nenhum item selecionado.</p>
            )}
          </TableFooter>
        </Table>
      </div>
    </>
  );
};
