import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

const r2 = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

export async function POST(req) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files"); // array de arquivos
    const alertId = formData.get("alertId");
    const to = formData.get("to");
    const subject = formData.get("subject");
    const message = formData.get("message");

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "Nenhum arquivo enviado" }, { status: 400 });
    }
    const fileUrls = []

    // processa todos os arquivos em paralelo
    const results = await Promise.all(files.map(async (file) => {
      const buffer = Buffer.from(await file.arrayBuffer());
      const fileKey = `${Date.now()}-${file.name}`;

      const command = new PutObjectCommand({
        Bucket: process.env.R2_BUCKET,
        Key: fileKey,
        Body: buffer,
        ContentType: file.type,
      });

      await r2.send(command);

      const fileUrl = `${process.env.R2_PUBLIC_URL}/${fileKey}`;
      fileUrls.push(fileUrl)

      // envia para o webhook
        // supondo que fileUrls seja array de URLs já geradas
        await fetch("https://intranet.capitalsistemas.srv.br/n8n/webhook/enviar-email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                to,
                subject,
                message,
                fileUrls, // array de URLs de todos os arquivos enviados
            }),
        });


      // salva no banco
      const savedFile = await prisma.file.create({
        data: {
          filename: file.name,
          url: fileUrl,
          alertId: alertId ? Number(alertId) : null,
        },
      });

      return { savedFile, fileUrl };
    }));

    return NextResponse.json({
      success: true,
      files: results.map(r => r.savedFile),
      fileUrls: results.map(r => r.fileUrl),
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error.message || "Erro ao fazer upload" },
      { status: 500 }
    );
  }
}
