import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Select } from './ui/select'
import { Textarea } from './ui/textarea'

const defaultValues = {
  ownerId: '',
  petId: '',
  date: '',
  annotation: '',
}

type Owner = {
  _id: string
  name: string
}

type Pet = {
  _id: string
  name: string
  ownerId?: string
}

export default function CreateAppointmentForm() {
  const [form, setForm] = useState(defaultValues)
  const [owners, setOwners] = useState<Owner[]>([])
  const [pets, setPets] = useState<Pet[]>([])
  const [status, setStatus] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loadingData, setLoadingData] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoadingData(true)
      try {
        const [ownersRes, petsRes] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_BASE_URL}/owner`),
          fetch(`${import.meta.env.VITE_API_BASE_URL}/pet`),
        ])

        const [ownersData, petsData] = await Promise.all([
          ownersRes.json(),
          petsRes.json(),
        ])

        setOwners(Array.isArray(ownersData) ? ownersData : [])
        setPets(Array.isArray(petsData) ? petsData : [])
      } catch (error) {
        console.error('Erro ao carregar owners/pets:', error)
        setStatus('Não foi possível carregar proprietários e pets.')
      } finally {
        setLoadingData(false)
      }
    }

    fetchData()
  }, [])

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus(null)
    setIsSubmitting(true)

    try {
      const payload = {
        ownerId: form.ownerId,
        petId: form.petId,
        date: new Date(form.date).toISOString(),
        annotation: form.annotation.trim() || undefined,
      }

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/appointment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const payload = await response.json().catch(() => null)
        setStatus(
          `Erro ao criar agendamento${payload?.message ? `: ${payload.message}` : ''}`,
        )
        return
      }

      setStatus('Agendamento criado com sucesso!')
      setForm(defaultValues)
    } catch (error) {
      console.error(error)
      setStatus('Erro de conexão ao criar agendamento.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="w-full max-w-3xl rounded-3xl border border-border bg-background/80 p-6 shadow-sm">
      <div className="mb-6 space-y-2">
        <p className="text-sm font-semibold uppercase text-muted-foreground">Microfrontend</p>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">Criar agendamento</h1>
        <p className="text-sm text-muted-foreground">
          Use este formulário para cadastrar um novo appointment no backend.
        </p>
      </div>

      <form className="grid gap-5" onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <Label htmlFor="ownerId">Proprietário</Label>
          <Select
            id="ownerId"
            name="ownerId"
            value={form.ownerId}
            onChange={handleChange}
            required
            disabled={loadingData}
          >
            <option value="">Selecione um proprietário</option>
            {owners.map((owner) => (
              <option key={owner._id} value={owner._id}>
                {owner.name}
              </option>
            ))}
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="petId">Pet</Label>
          <Select
            id="petId"
            name="petId"
            value={form.petId}
            onChange={handleChange}
            required
            disabled={loadingData || owners.length === 0}
          >
            <option value="">
              {form.ownerId ? 'Selecione um pet' : 'Selecione um proprietário primeiro'}
            </option>
            {pets
              .filter((pet) => !form.ownerId || pet.ownerId === form.ownerId)
              .map((pet) => (
                <option key={pet._id} value={pet._id}>
                  {pet.name}
                </option>
              ))}
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="date">Data do agendamento</Label>
          <Input
            id="date"
            name="date"
            type="datetime-local"
            value={form.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="annotation">Observações</Label>
          <Textarea
            id="annotation"
            name="annotation"
            value={form.annotation}
            onChange={handleChange}
            placeholder="Anotações opcionais"
            rows={4}
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Button type="submit" className="w-full sm:w-auto" disabled={isSubmitting}>
            {isSubmitting ? 'Enviando...' : 'Criar agendamento'}
          </Button>
          {status ? (
            <p className="text-sm text-muted-foreground">{status}</p>
          ) : null}
        </div>
      </form>
    </section>
  )
}
