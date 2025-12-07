import { useMemo, useRef, useState } from 'react';
import { ProcessNode, Edge } from '@/data/frameworkData';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface FrameworkCanvasProps {
  nodes: ProcessNode[];
  edges: Edge[];
  zoom: number;
  onNodeClick: (node: ProcessNode) => void;
  onNodeHover: (node: ProcessNode | null) => void;
  selectedNode: ProcessNode | null;
}

const phaseConfig = {
  pre: { 
    label: 'PRE-INTERVENTION', 
    color: 'phase-pre',
    gradient: 'from-phase-pre/20 to-transparent',
    y: 0 
  },
  intervention: { 
    label: 'INTERVENTION', 
    color: 'phase-intervention',
    gradient: 'from-phase-intervention/20 to-transparent',
    y: 1 
  },
  post: { 
    label: 'POST-INTERVENTION', 
    color: 'phase-post',
    gradient: 'from-phase-post/20 to-transparent',
    y: 2 
  },
  corporate: { 
    label: 'CORPORATE / CUSTOM', 
    color: 'phase-corporate',
    gradient: 'from-phase-corporate/20 to-transparent',
    y: 3 
  },
};

export const FrameworkCanvas = ({ 
  nodes, 
  edges, 
  zoom, 
  onNodeClick, 
  onNodeHover,
  selectedNode 
}: FrameworkCanvasProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Group nodes by phase
  const nodesByPhase = useMemo(() => {
    return nodes.reduce((acc, node) => {
      if (!acc[node.phase]) acc[node.phase] = [];
      acc[node.phase].push(node);
      return acc;
    }, {} as Record<string, ProcessNode[]>);
  }, [nodes]);

  // Calculate node positions
  const nodePositions = useMemo(() => {
    const positions: Record<string, { x: number; y: number }> = {};
    const nodeWidth = 200;
    const nodeHeight = 100;
    const gapX = 40;
    const gapY = 180;
    const swimlaneHeight = 160;

    Object.entries(nodesByPhase).forEach(([phase, phaseNodes]) => {
      const phaseY = phaseConfig[phase as keyof typeof phaseConfig]?.y ?? 0;
      phaseNodes.forEach((node, idx) => {
        positions[node.id] = {
          x: 100 + idx * (nodeWidth + gapX),
          y: 80 + phaseY * (swimlaneHeight + gapY),
        };
      });
    });

    return positions;
  }, [nodesByPhase]);

  // Calculate edges paths
  const edgePaths = useMemo(() => {
    return edges
      .filter(edge => nodePositions[edge.from] && nodePositions[edge.to])
      .map((edge) => {
        const from = nodePositions[edge.from];
        const to = nodePositions[edge.to];
        if (!from || !to) return null;

        const nodeWidth = 200;
        const nodeHeight = 80;

        // Calculate start and end points
        const startX = from.x + nodeWidth;
        const startY = from.y + nodeHeight / 2;
        const endX = to.x;
        const endY = to.y + nodeHeight / 2;

        // Handle different edge types
        const isLoopBack = edge.label === 'Adaptive Loop';
        const isSameRow = Math.abs(startY - endY) < 50;

        let path: string;
        if (isLoopBack) {
          // Create a loop back arc
          const midY = startY - 60;
          path = `M ${startX} ${startY} 
                  C ${startX + 50} ${startY}, ${startX + 50} ${midY}, ${(startX + endX) / 2} ${midY}
                  C ${endX - 50} ${midY}, ${endX - 50} ${endY}, ${endX} ${endY}`;
        } else if (isSameRow) {
          // Simple horizontal connection with slight curve
          const midX = (startX + endX) / 2;
          path = `M ${startX} ${startY} 
                  C ${midX} ${startY}, ${midX} ${endY}, ${endX} ${endY}`;
        } else {
          // Vertical movement between swimlanes
          const controlOffset = 50;
          path = `M ${startX} ${startY} 
                  C ${startX + controlOffset} ${startY}, ${startX + controlOffset} ${(startY + endY) / 2}, ${(startX + endX) / 2} ${(startY + endY) / 2}
                  C ${endX - controlOffset} ${(startY + endY) / 2}, ${endX - controlOffset} ${endY}, ${endX} ${endY}`;
        }

        return {
          ...edge,
          path,
          isLoopBack,
        };
      })
      .filter(Boolean);
  }, [edges, nodePositions]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target === containerRef.current || (e.target as HTMLElement).classList.contains('canvas-bg')) {
      setIsDragging(true);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition(prev => ({
        x: prev.x + e.movementX,
        y: prev.y + e.movementY,
      }));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div 
      ref={containerRef}
      className="w-full h-full overflow-hidden bg-background cursor-grab active:cursor-grabbing canvas-bg"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Grid pattern background */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <div 
        className="relative transition-transform duration-100"
        style={{ 
          transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
          transformOrigin: 'top left',
          minWidth: '2000px',
          minHeight: '1200px',
        }}
      >
        {/* Swimlane backgrounds */}
        {Object.entries(phaseConfig).map(([phase, config]) => {
          if (!nodesByPhase[phase]) return null;
          const swimlaneHeight = 160;
          const gapY = 180;
          
          return (
            <div
              key={phase}
              className={cn(
                "absolute left-0 right-0 rounded-lg border border-border/30",
                `bg-gradient-to-r ${config.gradient}`
              )}
              style={{
                top: 40 + config.y * (swimlaneHeight + gapY),
                height: swimlaneHeight,
              }}
            >
              <div 
                className={cn(
                  "absolute -left-1 top-1/2 -translate-y-1/2 -rotate-90 origin-center",
                  "text-xs font-semibold tracking-widest uppercase",
                  `text-${config.color}`
                )}
                style={{ width: swimlaneHeight, textAlign: 'center' }}
              >
                {config.label}
              </div>
            </div>
          );
        })}

        {/* SVG for edges */}
        <svg 
          className="absolute inset-0 pointer-events-none"
          style={{ width: '100%', height: '100%' }}
        >
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon
                points="0 0, 10 3.5, 0 7"
                fill="hsl(var(--muted-foreground))"
              />
            </marker>
            <marker
              id="arrowhead-active"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon
                points="0 0, 10 3.5, 0 7"
                fill="hsl(var(--primary))"
              />
            </marker>
          </defs>

          {edgePaths.map((edge, idx) => edge && (
            <g key={idx}>
              <motion.path
                d={edge.path}
                fill="none"
                stroke={edge.isLoopBack ? 'hsl(var(--aq))' : 'hsl(var(--muted-foreground))'}
                strokeWidth={edge.isLoopBack ? 2 : 1.5}
                strokeDasharray={edge.isLoopBack ? '8 4' : 'none'}
                markerEnd={edge.isLoopBack ? 'url(#arrowhead-active)' : 'url(#arrowhead)'}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.6 }}
                transition={{ duration: 0.8, delay: idx * 0.05 }}
              />
              {edge.label && (
                <text
                  x={(nodePositions[edge.from]?.x ?? 0) + 220}
                  y={(nodePositions[edge.from]?.y ?? 0) + 20}
                  className="text-xs fill-muted-foreground"
                >
                  {edge.label}
                </text>
              )}
            </g>
          ))}
        </svg>

        {/* Nodes */}
        {nodes.map((node, idx) => {
          const pos = nodePositions[node.id];
          if (!pos) return null;

          const config = phaseConfig[node.phase as keyof typeof phaseConfig];
          const isSelected = selectedNode?.id === node.id;

          return (
            <motion.div
              key={node.id}
              className={cn(
                "absolute w-[200px] cursor-pointer node-glow",
                "rounded-xl border-2 p-4 transition-all duration-200",
                "bg-card/90 backdrop-blur-sm",
                isSelected 
                  ? `border-${config.color} shadow-glow` 
                  : "border-border hover:border-primary/50"
              )}
              style={{ 
                left: pos.x, 
                top: pos.y,
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: idx * 0.03 }}
              onClick={() => onNodeClick(node)}
              onMouseEnter={() => onNodeHover(node)}
              onMouseLeave={() => onNodeHover(null)}
            >
              <div className={cn(
                "absolute -top-2 -left-2 w-4 h-4 rounded-full",
                `bg-${config.color}`
              )} />
              
              <h4 className="text-sm font-semibold text-foreground line-clamp-2 mb-1">
                {node.title}
              </h4>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {node.description}
              </p>
              
              {node.artifacts.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {node.artifacts.slice(0, 2).map((artifact, aidx) => (
                    <span 
                      key={aidx}
                      className="text-[10px] px-1.5 py-0.5 rounded bg-muted/50 text-muted-foreground"
                    >
                      {artifact}
                    </span>
                  ))}
                  {node.artifacts.length > 2 && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted/50 text-muted-foreground">
                      +{node.artifacts.length - 2}
                    </span>
                  )}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
