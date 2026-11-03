/** Supported accent names used to select a component's visual treatment. */
export type Accent = 'violet' | 'blue' | 'teal' | 'green' | 'amber' | 'rose'

/** A destination displayed in the primary navigation. */
export interface NavItem {
  label: string
  path: string
  icon: string
}

/** A leadership update that can appear in feeds and search results. */
export interface UpdateItem {
  id: string
  title: string
  summary: string
  type: 'CEO Update' | 'Strategy' | 'Policy' | 'Announcement'
  date: string
  duration?: string
  accent: Accent
}

/** Shared copy for the site identity and CEO-message experience. */
export const siteContent = {
  title: 'Office of the CEO',
  heroEyebrow: 'A Message from the CEO',
  visionTitle: 'Our Vision',
  visionStatement:
    'To build a more innovative, inclusive, and sustainable company that creates lasting value for our customers, our people, and the communities we serve.',
  ceoMessage: {
    title: 'Building what comes next, together',
    body: [
      'Our opportunity is bigger than any single team or initiative. It comes from the way we connect our purpose to the choices we make every day.',
      'In the year ahead, we will stay focused on customers, simplify how we work, and invest in the capabilities that help our people do their best work. Progress will require clarity, curiosity, and candid conversation across the company.',
      'Thank you for the energy and care you bring to this work. I look forward to building the next chapter with you.',
    ],
  },
}

/** Ordered navigation entries used by the desktop and mobile sidebars. */
export const navigation: NavItem[] = [
  { label: 'Home', path: '/', icon: 'home' },
  { label: 'Vision', path: '/vision', icon: 'target' },
  { label: 'Strategies', path: '/strategies', icon: 'layers' },
  { label: 'Roadmaps', path: '/roadmaps', icon: 'map' },
  { label: 'Policies & Guidance', path: '/policies', icon: 'file' },
  { label: 'Updates', path: '/updates', icon: 'megaphone' },
  { label: 'Events', path: '/events', icon: 'calendar' },
  { label: 'Ask the CEO', path: '/ask', icon: 'message' },
  { label: 'Projects', path: '/projects', icon: 'rocket' },
  { label: 'Team', path: '/team', icon: 'users' },
  { label: 'Resources', path: '/resources', icon: 'folder' },
]

/** Featured destinations displayed on the home page. */
export const homeCards = [
  {
    title: 'Vision & Principles',
    description: 'Our long-term vision, purpose, and the principles that guide us.',
    path: '/vision',
    icon: 'target',
    accent: 'violet' as Accent,
  },
  {
    title: 'Strategies',
    description: 'Our key strategic priorities and how we’ll deliver impact.',
    path: '/strategies',
    icon: 'layers',
    accent: 'blue' as Accent,
  },
  {
    title: 'Policies / Guidance',
    description: 'Company policies, standards, and practical guidance for everyone.',
    path: '/policies',
    icon: 'policy',
    accent: 'teal' as Accent,
  },
  {
    title: 'Events',
    description: 'Company-wide events, town halls, Q&As, and ways to get involved.',
    path: '/events',
    icon: 'calendar',
    accent: 'violet' as Accent,
  },
  {
    title: 'Roadmaps',
    description: 'Our plans and key milestones for major initiatives across the company.',
    path: '/roadmaps',
    icon: 'map',
    accent: 'blue' as Accent,
  },
  {
    title: 'Resources',
    description: 'Helpful tools, links, and materials to stay informed and supported.',
    path: '/resources',
    icon: 'folder',
    accent: 'green' as Accent,
  },
]

/** Leadership communications shown in the updates feed. */
export const updates: UpdateItem[] = [
  {
    id: 'progress-priorities',
    title: 'CEO Update: Progress, Priorities, and What’s Next',
    summary: 'A quarterly look at performance, priorities, and the decisions shaping the next chapter.',
    type: 'CEO Update',
    date: 'Oct 28, 2026',
    duration: '5 min',
    accent: 'violet',
  },
  {
    id: 'strategy-focus',
    title: 'Advancing Our Strategy: Five Focus Areas',
    summary: 'How our strategic pillars translate into focused work across teams.',
    type: 'Strategy',
    date: 'Oct 21, 2026',
    accent: 'blue',
  },
  {
    id: 'flexible-work',
    title: 'Policy Update: Flexible Work Guidelines',
    summary: 'Refreshed guidance designed to support effective, inclusive hybrid work.',
    type: 'Policy',
    date: 'Oct 14, 2026',
    accent: 'violet',
  },
  {
    id: 'customer-week',
    title: 'Customer Week: Sessions and Highlights',
    summary: 'A week of customer stories, working sessions, and practical learning.',
    type: 'Announcement',
    date: 'Oct 7, 2026',
    accent: 'teal',
  },
  {
    id: 'impact-report',
    title: 'Our Annual Impact Report Is Available',
    summary: 'A transparent view of our environmental, community, and people commitments.',
    type: 'Announcement',
    date: 'Sep 29, 2026',
    accent: 'green',
  },
]

