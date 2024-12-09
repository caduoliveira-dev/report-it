import fs from 'fs';
import Report from "@/interfaces/Report";
import ReportItRequest from "@/interfaces/server/Request";
import ReportItResponse from '@/interfaces/server/Response';
import withSession from '@/middlewares/withSession';

async function post(req: ReportItRequest) {
  let reports: Report[] = JSON.parse(fs.readFileSync('reports.json').toString());
  const report: Report = await req.json();

  reports = reports.filter(e => e.author.email !== req.session!.email && e.date !== report.date);

  fs.writeFileSync('reports.json', JSON.stringify(reports, null, 2));

  return ReportItResponse.json({ result: reports });
}

export const POST = withSession(post);