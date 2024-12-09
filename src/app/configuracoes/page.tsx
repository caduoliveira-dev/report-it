import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { InputFile } from "@/components/ui/input-file";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { ProtectedRoute } from "@/components/ProtectedRoutes";


export default function PerfilEditar() {

  return (
    <ProtectedRoute>
      <div className="flex justify-center items-center h-screen">
        <Card className="w-full max-w-xl">
          <CardHeader>
            <CardTitle className="flex justify-center text-3xl font-bold">Configurações de Perfil</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center mb-4">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <div className="ml-4">
                  <InputFile />
                </div>
              </div>
              <div>
                <Label>Nome:</Label>
                <Input placeholder="Nome Completo"/>
              </div>
              <div>
                <Label>Email:</Label>
                <Input placeholder="email@exemplo.com"/>
              </div>
              <div className="border-b-2 py-2"></div>
              <div>
                <h2 className="text-2xl">Alterar senha</h2>
              </div>
              <div>
                <Label>Senha Atual:</Label>
                <Input type="password"/>
              </div>
              <div>
                <Label>Nova Senha:</Label>
                <Input type="password"/>
              </div>

              <div className="flex justify-center space-x-4">
                <Link href="/"><Button variant="outline">Voltar</Button></Link>
                <Button variant="default" >Salvar Alterações</Button>
              </div>
            </div>
          </CardContent>

        
        </Card>
      </div>
    </ProtectedRoute>
  );
};


