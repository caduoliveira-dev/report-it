'use client';

import { useState } from "react";
import { Bug, CloudSunRain } from "lucide-react";
import ModalHelp from "./ModalHelp";

export default function PerfilSession() {
  const [activeModal, setActiveModal] = useState(null); // Estado para rastrear o modal ativo

  const loginSteps = [
    {
      description: "Clique no botão Iniciar Sessão.",
      image: "/sessao_1.jpg",
    },
    {
      description: "Verifique se a aba Entrar está selecionada",
      image: "/sessao_2.jpg",
    },
    {
      description: "Clique em uma destas opções para logar!",
      image: "/sessao_3.jpg",
    },
  ];

  const accountSteps = [
    {
      description: "Clique no botão Iniciar Sessão.",
      image: "/sessao_1.jpg",
    },
    {
      description: "Clique na Aba Cadastrar",
      image: "/cadastrar_2.jpg",
    },
    {
      description: "Preencha o Formulário para efetuar o cadastro!",
      image: "/cadastrar_3.jpg",
    },
    {
      description: "Clique em Cadastrar!",
      image: "/cadastrar_4.jpg",
    },
  ];

  return (
    <>
      {/* Seção de Login */}
      <section className="bg-white rounded-xl shadow-lg p-6 transition hover:scale-105 hover:shadow-2xl mb-4">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4 flex items-center justify-between">
          Como efetuar o Login?
          <span className="ml-auto">
            <Bug className="text-red-500" />
          </span>
        </h2>
        <p className="text-gray-600 mt-2">
          <strong>Como fazer:</strong>
        </p>
        <ul className="list-disc list-inside text-gray-600 mt-2">
          <li>Clique no botão <strong>“Iniciar Sessão”</strong>.</li>
          <li>Com a aba <strong>“Entrar”</strong> selecionada, digite o seu email e senha ou acesse com a conta do Google.</li>
          <li>Clique no botão <strong>“Entrar”</strong> ou <strong>“Entrar com a conta Google”</strong></li>
        </ul>

        <div className="flex justify-center mt-8">
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
            onClick={() => setActiveModal("login")}
          >
            Passo a Passo
          </button>
        </div>
      </section>

      {/* Seção de Cadastro */}
      <section className="bg-white rounded-xl shadow-lg p-6 transition hover:scale-105 hover:shadow-2xl">
        <h2 className="text-2xl font-semibold text-blue-600 mb-4 flex items-center justify-between">
          Como Criar uma conta?
          <span className="ml-auto">
            <CloudSunRain className="text-red-500" />
          </span>
        </h2>
        <p className="text-gray-600 mt-2">
          <strong>Como fazer:</strong>
        </p>
        <ul className="list-disc list-inside text-gray-600 mt-2">
          <li>Clique no botão <strong>“Iniciar Sessão”</strong>.</li>
          <li>Clique na aba superior <strong>Cadastrar</strong>.</li>
          <li>Preencha todos os dados do Formulário</li>
          <li>Clique no botão <strong>“Cadastrar”</strong></li>
        </ul>

        <div className="flex justify-center mt-8">
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
            onClick={() => setActiveModal("account")}
          >
            Passo a Passo
          </button>
        </div>
      </section>

      {/* Modais */}
      <ModalHelp
        isOpen={activeModal === "login"}
        onClose={() => setActiveModal(null)}
        steps={loginSteps}
        title="Passo a Passo para Login"
      />

      <ModalHelp
        isOpen={activeModal === "account"}
        onClose={() => setActiveModal(null)}
        steps={accountSteps}
        title="Passo a Passo para Criar Conta"
      />
    </>
  );
}
