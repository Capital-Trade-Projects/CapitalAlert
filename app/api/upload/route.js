import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma"

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
    const file = formData.get('file');
    const alertId = formData.get("alertId");

    // console.log(file)
    // console.log(alertId)

    if (!file) {
        return NextResponse.json({ error: "Nenhum arquivo enviado" }, { status: 400 });
    }
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

    const savedFile = await prisma.file.create({
        data: {
            filename: file.name,
            url: fileUrl,
            alertId: alertId ? Number(alertId) : null,
        },
    });

    return NextResponse.json({
        sucess: true,
        file: savedFile,
    });
} catch (error) {
    console.error(error);
    return NextResponse.json(
        { error: error.message || "Erro ao fazer upload"},
        { status: 500 }
    );
}
}