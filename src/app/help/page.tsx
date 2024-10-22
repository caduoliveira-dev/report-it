import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PageHelp(){
    return (
        <div>
            <div className="px-8 py-8 md:px-32 md:py-8">
                <Link href="/"><ArrowLeft /></Link>
            </div>
            <div className="flex flex-col items-center">
                <img
                src="https://du11hjcvx0uqb.cloudfront.net/dist/webpack-production/3b097a14a3b3f606.svg"
                alt="panda-mapa"
                className="w-32" />
                <h1 className="text-3xl md:text-5xl">Guia do Report It</h1>
            </div>
            <div className="px-8 py-4 md:px-32">
                <div className="mb-4">
                    <h2 className="text-3xl">Titulo 1</h2>
                    <p className="mt-2">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam minus temporibus veniam, 
                        aspernatur voluptatibus doloribus mollitia accusantium deleniti saepe illo sed illum consequatur, 
                        blanditiis totam, eaque repellendus error quae laudantium.</p>
                </div>
                <div className="mb-4">
                    <h2 className="text-3xl">Titulo 1</h2>
                    <p className="mt-2">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam minus temporibus veniam, 
                        aspernatur voluptatibus doloribus mollitia accusantium deleniti saepe illo sed illum consequatur, 
                        blanditiis totam, eaque repellendus error quae laudantium.</p>
                </div>
                <div className="mb-4">
                    <h2 className="text-3xl">Titulo 1</h2>
                    <p className="mt-2">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam minus temporibus veniam, 
                        aspernatur voluptatibus doloribus mollitia accusantium deleniti saepe illo sed illum consequatur, 
                        blanditiis totam, eaque repellendus error quae laudantium.</p>
                </div>
            </div>

            <div className="px-8 md:px-32 py-8">
                <div>
                    <h2 className="text-lg font-medium border-b-2 mb-4">Outros Recursos</h2>
                    <Link href="/report" className="font-medium text-blue-800 hover:underline">Relatar um problema</Link>
                    <p>Se o Report It se comportar mal, conte para nós</p>
                </div>
            </div>
            
        </div>
    )
}