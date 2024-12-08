'use client';

import { Button } from "@/components/ui/button"
import Link from "next/link"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card"

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { 
  AlignJustify,
  CircleHelp,
  Settings,
  LogOut

} from "lucide-react"
import { createRef, useContext, useEffect, useState } from "react"
import Map from "@/components/map"
import { useToast } from "@/hooks/use-toast";
import { AuthenticationContext, useAuth } from "@/contexts/Authentication"
import { registerUser } from "./actions/auth";

export default function Home() {
  const { toast } = useToast()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [emailRegister, setEmailRegister] = useState('');
  const [passwordRegister, setPasswordRegister] = useState('');
  const ctx = useAuth();

  async function onLogin() {
    const { error, result } = await ctx.api.login(email, password);

    if (error) {
      console.log(error);
      return;
    }

    ctx.api.setToken(result!.jwt);
    const { error: errorLogin, result: resultLogin } = await ctx.api.me();

    if (errorLogin) {
      console.log(error);
      return;
    }

    ctx.setSession(resultLogin);
  }

  async function onRegister(event: React.FormEvent) {
    event.preventDefault();
    const { error } = await registerUser(nome, sobrenome, emailRegister, passwordRegister);

    if (error) {
      toast({
        variant: 'destructive',
        title: error,
      })
      return;
    }
    
    toast({
      title: "Cadastro realizado com sucesso!"
    })

    setNome('')
    setSobrenome('')
    setEmailRegister('')
    setPasswordRegister('')
  }
  
  return (
    <>
    <div className="absolute w-full top-0" style={{ zIndex: 1 }}>
      <div className="flex justify-between p-4">
        <div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline"><AlignJustify /></Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>
              <Avatar>
                <AvatarImage className="w-24" src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              </SheetTitle>
              <SheetTitle>
                {ctx.session?.name}
              </SheetTitle>
              <SheetDescription>
                {ctx.session?.email}
              </SheetDescription>
              <Link href="/configuracoes">
                <Settings className="absolute bottom-[0.3cm] right-0 mr-4 cursor-pointer" />
              </Link>

            </SheetHeader>
          </SheetContent>
        </Sheet>
        </div>  
        <div className="flex items-center justify-center">
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
              <CircleHelp />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem><Link href="/help">Ajuda</Link></DropdownMenuItem>
              <DropdownMenuItem><Link href="/report">Comunicar um problema</Link></DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        {ctx.session ? (
          <Button
            onClick={ctx.logout}
            className="ml-4 bg-red-900 hover:bg-red-950"
          >
            <LogOut className="mr-2 h-4 w-4" /> Encerrar Sessão
          </Button>
        ) : (
          <Dialog>
          <DialogTrigger asChild>
            <Button className="ml-4 bg-red-900 hover:bg-red-950">Iniciar Sessão</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-auto pt-12">
          <Tabs defaultValue="account" className="w-auto">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="entrar">Entrar</TabsTrigger>
              <TabsTrigger value="cadastrar">Cadastrar</TabsTrigger>
            </TabsList>
            <TabsContent value="entrar">
                <form onSubmit={(e) => {
                  e.preventDefault();
                  onLogin();
                }}>
                  <CardHeader>
                    <CardTitle>Entrar</CardTitle>
                    <CardDescription>
                      Entre com seu email e senha.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="space-y-1">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="example@example.com" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="password">Senha</Label>
                      <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col">
                    <Button className="w-full">Entrar</Button>
                    <Button className="w-full mt-2" variant="outline">
                      Entrar com conta Google 
                      <img className="ml-2" width="24" height="24" src="https://img.icons8.com/color/48/google-logo.png" alt="google-logo"/>
                      </Button>
                  </CardFooter>
                </form>
            </TabsContent>
            <TabsContent value="cadastrar">
            <form onSubmit={onRegister}>
                <CardHeader>
                  <CardTitle>Faça seu cadastro</CardTitle>
                  <CardDescription>
                    Preencha todos os campos.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <div className="mr-4">
                    <Label htmlFor="firstname">Nome</Label>
                    <Input id="nome" type="text" value={nome} onChange={e => setNome(e.target.value)} required/>
                    </div>
                    <div>
                    <Label htmlFor="new">Sobrenome</Label>
                    <Input id="sobrenome" type="text" value={sobrenome} onChange={e => setSobrenome(e.target.value)} required/>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="example@example.com" value={emailRegister} onChange={e => setEmailRegister(e.target.value)} required/>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="senha">Senha</Label>
                    <Input id="senha" type="password" value={passwordRegister} onChange={e => setPasswordRegister(e.target.value)} required/>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit" className="w-full">Cadastrar</Button>
                </CardFooter>
                </form>
            </TabsContent>
          </Tabs>
          </DialogContent>
        </Dialog>
        )}
        </div>
      </div>
    </div>
    <Map />
    </>
  );
}
