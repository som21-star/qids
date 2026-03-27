import { MobileView } from '@/pages/Index';
import { Map, List, Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MobileNavBarProps {
  activeView: MobileView;
  setActiveView: (view: MobileView) => void;
}

const tabs: { id: MobileView; label: string; icon: typeof Map }[] = [
  { id: 'nodes', label: 'Nodes', icon: List },
  { id: 'canvas', label: 'Canvas', icon: Map },
  { id: 'highlights', label: 'Highlights', icon: Lightbulb },
];

export const MobileNavBar = ({ activeView, setActiveView }: MobileNavBarProps) => {
  return (
    <nav className="h-14 border-t border-border bg-card/95 backdrop-blur-xl flex items-center justify-around shrink-0 safe-area-bottom">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeView === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveView(tab.id)}
            className={cn(
              "flex flex-col items-center gap-0.5 px-4 py-1 rounded-lg transition-colors",
              isActive 
                ? "text-primary" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Icon className={cn("h-5 w-5", isActive && "text-primary")} />
            <span className="text-[10px] font-medium">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
