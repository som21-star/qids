import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PhaseFilter } from '@/pages/Index';
import { 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  PanelLeftClose, 
  PanelRightClose,
  PanelLeft,
  PanelRight,
  Download,
  FileJson,
  FileImage,
  Presentation,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from 'sonner';

interface HeaderProps {
  phaseFilter: PhaseFilter;
  setPhaseFilter: (filter: PhaseFilter) => void;
  zoom: number;
  setZoom: (zoom: number) => void;
  leftPanelOpen: boolean;
  setLeftPanelOpen: (open: boolean) => void;
  rightPanelOpen: boolean;
  setRightPanelOpen: (open: boolean) => void;
  isMobile?: boolean;
}

const phases: { id: PhaseFilter; label: string; shortLabel: string; color: string }[] = [
  { id: 'all', label: 'All Phases', shortLabel: 'All', color: 'outline' },
  { id: 'pre', label: 'Pre-Intervention', shortLabel: 'Pre', color: 'phase-pre' },
  { id: 'intervention', label: 'Intervention', shortLabel: 'Int', color: 'phase-intervention' },
  { id: 'post', label: 'Post-Intervention', shortLabel: 'Post', color: 'phase-post' },
  { id: 'corporate', label: 'Corporate', shortLabel: 'Corp', color: 'phase-corporate' },
];

export const Header = ({
  phaseFilter,
  setPhaseFilter,
  zoom,
  setZoom,
  leftPanelOpen,
  setLeftPanelOpen,
  rightPanelOpen,
  setRightPanelOpen,
  isMobile = false,
}: HeaderProps) => {
  const handleZoomIn = () => setZoom(Math.min(zoom + 0.1, 2));
  const handleZoomOut = () => setZoom(Math.max(zoom - 0.1, 0.5));
  const handleResetZoom = () => setZoom(1);

  const handleExport = (format: string) => {
    toast.success(`Exporting as ${format}...`, {
      description: 'Your file will be ready shortly.',
    });
  };

  if (isMobile) {
    return (
      <header className="border-b border-border bg-card/80 backdrop-blur-xl shrink-0">
        {/* Top row: logo + export */}
        <div className="h-12 flex items-center justify-between px-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-eq flex items-center justify-center shadow-glow">
              <span className="text-sm font-bold text-primary-foreground">Q</span>
            </div>
            <h1 className="text-sm font-semibold text-foreground">QIDS Framework</h1>
          </div>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleZoomOut}>
              <ZoomOut className="h-3.5 w-3.5" />
            </Button>
            <span className="text-xs text-muted-foreground w-9 text-center">{Math.round(zoom * 100)}%</span>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleZoomIn}>
              <ZoomIn className="h-3.5 w-3.5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Download className="h-3.5 w-3.5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleExport('SVG')}>
                  <FileImage className="h-4 w-4 mr-2" /> SVG
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport('PNG')}>
                  <FileImage className="h-4 w-4 mr-2" /> PNG
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport('JSON')}>
                  <FileJson className="h-4 w-4 mr-2" /> JSON
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport('PPTX')}>
                  <Presentation className="h-4 w-4 mr-2" /> PPTX
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Phase filter row - horizontally scrollable */}
        <div className="h-10 flex items-center gap-1.5 px-3 overflow-x-auto scrollbar-thin pb-1">
          {phases.map((phase) => (
            <Badge
              key={phase.id}
              variant={phaseFilter === phase.id ? (phase.color as any) : 'outline'}
              className={`cursor-pointer transition-all whitespace-nowrap text-xs shrink-0 ${
                phaseFilter === phase.id ? 'ring-1 ring-offset-1 ring-offset-background' : ''
              }`}
              onClick={() => setPhaseFilter(phase.id)}
            >
              {phase.shortLabel}
            </Badge>
          ))}
        </div>
      </header>
    );
  }

  return (
    <header className="h-16 border-b border-border bg-card/80 backdrop-blur-xl flex items-center justify-between px-4 gap-4 shrink-0">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-eq flex items-center justify-center shadow-glow">
          <span className="text-lg font-bold text-primary-foreground">Q</span>
        </div>
        <div className="hidden sm:block">
          <h1 className="text-lg font-semibold text-foreground">QIDS Framework</h1>
          <p className="text-xs text-muted-foreground">Multidimensional Intelligence Visualizer</p>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto scrollbar-thin py-1">
        {phases.map((phase) => (
          <Badge
            key={phase.id}
            variant={phaseFilter === phase.id ? (phase.color as any) : 'outline'}
            className={`cursor-pointer transition-all hover:scale-105 whitespace-nowrap ${
              phaseFilter === phase.id ? 'ring-1 ring-offset-1 ring-offset-background' : ''
            }`}
            onClick={() => setPhaseFilter(phase.id)}
          >
            {phase.label}
          </Badge>
        ))}
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => setLeftPanelOpen(!leftPanelOpen)}
          title={leftPanelOpen ? 'Hide left panel' : 'Show left panel'}>
          {leftPanelOpen ? <PanelLeftClose className="h-4 w-4" /> : <PanelLeft className="h-4 w-4" />}
        </Button>
        <div className="h-6 w-px bg-border" />
        <Button variant="ghost" size="icon" onClick={handleZoomOut} title="Zoom out">
          <ZoomOut className="h-4 w-4" />
        </Button>
        <span className="text-xs text-muted-foreground w-12 text-center">{Math.round(zoom * 100)}%</span>
        <Button variant="ghost" size="icon" onClick={handleZoomIn} title="Zoom in">
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={handleResetZoom} title="Reset zoom">
          <Maximize2 className="h-4 w-4" />
        </Button>
        <div className="h-6 w-px bg-border" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleExport('SVG')}>
              <FileImage className="h-4 w-4 mr-2" /> Export as SVG
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport('PNG')}>
              <FileImage className="h-4 w-4 mr-2" /> Export as PNG
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport('JSON')}>
              <FileJson className="h-4 w-4 mr-2" /> Export as JSON
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExport('PPTX')}>
              <Presentation className="h-4 w-4 mr-2" /> Export as PPTX
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="h-6 w-px bg-border" />
        <Button variant="ghost" size="icon" onClick={() => setRightPanelOpen(!rightPanelOpen)}
          title={rightPanelOpen ? 'Hide right panel' : 'Show right panel'}>
          {rightPanelOpen ? <PanelRightClose className="h-4 w-4" /> : <PanelRight className="h-4 w-4" />}
        </Button>
      </div>
    </header>
  );
};
