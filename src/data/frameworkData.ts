// QIDS Framework Data - extracted from source documents

export interface Parameter {
  name: string;
  description: string;
  maxScore: number;
}

export interface Quotient {
  id: 'IQ' | 'EQ' | 'SQ' | 'AQ';
  name: string;
  fullName: string;
  color: string;
  parameters: Parameter[];
  maxRawScore: number;
  conversionFactor: number;
  source: string;
}

export interface Module {
  id: string;
  name: string;
  description: string;
  frequency: string;
  activities: string[];
  band: 'red' | 'yellow' | 'green';
  quotient: 'IQ' | 'EQ' | 'SQ' | 'AQ';
  source: string;
}

export interface ProcessNode {
  id: string;
  title: string;
  description: string;
  phase: 'pre' | 'intervention' | 'post' | 'corporate';
  artifacts: string[];
  owner?: string;
  kpi?: string;
  source: string;
  sourceExcerpt: string;
}

export interface Edge {
  from: string;
  to: string;
  label?: string;
  condition?: string;
}

// Four Pillars - Quotient definitions
export const quotients: Quotient[] = [
  {
    id: 'IQ',
    name: 'IQ',
    fullName: 'Intelligence Quotient',
    color: 'iq',
    maxRawScore: 100,
    conversionFactor: 1.0,
    source: 'Standardized_Grading_Mechanism_for_QIDS.pdf',
    parameters: [
      { name: 'Verbal IQ', description: 'Language comprehension, vocabulary, verbal reasoning', maxScore: 25 },
      { name: 'Quantitative IQ', description: 'Mathematical reasoning, numerical operations, problem-solving', maxScore: 25 },
      { name: 'Psychometric IQ', description: 'Standardized cognitive testing, pattern recognition', maxScore: 25 },
      { name: 'Performance IQ', description: 'Non-verbal reasoning, spatial processing, practical intelligence', maxScore: 25 },
    ],
  },
  {
    id: 'EQ',
    name: 'EQ',
    fullName: 'Emotional Quotient',
    color: 'eq',
    maxRawScore: 50,
    conversionFactor: 2.0,
    source: 'Complete_Evaluation_Framework.pdf',
    parameters: [
      { name: 'Self-Awareness', description: 'Understanding one\'s emotions, strengths, and limitations', maxScore: 10 },
      { name: 'Self-Management', description: 'Emotional regulation, impulse control, adaptability', maxScore: 10 },
      { name: 'Social Awareness', description: 'Empathy, organizational awareness, service orientation', maxScore: 10 },
      { name: 'Relationship Management', description: 'Influence, conflict management, teamwork', maxScore: 10 },
      { name: 'Emotional Resilience', description: 'Stress tolerance, optimism, emotional recovery', maxScore: 10 },
    ],
  },
  {
    id: 'SQ',
    name: 'SQ',
    fullName: 'Social Quotient',
    color: 'sq',
    maxRawScore: 50,
    conversionFactor: 2.0,
    source: 'Complete_Evaluation_Framework.pdf',
    parameters: [
      { name: 'Assessment Center Exercise', description: 'Group activities, role-plays, situational tests', maxScore: 20 },
      { name: 'Cognitive SQ Test', description: 'Social reasoning, perspective-taking, social judgment', maxScore: 10 },
      { name: 'Performance Based Activities', description: 'Real-world social task execution, collaboration', maxScore: 20 },
    ],
  },
  {
    id: 'AQ',
    name: 'AQ',
    fullName: 'Adversity Quotient',
    color: 'aq',
    maxRawScore: 78,
    conversionFactor: 1.28,
    source: 'Complete_Evaluation_Framework.pdf',
    parameters: [
      { name: 'Control', description: 'Perceived control over adverse situations', maxScore: 18 },
      { name: 'Ownership', description: 'Taking responsibility for outcomes', maxScore: 18 },
      { name: 'Reach', description: 'Limiting the scope of adversity', maxScore: 18 },
      { name: 'Endurance', description: 'Persistence and long-term focus', maxScore: 18 },
      { name: 'Situational Agility', description: 'Adaptability in challenging contexts', maxScore: 6 },
    ],
  },
];

