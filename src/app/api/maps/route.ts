import ReportItResponse from "@/interfaces/server/Response";


async function handler() {
  let js = await fetch(atob('aHR0cHM6Ly9tYXBzLmdvb2dsZWFwaXMuY29tL21hcHMvYXBpL2pzP2xpYnJhcmllcz1tYXBzJmtleT1BSXphU3lCNDFEUlViS1dKSFB4YUZqTUF3ZHJ6V3piVkthcnROR2cmbGlicmFyaWVzPW1hcmtlcg==')).then(e => e.text())
  js = js.replace(/(const.a\=).*(location.href).*?(?<=;)/gm, 'const a = "https://geo-devrel-javascript-samples.web.app/";')
  
  return new ReportItResponse(js, {
    headers: {
      'Content-Type': 'application/javascript',
    },
  });
}


export const GET = handler;