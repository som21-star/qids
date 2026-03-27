import { useState } from 'react';
import { ProcessNode, processNodes, edges, quotients, interventionModules, technicalHighlights } from '@/data/frameworkData';
import { Header } from '@/components/layout/Header';
import { LeftPanel } from '@/components/panels/LeftPanel';
import { RightPanel } from '@/components/panels/RightPanel';
import { FrameworkCanvas } from '@/components/canvas/FrameworkCanvas';
import { NodeDetailModal } from '@/components/modals/NodeDetailModal';
import { useIsMobile } from '@/hooks/use-mobile';
import { MobileNavBar } from '@/components/layout/MobileNavBar';

export type PhaseFilter = 'all' | 'pre' | 'intervention' | 'post' | 'corporate';
export type MobileView = 'canvas' | 'nodes' | 'highlights';

const Index = () => {
  const [selectedNode, setSelectedNode] = useState<ProcessNode | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phaseFilter, setPhaseFilter] = useState<PhaseFilter>('all');
  const [zoom, setZoom] = useState(1);
  const [leftPanelOpen, setLeftPanelOpen] = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const [mobileView, setMobileView] = useState<MobileView>('canvas');
  const isMobile = useIsMobile();

  const handleNodeClick = (node: ProcessNode) => {
    setSelectedNode(node);
    setIsModalOpen(true);
  };

  const handleNodeHover = (node: ProcessNode | null) => {
    if (node) {
      setSelectedNode(node);
    }
  };

  const filteredNodes = phaseFilter === 'all' 
    ? processNodes 
    : processNodes.filter(node => node.phase === phaseFilter);

  return (
    <div className="h-[100dvh] flex flex-col bg-background overflow-hidden">
      <Header 
        phaseFilter={phaseFilter}
        setPhaseFilter={setPhaseFilter}
        zoom={zoom}
        setZoom={setZoom}
        leftPanelOpen={leftPanelOpen}
        setLeftPanelOpen={setLeftPanelOpen}
        rightPanelOpen={rightPanelOpen}
        setRightPanelOpen={setRightPanelOpen}
        isMobile={isMobile}
      />
      
      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* Desktop: side panels. Mobile: full-screen views */}
        {isMobile ? (
          <>
            {mobileView === 'nodes' && (
              <LeftPanel 
                isOpen={true}
                selectedNode={selectedNode}
                nodes={filteredNodes}
                onNodeClick={handleNodeClick}
                isMobile={true}
              />
            )}
            {mobileView === 'canvas' && (
              <main className="flex-1 relative overflow-hidden">
                <FrameworkCanvas 
                  nodes={filteredNodes}
                  edges={edges}
                  zoom={zoom}
                  onNodeClick={handleNodeClick}
                  onNodeHover={handleNodeHover}
                  selectedNode={selectedNode}
                />
              </main>
            )}
            {mobileView === 'highlights' && (
              <RightPanel 
                isOpen={true}
                highlights={technicalHighlights}
                quotients={quotients}
                modules={interventionModules}
                isMobile={true}
              />
            )}
          </>
        ) : (
          <>
            <LeftPanel 
              isOpen={leftPanelOpen}
              selectedNode={selectedNode}
              nodes={filteredNodes}
              onNodeClick={handleNodeClick}
            />
            <main className="flex-1 relative overflow-hidden">
              <FrameworkCanvas 
                nodes={filteredNodes}
                edges={edges}
                zoom={zoom}
                onNodeClick={handleNodeClick}
                onNodeHover={handleNodeHover}
                selectedNode={selectedNode}
              />
            </main>
            <RightPanel 
              isOpen={rightPanelOpen}
              highlights={technicalHighlights}
              quotients={quotients}
              modules={interventionModules}
            />
          </>
        )}
      </div>

      {/* Mobile bottom nav */}
      {isMobile && (
        <MobileNavBar activeView={mobileView} setActiveView={setMobileView} />
      )}

      <NodeDetailModal
        node={selectedNode}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        modules={interventionModules}
      />
    </div>
  );
};

export default Index;
