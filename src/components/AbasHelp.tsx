'use client'
import { X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import MapaSession from "./MapaSession";
import PerfilSession from "./PerfilSession";
import UsuarioSession from "./UsuarioSession";
import ProblemaSession from "./ProblemaSession";
export default function AbasHelp(){
  const [activeTab, setActiveTab] = useState("usuario");
  const renderContent = () => {
    switch (activeTab) {
      case "usuario":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-blue-600">Usuário</h2>
            <p className="text-gray-600">Informações sobre o usuário.</p>
            <UsuarioSession/>
          </div>
        );
      case "perfil":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-blue-600">Perfil</h2>
            <p className="text-gray-600">Detalhes sobre o perfil.</p>
            <PerfilSession/>
          </div>
        );
      case "mapa":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-blue-600">Informações do Mapa</h2>
            <p className="text-gray-600">Dados sobre o mapa e relatórios.</p>
            <MapaSession/>
          </div>
        );
      case "problema":
        return (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-blue-600">Comunicar Problema</h2>
            <p className="text-gray-600">Informe sobre Problemas.</p>
            <ProblemaSession/>
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <>
      <div className="max-w-6xl mx-auto mt-8 p-4 border rounded-lg shadow">
      {/* Abas */}
      <div className="flex border-b mb-4">
        <button
          className={`px-4 py-2 ${
            activeTab === "usuario" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600"
          }`}
          onClick={() => setActiveTab("usuario")}
        >
          Usuário
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "perfil" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600"
          }`}
          onClick={() => setActiveTab("perfil")}
        >
          Perfil
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "mapa" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600"
          }`}
          onClick={() => setActiveTab("mapa")}
        >
          Informações do Mapa
        </button>
        <button
          className={`px-4 py-2 ${
            activeTab === "problema" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-600"
          }`}
          onClick={() => setActiveTab("problema")}
        >
          Comunicar Problema
        </button>
      </div>

      {/* Conteúdo da Aba Ativa */}
      <div>{renderContent()}</div>
    </div>
    </>

    )
}