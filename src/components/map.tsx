import { renderToStaticMarkup } from 'react-dom/server';
import React, { createRef, FormEvent, useEffect, useRef, useState } from 'react';
import { ContextMenu, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuRadioGroup, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuShortcut, ContextMenuSub, ContextMenuSubContent, ContextMenuSubTrigger, ContextMenuTrigger } from './ui/context-menu';
import { ArrowUpDown, Car, CarFront, CloudHail, Home, Loader2, OctagonAlert, Siren, TrafficCone, TriangleAlert } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import Api from '@/lib/api';
import { useAuth } from '@/contexts/Authentication';
import Report from '@/interfaces/Report';
import { toast } from 'sonner';
import Coords from '@/interfaces/Coords';

declare const window: any;

function haversine(pos: Coords, pos2: Coords): number {
  const R = 6371e3;
  const φ1 = pos.lat * Math.PI / 180;
  const φ2 = pos2.lat * Math.PI / 180;
  const Δφ = (pos2.lat - pos.lat) * Math.PI / 180;
  const Δλ = (pos2.lng - pos.lng) * Math.PI / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

const icons: {
  name: Report['name'],
  icon: React.ReactNode,
}[] = [
  { name: 'Blitz', icon: <Siren color="#3498db" /> },
  { name: 'Acidente', icon: <TriangleAlert color="#f1c40f" /> },
  { name: 'Rua Bloqueada', icon: <TrafficCone color="#e67e22" /> },
  { name: 'Congestionamento', icon: <OctagonAlert color="#e74c3c" /> },
  { name: 'Chuva', icon: <CloudHail color="#74b9ff" /> },
];

export default function MapComponent() {
  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  const ctx = useAuth();
  const ref = useRef<HTMLDivElement>(null);
  const contextMenuTriggerRef = useRef<HTMLSpanElement>(null);
  const mapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [isContextOpen, setIsContextOpen] = useState(false);
  const [contextPosition, setContextPosition] = useState({ x: 0, y: 0 });
  const [coords, setCoords] = useState({ lat: 0, lng: 0 });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDialogReadOnly, setIsDialogReadOnly] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(new Date());
  const [reports, setReports] = useState<Report[]>([]);
  const [reportIndex, setReportIndex] = useState(0);

  async function onMapContextMenu(e: any) {
    const { latLng } = e;
    const lat: number = latLng.lat();
    const lng: number = latLng.lng();

    setContextPosition({ x: e.domEvent.clientX, y: e.domEvent.clientY });
    setCoords({ lat, lng });
    contextMenuTriggerRef.current!.dispatchEvent(new Event('contextmenu', { bubbles: true }));
  }

  function onDocumentContextMenu(e: MouseEvent) {
    e.preventDefault();
  }

  function onDocumentKeyDown(e: KeyboardEvent) {
    const factor = 0.001;
    let pos = markerRef.current.position;

    if (e.code === 'KeyW')
      markerRef.current.position = { lat: pos.lat + factor, lng: pos.lng };
    if (e.code === 'KeyS')
      markerRef.current.position = { lat: pos.lat - factor, lng: pos.lng };
    if (e.code === 'KeyA')
      markerRef.current.position = { lat: pos.lat, lng: pos.lng - factor };
    if (e.code === 'KeyD')
      markerRef.current.position = { lat: pos.lat, lng: pos.lng + factor };

    pos = markerRef.current.position;

    for (const report of window.reports) {
      const d = haversine({ lat: pos.lat, lng: pos.lng }, { lat: report.lat, lng: report.lng });

      if (d < 500) {
        toast(`Você está a ${d} metros de um(a) ${report.name}!`, {
          description: 'Talvez seja melhor evitar esta rota.',
          action: {
            label: 'Ver',
            onClick: () => {
              mapRef.current.panTo({ lat: report.lat, lng: report.lng });
            },
          }
        });
      }
    }
  }

  useEffect(() => {
    const updater = setInterval(updateReports, 5 * 1000);

    document.addEventListener('contextmenu', onDocumentContextMenu);

    (async () => {
      if (!ref.current || isMapLoaded) return;

      setIsMapLoaded(true);
      let js = await fetch('/api/maps').then(e => e.text());
      const common = await fetch('/api/maps-common').then(e => e.text());
      js = js.replace('e.appendChild(a)', '!a.src.includes("common.js") && e.appendChild(a)');

      window.eval(js);
      window.eval(common);

      while (!window.google)
        await sleep(100);

      mapRef.current = new window.google.maps.Map(ref.current, {
        center: { lat: -10.228213450580272, lng: -48.33304777369817 },
        zoom: 12,
        disableDefaultUI: true,
        mapId: 'sdf84asd5s6dfasd45664556g4',
      });
      
      mapRef.current.addListener('rightclick', onMapContextMenu);
      await updateReports();

      const { AdvancedMarkerElement } = await window.google.maps.importLibrary('marker');
      const dummyElement = new DOMParser().parseFromString(renderToStaticMarkup(<CarFront />), 'text/html').querySelector('svg');

      markerRef.current = new AdvancedMarkerElement({
        content: dummyElement,
        position: { lat: -10.27661544655481, lng: -48.33319160385255 },
        map: mapRef.current,
        gmpClickable: true,
      });

      document.addEventListener('keydown', onDocumentKeyDown);
    })();

    // todo real-time updates

    return () => {
      document.removeEventListener('contextmenu', onDocumentContextMenu);
      document.removeEventListener('keydown', onDocumentKeyDown);
      clearInterval(updater);
    };
  }, [isMapLoaded]);

  async function onSubmit(e?: FormEvent) {
    e?.preventDefault();
    setIsSubmitting(true);

    await ctx.api.createReport(icons[selectedAlert].name, date, description, coords.lat, coords.lng);

    setIsSubmitting(false);
    setIsDialogOpen(false);
    setDescription('');
    updateReports();
  }

  async function updateReports() {
    const { error, result } = await ctx.api.getReports();
    const wreports = (window.reports as Report[] || []).map((e: Report) => e);

    setReports(result!);
    window.reports = result! as Report[]; // hacky way to access reports from the event i guess
    console.log(wreports)

    for (const report of result!) {
      // O(n^2) goes brrrr but
      if (wreports.length == 0 || wreports.filter(e => e.lat == report.lat && e.lng == report.lng).length != 0)
        continue;

      const d = haversine({ lat: markerRef.current.position.lat, lng: markerRef.current.position.lng }, { lat: report.lat, lng: report.lng });

      if (d > 5000)
        continue;

      ctx.api.relayReport(d, report);
    }

    for (let i = 0; i < result!.length; i++) {
      const report = result![i];
      const { lat, lng, name } = report;
      const icon = icons.find(e => e.name === name);
      const { AdvancedMarkerElement } = await window.google.maps.importLibrary('marker');
      const dummyElement = new DOMParser().parseFromString(renderToStaticMarkup(icon!.icon), 'text/html').querySelector('svg')

      window.reports[i].marker = new AdvancedMarkerElement({
        content: dummyElement,
        position: { lat, lng },
        map: mapRef.current,
        gmpClickable: true,
      });

      window.reports[i].marker.addListener('click', () => {
        setCoords({ lat, lng });
        setSelectedAlert(icons.findIndex(e => e.name === name));
        setDate(report.date);
        setDescription(report.description);
        setIsDialogReadOnly(true);
        setIsDialogOpen(true);
        setReportIndex(i);
      });

      if (report.name == 'Chuva') {
        window.reports[i].circle = new window.google.maps.Circle({
          strokeColor: '#74b9ff',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#74b9ff',
          fillOpacity: 0.35,
          map: mapRef.current,
          center: { lat, lng },
          radius: 1500,
        });

        window.reports[i].circle.addListener('rightclick', onMapContextMenu)
      }
    }

    if (wreports)
      for (const report of wreports)
        (report as any).marker.setMap(null), (report as any /* srryuu*/).circle?.setMap(null);
  }

  return (
    <>
    <div ref={ref} style={{ height: '100vh', width: '100%' }} />
    <Dialog open={isDialogOpen} onOpenChange={(open) => {
      setIsDialogOpen(open);
      setTimeout(() => setIsDialogReadOnly(false), 500)
    }}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{ !isDialogReadOnly && 'Novo' } Alerta</DialogTitle>
          <DialogDescription>
            {
              !isDialogReadOnly ? (
                'Reporte um problema no local'
              ) : (
                `${reports[reportIndex].author.name} - ${reports[reportIndex].author.email}`
              )
            }
          </DialogDescription>
        </DialogHeader>
          <form onSubmit={onSubmit}>
            <label>
              Tipo
              <div className="text-gray-700 bg-[#eaeaea] items-center flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                <span className='w-8'>{icons[selectedAlert].icon}</span>
                <span className="pl-2">{icons[selectedAlert].name}</span>
              </div>
            </label>
            <label>
              Coordenadas
              <div className="text-gray-700 bg-[#eaeaea] items-center flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                {coords.lat}, {coords.lng}
              </div>
            </label>
            <label>
              Data
              <div className="text-gray-700 bg-[#eaeaea] items-center flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                {date.toLocaleString()}
              </div>
            </label>
            <label>
              Descrição
              <Textarea disabled={isDialogReadOnly} placeholder="Digite uma descrição.." value={description} onChange={(e) => setDescription(e.target.value)} />
            </label>
          </form>
          
        <DialogFooter>
          {
            !isDialogReadOnly && (
              isSubmitting ? (
                <Button disabled>
                  <Loader2 className="animate-spin mr-2" size="sm" />
                  Salvando...
                </Button>
              ) : (
                <Button type="button" onClick={onSubmit}>Salvar</Button>
              )
            )
          }
        </DialogFooter>
      </DialogContent>
    </Dialog>
    <ContextMenu onOpenChange={setIsContextOpen}>
      <ContextMenuTrigger ref={contextMenuTriggerRef}></ContextMenuTrigger>
      <ContextMenuContent className="w-[280px]" style={{ position: 'absolute', left: contextPosition.x, top: contextPosition.y }}>
        <ContextMenuItem>
          Lat / Long {coords.lat.toFixed(5)}, {coords.lng.toFixed(5)}
        </ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger inset>Reportar</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            {icons.map(({ name, icon }, i) => (
              <>
              { name == 'Chuva' && <ContextMenuSeparator /> }
              <ContextMenuItem key={name} onClick={() => {
                setSelectedAlert(i);
                setDate(new Date());
                setTimeout(() => {
                  setIsDialogOpen(true);
                }, 50);
              }}>
                <span className='w-8'>{icon}</span>
                {name}
              </ContextMenuItem>
              </>
            ))}
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
    </>
  );
};
