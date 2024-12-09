'use client'
import Image from "next/image";
import { useState } from "react";
import { Bug, CloudSunRain, Siren, X, ChartBarDecreasing } from 'lucide-react';
import Link from "next/link";
import ModalHelp from "./ModalHelp";
export default function MapaSession(){
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // Estado para rastrear o modal ativo

  const reportarAlerta = [
    {
      description: "Botão direito no Mapa",
      image: "/mapa_1.jpg",
    },
    {
      description: "Selecione a opção Reportar",
      image: "/mapa_2.jpg",
    },
    {
      description: "Escolha uma das Opções de Alerta",
      image: "/mapa_3.jpg",
    },
    {
      description: "Preencha o Formulário",
      image: "/mapa_4.jpg",
    },
    {
      description: "Alerta Adicionado",
      image: "/mapa_5.jpg",
    },
  ];

  return (
    <>
      <section className="bg-white rounded-xl shadow-lg p-6 transition hover:scale-105 hover:shadow-2xl">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4 flex items-center justify-between">
                Como Reportar alguma informação no Mapa?
                <span className="ml-auto">
                    <Bug className="text-red-500"/>
                </span>
            </h2>
           
            <p className="text-gray-600 mt-2">
                <strong>Como fazer:</strong>
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-2">
                <li>Clique com o botão direito do mouse na área do mapa.</li>
                <li>No menu desdobrável que apareceu, selecione a opção <strong>Reportar</strong>.</li>
                <li>Escolha uma das opções listadas à direita e clique em seguida!</li>
                <li>Preencha os dados do formulário e clique em <strong>Salvar</strong> para emitir um alerta!</li>
                <li>Visualize os reportes realizados!</li>
            </ul>
              <div className="flex justify-center mt-8">
              <button
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
            onClick={() => setActiveModal("informacoesMapa")}
          >
            Passo a Passo
          </button>
              </div>
        </section>

                 {/* Modais */}
      <ModalHelp
        isOpen={activeModal === "informacoesMapa"}
        onClose={() => setActiveModal(null)}
        steps={reportarAlerta}
        title="Alertas no Mapa"
      />

    </>

    )
}