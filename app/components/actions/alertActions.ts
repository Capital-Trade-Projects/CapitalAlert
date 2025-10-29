"use server"

import { AlertItems } from "@/lib/generated/prisma"
import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation";

export async function getAlerts():Promise<AlertItems[]> {
    return await prisma.alertItems.findMany({
      include: { anexos: true },
      orderBy: { id: 'desc' }
    });
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
  const anexos = JSON.parse(data.get("anexos") as string || "[]")

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
      anexos: {
        create: anexos.map((a: any) => ({
          filename: a.filename,
          url: a.url
        }))
      }
    },
  })

  // Importante: não dar return, apenas chamar
  revalidatePath('/')
}

export async function updateAlert(data:FormData): Promise<void> {
  let redirectPath: string | null = null
  try {
    const id = Number(data.get('id'))
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
      where: { id },
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

    redirectPath = `/`
    
  } catch (error) {
      redirect('/')
    
  } finally {
    if (redirectPath)
      redirect(redirectPath)
  }
}

export async function deleteAlert(data:FormData): Promise<void> {
  const idsRaw = data.getAll('id')

  const ids = idsRaw.map(id => parseInt(String(id), 10)).filter(num => !isNaN(num))
  console.log(ids)

  await prisma.alertItems.deleteMany({
    where: { 
      id: {
        in: ids,
      } }
  })

  revalidatePath('/')
  redirect('/')
}