// Process nodes for the framework
export const processNodes: ProcessNode[] = [
  // PRE-INTERVENTION PHASE
  {
    id: 'intake',
    title: 'Intake & Consent',
    description: 'Collect identity, demographics, context (school/college/corporate), language, history, and permissions',
    phase: 'pre',
    artifacts: ['Intake form', 'Consent log'],
    owner: 'Administrator',
    source: 'COMPREHENSIVE_EDUCATIONAL_MODEL_PATENT_DRAFT.pdf',
    sourceExcerpt: 'Collect identity, demographics, context (school/college/corporate), language, history, and permissions for data and any future sensor/AV use.',
  },
  {
    id: 'prepare-assessment',
    title: 'Prepare Assessment Suite',
    description: 'Assemble instruments: IQ psychometrics, EQ DEC instruments, SQ assessment-center tasks, AQ Resilience scenarios',
    phase: 'pre',
    artifacts: ['Assessment pack', 'Administration protocol'],
    owner: 'Assessment Team',
    source: 'Complete_Evaluation_Framework.pdf',
    sourceExcerpt: 'Assemble instruments: IQ psychometrics + performance tasks; EQ DEC instruments; SQ assessment-center tasks + cognitive SQ tests; AQ Resilience Dynamics scenarios.',
  },
  {
    id: 'baseline-collection',
    title: 'Baseline Data Collection',
    description: 'Administer the assessment suite using questionnaires, performance tasks, observations, peer/self reports',
    phase: 'pre',
    artifacts: ['Raw dataset per participant'],
    owner: 'Facilitators',
    kpi: 'Completion rate > 95%',
    source: 'Complete_Evaluation_Framework.pdf',
    sourceExcerpt: 'Administer the assessment suite using questionnaires, performance tasks, observations, peer/self reports. Capture raw responses, timestamps, and observer notes.',
  },
  {
    id: 'standardize-score',
    title: 'Standardize & Score',
    description: 'Normalize raw results to standardized scales and compute subcomponent scores and four quotient vectors',
    phase: 'pre',
    artifacts: ['Standardized scoring tables'],
    owner: 'Data Analyst',
    kpi: 'Scoring accuracy 100%',
    source: 'Standardized_Grading_Mechanism_for_QIDS.pdf',
    sourceExcerpt: 'Normalize raw results to standardized scales and compute subcomponent scores and four quotient vectors (IQ, EQ, SQ, AQ). Apply age/culture adjustments.',
  },
  {
    id: 'profile-construction',
    title: 'Integrated Profile Construction',
    description: 'Triangulate multi-method data to produce an Individual Quotient Profile (IQP)',
    phase: 'pre',
    artifacts: ['IQP report'],
    owner: 'Psychologist',
    source: 'COMPREHENSIVE_EDUCATIONAL_MODEL_PATENT_DRAFT.pdf',
    sourceExcerpt: 'Triangulate multi-method data to produce an Individual Quotient Profile (IQP) with reliability metrics and context notes.',
  },
  {
    id: 'dwa',
    title: 'Dynamic Weightage Algorithm',
    description: 'Use IQP + role/context metadata to compute context-sensitive weights for subcomponents',
    phase: 'pre',
    artifacts: ['Contextual priority vector'],
    owner: 'System',
    source: 'COMPREHENSIVE_EDUCATIONAL_MODEL_PATENT_DRAFT.pdf',
    sourceExcerpt: 'Use IQP + role/context metadata to compute context-sensitive weights for subcomponents (weights are adaptable to role/culture/mission).',
  },
  {
    id: 'banding',
    title: 'Banding & Intervention Mapping',
    description: 'Map subcomponent priorities to bands (Red/Yellow/Green) and produce IDP with recommended modules',
    phase: 'pre',
    artifacts: ['Individual Development Plan (IDP)'],
    owner: 'Program Manager',
    source: 'COMPREHENSIVE_EDUCATIONAL_MODEL_PATENT_DRAFT.pdf',
    sourceExcerpt: 'Map subcomponent priorities to bands (Red/Yellow/Green) using thresholds; produce a ranked list of target subcomponents and a Preliminary Individual Development Plan (IDP).',
  },

  // INTERVENTION PHASE
  {
    id: 'scheduling',
    title: 'Scheduling & Resource Allocation',
    description: 'Convert IDP into session calendar, assign facilitators/mentors, prepare materials',
    phase: 'intervention',
    artifacts: ['Session calendar', 'Resource allocation plan'],
    owner: 'Program Coordinator',
    source: 'COMPREHENSIVE_EDUCATIONAL_MODEL_PATENT_DRAFT.pdf',
    sourceExcerpt: 'Convert IDP into session calendar, assign facilitators/mentors, prepare materials and delivery mode.',
  },
  {
    id: 'module-deployment',
    title: 'Module Deployment',
    description: 'Deploy targeted modules based on band: Red (intensive), Yellow (medium), Green (maintenance)',
    phase: 'intervention',
    artifacts: ['Session materials', 'Facilitator guides'],
    owner: 'Facilitators',
    source: 'IQ/EQ/SQ/AQ Module Files',
    sourceExcerpt: 'Red: Intensive one-on-one / small group (weekly). Yellow: Medium intensity group + targeted tasks. Green: Maintenance/advanced tasks and enrichment.',
  },
  {
    id: 'session-capture',
    title: 'Session Data Capture',
    description: 'Record attendance, engagement, facilitator observations, work products, peer feedback',
    phase: 'intervention',
    artifacts: ['Attendance logs', 'Engagement metrics', 'Work products'],
    owner: 'Facilitators',
    kpi: 'Attendance > 80%',
    source: 'COMPREHENSIVE_EDUCATIONAL_MODEL_PATENT_DRAFT.pdf',
    sourceExcerpt: 'Record attendance, engagement, facilitator observations, work products, peer feedback; log to longitudinal profile.',
  },
  {
    id: 'pee',
    title: 'Progress Evaluation Engine (PEE)',
    description: 'Compute progress metrics at checkpoints, escalate or step-down intensity based on thresholds',
    phase: 'intervention',
    artifacts: ['Progress reports', 'Adaptation logs'],
    owner: 'System + Program Manager',
    kpi: 'Timely adaptations',
    source: 'COMPREHENSIVE_EDUCATIONAL_MODEL_PATENT_DRAFT.pdf',
    sourceExcerpt: 'At checkpoints compute progress metrics (moving averages, velocity). If progress < escalation threshold → escalate intensity. If ≥ step-down threshold → reduce intensity.',
  },
  {
    id: 'dei-practice',
    title: 'DEI Practice (EQ)',
    description: 'Apply Dynamic Emotional Integration principles during EQ modules with real-time adaptations',
    phase: 'intervention',
    artifacts: ['Behavioral response logs'],
    owner: 'EQ Facilitators',
    source: 'COMPREHENSIVE_EDUCATIONAL_MODEL_PATENT_DRAFT.pdf',
    sourceExcerpt: 'Apply Dynamic Emotional Integration principles during EQ modules (real-time task difficulty/weighting adjustments based on behavioral responses).',
  },
  {
    id: 'module-effectiveness',
    title: 'Module Effectiveness Measurement',
    description: 'Define KPIs per module, compute effectiveness scores and log for synthesis',
    phase: 'intervention',
    artifacts: ['Module effectiveness scores'],
    owner: 'Data Analyst',
    kpi: 'KPI tracking accuracy',
    source: 'COMPREHENSIVE_EDUCATIONAL_MODEL_PATENT_DRAFT.pdf',
    sourceExcerpt: 'Define KPIs per module (accuracy, latency, self-report, peer rating); compute module effectiveness score and log for synthesis.',
  },

  // POST-INTERVENTION PHASE
  {
    id: 'reassessment',
    title: 'Full Reassessment',
    description: 'Re-run the full assessment suite using same protocols to compute comparable post scores',
    phase: 'post',
    artifacts: ['Post-assessment dataset'],
    owner: 'Assessment Team',
    source: 'COMPREHENSIVE_EDUCATIONAL_MODEL_PATENT_DRAFT.pdf',
    sourceExcerpt: 'Re-run the full assessment suite (same protocols) to compute comparable post scores.',
  },
  {
    id: 'compute-outcomes',
    title: 'Compute Outcomes',
    description: 'Calculate per-subcomponent deltas, normalized improvements, assign final grades (A–E)',
    phase: 'post',
    artifacts: ['Outcome report', 'Grade assignments'],
    owner: 'Data Analyst',
    source: 'Standardized_Grading_Mechanism_for_QIDS.pdf',
    sourceExcerpt: 'Calculate per-subcomponent deltas, normalized improvements, statistical confidence where possible; assign final grade (A–E) per rubric.',
  },
  {
    id: 'effectiveness-synthesis',
    title: 'Intervention Effectiveness Synthesis',
    description: 'Aggregate module effectiveness, correlate KPIs to outcome deltas',
    phase: 'post',
    artifacts: ['Effectiveness Synthesis Report'],
    owner: 'Program Manager',
    source: 'COMPREHENSIVE_EDUCATIONAL_MODEL_PATENT_DRAFT.pdf',
    sourceExcerpt: 'Aggregate module effectiveness, correlate module KPIs to outcome deltas, and produce an Effectiveness Synthesis Report.',
  },
  {
    id: 'final-idp',
    title: 'Final IDP & Maintenance Roadmap',
    description: 'Produce final IDP with sustained practices, maintenance modules, follow-up schedule',
    phase: 'post',
    artifacts: ['Final IDP', 'Maintenance roadmap'],
    owner: 'Program Manager',
    source: 'COMPREHENSIVE_EDUCATIONAL_MODEL_PATENT_DRAFT.pdf',
    sourceExcerpt: 'Produce final IDP with sustained practices, maintenance modules, follow-up reassessment schedule (e.g., 6/12 months).',
  },
  {
    id: 'career-guidance',
    title: 'Career Guidance & Recommendations',
    description: 'Link quotient profiles to career paths, training, and referral options',
    phase: 'post',
    artifacts: ['Career guidance report', 'Training recommendations'],
    owner: 'Career Counselor',
    source: 'Career_Map_Guidance_Framework.pdf',
    sourceExcerpt: 'After completing the traditional Pre → Intervention → Post flow, offer/propose the Career Guidance Framework linking quotient profiles to career paths.',
  },
  {
    id: 'knowledge-base-update',
    title: 'Knowledge Base & Closed-Loop Update',
    description: 'Capture feedback, update module priors and DWA parameters from aggregated outcomes',
    phase: 'post',
    artifacts: ['Updated knowledge base', 'Parameter adjustments'],
    owner: 'System',
    source: 'COMPREHENSIVE_EDUCATIONAL_MODEL_PATENT_DRAFT.pdf',
    sourceExcerpt: 'Capture feedback, update module priors and DWA parameters from aggregated outcomes (closed-loop learning).',
  },

  // CORPORATE PATH
  {
    id: 'corporate-intake',
    title: 'Corporate Client Intake',
    description: 'Custom intake for corporate/group clients with bespoke requirements',
    phase: 'corporate',
    artifacts: ['Client specification document'],
    owner: 'Account Manager',
    source: 'COMPREHENSIVE_EDUCATIONAL_MODEL_PATENT_DRAFT.pdf',
    sourceExcerpt: 'If a corporation or group requests a customized version, implement a single-part professional offering (no pre/post structure required).',
  },
  {
    id: 'custom-assessment',
    title: 'Custom Professional Assessment',
    description: 'Deliver targeted professional assessments with bespoke instruments',
    phase: 'corporate',
    artifacts: ['Custom assessment report'],
    owner: 'Assessment Team',
    source: 'COMPREHENSIVE_EDUCATIONAL_MODEL_PATENT_DRAFT.pdf',
    sourceExcerpt: 'Deliver targeted professional assessments, bespoke modules, consulting, and ongoing service packages per client need.',
  },
  {
    id: 'bespoke-modules',
    title: 'Bespoke Module Delivery',
    description: 'Custom modules with client-specific KPIs and SLA-based delivery',
    phase: 'corporate',
    artifacts: ['Custom modules', 'SLA documentation'],
    owner: 'Facilitators',
    source: 'COMPREHENSIVE_EDUCATIONAL_MODEL_PATENT_DRAFT.pdf',
    sourceExcerpt: 'This corporate track is flexible: custom instruments, bespoke KPIs, SLA-based delivery, and optional periodic benchmarking.',
  },
];

