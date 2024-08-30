interface PacienteDetallesItemsProps {
  label: string
  data: string
}


export default function PacienteDetallesItem({label, data}: PacienteDetallesItemsProps) {
  return (
    <p className="font-bold mb-3 text-gray-700 uppercase">{label} {''}
    <span className="font-mono normal-case">{data}</span>
  </p>
  )
}
