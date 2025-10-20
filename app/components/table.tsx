'use client'
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
const invoices = [
    {
        name: "INV001",
        responsavel: "Paid",
        tipoCobranca: "$250.00",
        dataAprovacao: "Credit Card",
        ptax: '5.7788',
        orcado: '20',
        realizado: '20',
        variacao: '0%',
        horasOrcada: '0',
        valorHora: '0',
        obs: '',
        status: 'Aprovado',
        prioridade: 'Alto',
        automacao: 'Enviar Notificação'
    },
    {
        name: "INV002",
        responsavel: "Paid",
        tipoCobranca: "$250.00",
        dataAprovacao: "Credit Card",
        ptax: '5.7788',
        orcado: '20',
        realizado: '20',
        variacao: '0%',
        horasOrcada: '0',
        valorHora: '0',
        obs: '',
        status: 'Aprovado',
        prioridade: 'Alto',
        automacao: 'Enviar Notificação'
    },
    {
        name: "INV003",
        responsavel: "Paid",
        tipoCobranca: "$250.00",
        dataAprovacao: "Credit Card",
        ptax: '5.7788',
        orcado: '20',
        realizado: '20',
        variacao: '0%',
        horasOrcada: '0',
        valorHora: '0',
        obs: '',
        status: 'Aprovado',
        prioridade: 'Alto',
        automacao: 'Enviar Notificação'
    },
    {
        name: "INV004",
        responsavel: "Paid",
        tipoCobranca: "$250.00",
        dataAprovacao: "Credit Card",
        ptax: '5.7788',
        orcado: '20',
        realizado: '20',
        variacao: '0%',
        horasOrcada: '0',
        valorHora: '0',
        obs: '',
        status: 'Aprovado',
        prioridade: 'Alto',
        automacao: 'Enviar Notificação'
    },
    {
        name: "INV005",
        responsavel: "Paid",
        tipoCobranca: "$250.00",
        dataAprovacao: "Credit Card",
        ptax: '5.7788',
        orcado: '20',
        realizado: '20',
        variacao: '0%',
        horasOrcada: '0',
        valorHora: '0',
        obs: '',
        status: 'Aprovado',
        prioridade: 'Alto',
        automacao: 'Enviar Notificação'
    },
    {
        name: "INV006",
        responsavel: "Paid",
        tipoCobranca: "$250.00",
        dataAprovacao: "Credit Card",
        ptax: '5.7788',
        orcado: '20',
        realizado: '20',
        variacao: '0%',
        horasOrcada: '0',
        valorHora: '0',
        obs: '',
        status: 'Aprovado',
        prioridade: 'Alto',
        automacao: 'Enviar Notificação'
    },
    {
        name: "INV007",
        responsavel: "Paid",
        tipoCobranca: "$250.00",
        dataAprovacao: "Credit Card",
        ptax: '5.7788',
        orcado: '20',
        realizado: '20',
        variacao: '0%',
        horasOrcada: '0',
        valorHora: '0',
        obs: '',
        status: 'Aprovado',
        prioridade: 'Alto',
        automacao: 'Enviar Notificação'
    },
]

export const TableAlert = () => {
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
                    {invoices.map((invoice) => (
                        <TableRow key={invoice.name}>
                            <TableCell className="font-medium">{invoice.name}</TableCell>
                            <TableCell>{invoice.responsavel}</TableCell>
                            <TableCell>{invoice.dataAprovacao}</TableCell>
                            <TableCell>{invoice.tipoCobranca}</TableCell>
                            <TableCell>{invoice.ptax}</TableCell>
                            <TableCell>{invoice.orcado}</TableCell>
                            <TableCell>{invoice.horasOrcada}</TableCell>
                            <TableCell>{invoice.valorHora}</TableCell>
                            <TableCell>{invoice.obs}</TableCell>
                            <TableCell>{invoice.status}</TableCell>
                            <TableCell>{invoice.prioridade}</TableCell>
                            <TableCell className="text-right">{invoice.automacao}</TableCell>
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