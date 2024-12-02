import Session from '../Session';
import { NextRequest } from 'next/server';

export default interface ReportItRequest extends NextRequest {
  session: Session | null,
}