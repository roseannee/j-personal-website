import { Typography } from "@/components/ui/typography"

export default function Home() {
  return (
    <section className="container flex flex-col space-y-4 py-6 md:py-10">
      <Typography variant="h1">Welcome!</Typography>
      <Typography variant="lead">This is starter template.</Typography>
    </section>
  )
}
