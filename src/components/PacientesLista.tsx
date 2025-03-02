import { usePacientesStore } from "../store/store";
import PacienteDetalles from "./PacienteDetalles";

export default function PacientesLista() {
  const { pacientes } = usePacientesStore();

  return (
    <div className="md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll">
      {pacientes.length ? (
        <>
          <h2 className="font-black text-3xl text-center">Listado de Pacientes</h2>
          <p className="text-xl mt-5 mb-10 text-center">Administra tus {''}

          <span className="text-indigo-600 font-bold">
              Pacientes y Citas
            </span>
          </p>
          {pacientes.map(paciente => (
            <PacienteDetalles
            key={paciente.id}
            paciente={paciente}
            />
          ))}
        </>
      ) : (
        <>
          <h2 className="font-black text-3xl text-center">No hay pacientes</h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Comieza agregando pacientes {""}
            <span className="text-indigo-600 font-bold">
              y apareceran en este lugar
            </span>
          </p>
        </>
      )}
    </div>
  );
}
