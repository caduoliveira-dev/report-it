import { X, ChartBarDecreasing } from "lucide-react";
import Image from "next/image";

export default function ModalHelp({ isOpen, onClose, steps, title }){
  if (!isOpen) return null;
  return (
    <>
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-11/12 max-w-5xl relative">
        {/* Botão de Fechar */}
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </button>

        {/* Título */}
        <h2 className="text-2xl font-bold text-blue-600 mb-6 flex items-center">
          <ChartBarDecreasing className="mr-2" />
          {title}
        </h2>

        {/* Passos Dinâmicos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {steps.map((step, index) => (
            <div key={index}>
              <p className="text-gray-600 font-medium mb-4">{`${index + 1}. ${step.description}`}</p>
              <Image
                className="rounded shadow-lg"
                src={step.image}
                width={step.imageWidth || 350}
                height={step.imageHeight || 350}
                alt={`Passo ${index + 1}`}
              />
            </div>
          ))}
        </div>

        {/* Botão Fechar */}
        <div className="text-center mt-8">
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
            onClick={onClose}
          >
            Fechar
          </button>
        </div>
      </div>
    </div>  
    </>

    )
}