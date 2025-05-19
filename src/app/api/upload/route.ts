import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

export async function POST(request: NextRequest) {
    const formData = await request.formData();
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
    const fileName = `${Date.now()}-${file.name}`;

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