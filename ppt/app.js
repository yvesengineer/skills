const slides = [
  {
    chapter: "Abertura",
    title: "SDD na prática: da Design Doc à implementação com agentes",
    subtitle: "Spec primeiro. Contexto certo. Execução previsível.",
    bullets: [
      "Spec primeiro, código depois",
      "Design Doc como fonte de verdade",
      "Issues como unidades executáveis",
      "Agentes implementando com contexto controlado",
    ],
    punch: "Engenharia bem estruturada aumenta a qualidade da execução com IA.",
    theme: "orange cover",
    image: "slide-01-sdd-title.png",
    notes: [
      "Abra com a tese central: nosso SDD não nasce de prompt solto; nasce de uma Design Doc rica, evolui em issues e é implementado com agentes via context engineering.",
      "O objetivo não é defender que IA faz tudo. O objetivo é mostrar como engenharia bem estruturada aumenta muito a qualidade da execução com IA.",
      "Tom: executivo + técnico.",
    ],
  },
  {
    chapter: "Dor",
    title: "O problema não é usar IA. É usar IA sem estrutura.",
    subtitle: "Quando a equipe pula descoberta, definição e aceite, o modelo só acelera a confusão.",
    bullets: [
      "Pedir código sem contexto de negócio",
      "Fazer pedidos genéricos como “refatora isso”",
      "Tentar resolver tudo em um prompt gigante",
      "Aceitar código gerado sem revisão",
      "Usar termos vagos como “otimiza” sem critério claro",
    ],
    punch: "IA sem estrutura acelera o erro.",
    theme: "dark",
    image: "slide-02-problema-sem-estrutura.png",
    notes: [
      "Crie a dor: o problema não é o modelo em si, mas a tentativa de pular descoberta, definição, restrições e critérios de aceite.",
      "Faça a ponte para a tese: é exatamente por isso que SDD importa.",
    ],
  },
  {
    chapter: "Definição",
    title: "O que é SDD no nosso contexto",
    subtitle: "Tratar especificação como o principal insumo da implementação.",
    bullets: [
      "Especificação como centro do fluxo",
      "Primeiro definir o que construir",
      "Depois refinar em etapas",
      "Só então implementar com agente",
      "Menos prompt ad hoc, mais contexto estruturado",
    ],
    punch: "A implementação não começa do zero. Ela começa da spec.",
    theme: "paper",
    image: "slide-03-o-que-e-sdd.png",
    notes: [
      "Explique SDD de forma simples, sem definição acadêmica longa.",
      "No nosso contexto, SDD significa intenção clara, decomposição clara e execução rastreável.",
    ],
  },
  {
    chapter: "Fluxo",
    title: "A receita que já funciona hoje no nosso time",
    subtitle: "Design Doc → fases → issues → refinamento → implementação.",
    bullets: [
      "Tech Lead + Product Manager criam a Design Doc",
      "A doc mistura negócio e tecnologia",
      "A doc define fases e escopo",
      "Cada fase vira uma ou mais GitHub Issues",
      "Os devs refinam o contexto nas issues",
      "O agente implementa com base nesse material",
    ],
    punch: "O agente entra no fim da cadeia, não no começo.",
    theme: "blue",
    image: "slide-04-fluxo-atual.png",
    notes: [
      "Mostre que isso não é teoria; é um processo usado e validado no dia a dia.",
      "Reforce que o agente não decide sozinho o produto. Ele executa uma intenção já estruturada.",
    ],
  },
  {
    chapter: "Spec viva",
    title: "A Design Doc é a nossa spec viva",
    subtitle: "Mais que documento técnico: uma camada viva de intenção, arquitetura e decisão.",
    bullets: [
      "Centraliza objetivo de negócio",
      "Explica contexto funcional e técnico",
      "Registra decisões e trade-offs",
      "Define fases e limites de escopo",
      "Reduz ambiguidade antes da execução",
    ],
    punch: "Nossa Design Doc já funciona como a camada principal de especificação.",
    theme: "paper",
    image: "slide-05-design-doc-spec-viva.png",
    notes: [
      "Reposicione Tech Design Doc como algo mais forte: não só documento técnico, mas uma spec viva.",
      "Ela concentra problema, intenção, regras, arquitetura, restrições e decomposição inicial.",
    ],
  },
  {
    chapter: "Contexto",
    title: "O codebase é contexto",
    subtitle: "O repositório também precisa comunicar intenção para humanos e agentes.",
    bullets: [
      "Estrutura do repositório influencia a qualidade da IA",
      "Pastas por domínio ou bounded context ajudam muito",
      "Convenções reduzem ambiguidade",
      "Estruturas genéricas atrapalham entendimento",
      "Código duplicado espalhado aumenta ruído",
    ],
    punch: "Se a estrutura do código não comunica intenção, a IA adivinha.",
    theme: "dark",
    image: "slide-06-codebase-contexto.png",
    notes: [
      "Mostre que não basta ter uma boa doc. O repositório também precisa conversar bem com humanos e agentes.",
      "Conecte levemente com arquitetura e DDD: organização por domínio, nomes consistentes e menos misc/common genérico.",
    ],
  },
  {
    chapter: "Execução",
    title: "Issue não é lembrete. É unidade executável da spec.",
    subtitle: "É o ponto em que intenção vira trabalho acionável.",
    bullets: [
      "Cada issue deve apontar para a seção da doc",
      "Precisa ter objetivo claro",
      "Deve conter contexto de negócio e restrições",
      "Precisa ter escopo fechado",
      "Deve trazer critérios de aceite e evidências esperadas",
    ],
    punch: "Issue boa é spec recortada para execução.",
    theme: "orange",
    image: "slide-07-issues-spec-executavel.png",
    notes: [
      "A issue é decisiva na narrativa: é onde a spec vira trabalho executável.",
      "Uma issue boa para agente precisa ter source of truth, objetivo, restrições, aceitação e possível área impactada.",
      "Exemplo verbal curto: implementar regra de retry de pagamento conforme seção X da doc.",
    ],
  },
  {
    chapter: "Exemplo seguro",
    title: "Exemplo: recorte de Design Doc",
    subtitle: "Um trecho fictício de pagamentos mostra como a spec já nasce executável.",
    bullets: [
      "Regra de retry definida antes do código",
      "Idempotência como restrição explícita",
      "Critérios de sucesso mensuráveis",
      "Fora de escopo declarado para evitar expansão",
    ],
    punch: "A doc boa reduz a superfície de interpretação.",
    theme: "paper",
    customVisual: "doc",
    notes: [
      "Deixe claro que o exemplo é fictício e seguro, sem representar regra interna real.",
      "Mostre como um recorte pequeno já orienta o agente: objetivo, regra, restrição e fora de escopo.",
    ],
  },
  {
    chapter: "Exemplo seguro",
    title: "Exemplo: issue pronta para agente",
    subtitle: "A issue recorta a spec em uma unidade pequena, testável e rastreável.",
    bullets: [
      "Link para a seção da Design Doc",
      "Objetivo em uma frase",
      "Área provável de impacto",
      "Aceite com evidências objetivas",
    ],
    punch: "A issue deve dizer ao agente onde pesquisar e como provar que terminou.",
    theme: "blue",
    customVisual: "issue",
    notes: [
      "Mostre a diferença entre uma issue vaga e uma issue pronta para agente.",
      "O ponto central é rastreabilidade: doc, issue, implementação, testes e PR conversam entre si.",
    ],
  },
  {
    chapter: "Operação",
    title: "Context engineering é a camada operacional do SDD",
    subtitle: "SDD define o método. Context engineering define como o agente executa.",
    bullets: [
      "SDD define o método",
      "Context engineering define como o agente executa",
      "O foco é carregar contexto relevante",
      "Menos ruído, mais precisão",
      "Melhor execução com menor custo cognitivo",
    ],
    punch: "Context engineering é o sistema operacional do SDD com agentes.",
    theme: "dark",
    image: "slide-08-context-engineering.png",
    notes: [
      "Corrija a confusão comum: SDD não compete com context engineering.",
      "O problema não é ter contexto; é ter contexto irrelevante, excessivo ou mal organizado.",
    ],
  },
  {
    chapter: "Ferramentas",
    title: "Skills, AGENTS.md e MCP: como o agente encontra o contexto certo",
    subtitle: "As ferramentas tornam a intenção acessível e a execução mais previsível.",
    bullets: [
      "AGENTS.md define regras e convenções do projeto",
      "Skills encapsulam tarefas recorrentes",
      "MCP conecta o agente ao repositório e backlog",
      "Tudo deve orbitar a Design Doc, o repo e as issues",
      "O objetivo é previsibilidade operacional",
    ],
    punch: "O agente só é previsível quando o contexto é previsível.",
    theme: "paper",
    image: "slide-09-skills-agents-mcp.png",
    notes: [
      "Explique cada peça: AGENTS.md são instruções persistentes, skills são capacidades empacotadas, MCP é ponte com fontes reais do projeto.",
      "O framing ideal: Design Doc centraliza intenção, repositório fornece contexto estrutural e issues trazem o recorte executável.",
    ],
  },
  {
    chapter: "Precisão",
    title: "Progressive disclosure: carregar apenas o necessário",
    subtitle: "Mais contexto não é melhor. Melhor é contexto relevante.",
    bullets: [
      "Contexto global mínimo",
      "Contexto local por domínio ou feature",
      "Regras específicas sob demanda",
      "Skills ativadas apenas quando úteis",
      "Implementação começa depois da pesquisa certa",
    ],
    punch: "Menos ruído. Mais foco. Mais consistência.",
    theme: "orange",
    image: "slide-10-progressive-disclosure.png",
    notes: [
      "Explique a prática concreta: não jogar tudo de uma vez no contexto.",
      "Carregar contexto base, pesquisar o necessário e expandir só o que importa.",
    ],
  },
  {
    chapter: "Workflow",
    title: "RPI: Research → Plan → Implement",
    subtitle: "Um fluxo operacional para impedir que o agente pule do problema para o código.",
    bullets: [
      "Research: localizar arquivos, contratos e dependências",
      "Plan: definir abordagem, passos e testes",
      "Implement: executar com objetivo claro e contexto baixo",
      "O fluxo força disciplina antes da codificação",
      "Mantém o agente focado na tarefa certa",
    ],
    punch: "Não pulamos do problema para o código. Passamos por pesquisa e plano.",
    theme: "paper",
    image: "slide-11-rpi-workflow.png",
    notes: [
      "RPI não substitui SDD. RPI é o workflow operacional dentro do SDD.",
      "Research evita chute, Plan evita execução impulsiva e Implement reduz improviso.",
      "Sub-agents podem ser mecanismos de compactação e pesquisa, não papéis humanos mágicos.",
    ],
  },
  {
    chapter: "Exemplo seguro",
    title: "Exemplo: RPI aplicado à issue de pagamentos",
    subtitle: "O agente só implementa depois de localizar contratos, montar plano e definir validação.",
    bullets: [
      "Pesquisar handlers, testes e contratos existentes",
      "Planejar mudança pequena e rollback simples",
      "Implementar regra sem alterar política de negócio",
      "Provar com testes e evidência no PR",
    ],
    punch: "RPI transforma uma issue boa em execução controlada.",
    theme: "orange",
    customVisual: "rpi",
    notes: [
      "Use este exemplo para tornar o método palpável.",
      "A mensagem é que o agente trabalha com trilhos: pesquisa primeiro, plano depois, implementação por último.",
    ],
  },
  {
    chapter: "Anti-patterns",
    title: "O que não fazer com agentes",
    subtitle: "Maturidade é saber onde o agente ajuda e onde o processo precisa vir antes.",
    bullets: [
      "Não antropomorfizar agentes como “frontend agent” ou “QA agent”",
      "Não delegar problema mal definido",
      "Não mandar o agente “resolver tudo”",
      "Não aceitar saída sem validação",
      "Não usar agente sem trilhos de qualidade",
    ],
    punch: "Agente bom com contexto ruim só erra mais rápido.",
    theme: "dark",
    image: "slide-12-anti-patterns-agentes.png",
    notes: [
      "Este slide dá maturidade ao discurso: não estamos vendendo automação irresponsável.",
      "Agente não é membro mágico da equipe. É ferramenta de execução e compactação de contexto.",
    ],
  },
  {
    chapter: "Qualidade",
    title: "Guardrails: o que realmente garante qualidade",
    subtitle: "Qualidade vem de processo, contexto e validação, não só de prompt melhor.",
    bullets: [
      "Issue pronta para agente",
      "Critérios de aceite claros",
      "Testes e checks automáticos",
      "Revisão humana",
      "Rastreabilidade entre doc, issue e PR",
      "Definition of Done explícita",
    ],
    punch: "A qualidade não está no agente. Está nos trilhos que colocamos para ele.",
    theme: "blue",
    image: "slide-13-guardrails-qualidade.png",
    notes: [
      "Traga a visão prática: doc boa, issue boa, execução guiada e validação real.",
      "Este slide é bom para conquistar liderança e arquitetura porque fala de governança e qualidade.",
    ],
  },
  {
    chapter: "Playbook",
    title: "Receita de bolo: como fazer isso amanhã no time",
    subtitle: "Um caminho prático para começar sem mudar tudo de uma vez.",
    bullets: [
      "Criar uma Design Doc rica e objetiva",
      "Separar a doc em fases de execução",
      "Transformar fases em issues pequenas e rastreáveis",
      "Organizar o repo por domínio",
      "Definir AGENTS.md claro e curto",
      "Criar skills para tarefas recorrentes",
      "Usar MCP para buscar contexto real",
      "Executar via RPI",
      "Validar com testes e review",
    ],
    punch: "Spec primeiro. Contexto certo. Execução previsível.",
    theme: "orange",
    image: "slide-14-receita-de-bolo.png",
    notes: [
      "Feche com pragmatismo: isso dá para começar amanhã.",
      "Frase final sugerida: nosso modelo não é sobre substituir engenharia por IA; é sobre codificar boa engenharia em specs, issues e contexto.",
    ],
  },
];