// Edges connecting nodes
export const edges: Edge[] = [
  // Pre-intervention flow
  { from: 'intake', to: 'prepare-assessment' },
  { from: 'prepare-assessment', to: 'baseline-collection' },
  { from: 'baseline-collection', to: 'standardize-score' },
  { from: 'standardize-score', to: 'profile-construction' },
  { from: 'profile-construction', to: 'dwa' },
  { from: 'dwa', to: 'banding' },

  // Pre to Intervention
  { from: 'banding', to: 'scheduling' },

  // Intervention flow
  { from: 'scheduling', to: 'module-deployment' },
  { from: 'module-deployment', to: 'session-capture' },
  { from: 'session-capture', to: 'pee' },
  { from: 'pee', to: 'dei-practice', condition: 'EQ modules' },
  { from: 'pee', to: 'module-effectiveness' },
  { from: 'pee', to: 'module-deployment', label: 'Adaptive Loop', condition: 'Progress check' },
  { from: 'dei-practice', to: 'module-effectiveness' },

  // Intervention to Post
  { from: 'module-effectiveness', to: 'reassessment' },

  // Post-intervention flow
  { from: 'reassessment', to: 'compute-outcomes' },
  { from: 'compute-outcomes', to: 'effectiveness-synthesis' },
  { from: 'effectiveness-synthesis', to: 'final-idp' },
  { from: 'final-idp', to: 'career-guidance' },
  { from: 'career-guidance', to: 'knowledge-base-update' },

  // Corporate alternative path
  { from: 'corporate-intake', to: 'custom-assessment' },
  { from: 'custom-assessment', to: 'bespoke-modules' },
];

