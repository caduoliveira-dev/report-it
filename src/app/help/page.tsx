'use client'
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Bug, CloudSunRain, Siren, X, ChartBarDecreasing } from 'lucide-react';
import Image from "next/image";
export default function PageHelp(){
    const [isModalOpen, setIsModalOpen] = useState(false);
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
                    <section className="bg-white rounded-xl shadow-lg p-6 transition hover:scale-105 hover:shadow-2xl">
                        <h2 className="text-2xl font-semibold text-blue-600 mb-4 flex items-center justify-between">
                            Relato de Problemas
                            <span className="ml-auto">
                                <Bug className="text-red-500"/>
                            </span>
                        </h2>
                        <p className="text-gray-600">
                            <strong>O que é? </strong> Permite reportar problemas urbanos, como buracos nas ruas ou vandalismo.
                        </p>
                        <p className="text-gray-600 mt-2">
                            <strong>Como funciona?</strong>
                        </p>
                        <ul className="list-disc list-inside text-gray-600 mt-2">
                            <li>Clique no botão <Link href="/report"><strong>“Comunicar um Problema”</strong>.</Link></li>
                            <li>Use o mapa para marcar o local ou utilize o GPS e descreva a situação.</li>
                            <li>Preencha os detalhes e em seguida envie o relato.</li>
                        </ul>
                    </section>

                    <section className="bg-white rounded-xl shadow-lg p-6 transition hover:scale-105 hover:shadow-2xl">
                        <h2 className="text-2xl font-semibold text-blue-600 mb-4 flex items-center justify-between">
                            Informações Climáticas
                            <span className="ml-auto">
                                <CloudSunRain className="text-red-500"/>
                            </span>
                        </h2>
                        <p className="text-gray-600">
                            <strong>O que é?</strong> Notificações sobre condições climáticas adversas que possam afetar o tráfego.
                        </p>
                        <p className="text-gray-600 mt-2">
                            <strong>Como funciona?</strong> Alertas baseados em dados meteorológicos em tempo real.
                        </p>
                    </section>

                    <section className="bg-white rounded-xl shadow-lg p-6 transition hover:scale-105 hover:shadow-2xl">
                        <h2 className="text-2xl font-semibold text-blue-600 mb-4 flex items-center justify-between">
                            Alertas em Tempo Real
                            <span className="ml-auto">
                                <Siren className="text-red-500"/>
                            </span>
                        </h2>      
                        <p className="text-gray-600">
                            <strong>O que é?</strong> Fique informado sobre problemas próximos à sua localização.
                        </p>
                        <p className="text-gray-600 mt-2">
                            <strong>Como funciona?</strong> Receba notificações baseadas em sua localização sobre acidentes ou obras.
                        </p>
                    </section>
                    <div className="flex justify-center mt-8">
                        <button
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
                            onClick={() => setIsModalOpen(true)}
                        >
                            Passo a Passo
                        </button>
                    </div>

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

            {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-lg p-8 w-11/12 max-w-5xl relative">
                {/* Botão de Fechar */}
                <button
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
                    onClick={() => setIsModalOpen(false)}
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Título */}
                <h2 className="text-2xl font-bold text-blue-600 mb-6 flex items-center">
                    <ChartBarDecreasing  className="mr-2" />
                    Funcionalidades
                </h2>

                {/* Passos Alternados */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Passo 1 */}
                    <div>
                    <p className="text-gray-600 font-medium mb-4">
                        1. Clique com o botão direito do mouse no mapa.
                    </p>
                    <Image
                        className="rounded shadow-lg"
                        src="/help1.jpg"
                        width={350}
                        height={350}
                        alt="Passo 1"
                    />
                    </div>

                    {/* Passo 2 */}
                    <div>
                    <p className="text-gray-600 font-medium mb-4">
                        2. Selecione a opção *Reportar*.
                    </p>
                    <Image
                        className="rounded shadow-lg"
                        src="/help2.jpg"
                        width={350}
                        height={350}
                        alt="Passo 2"
                    />
                    </div>

                    {/* Passo 3 */}
                    <div>
                    <p className="text-gray-600 font-medium mb-4">
                        3. Selecione uma das opções exibidas à sua direita!
                    </p>
                    <Image
                        className="rounded shadow-lg"
                        src="/help3.jpg"
                        width={350}
                        height={350}
                        alt="Passo 3"
                    />
                    </div>

                    {/* Passo 4 */}
                    <div>
                    <p className="text-gray-600 font-medium mb-4">
                        4. Preencha as informações e envie o formulário!
                    </p>
                    <Image
                        className="rounded shadow-lg"
                        src="/help4.jpg"
                        width={200}
                        height={200}
                        alt="Passo 4"
                    />
                    </div>
                </div>
                <div className="flex flex-col items-center mt-4">
            <p className="text-gray-600 font-medium mb-4 text-center">
                5. Visualize as modificações
            </p>
            <Image
                className="rounded shadow-lg"
                src="/help5.jpg"
                width={230}
                height={230}
                alt="Passo 5"
            />
            </div>


                {/* Botão de Fechar */}
                <div className="text-center mt-8">
                    <button
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
                    onClick={() => setIsModalOpen(false)}
                    >
                    Fechar
                    </button>
                </div>
                </div>
            </div>
            )}
    </>

    )
}