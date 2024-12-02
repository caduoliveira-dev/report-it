import Session from "@/interfaces/Session";
import ReportItRequest from "@/interfaces/server/Request";
import ReportItResponse from "@/interfaces/server/Response";
import { encrypt } from "@/middlewares/withSession";

async function handler(req: ReportItRequest) {
  const { email, password } = await req.json();

  if (!email || !password)
    return ReportItResponse.BadRequest('Email e senha são obrigatórios');

  // Todo: db
  if (email !== 'email@example.com' && password !== '1q2w3e4r')
    return ReportItResponse.BadRequest('Credenciais inválidas');

  const jwt = encrypt({
    id: 'id',
    email: 'email@example.com',
    name: 'Rick Sanchez',
  } as Session);

  return ReportItResponse.json({
    result: {
      jwt,
    },
  });
}

export const POST = handler;