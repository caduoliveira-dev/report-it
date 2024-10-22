import { NextApiRequest } from 'next';
import Session from '../Session';

export default interface ReportItRequest extends NextApiRequest {
  session: Session | null,
}