/**
 * Knowledge Base Abstractions & Content for Nandini's AI Assistant
 * Prepared for future vector database and RAG integration.
 */

export interface Document {
  id: string;
  content: string;
  metadata: {
    source: string;
    category: string;
    [key: string]: unknown;
  };
}

export interface KnowledgeSource {
  id: string;
  name: string;
  type: "static" | "github" | "resume" | "blog" | "youtube";
  load(): Promise<Document[]>;
}

export interface VectorStore {
  addDocuments(docs: Document[]): Promise<void>;
  search(query: string, limit?: number): Promise<Document[]>;
}

/**
 * Clean abstraction layer for future Vector Database integration (e.g., Pinecone, Chroma, pgvector).
 * Currently implements a high-fidelity keyword/term matching algorithm as a placeholder.
 */
export class MockVectorDatabase implements VectorStore {
  private documents: Document[] = [];

  async addDocuments(docs: Document[]): Promise<void> {
    this.documents.push(...docs);
  }

  async search(query: string, limit: number = 3): Promise<Document[]> {
    const cleanQuery = query.toLowerCase();
    const queryWords = cleanQuery.split(/[\s,?.!]+/).filter(w => w.length > 2);

    if (queryWords.length === 0) {
      return this.documents.slice(0, limit);
    }

    // Rank documents based on matches
    const scored = this.documents.map(doc => {
      const content = doc.content.toLowerCase();
      let score = 0;

      // Count term matches
      queryWords.forEach(word => {
        if (content.includes(word)) {
          score += 1;
          // Extra weight for match in title/metadata
          if (doc.metadata.category.toLowerCase().includes(word)) {
            score += 2;
          }
        }
      });

      // Special exact phrases matching
      if (cleanQuery.includes("autobotx") && content.includes("autobotx")) score += 10;
      if (cleanQuery.includes("autoalign") && content.includes("autoalign")) score += 10;
      if (cleanQuery.includes("cdn ignou") && content.includes("cdn ignou")) score += 10;
      if (cleanQuery.includes("resume") && content.includes("resume")) score += 10;
      if (cleanQuery.includes("contact") && content.includes("contact")) score += 10;
      if (cleanQuery.includes("email") && content.includes("email")) score += 10;
      if (cleanQuery.includes("github") && content.includes("github")) score += 10;

      return { doc, score };
    });

    return scored
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(item => item.doc)
      .slice(0, limit);
  }
}

