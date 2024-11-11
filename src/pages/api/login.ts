import Session from "@/interfaces/Session";
import ReportItRequest from "@/interfaces/server/Request";
import ReportItResponse from "@/interfaces/server/Response";
import withMethod from "@/middlewares/withMethod";
import { encrypt } from "@/middlewares/withSession";

async function handler(req: ReportItRequest, res: ReportItResponse) {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({
      error: {
        code: 'invalid_request',
        message: 'Email e senha são obrigatórios.',
      }
    });

  // Todo: db
  if (email !== 'email@example.com' && password !== 'password')
    return res.status(401).json({
      error: {
        code: 'invalid_grant',
        message: 'Credenciais inválidas.',
      }
    });

  const jwt = encrypt({
    id: 'id',
    email: 'email@example.com',
    name: 'Teste da Silva',
  } as Session);

  return res.json({
    result: {
      jwt,
    },
  });
}

export default withMethod(handler, ['POST']);