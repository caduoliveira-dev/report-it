'use client'
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Bug, CloudSunRain, Siren, X, ChartBarDecreasing } from 'lucide-react';
import Image from "next/image";
import ModalHelp from "@/components/ModalHelp";
import AbasHelp from "@/components/AbasHelp";
export default function PageHelp(){
    const [isModalOpen, setIsModalOpen] = useState(false);

      // Passos para o Modal
  const steps = [
    {
      text: "1. Clique com o botão direito do mouse no mapa",
      image: "/help1.jpg",
    },
    {
      text: "2. Selecione a opção Reportar",
      image: "/help2.jpg",
    },
    {
      text: "3. Selecione uma das opções exibidas à sua direita!",
      image: "/help3.jpg",
    },
    {
      text: "4. Preencha as informações e envie o formulário!",
      image: "/help4.jpg",
    },
  ];
  
    return (
        <>
            <div>
                <div className="px-8 py-8 md:px-32 md:py-8">
                    <Link href="/"><ArrowLeft /></Link>
                </div>
                <div className="flex flex-col items-center">
                    <img
                        src="https://du11hjcvx0uqb.cloudfront.net/dist/webpack-production/3b097a14a3b3f606.svg"
                        alt="panda-mapa"
                        className="w-32" 
                    />
                    <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
                        Guia do <span className="text-blue-600">Report It</span>
                    </h1>
                    <p className="text-gray-500 text-lg">
                        Bem-vindo à tela de ajuda! Aqui você encontra orientações para usar todas as funcionalidades do aplicativo.
                    </p>
                </div>
           
                <main className="container mx-auto mt-8 space-y-6">
                <AbasHelp/>

                </main>

                <footer className="text-center text-gray-500 mt-12 py-6 bg-blue-50 rounded-xl shadow-md">
                    <p>
                    Precisa de mais ajuda? Entre em contato pelo suporte:{' '}
                    <a href="mailto:suporte@reportit.com" className="text-blue-500 font-bold hover:underline">
                        suporte@reportit.com
                    </a>
                    </p>
                </footer> 
            </div>
           
    </>

    )
}