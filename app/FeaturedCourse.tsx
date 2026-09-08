export default function FeaturedCourse() {
  const pdfUrl = "https://cv.albertomunoz.ai/DesSoft-AI-Spark.pdf";
  return (
    <article className="documentCard">
      <a className="cover" href={pdfUrl} target="_blank" rel="noreferrer" aria-label="Open Desarrollo de Software con IA para Nvidia DGX Spark">
        <img src="/covers/desarrollo-software-ia-dgx-spark.svg" alt="Cover of Desarrollo de Software con IA para Nvidia DGX Spark" />
        <span className="coverIcon">🧠</span><span className="coverType">PDF Document</span><span className="coverYear">2026</span>
      </a>
      <div className="cardBody">
        <div className="meta"><span>Artificial Intelligence</span><span>•</span><span>2026</span></div>
        <h3>Desarrollo de Software con IA para Nvidia DGX Spark — Curso Práctico Completo — Teoría y Pseudocódigo</h3>
        <p>Curso práctico de desarrollo de software con IA optimizado para NVIDIA DGX Spark, con teoría formal, ecuaciones, coding agents y ocho algoritmos en pseudocódigo.</p>
        <div className="tags"><span>NVIDIA DGX Spark</span><span>AI Software Development</span><span>Pseudocódigo</span></div>
        <div className="resourceLinks"><a className="resourceLink primary" href={pdfUrl} target="_blank" rel="noreferrer"><span>Open PDF</span><span>↗</span></a></div>
      </div>
    </article>
  );
}