const state = {
  index: 0,
};

const slideEl = document.querySelector("#slide");
const counterEl = document.querySelector("#counter");
const progressEl = document.querySelector("#progressBar");
const chapterEl = document.querySelector("#chapterLabel");
const notesDialog = document.querySelector("#notesDialog");
const notesTitle = document.querySelector("#notesTitle");
const notesKicker = document.querySelector("#notesKicker");
const notesContent = document.querySelector("#notesContent");
const overviewDialog = document.querySelector("#overviewDialog");
const overviewGrid = document.querySelector("#overviewGrid");

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderVisual(slide) {
  if (slide.image) {
    return `
      <figure class="visual-frame">
        <img class="visual-image" src="./${escapeHtml(slide.image)}" alt="" loading="eager" />
        <figcaption class="visual-caption">
          <span>Visual de apoio</span>
          <span>${escapeHtml(slide.chapter)}</span>
        </figcaption>
      </figure>
    `;
  }

  if (slide.customVisual === "doc") {
    return `
      <div class="example-card">
        <span class="card-label">Design Doc / pagamentos fictício</span>
        <div class="doc-snippet">
          <div class="snippet-row">
            <strong>Objetivo</strong>
            <span>Reduzir falhas transitórias no processamento de pagamento sem criar cobrança duplicada.</span>
          </div>
          <div class="snippet-row">
            <strong>Regra</strong>
            <span>Retentar apenas erros temporários por até 3 tentativas com backoff progressivo.</span>
          </div>
          <div class="snippet-row">
            <strong>Restrição</strong>
            <span>Manter idempotência por chave de transação e preservar logs de auditoria.</span>
          </div>
          <div class="snippet-row">
            <strong>Fora de escopo</strong>
            <span>Não alterar política de antifraude, conciliação ou decisão de crédito.</span>
          </div>
        </div>
      </div>
    `;
  }

  if (slide.customVisual === "issue") {
    return `
      <div class="issue-card">
        <span class="card-label">GitHub Issue / exemplo seguro</span>
        <div class="issue-snippet">
          <div class="snippet-row">
            <strong>Source of truth</strong>
            <span>Design Doc, seção 3.2: Retry idempotente de pagamentos.</span>
          </div>
          <div class="snippet-row">
            <strong>Objetivo</strong>
            <span>Implementar retry para falhas temporárias mantendo uma única liquidação por transação.</span>
          </div>
          <div class="snippet-row">
            <strong>Aceite</strong>
            <span>Testes cobrem sucesso, falha permanente, timeout e chamada repetida com mesma chave.</span>
          </div>
          <div class="snippet-row">
            <strong>Evidência no PR</strong>
            <span>Lista de arquivos alterados, testes executados e comportamento observado.</span>
          </div>
        </div>
      </div>
    `;
  }

  if (slide.customVisual === "rpi") {
    return `
      <div class="rpi-card">
        <span class="card-label">RPI / execução controlada</span>
        <div class="rpi-lanes">
          <div class="rpi-step">
            <strong>Research</strong>
            <span>Localizar contrato de pagamentos, handler de retry, testes existentes e logs de auditoria.</span>
          </div>
          <div class="rpi-step">
            <strong>Plan</strong>
            <span>Definir mudança mínima, matriz de testes, riscos de idempotência e evidência esperada.</span>
          </div>
          <div class="rpi-step">
            <strong>Implement</strong>
            <span>Editar apenas o domínio necessário, executar checks e descrever a rastreabilidade no PR.</span>
          </div>
        </div>
      </div>
    `;
  }

  return "";
}