// Static Portfolio Knowledge Source
export const portfolioKnowledge: Document[] = [
  {
    id: "about-me",
    content: "Nandini Goyal is a Sales Development Representative at algoacquisition building AI-powered outbound systems, Campus Ambassador Program Manager Lead at Work2Hire, Founder of CDN IGNOU, and an open-source advocate & content creator (Self Taught Bob). She is currently pursuing her Bachelor of Computer Applications (BCA) at IGNOU and holds a Master Diploma in Computer Engineering from IICS.",
    metadata: { source: "portfolio", category: "about" }
  },
  {
    id: "education-timeline",
    content: "Nandini's education timeline:\n1. Bachelor of Computer Applications (BCA), Computer Science at IGNOU (July 2024 - July 2027).\n2. Master Diploma in Computer Engineering (MDCE), Computer Software Engineering at Indian Institute of Computer Science (July 2024 - June 2027).\n3. Business/Office Automation/Technology/Data Entry diploma at IICS.\n4. Master of Computer Applications (MCA) (Targeted for 2027 via NIMCET / CUET PG).",
    metadata: { source: "portfolio", category: "education" }
  },
  {
    id: "experience-algoacquisition",
    content: "Nandini is a Sales Development Representative at algoacquisition (May 2026 - Present, London Area / Remote). She helps build AI systems that agentically scrape the live web for buying signals (active job posts, new hires, team expansion, budget movements, hiring velocity), map decision makers, and run hyper-personalized outreach across LinkedIn and email generating 3-4x response rates.",
    metadata: { source: "portfolio", category: "experience" }
  },
  {
    id: "experience-work2hire",
    content: "Nandini is the Campus Ambassador Program Manager Lead at Work2Hire (Rozgar Career Tech Pvt. Ltd.) (June 2026 - Present, Remote). She recruits, onboards, and manages Campus Ambassadors across diverse institutions, builds student communities, coordinates outreach campaigns, workshops, and webinars.",
    metadata: { source: "portfolio", category: "experience" }
  },
  {
    id: "experience-cdn-ignou",
    content: "Nandini is the Founder & Technical Lead of CDN IGNOU (Jan 2026 - Present). She founded and leads the CDN IGNOU community, organizing tech events, workshops, and hackathons using Commudle, building a collaborative learning environment for IGNOU students.",
    metadata: { source: "portfolio", category: "experience" }
  },
  {
    id: "experience-open-source",
    content: "Nandini is an Open Source Project Admin for Social Summer of Code (SSOC '26), Girlscript Summer of Code (GSSOC), and Apertre. She was recognized as a Top 25 contributor in Apertre 3.0 and has contributed to Nexus Spring of Code and GSSoC JEC Jabalpur.",
    metadata: { source: "portfolio", category: "experience" }
  },
  {
    id: "experience-mentorship",
    content: "Nandini runs 'Self Taught Bob' on YouTube (May 2026 - Present) where she works as a content creator and mentor. She shares her journey from 0, teaches students, guides devs, and provides mentorship.",
    metadata: { source: "portfolio", category: "experience" }
  },
  {
    id: "experience-leadership",
    content: "Nandini's leadership experience includes:\n- SDR at algoacquisition (AI Outbound Systems)\n- Campus Ambassador Program Manager Lead at Work2Hire\n- Founder & Lead at CDN IGNOU\n- Project Admin at SSOC '26 & GSSOC\n- Host & Management Lead at Open Source Connect (OSCG)\n- Campus Ambassador at GeeksforGeeks",
    metadata: { source: "portfolio", category: "experience" }
  },
  {
    id: "certifications",
    content: "Nandini holds certifications in:\n- Open Source Connect Global 2026 (Certificate of Participants)\n- Office Automation (Certificate of Participation in Pre-Assessment round - Open Source Hackathon)\n- Beyond the Browser: Angular Meets Generative AI",
    metadata: { source: "portfolio", category: "certifications" }
  },
  {
    id: "achievements-wins",
    content: "Nandini's top achievements include:\n- Hackathon Winner: 2nd Place in a National IoT Hackathon with AutoBotX.\n- Top 25 Contributor in Apertre 3.0.\n- Commudle Recognition for AutoAlign layout utility.\n- Organized major student hackathons and workshops.",
    metadata: { source: "portfolio", category: "achievements" }
  },
  {
    id: "tech-stack-details",
    content: "Nandini's primary tech stack and tools are:\n- AI & Systems: Agentic Web Scraping, B2B Buying Signal Automation, OpenCV, MediaPipe\n- Frontend: React, Next.js, JavaScript, TypeScript, Tailwind CSS\n- Backend: Python, Flask, Node.js, REST APIs\n- Tools & Databases: Git, GitHub, Postman, SQL (PostgreSQL), Office Automation",
    metadata: { source: "portfolio", category: "tech_stack" }
  },
  {
    id: "projects-autobotx",
    content: "AutoBotX is an award-winning IoT system built by Nandini. It won 2nd place in a National IoT Hackathon, blending hardware sensory loops with a Python orchestration server.",
    metadata: { source: "portfolio", category: "projects" }
  },
  {
    id: "contact-socials",
    content: "You can reach out to Nandini via these channels:\n- Email: nandunandinigoyal@gmail.com\n- YouTube: https://youtube.com/@self_taught_bob\n- GitHub: https://github.com/nandinigoyaldev\n- LinkedIn: https://linkedin.com/in/nandinigoyaldev\n- Resume: /assets/Nandini.pdf",
    metadata: { source: "portfolio", category: "contact" }
  }
];
