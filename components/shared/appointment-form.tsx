import { useEffect, useState } from "react"
import { getProceduresWithMedications } from "@/actions/db-select.actions"
import { Appointment } from "@/types"

import { MedicationData, ProcedureData } from "@/types/appointment-data"
import { FormProps } from "@/types/form-props"

import { AppointmentDate } from "../appointment-date"
import { MedicationSelector } from "../medication-selector"
import { ProcedureSelector } from "../procedure-selector"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import { Asterisk } from "./asterisk"
import { SubmitButton } from "./submit-button"

export const AppointmentForm = ({
  form,
  onSubmit,
  status,
}: FormProps<Appointment>) => {
  const [, setSelectedProcedure] = useState<number | null>(null)
  const [procedures, setProcedures] = useState<ProcedureData[]>([])
  const [medications, setMedications] = useState<MedicationData[]>([])

  useEffect(() => {
    const fetchAndSetProcedures = async () => {
      const res = await getProceduresWithMedications()

      if (res.success) {
        const fetchedProcedures = res.data!
        setProcedures(fetchedProcedures)

        const selectedProcedure = fetchedProcedures.find(
          (procedure) => procedure.name === form.getValues("procedure")
        )

        if (selectedProcedure) {
          setSelectedProcedure(selectedProcedure.id)
          setMedications(selectedProcedure.medications)
        }
      } else {
        console.error(`AppointmentForm: ${res.message}`)
      }
    }

    fetchAndSetProcedures()
  }, [form])

  const handleProcedureSelect = (procedureId: number) => {
    const selected = procedures.find(
      (procedure) => procedure.id === procedureId
    )

    if (selected) {
      setSelectedProcedure(selected.id)
      form.setValue("procedure", selected.name)
      form.setValue("price", selected.price || 0)

      if (selected.medications.length > 0) {
        setMedications(selected.medications)
      } else {
        setMedications([])
        form.setValue("medication", "")
      }
    }
  }

  const handleMedicationSelect = (medicationName: string) => {
    const selectedMedication = medications.find(
      (medication) => medication.name === medicationName
    )

    if (selectedMedication) {
      form.setValue("medication", selectedMedication.name)
      form.setValue("price", selectedMedication.price)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>
                Дата прийому
                <Asterisk />
              </FormLabel>

              <AppointmentDate field={field} />

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="procedure"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>
                Процедура
                <Asterisk />
              </FormLabel>

              <ProcedureSelector
                field={field}
                procedures={procedures}
                handleProcedureSelect={handleProcedureSelect}
              />

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Опис</FormLabel>

              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormDescription>
                Можна подати більш детальну інформацію про процедуру, наприклад,
                яка вона за рахунком.
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="medication"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Препарат</FormLabel>

              <MedicationSelector
                field={field}
                medications={medications}
                handleMedicationSelect={handleMedicationSelect}
              />

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>
                Ціна
                <Asterisk />
              </FormLabel>

              <FormControl>
                <Input type="number" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton status={status} />
      </form>
    </Form>
  )
}