function renderSlide() {
  const slide = slides[state.index];
  const slideNumber = String(state.index + 1).padStart(2, "0");
  const total = String(slides.length).padStart(2, "0");
  const themeClass = slide.theme
    .split(" ")
    .map((token) => (token === "paper" ? "" : `theme-${token}`))
    .join(" ");
  const coverClass = slide.theme.includes("cover") ? "cover" : "";
  const denseClass = slide.bullets.length > 6 ? "dense" : "";
  const finalClass = state.index === slides.length - 1 ? "final-slide" : "";

  slideEl.className = `slide ${themeClass} ${coverClass} ${denseClass} ${finalClass}`.replace(/\s+/g, " ").trim();
  slideEl.innerHTML = `
    <section class="content-panel">
      <span class="slide-number">${slideNumber} / ${total}</span>
      <p class="chapter">${escapeHtml(slide.chapter)}</p>
      <h1>${escapeHtml(slide.title)}</h1>
      <p class="subtitle">${escapeHtml(slide.subtitle)}</p>
      <ul class="bullets">
        ${slide.bullets.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
      </ul>
      <p class="strong-line">${escapeHtml(slide.punch)}</p>
    </section>
    <section class="visual-panel">
      ${renderVisual(slide)}
    </section>
  `;

  counterEl.textContent = `${state.index + 1} / ${slides.length}`;
  chapterEl.textContent = slide.chapter;
  progressEl.style.width = `${((state.index + 1) / slides.length) * 100}%`;
  document.title = `${state.index + 1}. ${slide.title} | SDD Itaú`;

  if (notesDialog.open) {
    renderNotes();
  }

  if (overviewDialog.open) {
    renderOverview();
  }
}