// Intervention modules per quotient and band
export const interventionModules: Module[] = [
  // IQ RED
  {
    id: 'iq-red-1',
    name: 'Foundational Literacy Development',
    description: 'Picture-based flashcards for vocabulary, phonics exercises, and storytelling for comprehension',
    frequency: 'Daily (30-40 minutes)',
    activities: ['Flashcard exercises', 'Phonics practice', 'Story comprehension Q&A'],
    band: 'red',
    quotient: 'IQ',
    source: 'IQ_final_module.docx',
  },
  {
    id: 'iq-yellow-1',
    name: 'Critical Thinking Development',
    description: 'Logical reasoning exercises, pattern recognition, and analytical problem-solving',
    frequency: 'Twice weekly (45 minutes)',
    activities: ['Logic puzzles', 'Pattern analysis', 'Analytical exercises'],
    band: 'yellow',
    quotient: 'IQ',
    source: 'IQ_final_module.docx',
  },
  {
    id: 'iq-green-1',
    name: 'Advanced Cognitive Enhancement',
    description: 'Complex problem-solving, creative thinking, and metacognition development',
    frequency: 'Weekly (60 minutes)',
    activities: ['Complex problems', 'Creative challenges', 'Self-reflection'],
    band: 'green',
    quotient: 'IQ',
    source: 'IQ_final_module.docx',
  },
  // EQ modules
  {
    id: 'eq-red-1',
    name: 'One-on-One Counselling',
    description: 'Individual sessions with psychologists using storytelling, visuals, and positive reinforcement',
    frequency: 'Weekly (20-30 minutes)',
    activities: ['Puppet-based storytelling', 'Rapport building', 'CBT implementation'],
    band: 'red',
    quotient: 'EQ',
    source: 'EQ_final_module.docx',
  },
  {
    id: 'eq-red-2',
    name: 'Emotion Recognition Therapy',
    description: 'Use emotion cards to identify and express feelings through group exercises',
    frequency: 'Twice weekly (30 minutes)',
    activities: ['Emotion card exercises', 'Scenario matching', 'Response practice'],
    band: 'red',
    quotient: 'EQ',
    source: 'EQ_final_module.docx',
  },
  {
    id: 'eq-yellow-1',
    name: 'Emotional Regulation & Self-Esteem Building',
    description: 'Role-playing scenarios for managing emotions and expressing feelings',
    frequency: 'Weekly (40 minutes)',
    activities: ['Role-play exercises', 'CBT practice', 'Empathy training'],
    band: 'yellow',
    quotient: 'EQ',
    source: 'EQ_final_module.docx',
  },
  {
    id: 'eq-green-1',
    name: 'Mindfulness & Peer Counselling',
    description: 'Advanced emotional intelligence through mindfulness and helping others',
    frequency: 'Weekly (30 minutes)',
    activities: ['Mindfulness practice', 'Peer mentoring', 'Emotional journaling'],
    band: 'green',
    quotient: 'EQ',
    source: 'EQ_final_module.docx',
  },
  // SQ modules
  {
    id: 'sq-red-1',
    name: 'Social Interaction Basics',
    description: 'Role-play scenarios for greetings, sharing, and active listening',
    frequency: 'Twice weekly (30 minutes)',
    activities: ['Greeting practice', 'Turn-taking games', 'Active listening'],
    band: 'red',
    quotient: 'SQ',
    source: 'SQ_final_module.docx',
  },
  {
    id: 'sq-yellow-1',
    name: 'Group Discussions & Interaction',
    description: 'Structured group discussions on topics to encourage speaking and listening',
    frequency: 'Weekly (40 minutes)',
    activities: ['Topic discussions', 'Sharing hobbies', 'Peer feedback'],
    band: 'yellow',
    quotient: 'SQ',
    source: 'SQ_final_module.docx',
  },
  {
    id: 'sq-green-1',
    name: 'Leadership & Peer Mentorship',
    description: 'Assign students to mentor peers in activities or lead group tasks',
    frequency: 'Bi-weekly (20 minutes)',
    activities: ['Leading activities', 'Peer mentoring', 'Self-evaluation'],
    band: 'green',
    quotient: 'SQ',
    source: 'SQ_final_module.docx',
  },
  // AQ modules
  {
    id: 'aq-red-1',
    name: 'Story-Based Therapy',
    description: 'Narrate relatable stories about overcoming fears and challenges',
    frequency: 'Weekly (30-40 minutes)',
    activities: ['Story sessions', 'Character discussion', 'Personal examples'],
    band: 'red',
    quotient: 'AQ',
    source: 'AQ_final_module.docx',
  },
  {
    id: 'aq-yellow-1',
    name: 'Responsibility Tasks',
    description: 'Assign small responsibilities like organizing materials or caring for plants',
    frequency: 'Twice monthly (15 minutes)',
    activities: ['Task assignments', 'Progress tracking', 'Reflection'],
    band: 'yellow',
    quotient: 'AQ',
    source: 'AQ_final_module.docx',
  },
  {
    id: 'aq-green-1',
    name: 'Time Management & Goal Setting',
    description: 'Develop planning skills, set personal goals, and track progress',
    frequency: 'Weekly (30 minutes)',
    activities: ['Goal setting', 'Time planning', 'Progress review'],
    band: 'green',
    quotient: 'AQ',
    source: 'AQ_final_module.docx',
  },
];

