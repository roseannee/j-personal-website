import { formatDate, getQuote } from "@/lib/utils"
import { Typography } from "@/components/ui/typography"

export const Welcome = async () => {
  const quote = await getQuote()

  return (
    <div className="relative z-10 flex h-full flex-col items-center justify-center space-y-2 p-4 *:text-center">
      <Typography variant="h1">Welcome!</Typography>

      <Typography variant="large">
        Сьогодні {formatDate(new Date())}.
      </Typography>

      <Typography variant="small" className="pt-2 italic text-ring">
        {quote}
      </Typography>
    </div>
  )
}
