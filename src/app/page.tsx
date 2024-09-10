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
  CircleHelp

} from "lucide-react"

export default function Home() {
  return (
    <div className="relative">
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
                Carlos Eduardo Ribeiro Oliveira
              </SheetTitle>
              <SheetDescription>
                carlos@gmail.com
              </SheetDescription>
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
              <DropdownMenuItem>Ajuda</DropdownMenuItem>
              <DropdownMenuItem>Comunicar um problema</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
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
                <CardHeader>
                  <CardTitle>Entrar</CardTitle>
                  <CardDescription>
                    Entre com seu email e senha.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="example@example.com" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="password">Senha</Label>
                    <Input id="password" type="password"/>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col">
                  <Button className="w-full">Entrar</Button>
                  <Button className="w-full mt-2" variant="outline">
                    Entrar com conta Google 
                    <img className="ml-2" width="24" height="24" src="https://img.icons8.com/color/48/google-logo.png" alt="google-logo"/>
                    </Button>
                </CardFooter>
            </TabsContent>
            <TabsContent value="cadastrar">
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
                    <Input id="nome" type="text" />
                    </div>
                    <div>
                    <Label htmlFor="new">Sobrenome</Label>
                    <Input id="sobrenome" type="text" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="example@example.com" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="senha">Senha</Label>
                    <Input id="senha" type="password" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Cadastrar</Button>
                </CardFooter>
            </TabsContent>
          </Tabs>
          </DialogContent>
        </Dialog>
        
        </div>
      </div>
    </div>
  );
}
