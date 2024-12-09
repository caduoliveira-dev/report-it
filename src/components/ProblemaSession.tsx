'use client'
import Image from "next/image";
import { useState } from "react";
import { Bug, CloudSunRain, Siren, X, ChartBarDecreasing } from 'lucide-react';
import Link from "next/link";
export default function MapaSession(){
  const [isModalOpen, setIsModalOpen] = useState(false);
  const reportarAlerta = [
    {
      description: "Botão direito no Mapa",
      image: "/iniciar_sessao.jpg",
    },
    {
      description: "Selecione a opção Reportar",
      image: "comunicar_problema.jpg",
    },

  ];
  return (
    <>
      <section className="bg-white rounded-xl shadow-lg p-6 transition hover:scale-105 hover:shadow-2xl">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4 flex items-center justify-between">
                Como Comunicar algum problema ?
                <span className="ml-auto">
                    <Bug className="text-red-500"/>
                </span>
            </h2>
           
            <p className="text-gray-600 mt-2">
                <strong>Como fazer:</strong>
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-2">
                <li>Clique no botão <Link href="/report"><strong>“Comunicar um Problema”</strong>. dentro do menu</Link></li>
                <li>Preencha os dados do Formulário.</li>
            </ul>
            <div className="flex justify-center mt-8">
            <button
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
            onClick={() => setActiveModal("problema")}
          >
            Passo a Passo
          </button>
                    </div>
        </section>

                        {/* Modais */}
      <ModalHelp
        isOpen={activeModal === "problema"}
        onClose={() => setActiveModal(null)}
        steps={reportarAlerta}
        title="Alertas no Mapa"
      />         
                  

                   
    </>

    )
}