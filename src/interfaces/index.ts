export interface Pacientes {
  id: string
  name: string
  caretaker: string
  email: string
  date: Date
  sintomas: string
}


export type DrafPacientes = Omit<Pacientes, 'id'>
