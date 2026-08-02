"use client";

import { useMemo, useState } from "react";

const DRIVE_FOLDER = "https://drive.google.com/drive/folders/1CJEmpfH7uUlx295U3lH7txH5Cq6tJFg_?usp=sharing";
const GITHUB_REPOSITORY = "https://github.com/LuisAlbertoMunozUbando/Digital-Library";

type ResourceLink = {
  label: string;
  url: string;
  kind: "primary" | "secondary";
};

type LibraryDocument = {
  title: string;
  type: string;
  year: string;
  category: string;
  icon: string;
  description: string;
  tags: string[];
  resources: ResourceLink[];
};

const documents: LibraryDocument[] = [
  {
    title: "GPU-Accelerated Inverse Structural Anastylosis",
    type: "Research Paper",
    year: "2026",
    category: "Robotics",
    icon: "🧱",
    description: "Inverse reconstruction of block structures from collapse dynamics using GPU-accelerated rigid-body simulation.",
    tags: ["GPU", "Simulation", "Inverse Problems"],
    resources: [
      { label: "View paper", url: "https://arxiv.org/abs/2606.28394", kind: "primary" },
      { label: "GitHub", url: GITHUB_REPOSITORY, kind: "secondary" },
    ],
  },
  {
    title: "Behind Python: The Languages That Power AI",
    type: "Research Paper",
    year: "2026",
    category: "Artificial Intelligence",
    icon: "🐍",
    description: "An accessible exploration of the systems languages and software layers that support modern AI workloads.",
    tags: ["AI", "Python", "Computing"],
    resources: [
      { label: "View paper", url: "https://arxiv.org/abs/2606.18141", kind: "primary" },
      { label: "GitHub", url: GITHUB_REPOSITORY, kind: "secondary" },
    ],
  },
  {
    title: "Taming the LLM: Reliable Task Planning for Robotics",
    type: "Publication",
    year: "2026",
    category: "Robotics",
    icon: "🤖",
    description: "Reliable robotic task planning through parsing, grounding and structured interaction with large language models.",
    tags: ["LLM", "Planning", "Grounding"],
    resources: [
      { label: "View documents", url: DRIVE_FOLDER, kind: "primary" },
      { label: "GitHub", url: GITHUB_REPOSITORY, kind: "secondary" },
    ],
  },
  {
    title: "MicroClinic: Ultra-Low-Parameter Medical Image Analysis",
    type: "Conference Paper",
    year: "2026",
    category: "Computer Vision",
    icon: "🩺",
    description: "Compact neural-network methods for resource-efficient medical image analysis.",
    tags: ["Medical AI", "Vision", "Edge AI"],
    resources: [
      { label: "View documents", url: DRIVE_FOLDER, kind: "primary" },
      { label: "GitHub", url: GITHUB_REPOSITORY, kind: "secondary" },
    ],
  },
  {
    title: "Robotics, AI and Embedded Systems Teaching Materials",
    type: "Teaching Collection",
    year: "Ongoing",
    category: "Teaching",
    icon: "🎓",
    description: "Lecture notes, laboratory guides, downloadable Jupyter notebooks and project resources for robotics and artificial intelligence.",
    tags: ["Courses", "Laboratories", "Notebooks"],
    resources: [
      { label: "Open collection", url: DRIVE_FOLDER, kind: "primary" },
      { label: "GitHub", url: GITHUB_REPOSITORY, kind: "secondary" },
    ],
  },
  {
    title: "Technical Reports and Project Documents",
    type: "Technical Collection",
    year: "Ongoing",
    category: "Technical Reports",
    icon: "🛠️",
    description: "Reports documenting robotic hands, teleoperation, perception, simulation and industrial robotics projects.",
    tags: ["Projects", "Reports", "Engineering"],
    resources: [
      { label: "Open collection", url: DRIVE_FOLDER, kind: "primary" },
      { label: "GitHub", url: GITHUB_REPOSITORY, kind: "secondary" },
    ],
  },
];

