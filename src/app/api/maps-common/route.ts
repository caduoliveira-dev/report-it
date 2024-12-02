import ReportItResponse from "@/interfaces/server/Response";


async function handler() {
  let common = await fetch('https://maps.googleapis.com/maps-api-v3/api/js/59/1/intl/pt_br/common.js').then(e => e.text());
  common = common.replace(/(const.a\=).*(location.href).*?(?<=;)/gm, 'const a = "https://geo-devrel-javascript-samples.web.app/";')
  
  return new ReportItResponse(common, {
    headers: {
      'Content-Type': 'application/javascript',
    },
  });
}


export const GET = handler;