"use client";

import { useMemo, useState } from "react";
import { documents, DRIVE_FOLDER, GITHUB_REPOSITORY } from "./libraryData";
import { DRIVE_LINKS } from "./driveLinks";

const NVIDIA_PROFILE = "https://www.nvidia.com/en-us/training/instructor-directory/bio/?instructorId=0038Z00002pefRaQAI";
const LINKEDIN = "https://www.linkedin.com/in/luisalbertomunozubando/";
const SCHOLAR = "https://scholar.google.com/citations?user=3o9-OssAAAAJ&hl=en";
const TEC = "https://tec.mx/";
const EMAIL = "mailto:amunoz@tec.mx";

const categories = ["All", ...Array.from(new Set(documents.map((document) => document.category)))];

export default function Home() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const filteredDocuments = useMemo(() => {
    const normalisedQuery = query.toLowerCase().trim();
    return documents.filter((document) => {
      const matchesCategory = category === "All" || document.category === category;
      const searchable = [document.title, document.type, document.category, document.description, ...document.tags].join(" ").toLowerCase();
      return matchesCategory && searchable.includes(normalisedQuery);
    });
  }, [query, category]);

  return (
    <main>
      <section className="hero" id="top">
        <nav className="nav shell">
          <a className="brand" href="#top" aria-label="Home"><span className="brandMark">AM</span><span>Digital Library</span></a>
          <div className="navLinks"><a href="#profile">Profile</a><a href="#library">Library</a><a href="#about">About</a><a className="navButton" href={DRIVE_FOLDER} target="_blank" rel="noreferrer">Open Drive ↗</a></div>
        </nav>

        <div className="heroGrid shell">
          <div className="heroCopy">
            <div className="eyebrow">Research · Teaching · Technology</div>
            <h1>Alberto Muñoz’s<br /><span>Digital Library</span></h1>
            <p>A curated collection of research papers, teaching materials, technical reports and articles spanning robotics, artificial intelligence, computer vision and engineering.</p>
            <div className="heroActions"><a className="primaryButton" href="#library">Explore the collection ↓</a><a className="secondaryButton" href={DRIVE_FOLDER} target="_blank" rel="noreferrer">Browse all PDFs ↗</a></div>
            <div className="contactLinks">
              <a href={EMAIL}>✉ amunoz@tec.mx</a>
              <a href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn ↗</a>
              <a href={SCHOLAR} target="_blank" rel="noreferrer">Google Scholar ↗</a>
            </div>
          </div>
          <div className="portraitPanel"><img src="/profile/alberto-munoz.jpg" alt="Dr. Alberto Muñoz" /></div>
        </div>

        <div className="affiliations shell" id="profile">
          <a className="affiliationCard tec" href={TEC} target="_blank" rel="noreferrer"><img src="/profile/tec-logo.png" alt="Tecnológico de Monterrey" /></a>
          <a className="affiliationCard nvidia" href={NVIDIA_PROFILE} target="_blank" rel="noreferrer"><img src="/profile/nvidia-logo.png" alt="NVIDIA instructor profile" /><span>NVIDIA Deep Learning Institute instructor profile ↗</span></a>
          <div className="affiliationCard robotics"><img src="/profile/robotics-computing.png" alt="Robotics Computing — Complex and Intelligent Interaction Innovation Systems" /></div>
        </div>

        <div className="stats shell" aria-label="Library highlights"><div><strong>{documents.length}</strong><span>documents online</span></div><div><strong>30+</strong><span>years in research</span></div><div><strong>100+</strong><span>theses supervised</span></div></div>
      </section>

      <section id="library" className="library shell">
        <div className="sectionHeading"><div><span className="kicker">Curated knowledge</span><h2>Explore the library</h2></div><p>Search the complete collection by subject, title or keyword. Each card opens its corresponding public PDF in Google Drive.</p></div>
        <div className="toolbar"><label className="searchBox"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search publications, topics or keywords…" aria-label="Search library" /></label><div className="filters" aria-label="Filter by category">{categories.map((item) => <button key={item} className={category === item ? "active" : ""} onClick={() => setCategory(item)}>{item}</button>)}</div></div>
        <div className="resultLine"><span>{filteredDocuments.length} documents</span><span>Updated 2026</span></div>
        <div className="documentGrid">{filteredDocuments.map((document) => { const pdfUrl = DRIVE_LINKS[document.cover] ?? DRIVE_FOLDER; return <article className="documentCard" key={document.title}><a className="cover" href={pdfUrl} target="_blank" rel="noreferrer" aria-label={`Open ${document.title}`}><img src={document.cover} alt={`Cover of ${document.title}`} onError={(event) => { event.currentTarget.style.display = "none"; }} /><span className="coverIcon">{document.icon}</span><span className="coverType">{document.type}</span><span className="coverYear">{document.year}</span></a><div className="cardBody"><div className="meta"><span>{document.category}</span><span>•</span><span>{document.year}</span></div><h3>{document.title}</h3><p>{document.description}</p><div className="tags">{document.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><div className="resourceLinks"><a className="resourceLink primary" href={pdfUrl} target="_blank" rel="noreferrer"><span>Open PDF</span><span>↗</span></a><a className="resourceLink secondary" href={GITHUB_REPOSITORY} target="_blank" rel="noreferrer"><span>GitHub</span><span>↗</span></a></div></div></article>; })}</div>
        {filteredDocuments.length === 0 && <div className="emptyState"><span>🔎</span><h3>No documents found</h3><p>Try another keyword or choose a different category.</p></div>}
      </section>

      <section id="about" className="about"><div className="aboutInner shell"><div><span className="kicker">About the collection</span><h2>Knowledge made open, useful and connected.</h2></div><div><p>This library brings together work in robotics, computer vision, artificial intelligence, embedded systems and engineering education.</p><p>The collection is intended for students, researchers, educators and practitioners. Original authorship and source attribution should always be preserved.</p><div className="aboutLinks"><a href={EMAIL}>amunoz@tec.mx</a><a href={LINKEDIN} target="_blank" rel="noreferrer">LinkedIn ↗</a><a href={SCHOLAR} target="_blank" rel="noreferrer">Google Scholar ↗</a><a href={DRIVE_FOLDER} target="_blank" rel="noreferrer">Google Drive archive ↗</a></div></div></div></section>
      <footer className="footer shell"><div className="brand"><span className="brandMark">AM</span><span>Alberto Muñoz’s Digital Library</span></div><p>Research · Teaching · Technology</p><a href={GITHUB_REPOSITORY} target="_blank" rel="noreferrer">GitHub ↗</a></footer>
    </main>
  );
}
