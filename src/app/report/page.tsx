import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import Link from "next/link";

export default function ReportProblem() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="flex justify-center text-3xl font-bold">Comunicar um Problema</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="nome">Nome</Label>
              <Input id="nome" type="text" placeholder="Seu nome" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Seu email" />
            </div>
            <div>
              <Label htmlFor="descricao">Descrição do Problema</Label>
              <textarea
                id="descricao"
                className="min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                placeholder="Descreva o problema que você encontrou..."
              />
            <div>
              <Label>Anexar imagem</Label>
              <Input id="anexo" type="file"/>
            </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center gap-2">
          <Link href="/">
            <Button variant="outline">Voltar</Button>
          </Link>
          <Button>Enviar</Button>
        </CardFooter>
      </Card>
    </div>

  );
}
