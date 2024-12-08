import { join } from "path";
import { readFile } from 'fs/promises';
import Session from "@/interfaces/Session";
import ReportItRequest from "@/interfaces/server/Request";
import ReportItResponse from "@/interfaces/server/Response";
import { encrypt } from "@/middlewares/withSession";
import User from "@/interfaces/User";

async function handler(req: ReportItRequest) {
  const { email, password } = await req.json();

  if (!email || !password)
    return ReportItResponse.BadRequest('Email e senha são obrigatórios');

  try {
    const usersFilePath = join(process.cwd(), 'users.json');
    const usersData = await readFile(usersFilePath, 'utf-8');
    const users: User[] = JSON.parse(usersData);

    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      return ReportItResponse.BadRequest('Credenciais inválidas');
    }

    const jwt = encrypt({
      id: user.id,
      email: user.email,
      name: `${user.nome} ${user.sobrenome}`,
    } as Session);

    return ReportItResponse.json({
      result: {
        jwt,
      },
    });


  } catch (error) {
    console.error('Error reading users file:', error);
    return ReportItResponse.BadRequest('Erro interno do servidor');
  }
}

export const POST = handler;