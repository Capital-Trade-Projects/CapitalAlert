"use server"

import { AlertItems } from "@/lib/generated/prisma"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function getAlerts():Promise<AlertItems[]> {
    return await prisma.alertItems.findMany();
}

export async function createAlert(data: FormData): Promise<void> {
  
  const name = data.get("name") as string
  const responsavel = data.get("responsavel") as string
  const dataAprovacao = data.get("dataAprovacao") as string
  const tipoCobranca = data.get("tipoCobranca") as string
  const ptax = data.get("ptax") as string
  const orcado = data.get("orcado") as string
  const realizado = data.get("realizado") as string
  const horaOrcadas = data.get("horaOrcadas") as string
  const valorHora = data.get("valorHora") as string
  const obs = data.get("obs") as string
  const status = data.get("status") as string
  const prioridade = data.get("prioridade") as string
  const variacao = data.get("variacao") as string

  await prisma.alertItems.create({
    data: {
      name,
      responsavel,
      dataAprovacao,
      tipoCobranca,
      ptax,
      orcado,
      realizado,
      horaOrcadas,
      valorHora,
      obs,
      status,
      prioridade,
      variacao,
    },
  })

  // Importante: não dar return, apenas chamar
  revalidatePath('/seed.ts')
}

export async function updateAlert(data:FormData): Promise<void> {
  try {
    const id = data.get('id') as any
    const name = data.get('name') as string
    const responsavel = data.get("responsavel") as string
    const dataAprovacao = data.get("dataAprovacao") as string
    const tipoCobranca = data.get("tipoCobranca") as string
    const ptax = data.get("ptax") as string
    const orcado = data.get("orcado") as string
    const realizado = data.get("realizado") as string
    const horaOrcadas = data.get("horaOrcadas") as string
    const valorHora = data.get("valorHora") as string
    const obs = data.get("obs") as string
    const status = data.get("status") as string
    const prioridade = data.get("prioridade") as string
    const variacao = data.get("variacao") as string

    await prisma.alertItems.update({
      where: { id: 1 },
      data: { 
        name,
        responsavel,
        dataAprovacao,
        tipoCobranca,
        ptax,
        orcado,
        realizado,
        horaOrcadas,
        valorHora,
        obs,
        status,
        prioridade,
        variacao
      }
    })

    revalidatePath('/seed.ts')
  } catch (error) {
     { error: 'Falhou a atualização dos dados' }
  }
}

export async function deleteAlert(data:FormData): Promise<void> {
  const id = data.get('id') as any

  await prisma.alertItems.delete({
    where: { id: 1 }
  })

  revalidatePath('/seed.ts')
}