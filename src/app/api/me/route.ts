import ReportItRequest from "@/interfaces/server/Request";
import ReportItResponse from "@/interfaces/server/Response";
import withSession from "@/middlewares/withSession";

async function handler(req: ReportItRequest) {
  const session = req.session!;

  return ReportItResponse.json({
    result: session,
  });
}

export const GET = withSession(handler);