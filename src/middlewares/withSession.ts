import Session from '@/interfaces/Session';
import ReportItRequest from '@/interfaces/server/Request';
import ReportItResponse from '@/interfaces/server/Response';
import jsonwebtoken from 'jsonwebtoken';

function decrypt(data: string | null): Session | boolean {
  if (!data) {
    return false;
  }
  
  try {
    const session = jsonwebtoken.verify(data, process.env.JWT_SECRET!) as Session;
    return session;
  } catch(e) {
    return false;
  }
}

export function encrypt(data: object) {
  return jsonwebtoken.sign(data, process.env.JWT_SECRET!, { noTimestamp: true });
}

export default function withSession(
  handler: (req: ReportItRequest, res: ReportItResponse) => Promise<any>,
  required: boolean = true,
) {
  return async (req: ReportItRequest, res: ReportItResponse) => {
    const token = req.headers.get('authorization')?.split(' ')[1];
    const session = decrypt(token ?? '');

    if ((!token || !session) && required)
      return ReportItResponse.Unauthorized('Não autorizado.');

    if (session && typeof session != 'boolean')
      req.session = session;

    return await handler(req, res);
  }
}