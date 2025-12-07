import { ProcessNode, Module, interventionModules } from '@/data/frameworkData';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Box, 
  User, 
  Target, 
  Clock, 
  CheckCircle2,
  BookOpen,
  Layers
} from 'lucide-react';

interface NodeDetailModalProps {
  node: ProcessNode | null;
  isOpen: boolean;
  onClose: () => void;
  modules: Module[];
}

const phaseLabels = {
  pre: 'Pre-Intervention',
  intervention: 'Intervention',
  post: 'Post-Intervention',
  corporate: 'Corporate',
};

const phaseColors = {
  pre: 'phase-pre',
  intervention: 'phase-intervention',
  post: 'phase-post',
  corporate: 'phase-corporate',
};

export const NodeDetailModal = ({ node, isOpen, onClose, modules }: NodeDetailModalProps) => {
  if (!node) return null;

  // Get related modules for intervention nodes
  const relatedModules = node.phase === 'intervention' 
    ? modules.filter(m => 
        node.id === 'module-deployment' || 
        node.title.toLowerCase().includes(m.quotient.toLowerCase())
      )
    : [];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[85vh] overflow-hidden bg-card border-border">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant={phaseColors[node.phase] as any}>
              {phaseLabels[node.phase]}
            </Badge>
          </div>
          <DialogTitle className="text-xl">{node.title}</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {node.description}
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="w-full grid grid-cols-3 mb-4">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="source">Source</TabsTrigger>
              {relatedModules.length > 0 && (
                <TabsTrigger value="modules">Modules</TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="details" className="space-y-4 mt-0">
              {/* Metadata Grid */}
              <div className="grid grid-cols-2 gap-4">
                {node.owner && (
                  <Card variant="glass">
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Owner</p>
                        <p className="text-sm font-medium text-foreground">{node.owner}</p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {node.kpi && (
                  <Card variant="glass">
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-sq/10 flex items-center justify-center">
                        <Target className="h-5 w-5 text-sq" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">KPI</p>
                        <p className="text-sm font-medium text-foreground">{node.kpi}</p>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Artifacts */}
              {node.artifacts.length > 0 && (
                <Card variant="glass">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Box className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium text-foreground">Artifacts</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {node.artifacts.map((artifact, idx) => (
                        <div 
                          key={idx}
                          className="flex items-center gap-2 p-2 rounded-lg bg-muted/30"
                        >
                          <CheckCircle2 className="h-4 w-4 text-sq" />
                          <span className="text-sm text-foreground">{artifact}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Evidence Checklist */}
              <Card variant="glass">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Layers className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">Evidence Checklist</span>
                  </div>
                  <div className="space-y-2">
                    {['Documentation complete', 'Quality reviewed', 'Stakeholder sign-off', 'Data captured'].map((item, idx) => (
                      <div 
                        key={idx}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <div className="w-4 h-4 rounded border border-border flex items-center justify-center">
                          {idx < 2 && <CheckCircle2 className="h-3 w-3 text-sq" />}
                        </div>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="source" className="space-y-4 mt-0">
              <Card variant="glass">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">Source Document</span>
                  </div>
                  <Badge variant="outline" className="mb-4">
                    {node.source}
                  </Badge>
                  <div className="bg-muted/30 rounded-lg p-4 border-l-2 border-primary">
                    <p className="text-sm text-foreground italic leading-relaxed">
                      "{node.sourceExcerpt}"
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card variant="glass">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">Related Documentation</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                      <span className="text-sm text-foreground">COMPREHENSIVE_EDUCATIONAL_MODEL_PATENT_DRAFT.pdf</span>
                      <Badge variant="outline" className="text-xs">Patent Draft</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                      <span className="text-sm text-foreground">Complete_Evaluation_Framework.pdf</span>
                      <Badge variant="outline" className="text-xs">Framework</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded-lg bg-muted/30">
                      <span className="text-sm text-foreground">Standardized_Grading_Mechanism.pdf</span>
                      <Badge variant="outline" className="text-xs">Grading</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {relatedModules.length > 0 && (
              <TabsContent value="modules" className="space-y-4 mt-0">
                {['red', 'yellow', 'green'].map((band) => {
                  const bandModules = interventionModules.filter(m => m.band === band);
                  if (bandModules.length === 0) return null;

                  return (
                    <div key={band} className="space-y-2">
                      <h4 className="text-sm font-medium flex items-center gap-2">
                        <span className={`w-3 h-3 rounded-full bg-band-${band}`} />
                        {band.charAt(0).toUpperCase() + band.slice(1)} Band
                      </h4>
                      {bandModules.slice(0, 3).map((module) => (
                        <Card key={module.id} variant="glass">
                          <CardContent className="p-3">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-foreground">{module.name}</span>
                              <Badge variant={module.quotient.toLowerCase() as any}>{module.quotient}</Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mb-2">{module.description}</p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              {module.frequency}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  );
                })}
              </TabsContent>
            )}
          </Tabs>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
