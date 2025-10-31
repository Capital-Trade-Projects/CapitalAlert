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
import { useEffect, useState } from "react";
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
import DeleteButton from "@/components/ui/DeleteButton";
import SaveButton from "@/components/ui/SaveButton";
import CancelBtn from "@/components/ui/CancelBtn";

type TableAlertProp = {
  alerts: AlertItems[];
};

export const TableAlert = ({ alerts }: TableAlertProp) => {
  const [toggle, setToggle] = useState<string[]>([]);
  const [selectedAlert, setSelectedAlert] = useState<AlertItems | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  
  // 🔹 ALTERAÇÃO 1: Renomeado e mudado para array de Arquivos (File[])
  const [filesToUpload, setFilesToUpload] = useState<File[]>([]); 
  
  const [, setFiles] = useState<{ name: string; url: string }[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadFiles() {
    const res = await fetch("/api/files");
    const data = await res.json();
    setFiles(data);
  }

  useEffect(() => {
    loadFiles();
  }, []);

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
    await updateAlert(formData);
    router.refresh();
    setOpen(false);
  }

  async function handleDelete(formData: FormData) {
    await deleteAlert(formData);
    router.refresh();
    setOpenDelete(false);
  }

  return (
    <>
      {/* 🔹 Diálogo (renderizado fora da tabela, controlado por estado) */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalhes do Alerta</DialogTitle>
          </DialogHeader>

          {selectedAlert ? (
            <form action={handleSubmit} className="max-w-lg mx-auto">
              <input type="hidden" name="id" value={selectedAlert.id} />

              <div className="grid gap-3 mb-4 grid-cols-2 h-[32vh] overflow-auto custom-scrollbar">
                {/* ... (todos os seus campos de input do formulário principal) ... */}
                <div>
                  <label htmlFor="name" className="block mb-1 text-xs font-medium text-white dark:text-black">Nome</label>
                  <input type="text" id="name" name="name" className="bg-gray-50 border border-gray-300 text-black text-xs rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5" placeholder="Nome" required defaultValue={selectedAlert.name} />
                </div>
                <div>
                  <label htmlFor="responsavel" className="block mb-1 text-xs font-medium text-white dark:text-black">Responsável</label>
                  <input type="text" id="responsavel" name="responsavel" className="bg-gray-50 border border-gray-300 text-black text-xs rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5" placeholder="Responsável" required defaultValue={selectedAlert.responsavel} />
                </div>
                <div>
                  <label htmlFor="dataAprovacao" className="block mb-1 date- font-medium text-white dark:text-black">Data de aprovação</label>
                  <input type="date" id="dataAprovacao" name="dataAprovacao" className="bg-gray-50 border border-gray-300 text-black text-xs rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5" required defaultValue={selectedAlert.dataAprovacao} />
                </div>
                <div>
                  <label htmlFor="tipoCobranca" className="block mb-1 text-xs font-medium text-white dark:text-black">Tipo de Cobrança</label>
                  <select id="tipoCobranca" name="tipoCobranca" className="bg-gray-50 border border-gray-300 text-black text-xs rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5" defaultValue={selectedAlert.tipoCobranca} >
                    <option>Mensal</option>
                    <option>Semestral</option>
                    <option>Anual</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="ptax" className="block mb-1 text-xs font-medium text-white dark:text-black">PTAX</label>
                  <select id="ptax" name="ptax" className="bg-gray-50 border border-gray-300 text-black text-xs rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5" required defaultValue={selectedAlert.ptax ?? ''} >
                    <option>Dólar</option>
                    <option>Euro</option>
                    <option>Real</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="orcado" className="block mb-1 text-xs font-medium text-white dark:text-black">Orçado</label>
                  <input type="text" id="orcado" name="orcado" className="bg-gray-50 border border-gray-300 text-black text-xs rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5" placeholder="Orçado" required defaultValue={selectedAlert.orcado ?? ''} />
                </div>
                <div>
                  <label htmlFor="horaOrcadas" className="block mb-1 text-xs font-medium text-white dark:text-black">Horas Orçadas</label>
                  <input type="text" id="horaOrcadas" name="horaOrcadas" className="bg-gray-50 border border-gray-300 text-black text-xs rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5" placeholder="Horas orçadas" required defaultValue={selectedAlert.horaOrcadas ?? ''} />
                </div>
                <div>
                  <label htmlFor="valorHora" className="block mb-1 text-xs font-medium text-white dark:text-black">Valor Hora</label>
                  <input type="text" id="valorHora" name="valorHora" className="bg-gray-50 border border-gray-300 text-black text-xs rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5" placeholder="Valor Hora" required defaultValue={selectedAlert.valorHora ?? ''} />
                </div>
              </div>
              <div className="grid gap-3 mb-4 grid-cols-2">
                <div>
                  <label htmlFor="prioridade" className="block mb-1 text-xs font-medium text-white dark:text-black">Prioridade</label>
                  <select id="prioridade" name="prioridade" className="bg-gray-50 border border-gray-300 text-black text-xs rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5" defaultValue={selectedAlert.prioridade}>
                    <option>Baixa</option>
                    <option>Média</option>
                    <option>Alta</option>
                    <option>Critico</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="status" className="block mb-1 text-xs font-medium text-white dark:text-black">Status</label>
                  <select id="status" name="status" className="bg-gray-50 border border-gray-300 text-black text-xs rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5" defaultValue={selectedAlert.status}>
                    <option>Em Andamento</option>
                    <option>Pendente</option>
                    <option>Concluído</option>
                    <option>Cancelado</option>
                  </select>
                </div>
              </div>
              <div className="mb-2">
                <label htmlFor="obs" className="block mb-1 text-xs font-medium text-white dark:text-black">OBS</label>
                <input type="text" id="obs" name="obs" className="bg-gray-50 border border-gray-300 text-black text-xs rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5" placeholder="Obs" defaultValue={selectedAlert.obs ?? ''} />
              </div>
              <DialogFooter className="m-2">
                <DialogClose asChild>
                  <CancelBtn />
                </DialogClose>
                <SaveButton type="submit" loading={isLoading} />
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
          <TableBody className="bg-gray-900 h-full m-5 ">
            {alerts.map((alert) => (
              <TableRow
                key={alert.id}
                className="cursor-pointer hover:bg-gray-800 transition outline rounded-sm m-1  "
                onClick={() => handleRowClick(alert)}
              >
                <TableCell>
                  <Checkbox
                    checked={toggle.includes(String(alert.id))}
                    onCheckedChange={(checked) =>
                      handleSelect(String(alert.id), !!checked)
                    }
                    onClick={(e) => e.stopPropagation()}
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
                <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>                 
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">Anexar arquivo</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md bg-background text-amber-50">
                      <DialogHeader>
                        <DialogTitle>Anexar</DialogTitle>
                        <DialogDescription className="text-amber-50">
                          Selecione um ou mais arquivos para compartilhar com este alerta.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="flex items-center gap-4 py-4 bg-foreground/5 rounded-md">
                        <div className="grid flex-1 gap-2">
                          <form
                            onSubmit={async (e) => {
                              e.preventDefault();

                              if (filesToUpload.length === 0) return console.log("Selecione ao menos um arquivo");

                              try {
                                setLoading(true);
                                const formData = new FormData();

                                filesToUpload.forEach(file => formData.append("files", file));

                                formData.append("to","marcio.santos@capitaltrade.srv.br");
                                formData.append("subject", "Relatório de Gastos");
                                formData.append("message", "Segue o relatotório solicitado.");
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
                                
                                setFilesToUpload([]); 
                                await loadFiles();
                                console.log("Arquivos enviados com sucesso!");
                              } catch (error) {
                                console.error(error);
                                setLoading(false);
                              }
                            }}
                            className="flex flex-col items-center gap-4"
                          >
                            <input
                              type="file"
                              multiple 
                              onChange={(e) => {
                                const selectedFiles = e.target.files;
                                if (selectedFiles) {
                                  setFilesToUpload(Array.from(selectedFiles)); 
                                }
                              }}
                              className="border p-2 rounded"
                            />

                            {filesToUpload.length > 0 && (
                              <div className="text-xs text-gray-400 mt-2 w-full text-left px-4">
                                <p className="font-medium">Arquivos selecionados:</p>
                                <ul className="list-disc list-inside">
                                  {filesToUpload.map((f, index) => (
                                    <li key={index}>{f.name}</li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            <SaveButton
                              type="submit"
                              disabled={loading || filesToUpload.length === 0}
                            >
                              {loading ? "Enviando" : "Enviar"}
                            </SaveButton>
                          </form>
                        </div>
                      </div>
                      <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                          <CancelBtn type="button"></CancelBtn>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter className="bg-black">
            <tr>
              <td>
                {toggle.length > 0 ? (
                  <Dialog open={openDelete} onOpenChange={setOpenDelete}>
                    <DialogTrigger asChild>
                      <DeleteButton />
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
                ) : (
                  <p>Capital trade</p>
                )}
              </td>
            </tr>
          </TableFooter>
        </Table>
      </div>
    </>
  );
};