/** Company principles presented on the Vision page. */
export const principles = [
  { title: 'Start with people', text: 'Understand the people we serve and design every decision around meaningful outcomes.', icon: 'heart' },
  { title: 'Make it clear', text: 'Choose focus over complexity. Explain what matters, why it matters, and what happens next.', icon: 'sparkles' },
  { title: 'Own the outcome', text: 'Act with accountability, learn quickly, and stay close to the impact of our choices.', icon: 'check' },
  { title: 'Build together', text: 'Invite different perspectives early and turn shared context into shared momentum.', icon: 'users' },
]

/** Strategic pillars that organize enterprise priorities. */
export const strategies = [
  { number: '01', title: 'Earn customer trust', text: 'Deliver simpler, more reliable experiences and use customer insight to guide investment.', accent: 'violet' as Accent },
  { number: '02', title: 'Grow with focus', text: 'Concentrate resources on the markets and capabilities where we can create distinct value.', accent: 'blue' as Accent },
  { number: '03', title: 'Modernize how we work', text: 'Reduce friction, strengthen digital foundations, and make responsible use of automation.', accent: 'teal' as Accent },
  { number: '04', title: 'Invest in our people', text: 'Build leadership depth, critical skills, and an inclusive culture where teams can thrive.', accent: 'green' as Accent },
]

/** Chronological phases of the enterprise roadmap. */
export const roadmap = [
  { period: 'Now · Q4 2026', title: 'Align and simplify', text: 'Confirm outcomes, clarify ownership, and retire work that no longer serves the strategy.', status: 'In progress' },
  { period: 'Next · H1 2027', title: 'Build the foundation', text: 'Launch priority capabilities, modernize core workflows, and establish shared measures.', status: 'Planned' },
  { period: 'Then · H2 2027', title: 'Scale what works', text: 'Expand proven programs, deepen customer adoption, and accelerate cross-company reuse.', status: 'Future' },
  { period: 'Beyond · 2028', title: 'Lead the next chapter', text: 'Turn new capabilities into durable differentiation and broader positive impact.', status: 'Horizon' },
]

/** Sample policy metadata retained for content references. */
export const policies = [
  { title: 'Flexible Work Guidelines', category: 'People', updated: 'Oct 14, 2026', summary: 'Principles and practical guidance for effective hybrid work.' },
  { title: 'Information Handling Standard', category: 'Security', updated: 'Sep 19, 2026', summary: 'How to classify, share, and protect company information.' },
  { title: 'Responsible AI Guidance', category: 'Technology', updated: 'Sep 3, 2026', summary: 'Approved use, review expectations, and responsible development practices.' },
  { title: 'Travel & Expense Policy', category: 'Finance', updated: 'Aug 22, 2026', summary: 'Clear expectations for business travel, purchasing, and reimbursement.' },
  { title: 'Inclusive Events Checklist', category: 'People', updated: 'Jul 30, 2026', summary: 'Accessibility and inclusion considerations for meetings and events.' },
  { title: 'Supplier Engagement Principles', category: 'Finance', updated: 'Jul 12, 2026', summary: 'Consistent standards for choosing and working with external suppliers.' },
]

/** Upcoming company events available to save locally. */
export const events = [
  { day: '12', month: 'NOV', title: 'Company Town Hall', time: '10:00–11:00 AM UTC', format: 'Live stream', description: 'Quarterly business update and open Q&A with the CEO and leadership team.' },
  { day: '19', month: 'NOV', title: 'Strategy in Practice', time: '3:00–3:45 PM UTC', format: 'Virtual session', description: 'A practical look at how teams are turning the strategic pillars into decisions.' },
  { day: '03', month: 'DEC', title: 'Ask Me Anything', time: '4:00–4:45 PM UTC', format: 'Hybrid', description: 'An informal conversation with company leaders, guided by employee questions.' },
]

