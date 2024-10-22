import ReportItRequest from "@/interfaces/server/Request";
import ReportItResponse from "@/interfaces/server/Response";
import withMethod from "@/middlewares/withMethod";
import withSession from "@/middlewares/withSession";

async function handler(req: ReportItRequest, res: ReportItResponse) {
  const session = req.session!;

  return res.json({
    result: session,
  });
}

export default withMethod(withSession(handler, true), ['GET']);