// Grading scale
export const gradingScale = [
  { grade: 'A', range: '90-100%', description: 'Exceptional - Demonstrates mastery and excellence' },
  { grade: 'B', range: '75-89%', description: 'Proficient - Shows strong competency' },
  { grade: 'C', range: '60-74%', description: 'Developing - Adequate with room for growth' },
  { grade: 'D', range: '40-59%', description: 'Emerging - Needs targeted support' },
  { grade: 'E', range: '0-39%', description: 'Beginning - Requires intensive intervention' },
];

// Technical highlights for legal review
export const technicalHighlights = {
  uniqueIQMeasurement: {
    title: 'Unique IQ Measurement Model',
    points: [
      'Four-parameter model: Verbal, Quantitative, Psychometric, Performance IQ',
      'Equal weighting (25 marks each) for balanced assessment',
      'Integration of standardized tests with performance-based tasks',
      'Age and culture-adjusted scoring algorithms',
    ],
    source: 'Standardized_Grading_Mechanism_for_QIDS.pdf',
  },
  standardizationAlgorithm: {
    title: 'Standardization Algorithm',
    formula: 'Standardized Score (%) = (Raw Score / Maximum Possible Score) × 100',
    details: [
      'Unified 0-100% scale across all quotients',
      'Conversion factors: IQ=1.0, EQ=2.0, SQ=2.0, AQ=1.28',
      'Sub-component weighted aggregation formula',
      'Enables cross-quotient comparison and visualization',
    ],
    source: 'Standardized_Grading_Mechanism_for_QIDS.pdf',
  },
  dynamicWeightage: {
    title: 'Dynamic Weightage Algorithm (DWA)',
    description: 'Context-sensitive weight computation based on role, culture, and mission parameters',
    pseudocode: `Weights = DynamicWeightageAlgorithm(RoleContext, CulturalFlags)
PriorityScores = BaselineScores * Weights
For each Subcomponent:
  if PriorityScore < RED_THRESHOLD → Band = RED
  elif RED_THRESHOLD ≤ PriorityScore < GREEN_THRESHOLD → Band = YELLOW
  else → Band = GREEN`,
    source: 'COMPREHENSIVE_EDUCATIONAL_MODEL_PATENT_DRAFT.pdf',
  },
  deiFramework: {
    title: 'Dynamic Emotional Integration (DEI)',
    points: [
      'Real-time task difficulty adjustments based on behavioral responses',
      'Continuous emotional adaptability assessment',
      'Hybrid digital-physical simulation support',
      'Operational with facilitator input (sensors optional)',
    ],
    source: 'COMPREHENSIVE_EDUCATIONAL_MODEL_PATENT_DRAFT.pdf',
  },
  integratedAssessment: {
    title: 'Integrated Assessment',
    points: [
      'Multi-method assessment capturing interactions between domains',
      'Holistic view of individual capabilities and development needs',
      'Triangulation of psychometric, behavioral, and performance data',
      'Cross-domain synergy analysis for comprehensive profiling',
    ],
    source: 'Complete_Evaluation_Framework.pdf',
  },
  resilienceDynamics: {
    title: 'Resilience Dynamics (RD) Framework',
    description: 'A revolutionary approach to understanding and developing adversity quotient as a dynamic system of interconnected capabilities.',
    components: [
      {
        name: 'Situational Agility (SA)',
        subComponents: ['Adaptive Problem-Solving', 'Cognitive Flexibility', 'Emotional Anchoring'],
        weight: 1.5,
      },
      {
        name: 'Proactive Momentum (PM)',
        subComponents: ['Anticipatory Readiness', 'Initiative Amplifier', 'Momentum Maintenance'],
        weight: 1.0,
      },
      {
        name: 'Relational Resilience (RR)',
        subComponents: ['Network Leverage', 'Boundary Navigation', 'Empathic Advocacy'],
        weight: 1.0,
      },
      {
        name: 'Regenerative Capacity (RC)',
        subComponents: ['Energy Restoration', 'Growth Integration', 'Future-Proofing'],
        weight: 1.5,
      },
    ],
    formula: 'RD Score = (SA × 1.5) + (PM × 1.0) + (RR × 1.0) + (RC × 1.5)',
    benchmarks: [
      { range: '130–144', level: 'Resilience Architect', insight: 'Leverage strengths to mentor others' },
      { range: '100–129', level: 'Dynamic Adaptor', insight: 'Focus on weaker sub-components' },
      { range: '72–99', level: 'Emerging Resilient', insight: 'Prioritize high-weight areas (SA/RC)' },
      { range: 'Below 72', level: 'Reactive Responder', insight: 'Develop foundational skills' },
    ],
    source: 'Resilience_Dynamics_RD_Framework.pdf',
  },
  careerGuidance: {
    title: 'Career Guidance Framework',
    points: [
      'Quotient-to-career path mapping',
      'Strength-based career recommendations',
      'Improvement strategies per quotient',
      'Agility and adaptability matching (ARP scores)',
    ],
    source: 'Career_Map_Guidance_Framework.pdf',
  },
};
