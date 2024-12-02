import { NextResponse } from "next/server";

export default class ReportItResponse extends NextResponse {
  static Unauthorized = (message: string) => Response.json({ error: { code: 'not_authorized', message } }, { status: 401 });
  static BadRequest = (message: string) => Response.json({ error: { code: 'bad_request', message } }, { status: 400 });
  static NotFound = (message: string) => Response.json({ error: { code: 'not_found', message } }, { status: 404 });
  static Created = () => Response.json({}, { status: 201 });
};