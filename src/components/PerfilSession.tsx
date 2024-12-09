'use client'
import Image from "next/image";
import { useState } from "react";
import { Bug, CloudSunRain, Siren, X, ChartBarDecreasing } from 'lucide-react';
import Link from "next/link";
import ModalHelp from "./ModalHelp";

export default function PerfilSession(){
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // Estado para rastrear o modal ativo

  const visualizarPerfil = [
    {
      description: "Botão do Menu",
      image: "/v_perfil_1.jpg",
    },
    {
      description: "Janela de Perfil",
      image: "/v_perfil_2.jpg",
    },
  ];

  const alterarPerfil = [
    {
      description: "Botão de Configurações",
      image: "/a_perfil_3.jpg",
    },
    {
      description: "Clique na Aba Cadastrar",
      image: "/a_perfil_4.jpg",
    },
  ];

  return (
    <>
      <section className="bg-white rounded-xl shadow-lg p-6 transition hover:scale-105 hover:shadow-2xl mb-4">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4 flex items-center justify-between">
              Como visualizar meu Perfil?
              <span className="ml-auto">
                  <Bug className="text-red-500"/>
              </span>
          </h2>
          
          <p className="text-gray-600 mt-2">
              <strong>Como fazer:</strong>
          </p>
          <ul className="list-disc list-inside text-gray-600 mt-2">
              <li>Depois de ter realizado o login, clique no ícone do menu localizado à esquerda!</li>
              <li>Visualize as informações do seu Perfil na nova janela que abriu!</li>
          </ul>
          <div className="flex justify-center mt-8">
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
            onClick={() => setActiveModal("perfil_mostrar")}
          >
            Passo a Passo
          </button>
          </div>
      </section>

    <section className="bg-white rounded-xl shadow-lg p-6 transition hover:scale-105 hover:shadow-2xl">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4 flex items-center justify-between">
            Como modificar as informações do Perfil?
            <span className="ml-auto">
                <CloudSunRain className="text-red-500"/>
            </span>
        </h2>
        <p className="text-gray-600 mt-2">
              <strong>Como fazer:</strong>
          </p>
          <ul className="list-disc list-inside text-gray-600 mt-2">
              <li>Localize o botão de Configurações na parte inferior da janela aberta e clique nele!</li>
              <li>Em seguida será aberta uma nova janela carregada com as informações do seu perfil!</li>
              <li>Após as modificações realizadas no formulário, clique no botão Salvar as Alterações</li>
          </ul>
          <div className="flex justify-center mt-8">
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
            onClick={() => setActiveModal("perfil_alterar")}
          >
            Passo a Passo
          </button>
          </div>
    </section>

          {/* Modais */}
      <ModalHelp
        isOpen={activeModal === "perfil_mostrar"}
        onClose={() => setActiveModal(null)}
        steps={visualizarPerfil}
        title="Visualizar Perfil"
      />

      <ModalHelp
        isOpen={activeModal === "perfil_alterar"}
        onClose={() => setActiveModal(null)}
        steps={alterarPerfil}
        title="Modificar Perfil"
      />          

                   
    </>

    )
}