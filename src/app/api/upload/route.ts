import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { NextRequest, NextResponse } from "next/server";
import slugify from 'slugify'

export const runtime = "edge"

export async function POST(req: NextRequest) {
    const authSession = req.cookies.get("auth_session");

    if (!authSession) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;
    if (!file) {
        return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const S3 = new S3Client({
        region: "auto",
        endpoint: process.env.ENDPOINT_S3!,
        credentials: {
            accessKeyId: process.env.ACCESS_KEY_ID_S3!,
            secretAccessKey: process.env.SECRET_ACCESS_KEY_S3!,
        },
    });


    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const fileName = slugify(`${Date.now()}-${file.name}`, {lower:true, strict:true, });

    const command = new PutObjectCommand({
        Bucket: process.env.S3_BUCKET,
        Key: fileName,
        Body: fileBuffer,
        ContentType: file.type,
    });

    await S3.send(command)
    const fileUrl = `${process.env.S3_PUBLIC}/${fileName}`

    return NextResponse.json({ status: 'upload success', link: fileUrl })
}