const categories = ["All", ...Array.from(new Set(documents.map((document) => document.category)))];

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filteredDocuments = useMemo(() => {
    const normalisedQuery = query.toLowerCase().trim();
    return documents.filter((document) => {
      const matchesCategory = category === "All" || document.category === category;
      const searchable = [document.title, document.type, document.category, document.description, ...document.tags]
        .join(" ")
        .toLowerCase();
      return matchesCategory && searchable.includes(normalisedQuery);
    });
  }, [query, category]);

  return (
    <main>
      <section className="hero">
        <nav className="nav shell">
          <a className="brand" href="#top" aria-label="Home">
            <span className="brandMark">AM</span>
            <span>Digital Library</span>
          </a>
          <div className="navLinks">
            <a href="#library">Library</a>
            <a href="#about">About</a>
            <a className="navButton" href={DRIVE_FOLDER} target="_blank" rel="noreferrer">
              Open Drive ↗
            </a>
          </div>
        </nav>

        <div id="top" className="heroContent shell">
          <div className="eyebrow">Research · Teaching · Technology</div>
          <h1>Alberto Muñoz’s<br /><span>Digital Library</span></h1>
          <p>
            A curated collection of research papers, teaching materials, technical reports,
            notebooks and articles spanning robotics, artificial intelligence and engineering.
          </p>
          <div className="heroActions">
            <a className="primaryButton" href="#library">Explore the collection ↓</a>
            <a className="secondaryButton" href={DRIVE_FOLDER} target="_blank" rel="noreferrer">Browse all PDFs ↗</a>
          </div>
          <div className="stats" aria-label="Library highlights">
            <div><strong>30+</strong><span>years in research</span></div>
            <div><strong>200+</strong><span>articles and papers</span></div>
            <div><strong>100+</strong><span>theses supervised</span></div>
          </div>
        </div>
        <div className="orb orbOne" />
        <div className="orb orbTwo" />
      </section>

      <section id="library" className="library shell">
        <div className="sectionHeading">
          <div>
            <span className="kicker">Curated knowledge</span>
            <h2>Explore the library</h2>
          </div>
          <p>Search by subject, document type or keyword. Every card now provides direct access to its available resources.</p>
        </div>

        <div className="toolbar">
          <label className="searchBox">
            <span>⌕</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search publications, topics or keywords…"
              aria-label="Search library"
            />
          </label>
          <div className="filters" aria-label="Filter by category">
            {categories.map((item) => (
              <button
                key={item}
                className={category === item ? "active" : ""}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="resultLine">
          <span>{filteredDocuments.length} collections</span>
          <span>Updated 2026</span>
        </div>

        <div className="documentGrid">
          {filteredDocuments.map((document) => (
            <article className="documentCard" key={document.title}>
              <div className="cover">
                <span className="coverIcon">{document.icon}</span>
                <span className="coverType">{document.type}</span>
                <span className="coverYear">{document.year}</span>
              </div>
              <div className="cardBody">
                <div className="meta"><span>{document.category}</span><span>•</span><span>{document.year}</span></div>
                <h3>{document.title}</h3>
                <p>{document.description}</p>
                <div className="tags">
                  {document.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <div className="resourceLinks">
                  {document.resources.map((resource) => (
                    <a
                      key={`${document.title}-${resource.label}`}
                      className={`resourceLink ${resource.kind}`}
                      href={resource.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span>{resource.label}</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredDocuments.length === 0 && (
          <div className="emptyState">
            <span>🔎</span>
            <h3>No documents found</h3>
            <p>Try another keyword or choose a different category.</p>
          </div>
        )}
      </section>

      <section id="about" className="about">
        <div className="aboutInner shell">
          <div>
            <span className="kicker light">About the collection</span>
            <h2>Knowledge made open, useful and connected.</h2>
          </div>
          <div>
            <p>
              This library brings together decades of work in robotics, computer vision,
              artificial intelligence, embedded systems and engineering education.
            </p>
            <p>
              The collection is intended for students, researchers, educators and practitioners.
              Original authorship and source attribution should always be preserved when materials are reused.
            </p>
            <a href={DRIVE_FOLDER} target="_blank" rel="noreferrer">Visit the complete Google Drive archive ↗</a>
          </div>
        </div>
      </section>

      <footer className="footer shell">
        <div className="brand"><span className="brandMark">AM</span><span>Alberto Muñoz’s Digital Library</span></div>
        <p>Research · Teaching · Technology</p>
        <a href={GITHUB_REPOSITORY} target="_blank" rel="noreferrer">GitHub ↗</a>
      </footer>
    </main>
  );
}
