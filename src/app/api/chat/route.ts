import { NextResponse } from "next/server";
import { MockVectorDatabase, portfolioKnowledge } from "../../../lib/knowledgeBase";
import { getCachedRepositories, getRepositoriesAsDocuments } from "../../../lib/githubSync";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();
    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { ok: false, reply: "I didn't catch that. Could you say it again?" },
        { status: 400 }
      );
    }

    const query = message.trim().toLowerCase();

    // 1. Load data from cached GitHub repos and static portfolio knowledge
    const githubRepos = getCachedRepositories();
    const githubDocs = getRepositoriesAsDocuments(githubRepos);
    
    // 2. Initialize and index search database
    const db = new MockVectorDatabase();
    await db.addDocuments(portfolioKnowledge);
    await db.addDocuments(githubDocs);

    // 3. Search database
    const searchResults = await db.search(query, 2);

    // Add simulated latency for realistic "thinking"
    const delay = Math.floor(Math.random() * 800) + 600; // 600ms to 1400ms
    await new Promise(resolve => setTimeout(resolve, delay));

    // 4. Construct response based on matched intent or search results
    let reply = "";

    // Advanced Regex Intent Matching
    if (/\b(hello|hi|hey|greetings|hola)\b/.test(query)) {
      reply = "Hey there! 👋 I'm Nandini's AI Twin. I can tell you about her **SDR role @ algoacquisition**, **Work2Hire leadership**, **projects**, **communities**, **open-source work**, and **certifications**. What would you like to explore?";
    } else if (/\b(algoacquisition|sdr|sales|outbound|b2b|buying signals)\b/.test(query)) {
      reply = "At **algoacquisition**, I work as a Sales Development Representative! 🚀\n\nWe build AI systems that agentically scrape the live web for buying signals (active hiring, expansion, budget movement), map decision makers, and launch hyper-personalized outreach across LinkedIn and email generating 3-4x higher response rates.";
    } else if (/\b(work2hire|ambassador|program manager)\b/.test(query)) {
      reply = "As **Campus Ambassador Program Manager Lead @ Work2Hire**, I lead ambassador recruitment, community engagement, and university outreach loops to empower student tech communities!";
    } else if (/\b(certifi(cate|cation|cations)|angular|genai|open source connect)\b/.test(query)) {
      reply = "Here are my latest certifications! 📜\n\n* **Open Source Connect Global 2026** (Participant Certificate)\n* **Beyond the Browser: Angular Meets Generative AI**\n* **Office Automation** (Pre-Assessment Hackathon Certificate)";
    } else if (/\b(autobotx)\b/.test(query)) {
      reply = "**AutoBotX** is one of my favorite projects! 🤖\n\nIt's an IoT system that won **2nd place in a national hackathon**, blending hardware sensory loops with a Python orchestration server. Check out the code on my GitHub!";
    } else if (/\b(autoalign)\b/.test(query)) {
      reply = "**AutoAlign** is a visual layout calculation utility that received special recognition on **Commudle**!";
    } else if (/\b(project|projects|built|work|portfolio)\b/.test(query)) {
      reply = "I've built several exciting projects! Highlights include:\n\n* **AutoBotX**: IoT national hackathon 2nd place winner.\n* **AutoAlign**: Commudle recognized layout utility.\n* **Agentic Signal Scanner**: Outbound B2B buying signal simulator.\n\nCheck out my recent code on GitHub!";
    } else if (/\b(community|communities|founded|ignou|cdn)\b/.test(query)) {
      reply = "Community building is my passion! 🌍\n\n* Founded & lead **CDN IGNOU** (workshops & hackathons via Commudle).\n* Lead Campus Ambassador Manager @ **Work2Hire**.\n* Host & Management Lead @ **Open Source Connect**.";
    } else if (/\b(open(-|\s)?source|contribut(e|ion|or)|ssoc|gssoc|apertre)\b/.test(query)) {
      reply = "I love open source! 🌟\n\n* **Project Admin** for Social Summer of Code ('26 SSOC) & GSSOC.\n* Recognized as a **Top 25 Contributor in Apertre 3.0**!\n* Contributed to Nexus Spring of Code and GSSoC JEC Jabalpur.";
    } else if (/\b(resume|cv|experience|background)\b/.test(query)) {
      reply = "Sure thing! 📄\n\nYou can view or download my resume directly here: [**Nandini's Resume**](/assets/Nandini.pdf).\n\nLet me know if you have specific questions about my experience at algoacquisition, Work2Hire, or CDN IGNOU!";
    } else if (/\b(contact|reach|youtube|social|linkedin|github|twitter|x|email)\b/.test(query)) {
      reply = "Let's connect! 🤝\n\n* Email: `nandunandinigoyal@gmail.com`\n* YouTube: [**Self Taught Bob**](https://youtube.com/@self_taught_bob)\n* LinkedIn: [**Nandini Goyal**](https://linkedin.com/in/nandinigoyaldev)\n* GitHub: [**nandinigoyaldev**](https://github.com/nandinigoyaldev)\n\nI'm always open to discussing new opportunities!";
    } else if (/\b(nandini|who are you|tell me about)\b/.test(query)) {
      reply = "I'm **Nandini Goyal**! 👩‍💻\n\n* SDR @ algoacquisition (AI Outbound Systems)\n* Campus Ambassador Lead @ Work2Hire\n* Founder @ CDN IGNOU & Project Admin @ SSOC '26\n* Creator @ Self Taught Bob (YouTube)\n* BCA student @ IGNOU & MDCE graduate @ IICS!";
    } else if (searchResults.length > 0) {
      const primaryDoc = searchResults[0];
      if (primaryDoc.metadata.source === "github") {
        const repo = githubRepos.find(r => primaryDoc.id.includes(r.name.toLowerCase()));
        if (repo) {
          reply = `From my GitHub data: **${repo.name}** is a ${repo.language} repository. ${repo.description || "It's an active project in my stack."} It has ${repo.stars} stars.`;
        } else {
          reply = primaryDoc.content.slice(0, 160) + "... Check this out in my GitHub repositories!";
        }
      } else {
        reply = primaryDoc.content;
      }
    } else {
      reply = "I can tell you about my **SDR role @ algoacquisition**, **Work2Hire leadership**, **projects**, **communities**, **open-source work**, and **certifications**. Ask me anything! 😊";
    }

    return NextResponse.json({ ok: true, reply }, { status: 200 });
  } catch (error: unknown) {
    console.error("Chat API error:", error as Error);
    return NextResponse.json(
      { ok: false, reply: "Sorry, I hit a slight connection glitch. Ask me again in a second!" },
      { status: 500 }
    );
  }
}
