import { NextResponse, type NextRequest } from "next/server"
import { del, put } from "@vercel/blob"
import { format } from "date-fns"

export async function POST(req: Request) {
  try {
    const form = await req.formData()
    const patientId = form.get("patientId") as string
    const date = form.get("date") as string
    const image = form.get("image") as File

    const formattedDate = format(date, "dd-MM-yyyy_HH-mm-ss")
    const imageType = image.type.split("/")[1]

    const imageName = `${patientId}/${formattedDate}.${imageType}`

    const blob = await put(imageName, image, {
      access: "public",
      contentType: image.type,
      addRandomSuffix: false,
    })

    return NextResponse.json({ url: blob.url, downloadUrl: blob.downloadUrl })
  } catch (error: any) {
    return NextResponse.json({ error: error.message })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams
    const url = searchParams.get("url") as string

    await del(url)
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message })
  }
}
