import { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string
}
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  let common = await fetch('https://maps.googleapis.com/maps-api-v3/api/js/58/4a/intl/pt_br/common.js').then(e => e.text());
  common = common.replace(/(?=const\ a=\_\.cs\(\$r\().*?(?<=\)\;)/, 'const a = "https://geo-devrel-javascript-samples.web.app/";')

  res.status(200).write(common);
  res.end();
}