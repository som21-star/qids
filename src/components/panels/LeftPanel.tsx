import { ProcessNode } from '@/data/frameworkData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FileText, Box, User, Target, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LeftPanelProps {
  isOpen: boolean;
  selectedNode: ProcessNode | null;
  nodes: ProcessNode[];
  onNodeClick: (node: ProcessNode) => void;
  isMobile?: boolean;
}

const phaseColors = {
  pre: 'phase-pre',
  intervention: 'phase-intervention',
  post: 'phase-post',
  corporate: 'phase-corporate',
};

const phaseLabels = {
  pre: 'Pre-Intervention',
  intervention: 'Intervention',
  post: 'Post-Intervention',
  corporate: 'Corporate',
};

export const LeftPanel = ({ isOpen, selectedNode, nodes, onNodeClick, isMobile = false }: LeftPanelProps) => {
  if (!isOpen) return null;

  const groupedNodes = nodes.reduce((acc, node) => {
    if (!acc[node.phase]) acc[node.phase] = [];
    acc[node.phase].push(node);
    return acc;
  }, {} as Record<string, ProcessNode[]>);

  return (
    <aside className="w-80 border-r border-border bg-sidebar flex flex-col shrink-0 animate-slide-in-right">
      {/* Selected Node Details */}
      {selectedNode && (
        <div className="p-4 border-b border-border">
          <Card variant="glass" className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Badge variant={phaseColors[selectedNode.phase] as any} className="text-xs">
                  {phaseLabels[selectedNode.phase]}
                </Badge>
              </div>
              <CardTitle className="text-base mt-2">{selectedNode.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">{selectedNode.description}</p>
              
              {selectedNode.owner && (
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">Owner:</span>
                  <span className="text-foreground">{selectedNode.owner}</span>
                </div>
              )}

              {selectedNode.kpi && (
                <div className="flex items-center gap-2 text-sm">
                  <Target className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">KPI:</span>
                  <span className="text-foreground">{selectedNode.kpi}</span>
                </div>
              )}

              {selectedNode.artifacts.length > 0 && (
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Box className="h-4 w-4" />
                    <span>Artifacts:</span>
                  </div>
                  <div className="flex flex-wrap gap-1 ml-6">
                    {selectedNode.artifacts.map((artifact, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {artifact}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-2 border-t border-border">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <FileText className="h-3 w-3" />
                  <span>Source: {selectedNode.source}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2 italic leading-relaxed">
                  "{selectedNode.sourceExcerpt}"
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Node List */}
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Process Nodes
          </h3>
          
          {Object.entries(groupedNodes).map(([phase, phaseNodes]) => (
            <div key={phase} className="space-y-2">
              <h4 className="text-xs font-medium text-muted-foreground flex items-center gap-2">
                <span 
                  className={cn(
                    "w-2 h-2 rounded-full",
                    phase === 'pre' && "bg-phase-pre",
                    phase === 'intervention' && "bg-phase-intervention",
                    phase === 'post' && "bg-phase-post",
                    phase === 'corporate' && "bg-phase-corporate",
                  )}
                />
                {phaseLabels[phase as keyof typeof phaseLabels]}
              </h4>
              
              {phaseNodes.map((node) => (
                <button
                  key={node.id}
                  onClick={() => onNodeClick(node)}
                  className={cn(
                    "w-full text-left p-3 rounded-lg border transition-all duration-200",
                    "hover:bg-secondary/50 hover:border-primary/50",
                    selectedNode?.id === node.id
                      ? "bg-secondary border-primary"
                      : "bg-card/50 border-border/50"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">{node.title}</span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                    {node.description}
                  </p>
                </button>
              ))}
            </div>
          ))}
        </div>
      </ScrollArea>
    </aside>
  );
};
