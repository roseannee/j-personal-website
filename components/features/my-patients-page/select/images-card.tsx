import Image from "next/image"
import Link from "next/link"
import { getImages } from "@/actions/db-select.actions"

import { cn, formatDate } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Typography } from "@/components/ui/typography"
import { Icons } from "@/components/shared/icons"

import { UploadImage } from "../create/upload-image"
import { DeleteImage } from "../delete/delete-image"

interface ImagesCardProps {
  patientId: string
}

export const ImagesCard = async ({ patientId }: ImagesCardProps) => {
  const images = (await getImages(patientId)).data
  if (!images) return

  return (
    <>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Світлини</CardTitle>

        <UploadImage />
      </CardHeader>

      <ScrollArea className="h-[calc(100%_-_96px)]">
        <CardContent className="grid size-full grid-cols-1 gap-2 md:grid-cols-3 xl:grid-cols-4">
          {images.length > 0 ? (
            images.map(({ id, url, downloadUrl, date }, index) => (
              <div key={index} className="relative">
                <div className="size-full">
                  <Link href={url} as="image">
                    <Image
                      src={url}
                      alt={url}
                      width="0"
                      height="0"
                      sizes="100vw"
                      style={{ width: "100%", height: "90%" }}
                      className="object-cover"
                      priority
                    />
                  </Link>

                  <Typography variant="muted" className="text-center italic">
                    {formatDate(date)}
                  </Typography>
                </div>

                <Link
                  href={downloadUrl}
                  className={cn(
                    "absolute right-11 top-2 !size-8 !rounded-full !p-0",
                    buttonVariants({ variant: "outline" })
                  )}
                >
                  <Icons.download />
                </Link>

                <DeleteImage id={id} url={url} />
              </div>
            ))
          ) : (
            <Typography variant="muted">Немає світлин.</Typography>
          )}
        </CardContent>
      </ScrollArea>
    </>
  )
}
