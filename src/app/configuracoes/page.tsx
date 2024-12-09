'use client';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { InputFile } from "@/components/ui/input-file";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { ProtectedRoute } from "@/components/ProtectedRoutes";
import { FormEvent, useState } from "react";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/Authentication";
import { toast } from 'sonner';


export default function PerfilEditar() {
  const ctx = useAuth();
  const [name, setName] = useState(ctx.session?.name || '');
  const [email, setEmail] = useState(ctx.session?.email || '');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(e?: FormEvent) {
    e?.preventDefault();
    setIsSubmitting(true);
    
    const { error, result } = await ctx.api.updateProfile(name, password, newPassword);

    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Perfil atualizado com sucesso!');
    }

    setIsSubmitting(false);
    ctx.updateSession();
  }

  return (
    <ProtectedRoute>
      <div className="flex justify-center items-center h-screen">
        <Card className="w-full max-w-xl">
          <CardHeader>
            <CardTitle className="flex justify-center text-3xl font-bold">Configurações de Perfil</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit}>
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
                  <label>
                    Nome
                    <Input type="text" value={name} onChange={e => setName(e.target.value)} />
                  </label>
                </div>
                <div>
                  <label>
                    Email
                    <Input className="disabled" type="email" value={email} disabled />
                  </label>
                </div>
                <div className="border-b-2 py-2"></div>
                <div>
                  <h2 className="text-2xl">Alterar senha</h2>
                </div>
                <div>
                  <label>
                    Senha Atual
                    <Input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                  </label>
                </div>
                <div>
                  <label>
                    Nova Senha
                    <Input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                  </label>
                </div>

                <div className="flex justify-center space-x-4">
                  <Link href="/"><Button variant="outline">Voltar</Button></Link>
                  {
                    isSubmitting ? (
                      <Button disabled variant="default">
                        <Loader2 className="animate-spin mr-2" size="sm" />
                        Salvando...
                      </Button>
                    ) : (
                      <Button variant="default" type="submit">Salvar Alterações</Button>
                    )
                  }
                </div>
              </div>
            </form>
          </CardContent>

        
        </Card>
      </div>
    </ProtectedRoute>
  );
};


