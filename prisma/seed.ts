import { PrismaClient, Prisma } from "@/lib/generated/prisma";

const prisma = new PrismaClient();

const userData: Prisma.AlertItemsCreateInput[] =[
    {
        name: 'v0.dev',
        responsavel: 'Victor Marcondes',
        dataAprovacao: '13/10/2025',
        tipoCobranca: 'Mensal',
        ptax: '5.7788',
        orcado: '20',
        realizado: '20',
        variacao: '0',
        horaOrcadas: '0',
        valorHora: '0',
        obs: '',
        status: '',
        prioridade: 'Alto',
    }
];

export async function main() {
    for (const u of userData) {
        await prisma.alertItems.create({ data: u });
    }
}

main();