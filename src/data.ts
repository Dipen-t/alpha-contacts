export const stages = ["Lead", "Prospect", "Qualified", "Customer"] as const;
export type Stage = (typeof stages)[number];
export interface Contact {
  id: string;
  name: string;
  email: string;
  company: string;
  role: string;
  owner: string;
  labels: string[];
  stage: Stage;
  notes: string;
}
export const initialContacts: Contact[] = [
  {
    id: "c1",
    name: "Olivia Rhye",
    email: "olivia@layers.example",
    company: "Layers",
    role: "Head of Marketing",
    owner: "Dipen",
    labels: ["SaaS", "Priority"],
    stage: "Qualified",
    notes:
      "Interested in a more connected workflow for the growth team. Follow up with a short product walkthrough.",
  },
  {
    id: "c2",
    name: "Phoenix Baker",
    email: "phoenix@sisyphus.example",
    company: "Sisyphus",
    role: "Founder",
    owner: "Ananya",
    labels: ["Startup"],
    stage: "Lead",
    notes:
      "Met at the Bengaluru founders meetup. Building a small outbound team.",
  },
  {
    id: "c3",
    name: "Lana Steiner",
    email: "lana@catalog.example",
    company: "Catalog",
    role: "Growth Lead",
    owner: "Dipen",
    labels: ["SaaS"],
    stage: "Prospect",
    notes: "Looking for one place to manage contacts and conversations.",
  },
  {
    id: "c4",
    name: "Demi Wilkinson",
    email: "demi@circooles.example",
    company: "Circooles",
    role: "Revenue Operations",
    owner: "Rohan",
    labels: ["Partner"],
    stage: "Qualified",
    notes: "Reviewing the workflow with their sales team next week.",
  },
  {
    id: "c5",
    name: "Drew Cano",
    email: "drew@hourglass.example",
    company: "Hourglass",
    role: "Co-founder",
    owner: "Ananya",
    labels: ["Startup", "Priority"],
    stage: "Prospect",
    notes: "",
  },
  {
    id: "c6",
    name: "Natali Craig",
    email: "natali@command.example",
    company: "Command",
    role: "Sales Director",
    owner: "Dipen",
    labels: ["SaaS"],
    stage: "Lead",
    notes: "Introduced by Olivia. Reach out with a relevant use case.",
  },
  {
    id: "c7",
    name: "Orlando Diggs",
    email: "orlando@quotient.example",
    company: "Quotient",
    role: "",
    owner: "Rohan",
    labels: [],
    stage: "Prospect",
    notes: "",
  },
  {
    id: "c8",
    name: "Andi Lane",
    email: "",
    company: "",
    role: "Independent consultant",
    owner: "",
    labels: ["Partner"],
    stage: "Lead",
    notes:
      "Exploring a potential referral partnership. Contact details to follow.",
  },
  {
    id: "c9",
    name: "Kate Morrison",
    email: "kate@goodwell.example",
    company: "Goodwell",
    role: "VP of Growth",
    owner: "Ananya",
    labels: ["Priority"],
    stage: "Qualified",
    notes:
      "Needs visibility across a distributed team. Share the board view during the demo.",
  },
  {
    id: "c10",
    name: "Aarav Shah",
    email: "aarav@lightbox.example",
    company: "Lightbox",
    role: "Marketing Lead",
    owner: "Dipen",
    labels: ["Startup"],
    stage: "Lead",
    notes: "",
  },
];
