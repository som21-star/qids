import { useState } from 'react';
import { ProcessNode, processNodes, edges, quotients, interventionModules, technicalHighlights } from '@/data/frameworkData';
import { Header } from '@/components/layout/Header';
import { LeftPanel } from '@/components/panels/LeftPanel';
import { RightPanel } from '@/components/panels/RightPanel';
import { FrameworkCanvas } from '@/components/canvas/FrameworkCanvas';
import { NodeDetailModal } from '@/components/modals/NodeDetailModal';

export type PhaseFilter = 'all' | 'pre' | 'intervention' | 'post' | 'corporate';

const Index = () => {
  const [selectedNode, setSelectedNode] = useState<ProcessNode | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [phaseFilter, setPhaseFilter] = useState<PhaseFilter>('all');
  const [zoom, setZoom] = useState(1);
  const [leftPanelOpen, setLeftPanelOpen] = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);

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
    <div className="h-screen flex flex-col bg-background overflow-hidden">
      <Header 
        phaseFilter={phaseFilter}
        setPhaseFilter={setPhaseFilter}
        zoom={zoom}
        setZoom={setZoom}
        leftPanelOpen={leftPanelOpen}
        setLeftPanelOpen={setLeftPanelOpen}
        rightPanelOpen={rightPanelOpen}
        setRightPanelOpen={setRightPanelOpen}
      />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Node Details */}
        <LeftPanel 
          isOpen={leftPanelOpen}
          selectedNode={selectedNode}
          nodes={filteredNodes}
          onNodeClick={handleNodeClick}
        />

        {/* Main Canvas */}
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

        {/* Right Panel - Technical Highlights */}
        <RightPanel 
          isOpen={rightPanelOpen}
          highlights={technicalHighlights}
          quotients={quotients}
          modules={interventionModules}
        />
      </div>

      {/* Node Detail Modal */}
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
