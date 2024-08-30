import { create } from "zustand";
import { DrafPacientes, Pacientes } from "../interfaces";
import * as uuid from "uuid";
import Swal from "sweetalert2";
import { devtools, persist } from "zustand/middleware";

interface PacientesState {
  pacientes: Pacientes[];
  activeId: Pacientes["id"];
  guardarPaciente: (data: DrafPacientes) => void;
  eliminarPaciente: (id: Pacientes["id"]) => void;
  obtenerPacienteId: (id: Pacientes["id"]) => void;
  actualizarPaciente: (data: DrafPacientes) => void;
}

const crearPacientes = (paciente: DrafPacientes): Pacientes => {
  return {
    ...paciente,
    id: uuid.v4(),
  };
};

export const usePacientesStore = create<PacientesState>()(
  devtools(
    persist(
      (set) => ({
        pacientes: [],
        activeId: "",
        guardarPaciente: (data) => {
          const nuevoPaciente = crearPacientes(data);

          set((state) => ({
            pacientes: [...state.pacientes, nuevoPaciente],
          }));
        },
        eliminarPaciente: (id) => {
          Swal.fire({
            title: "Estas Seguro?",
            text: "No podras revertirlo!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, borrar!",
            cancelButtonText: "Cancelar",
          }).then((result) => {
            if (result.isConfirmed) {
              set((state) => ({
                pacientes: state.pacientes.filter(
                  (paciente) => paciente.id !== id
                ),
              }));
              Swal.fire({
                title: "Eliminado!",
                text: "El paciente fue eliminado.",
                icon: "success",
                confirmButtonText: "Confirmar",
              });
            }
          });
        },
        obtenerPacienteId: (id) => {
          set(() => ({
            activeId: id,
          }));
        },
        actualizarPaciente: (data) => {
          set((state) => ({
            pacientes: state.pacientes.map((paciente) =>
              paciente.id === state.activeId
                ? { id: paciente.id, ...data }
                : paciente
            ),
            activeId: "",
          }));
        },
      }),
      {
        name: "pacienteStorage"
      }
    )
  )
);
