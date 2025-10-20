-- CreateTable
CREATE TABLE "AlertItems" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "responsavel" TEXT NOT NULL,
    "dataAprovacao" INTEGER NOT NULL,
    "tipoCobranca" TEXT NOT NULL,
    "ptax" INTEGER NOT NULL,
    "orcado" INTEGER NOT NULL,
    "realizado" INTEGER NOT NULL,
    "variacao" INTEGER NOT NULL,
    "horaOrcadas" INTEGER NOT NULL,
    "valorHora" INTEGER NOT NULL,
    "obs" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "prioridade" TEXT NOT NULL,
    "automacao" TEXT NOT NULL,

    CONSTRAINT "AlertItems_pkey" PRIMARY KEY ("id")
);