function goTo(index) {
  state.index = Math.max(0, Math.min(slides.length - 1, index));
  history.replaceState(null, "", `#${state.index + 1}`);
  renderSlide();
}

function nextSlide() {
  goTo(state.index + 1);
}

function previousSlide() {
  goTo(state.index - 1);
}

function renderNotes() {
  const slide = slides[state.index];
  notesKicker.textContent = `Slide ${state.index + 1} de ${slides.length}`;
  notesTitle.textContent = slide.title;
  notesContent.innerHTML = `
    ${slide.notes.map((note) => `<p>${escapeHtml(note)}</p>`).join("")}
    <blockquote>${escapeHtml(slide.punch)}</blockquote>
  `;
}

function openNotes() {
  renderNotes();
  notesDialog.showModal();
}

function renderOverview() {
  overviewGrid.innerHTML = slides
    .map((slide, index) => {
      const thumb = slide.image
        ? `<img src="./${escapeHtml(slide.image)}" alt="" loading="lazy" />`
        : `<span>${String(index + 1).padStart(2, "0")}</span>`;

      return `
        <button class="overview-card ${index === state.index ? "is-active" : ""}" type="button" data-slide="${index}">
          <div class="overview-thumb">${thumb}</div>
          <strong>${escapeHtml(slide.title)}</strong>
          <span>${String(index + 1).padStart(2, "0")} · ${escapeHtml(slide.chapter)}</span>
        </button>
      `;
    })
    .join("");
}

