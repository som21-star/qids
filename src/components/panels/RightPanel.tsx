import { Quotient, Module, technicalHighlights } from '@/data/frameworkData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  Heart, 
  Users, 
  Shield, 
  Code, 
  Calculator, 
  Briefcase,
  FileText,
  Lightbulb,
  CheckCircle2,
  Layers,
  Zap
} from 'lucide-react';

interface RightPanelProps {
  isOpen: boolean;
  highlights: typeof technicalHighlights;
  quotients: Quotient[];
  modules: Module[];
  isMobile?: boolean;
}

const quotientIcons = {
  IQ: Brain,
  EQ: Heart,
  SQ: Users,
  AQ: Shield,
};

export const RightPanel = ({ isOpen, highlights, quotients, modules }: RightPanelProps) => {
  if (!isOpen) return null;

  return (
    <aside className="w-96 border-l border-border bg-sidebar flex flex-col shrink-0 animate-slide-in-right">
      <ScrollArea className="flex-1">
        <div className="p-4">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-primary" />
            Legal & Technical Highlights
          </h2>

          <Tabs defaultValue="technical" className="w-full">
            <TabsList className="w-full grid grid-cols-3 mb-4">
              <TabsTrigger value="technical">Technical</TabsTrigger>
              <TabsTrigger value="quotients">Quotients</TabsTrigger>
              <TabsTrigger value="modules">Modules</TabsTrigger>
            </TabsList>

            <TabsContent value="technical" className="space-y-4 mt-0">
              {/* Unique IQ Measurement */}
              <Card variant="iq">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Brain className="h-4 w-4 text-iq" />
                    {highlights.uniqueIQMeasurement.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {highlights.uniqueIQMeasurement.points.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 className="h-3 w-3 text-sq mt-0.5 shrink-0" />
                      <span>{point}</span>
                    </div>
                  ))}
                  <div className="pt-2 border-t border-border/50">
                    <Badge variant="outline" className="text-xs">
                      <FileText className="h-3 w-3 mr-1" />
                      {highlights.uniqueIQMeasurement.source}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Standardization Algorithm */}
              <Card variant="glass">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Calculator className="h-4 w-4 text-primary" />
                    {highlights.standardizationAlgorithm.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="bg-muted/50 rounded-lg p-3 font-mono text-xs text-foreground">
                    {highlights.standardizationAlgorithm.formula}
                  </div>
                  {highlights.standardizationAlgorithm.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 className="h-3 w-3 text-sq mt-0.5 shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Dynamic Weightage Algorithm */}
              <Card variant="glass">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Code className="h-4 w-4 text-eq" />
                    {highlights.dynamicWeightage.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-xs text-muted-foreground">
                    {highlights.dynamicWeightage.description}
                  </p>
                  <pre className="bg-muted/50 rounded-lg p-3 font-mono text-xs text-foreground overflow-x-auto whitespace-pre-wrap">
                    {highlights.dynamicWeightage.pseudocode}
                  </pre>
                </CardContent>
              </Card>

              {/* DEI Framework */}
              <Card variant="eq">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Heart className="h-4 w-4 text-eq" />
                    {highlights.deiFramework.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {highlights.deiFramework.points.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 className="h-3 w-3 text-sq mt-0.5 shrink-0" />
                      <span>{point}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Integrated Assessment */}
              <Card variant="sq">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Layers className="h-4 w-4 text-sq" />
                    {highlights.integratedAssessment.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {highlights.integratedAssessment.points.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 className="h-3 w-3 text-sq mt-0.5 shrink-0" />
                      <span>{point}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Resilience Dynamics Framework */}
              <Card variant="aq">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Zap className="h-4 w-4 text-aq" />
                    {highlights.resilienceDynamics.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-xs text-muted-foreground">
                    {highlights.resilienceDynamics.description}
                  </p>
                  <div className="space-y-2">
                    {highlights.resilienceDynamics.components.map((comp, idx) => (
                      <div key={idx} className="bg-muted/30 rounded-lg p-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-foreground">{comp.name}</span>
                          <Badge variant="outline" className="text-xs">×{comp.weight}</Badge>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {comp.subComponents.map((sub, subIdx) => (
                            <span key={subIdx} className="text-xs bg-aq/10 text-aq px-1.5 py-0.5 rounded">
                              {sub}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3 font-mono text-xs text-foreground">
                    {highlights.resilienceDynamics.formula}
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground font-medium">Benchmarks:</span>
                    {highlights.resilienceDynamics.benchmarks.map((bench, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs bg-muted/20 rounded px-2 py-1">
                        <span className="text-foreground">{bench.range}</span>
                        <Badge variant="aq" className="text-xs">{bench.level}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Career Guidance */}
              <Card variant="glass">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-primary" />
                    {highlights.careerGuidance.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {highlights.careerGuidance.points.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 className="h-3 w-3 text-sq mt-0.5 shrink-0" />
                      <span>{point}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="quotients" className="space-y-4 mt-0">
              {quotients.map((quotient) => {
                const Icon = quotientIcons[quotient.id];
                return (
                  <Card key={quotient.id} variant={quotient.id.toLowerCase() as any}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center gap-2">
                        <Icon className={`h-4 w-4 text-${quotient.color}`} />
                        {quotient.fullName} ({quotient.name})
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-muted/30 rounded p-2">
                          <span className="text-muted-foreground">Max Score:</span>
                          <span className="ml-1 text-foreground font-medium">{quotient.maxRawScore}</span>
                        </div>
                        <div className="bg-muted/30 rounded p-2">
                          <span className="text-muted-foreground">Factor:</span>
                          <span className="ml-1 text-foreground font-medium">{quotient.conversionFactor}</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs text-muted-foreground">Parameters:</span>
                        {quotient.parameters.map((param, idx) => (
                          <div key={idx} className="flex items-center justify-between text-xs bg-muted/20 rounded px-2 py-1">
                            <span className="text-foreground">{param.name}</span>
                            <Badge variant="outline" className="text-xs">{param.maxScore} pts</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </TabsContent>

            <TabsContent value="modules" className="space-y-4 mt-0">
              {['red', 'yellow', 'green'].map((band) => (
                <div key={band} className="space-y-2">
                  <h4 className="text-xs font-medium uppercase tracking-wider flex items-center gap-2">
                    <span className={`w-3 h-3 rounded-full bg-band-${band}`} />
                    {band.charAt(0).toUpperCase() + band.slice(1)} Band Modules
                  </h4>
                  {modules
                    .filter((m) => m.band === band)
                    .slice(0, 4)
                    .map((module) => (
                      <Card key={module.id} variant="glass" className="text-xs">
                        <CardContent className="p-3 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-foreground">{module.name}</span>
                            <Badge variant={module.quotient.toLowerCase() as any}>{module.quotient}</Badge>
                          </div>
                          <p className="text-muted-foreground line-clamp-2">{module.description}</p>
                          <div className="text-muted-foreground">
                            <span className="font-medium">Frequency:</span> {module.frequency}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>
    </aside>
  );
};
