import Report from "@/interfaces/Report";
import ReportItRequest from "@/interfaces/server/Request";
import ReportItResponse from "@/interfaces/server/Response";
import withSession from "@/middlewares/withSession";

const icons: {
  name: Report['name'],
  url: string,
}[] = [
  { name: 'Blitz', url: '/icons/siren.png' },
  { name: 'Acidente', url: '/icons/triangle-alert' },
  { name: 'Rua Bloqueada', url: '/icons/traffic-cone' },
  { name: 'Congestionamento', url: '/icons/octagon-alert' },
  { name: 'Chuva', url: '/icons/cloud-hail' },
];

async function post(req: ReportItRequest) {
  const { distance, report }: { distance: number, report: Report } = await req.json();

  const form = new FormData();

  form.set('title', `Novo relato de ${report.name}`);
  form.set('message', `Um novo relato foi feito a ${distance.toFixed(2)} metros de distância de você.`);
  form.set('url', 'https://wchar-t.pw/');
  form.set('icon', `https://wchar-t.pw${icons.find(e => e.name == report.name)?.url}`);
  
  const response = await fetch('https://api.pushalert.co/rest/v1/send', {
    method: 'POST',
    headers: {
      Authorization: `api_key=${process.env.PUSHALERT_API_KEY}`,
    },
    body: form,
  }).then(e => e.json());

  console.log(response);

  return ReportItResponse.json({});
}

export const POST = withSession(post);