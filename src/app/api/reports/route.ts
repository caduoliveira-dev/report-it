import fs from 'fs';
import ReportItRequest from "@/interfaces/server/Request";
import withSession from "@/middlewares/withSession";
import Report from '@/interfaces/Report';
import ReportItResponse from '@/interfaces/server/Response';

async function post(req: ReportItRequest) {
  const {
    name,
    date,
    description,
    lat,
    lng,
  }: Partial<Report> = await req.json();

  const reports: Report[] = JSON.parse(fs.readFileSync('reports.json').toString());

  reports.push({
    author: {
      email: req.session!.email,
      name: req.session!.name,
    },
    name: name!,
    date: date!,
    description: description!,
    lat: lat!,
    lng: lng!,
  });

  fs.writeFileSync('reports.json', JSON.stringify(reports, null, 2));

  return ReportItResponse.Created();
}

async function get(req: ReportItRequest) {
  const reports: Report[] = JSON.parse(fs.readFileSync('reports.json').toString());

  return ReportItResponse.json({ result: reports.map(e => ({
    ...e,
    author: {
      ...e.author,
      email: e.author.email.replace(/(?<=\@.).../gm, '***').replace(/..(?=\@)/gm, '**'),
    }
  })) });
}

export const POST = withSession(post);
export const GET = get;