/** Portfolio-level summaries of priority initiatives. */
export const projects = [
  { title: 'Customer Experience Reset', owner: 'Customer Council', progress: 72, status: 'On track', text: 'Simplifying the end-to-end customer journey across products and channels.' },
  { title: 'Digital Core', owner: 'Technology & Operations', progress: 48, status: 'On track', text: 'Modernizing shared platforms, data foundations, and essential workflows.' },
  { title: 'Ways of Working', owner: 'People Leadership Team', progress: 61, status: 'Learning', text: 'Removing organizational friction and building better operating rhythms.' },
  { title: 'Sustainable Growth', owner: 'Impact Council', progress: 36, status: 'On track', text: 'Embedding environmental and community outcomes into business planning.' },
]

/** Sample Office of the CEO team roster. */
export const team = [
  { initials: 'AR', name: 'Alex Rivera', role: 'Chief Executive Officer', focus: 'Company direction and culture', accent: 'violet' as Accent },
  { initials: 'MC', name: 'Morgan Chen', role: 'Chief of Staff', focus: 'Executive priorities and operating rhythm', accent: 'blue' as Accent },
  { initials: 'SJ', name: 'Samira Jones', role: 'Director, Strategic Initiatives', focus: 'Enterprise priorities and transformation', accent: 'teal' as Accent },
  { initials: 'DK', name: 'Devon Kim', role: 'Head of CEO Communications', focus: 'Company narrative and engagement', accent: 'rose' as Accent },
  { initials: 'LP', name: 'Lee Patel', role: 'Program Lead', focus: 'Leadership forums and strategic programs', accent: 'green' as Accent },
  { initials: 'TM', name: 'Taylor Morgan', role: 'Operations Partner', focus: 'Office operations and team coordination', accent: 'amber' as Accent },
]

/** Curated materials grouped by their intended audience or purpose. */
export const resources = [
  { title: 'Strategy Toolkit', category: 'Strategy', text: 'Templates for connecting team plans, measures, and tradeoffs to company priorities.', icon: 'briefcase' },
  { title: 'Leadership Updates', category: 'Communications', text: 'Presentation materials and recordings from recent company leadership forums.', icon: 'presentation' },
  { title: 'Company Facts', category: 'Company', text: 'Approved company overview, key milestones, and frequently requested facts.', icon: 'building' },
  { title: 'Brand & Messaging', category: 'Communications', text: 'Core narrative, writing guidance, and current visual identity resources.', icon: 'palette' },
  { title: 'Manager Conversation Guides', category: 'People', text: 'Ready-to-use guides for discussing company priorities with your team.', icon: 'messages' },
  { title: 'Operating Calendar', category: 'Company', text: 'Company-wide planning, reporting, event, and decision milestones.', icon: 'calendar' },
]

/** Answers that explain the prototype's question-submission experience. */
export const faqs = [
  { question: 'How are employee questions selected?', answer: 'Questions are grouped by theme and selected to represent topics that matter across the company. Repeated themes may be answered in an update or town hall.' },
  { question: 'Can I submit anonymously?', answer: 'This prototype does not transmit or retain submissions. A production version could support anonymous or attributed submissions based on company policy.' },
  { question: 'When will I receive a response?', answer: 'In a production workflow, the Office of the CEO would publish service expectations and identify whether a response will be direct or shared company-wide.' },
]

/**
 * Flattened search entries derived from navigable and editorial content.
 *
 * @remarks
 * Keeping this derived data here ensures the header search reflects the source collections.
 */
export const searchIndex = [
  ...navigation.slice(1).map((item) => ({ title: item.label, text: `Explore ${item.label.toLowerCase()} information`, path: item.path, type: 'Page' })),
  ...updates.map((item) => ({ title: item.title, text: item.summary, path: `/updates#${item.id}`, type: item.type })),
  ...policies.map((item) => ({ title: item.title, text: item.summary, path: '/policies', type: 'Policy' })),
  ...resources.map((item) => ({ title: item.title, text: item.text, path: '/resources', type: 'Resource' })),
]
