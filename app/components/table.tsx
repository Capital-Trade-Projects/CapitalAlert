"use client";

import {
  Table,
  
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, type MouseEvent } from "react";
import { AlertItems } from "@/lib/generated/prisma";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteAlert, updateAlert } from "./actions/alertActions";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import ButtonDelete from "@/components/ui/ButtonDelete";
import UploadButton from "../Upload";
import CancelBtn from "@/components/ui/CancelBtn";
import SaveButton from "@/components/ui/SaveButton";
import { Input } from "@/components/ui/input";

type TableAlertProp = {
  alerts: AlertItems[];
};

export const TableAlert = ({ alerts }: TableAlertProp) => {
  const [toggle, setToggle] = useState<string[]>([]);
  const [selectedAlert, setSelectedAlert] = useState<AlertItems | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  

  async function loadFiles() {
    const res = await fetch('/api/files');
    const data = await res.json();
    setFiles(data);
  }

  useEffect(() => {
    loadFiles();
  }, [])

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

  async function handleSubmit(formData: FormData) {
    await updateAlert(formData)
    router.refresh()
    setOpen(false)
  }

  async function handleDelete(formData: FormData) {
    await deleteAlert(formData)
    router.refresh()
    setOpenDelete(false)
  }


  return (
    <>
      {/* 🔹 Diálogo (renderizado fora da tabela, controlado por estado) */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalhes do Alerta</DialogTitle>
          </DialogHeader>

  return (
  <>
    {/* 🔹 Diálogo (renderizado fora da tabela, controlado por estado) */}
    <Dialog open={open} onOpenChange={() => setOpen((prevState) => !prevState)}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detalhes do Alerta</DialogTitle>
        </DialogHeader>

        {selectedAlert ? (
          <form
            onSubmit={(event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              handleSubmit(formData);
            }}
          >
            <input type="hidden" name="id" value={selectedAlert.id} />
            <div className="font-sans text-white custom-scrollbar overflow-auto h-[60vh] p-4 space-y-2">
              <p><strong>id:</strong> {selectedAlert.id}</p>
              <p><Input id="name" name="name"  placeholder="Nome:" /></p>
              <p><Input id="responsavel" name="responsavel" placeholder="Responsável:" /></p>
              <p><Input id="dataAprovacao" name="dataAprovacao" placeholder="Data de Aprovação:" /></p>
              <p><Input id="tipoCobranca" name="tipoCobranca" placeholder="Tipo de Cobrança:"/></p>
              <p><Input id="ptax" name="ptax" placeholder="PTAX:" /></p>
              <p><Input id="orcado" name="orcado" placeholder="Orçado:"/></p>
              <p><Input id="realizado" name="realizado" placeholder="Realizado:"/></p>
              <p><Input id="variacao" name="variacao" placeholder="Variação:"/></p>
              <p><Input id="horaOrcadas" name="horaOrcadas" placeholder="Horas Orçadas:"/></p>
              <p><Input id="valorHora" name="valorHora" placeholder="Valor Hora:"/></p>
              <p><Input id="obs" name="obs" placeholder="OBS:"/></p>
              <p><Input id="status" name="status" placeholder="Status:"/></p>
              <p><Input id="prioridade" name="prioridade" placeholder="Prioridade:"/></p>
            </div>
            <DialogFooter className="m-1">
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
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
      <div className="font-sans  text-white custom-scrollbar max-h-[80vh] min-w-full overflow-y-auto relative ">
        <Table className="relative">
          <TableHeader className="sticky top-0 bg-gray-900 z-10 outline rounded-sm">
            <TableRow>
              <TableHead className=" w-[100px]  text-white">Selecionar</TableHead>
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
              <TableHead className=" text-right text-white">Anexar Documento</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody className="bg-popover-foreground">
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
                    onClick={(e: MouseEvent) => e.stopPropagation()} // impede o clique no checkbox de abrir o modal
                    
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
                <TableCell className="text-right">
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      if (files.length === 0) return console.log("Selecione pelo menos um arquivo");

                      try {
                        setLoading(true);
                        const formData = new FormData();

                        // adiciona todos os arquivos
                        files.forEach(file => formData.append("files", file));

                        formData.append("to", "marcio.santos@capitaltrade.srv.br");
                        formData.append("subject", "Relatório de Gasto");
                        formData.append("message", "Segue o relatório solicitado.");
                        formData.append("alertId", alert.id.toString());

                        const res = await fetch("/api/upload", {
                          method: "POST",
                          body: formData,
                        });

                        const data = await res.json();
                        setLoading(false);

                        if (data.error) {
                          console.error(data.error);
                          return;
                        }

                        setFiles([]); // limpa a seleção
                        await loadFiles();
                        console.log("Arquivos enviados com sucesso!");
                      } catch (error) {
                        console.error(error);
                        setLoading(false);
                      }
                    }}
                    className="flex flex-col items-center gap-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <input
                      type="file"
                      multiple
                      onChange={(e) => {
                        const fileList = (e.target as HTMLInputElement).files;
                        if (fileList) setFiles(Array.from(fileList));
                      }}
                    />

                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-blue-600 text-white px-4 py-2 rounded-md"
                    >
                      {loading ? "Enviando" : "Enviar"}
                    </button>
                  </form>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter className="bg-background">
            {toggle.length > 0 ? (
            <div className="p-4">
                <Dialog open={openDelete} onOpenChange={setOpenDelete}>
                    <DialogTrigger asChild>
                        <ButtonDelete 
                        />
                    </DialogTrigger>
                    <DialogContent className="h-30">
                      <form action={handleDelete}>
                        {toggle.map(id => (
                          <input key={id} type="hidden" name="id" value={id} />
                        ))}

                        <DialogHeader>
                          <DialogTitle>Delete Item</DialogTitle>
                        </DialogHeader>
                        <DialogFooter>
                          <DialogClose asChild>
                            < CancelBtn />
                          </DialogClose>
                          <SaveButton type="submit" loading={isLoading} />
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
      </div >
    </>
  );
};