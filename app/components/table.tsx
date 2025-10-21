import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { getAlerts } from "./actions/alertActions"

export const TableAlert = async () => {
    const alerts = await getAlerts()
    return (
        <div className="font-sans items-center justify-items-center text-white custom-scrollbar">
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px] text-white">Name</TableHead>
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
                        <TableRow key={alert.id}>
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
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={11}>Total</TableCell>
                        <TableCell className="text-right">$2,500.00</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    )
}