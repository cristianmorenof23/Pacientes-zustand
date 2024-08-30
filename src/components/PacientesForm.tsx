import { useForm } from "react-hook-form";
import { DrafPacientes } from "../interfaces";
import { usePacientesStore } from "../store/store";
import { useEffect } from "react";

export default function PacientesForm() {
  const { guardarPaciente, activeId, pacientes, actualizarPaciente } =
    usePacientesStore();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm<DrafPacientes>({ mode: "onChange" });

  useEffect(() => {
    if (activeId) {
      const activedPaciente = pacientes.filter(
        (paciente) => paciente.id === activeId
      )[0];
      setValue("name", activedPaciente.name);
      setValue("caretaker", activedPaciente.caretaker);
      setValue("date", activedPaciente.date);
      setValue("email", activedPaciente.email);
      setValue("sintomas", activedPaciente.sintomas);
    }
  }, [activeId, pacientes, setValue]);

  const registrarPaciente = (data: DrafPacientes) => {
    if (activeId) {
      actualizarPaciente(data);
    } else {
      guardarPaciente(data);
    }
    reset();
  };

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

      <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y {""}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10 fondo-imagen"
        noValidate
        onSubmit={handleSubmit(registrarPaciente)}
      >
        <div className="mb-5">
          <label htmlFor="name" className="text-sm uppercase font-bold">
            Paciente
          </label>
          <input
            id="name"
            className={`w-full p-3 border ${
              errors.name
                ? "border-red-500 input-shake focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-100 "
                : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 rounded-lg`}
            type="text"
            placeholder="Nombre del Paciente"
            {...register("name", {
              required: "El nombre del paciente es obligatorio",
            })}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="caretaker" className="text-sm uppercase font-bold">
            Propietario
          </label>
          <input
            id="caretaker"
            className={`w-full p-3 border ${
              errors.caretaker
                ? "border-red-600 input-shake focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-100  "
                : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 rounded-lg`}
            type="text"
            placeholder="Nombre del Propietario"
            {...register("caretaker", {
              required: "El propietario del paciente es obligatorio",
            })}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="text-sm uppercase font-bold">
            Email
          </label>
          <input
            id="email"
            className={`w-full p-3 border ${
              errors.email
                ? "border-red-600 input-shake focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-100  "
                : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 rounded-lg`}
            type="email"
            placeholder="Email de Registro"
            {...register("email", {
              required: "El Email es Obligatorio",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email No Válido",
              },
            })}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="date" className="text-sm uppercase font-bold">
            Fecha Alta
          </label>
          <input
            id="date"
            className={`w-full p-3 border ${
              errors.date
                ? "border-red-600 input-shake focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-100  "
                : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 rounded-lg`}
            type="date"
            {...register("date", {
              required: "La fecha de alta es obligatoria",
            })}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="symptoms" className="text-sm uppercase font-bold">
            Síntomas
          </label>
          <textarea
            id="sintomas"
            className={`w-full p-3 border ${
              errors.sintomas
                ? "border-red-600 input-shake focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-100  "
                : "border-gray-300"
            } focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 rounded-lg`}
            placeholder="Síntomas del paciente"
            {...register("sintomas", {
              required: "Los sintomas son obligatorios",
            })}
          ></textarea>
        </div>

        <input
          type="submit"
          className={`bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600   focus:ring-opacity-50 rounded-lg ${
            !isValid ? "opacity-50 cursor-not-allowed" : ""
          }`}
          value="Guardar Paciente"
          disabled={!isValid}
        />
      </form>
    </div>
  );
}
