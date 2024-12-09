import fs from 'fs';
import ReportItRequest from "@/interfaces/server/Request";
import ReportItResponse from "@/interfaces/server/Response";
import withSession from "@/middlewares/withSession";
import Session from '@/interfaces/Session';

async function get(req: ReportItRequest) {
  const session = req.session!;
  const users = JSON.parse(fs.readFileSync('users.json').toString());
  const user = users.filter((e: any) => e.email === session.email)[0];

  return ReportItResponse.json({
    result: {
      id: user.id,
      email: user.email,
      name: `${user.nome} ${user.sobrenome}`,
    } as Session,
  });
}

async function post(req: ReportItRequest) {
  const users = JSON.parse(fs.readFileSync('users.json').toString())
  const { name, password, newPassword }: {
    name: string,
    password: string,
    newPassword: string,
  } = await req.json();
  const user = users.filter((e: any) => e.email === req.session!.email)[0];

  if (password != '') {
    if (user.password !== password || newPassword.length < 4) {
      return ReportItResponse.BadRequest('Senha atual incorreta ou a nova senha é muito curta');
    }

    user.password = newPassword;
  }

  const names: string[] = name.split(' ');

  user.nome = names[0];
  user.sobrenome = names.length > 1 ? names.slice(1).join(' ') : '';

  fs.writeFileSync('users.json', JSON.stringify(users, null, 2));

  return ReportItResponse.json({});
}

export const GET = withSession(get);
export const POST = withSession(post);