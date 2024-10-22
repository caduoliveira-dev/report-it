import ReportItRequest from '@/interfaces/server/Request';
import ReportItResponse from '@/interfaces/server/Response';

export default function withMethod(
  handler: (req: ReportItRequest, res: ReportItResponse) => Promise<void>,
  methods: string[],
) {
  return async (req: ReportItRequest, res: ReportItResponse) => {
    if (!methods.includes(req.method || ''))
      return res.status(405).json({ error: { code: 'method_not_allowed', message: 'Método não permitido.' } })

    await handler(req, res);
  }
}