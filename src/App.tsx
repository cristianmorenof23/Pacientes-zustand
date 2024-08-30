import PacientesForm from "./components/PacientesForm";
import PacientesLista from "./components/PacientesLista";

function App() {
  return (
    <>
      <div className="container mx-auto mt-20">
        <h1 className="font-mono text-5xl text-center md:w-2/3 md:mx-auto">
          Seguimiento de Pacientes {""}
          <span className="text-indigo-700 font-black">Veterinaria</span>
        </h1>

        <div className="mt-12 md:flex">
          <PacientesForm />
          <PacientesLista />
        </div>
      </div>
    </>
  );
}

export default App;