function openOverview() {
  renderOverview();
  overviewDialog.showModal();
}

function toggleFullscreen() {
  if (document.fullscreenElement) {
    document.exitFullscreen();
    return;
  }

  document.documentElement.requestFullscreen?.();
}

document.addEventListener("click", (event) => {
  const actionButton = event.target.closest("[data-action]");
  const overviewCard = event.target.closest("[data-slide]");

  if (overviewCard) {
    goTo(Number(overviewCard.dataset.slide));
    overviewDialog.close();
    return;
  }

  if (!actionButton) return;

  const action = actionButton.dataset.action;
  if (action === "next") nextSlide();
  if (action === "prev") previousSlide();
  if (action === "notes") openNotes();
  if (action === "overview") openOverview();
  if (action === "fullscreen") toggleFullscreen();
  if (action === "close-notes") notesDialog.close();
  if (action === "close-overview") overviewDialog.close();
});

document.addEventListener("keydown", (event) => {
  const modalOpen = notesDialog.open || overviewDialog.open;

  if (event.key === "Escape") {
    if (notesDialog.open) notesDialog.close();
    if (overviewDialog.open) overviewDialog.close();
    return;
  }

  if (modalOpen) return;

  if (event.key === "ArrowRight" || event.key === "PageDown" || event.key === " ") {
    event.preventDefault();
    nextSlide();
  }

  if (event.key === "ArrowLeft" || event.key === "PageUp") {
    event.preventDefault();
    previousSlide();
  }

  if (event.key === "Home") goTo(0);
  if (event.key === "End") goTo(slides.length - 1);
  if (event.key.toLowerCase() === "s") openNotes();
  if (event.key.toLowerCase() === "o") openOverview();
  if (event.key.toLowerCase() === "f") toggleFullscreen();
});

window.addEventListener("hashchange", () => {
  const requested = Number(location.hash.replace("#", ""));
  if (Number.isInteger(requested) && requested >= 1 && requested <= slides.length) {
    state.index = requested - 1;
    renderSlide();
  }
});

const requestedInitialSlide = Number(location.hash.replace("#", ""));
if (Number.isInteger(requestedInitialSlide) && requestedInitialSlide >= 1 && requestedInitialSlide <= slides.length) {
  state.index = requestedInitialSlide - 1;
} else {
  history.replaceState(null, "", "#1");
}

renderSlide();
