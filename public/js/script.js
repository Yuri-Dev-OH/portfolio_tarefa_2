// ============================================================
//  script.js  –  Front-end do Portfólio
//  Consome a API REST via fetch() (GET, POST, PUT, DELETE)
// ============================================================

const API = '/api';

// ── Inicialização ────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', async () => {
    exibirSaudacao();           // if/else por horário
    await carregarTudo();       // busca todos os dados da API
});

// ============================================================
//  ESTRUTURA DE DECISÃO – Saudação por horário (GET implícito)
// ============================================================
function exibirSaudacao() {
    const hora  = new Date().getHours();
    const badge = document.getElementById('greeting-badge');
    const texto = document.getElementById('greeting-text');
    const gif   = document.getElementById('greeting-gif');

    let saudacao, gifSrc;

    if (hora >= 5 && hora < 12) {
        saudacao = 'Bom dia! ☀️';
        gifSrc   = 'img/gifs/morning.gif';
    } else if (hora >= 12 && hora < 18) {
        saudacao = 'Boa tarde! 🌤️';
        gifSrc   = 'img/gifs/morning.gif';
    } else {
        saudacao = 'Boa noite! 🌙';
        gifSrc   = 'img/gifs/good-night.gif';
    }

    if (badge) badge.textContent = saudacao;
    if (texto) texto.textContent = saudacao;
    if (gif)   gif.src = gifSrc;
}

// ============================================================
//  CARREGAMENTO GERAL  (chama todas as funções de render)
// ============================================================
async function carregarTudo() {
    await Promise.all([
        carregarPerfil(),
        carregarFormacoes(),
        carregarHardSkills(),
        carregarSoftSkills(),
        carregarProjetos(),
        carregarCursos()
    ]);
}

// ============================================================
//  FUNÇÕES DE FETCH (GET) + RENDER
// ============================================================

// ── 1. Perfil ────────────────────────────────────────────────
async function carregarPerfil() {
    const perfil = await get('/perfil');
    if (!perfil) return;

    setText('perfil-nome',      perfil.nome);
    setText('perfil-subtitulo', perfil.subtitulo);
    setText('perfil-bio',       perfil.bio);
    setText('perfil-email',     perfil.email);
    setText('perfil-whatsapp',  perfil.whatsapp);
    setText('perfil-local',     perfil.local);
    setText('footer-nome',      perfil.nome);

    setAttr('perfil-foto',    'src', perfil.foto);
    setAttr('perfil-foto',    'alt', perfil.nome);
    setAttr('link-github',    'href', perfil.github);
    setAttr('link-linkedin',  'href', perfil.linkedin);
    setAttr('footer-github',  'href', perfil.github);
    setAttr('footer-linkedin','href', perfil.linkedin);
}

// ── 2. Formações ─────────────────────────────────────────────
async function carregarFormacoes() {
    const lista = await get('/formacoes');
    hide('loading-formacao');
    if (!lista) return;

    const container = document.getElementById('container-formacao');
    // COMANDO DE REPETIÇÃO: for…of renderiza cada formação
    for (const f of lista) {
        container.innerHTML += criarCardFormacao(f);
    }
}

function criarCardFormacao(f) {
    const icone  = f.tipo === 'Superior' ? '🎓' : '📘';
    const classe = f.tipo === 'Superior' ? 'badge-superior' : 'badge-tecnico';
    return `
        <div class="col-md-6 col-lg-5">
            <div class="card-formacao">
                <span class="formacao-icone">${icone}</span>
                <span class="formacao-badge ${classe}">${f.tipo}</span>
                <h4 class="formacao-curso">${f.curso}</h4>
                <p class="formacao-inst">🏫 ${f.instituicao}</p>
                <p class="formacao-periodo">📅 ${f.periodo}</p>
            </div>
        </div>`;
}

// ── 3. Hard Skills ───────────────────────────────────────────
async function carregarHardSkills() {
    const lista = await get('/hardskills');
    hide('loading-hard');
    if (!lista) return;

    const container = document.getElementById('container-hardskills');
    // COMANDO DE REPETIÇÃO: forEach
    lista.forEach(skill => {
        container.innerHTML += criarCardHard(skill);
    });
}

function criarCardHard(s) {
    return `
        <div class="col-6 col-md-4 col-lg-2">
            <div class="card-tech" onclick="toggleCard(this)">
                <div class="card-content">
                    <i class="${s.icone} colored"></i>
                    <h6 class="skill-nome mt-2">${s.nome}</h6>
                </div>
                <div class="card-description">
                    <h6 class="skill-nome">${s.nome}</h6>
                    <p class="skill-desc">${s.descricao}</p>
                </div>
            </div>
        </div>`;
}

// ── 4. Soft Skills ───────────────────────────────────────────
async function carregarSoftSkills() {
    const lista = await get('/softskills');
    hide('loading-soft');
    if (!lista) return;

    const container = document.getElementById('container-softskills');
    lista.forEach(s => {
        container.innerHTML += `
            <div class="col-sm-6 col-lg-4">
                <div class="card-soft">
                    <span class="soft-emoji">${s.emoji}</span>
                    <div>
                        <h6 class="soft-nome">${s.nome}</h6>
                        <p class="soft-desc">${s.descricao}</p>
                    </div>
                </div>
            </div>`;
    });
}

// ── 5. Projetos ──────────────────────────────────────────────
async function carregarProjetos() {
    const lista = await get('/projetos');
    hide('loading-projetos');
    if (!lista) return;

    const container = document.getElementById('container-projetos');
    lista.forEach(p => {
        const tags = p.tecnologias.map(t => `<span class="badge bg-primary me-1">${t}</span>`).join('');
        container.innerHTML += `
            <div class="col-md-6 col-lg-5">
                <div class="projeto-card">
                    <div class="projeto-img-wrap">
                        <img src="${p.imagem || 'img/placeholder.png'}" alt="${p.titulo}" class="projeto-img">
                    </div>
                    <div class="p-4">
                        <h4 class="proj-titulo">${p.titulo}</h4>
                        <p class="proj-desc">${p.descricao}</p>
                        <div class="mb-3">${tags}</div>
                        <a href="${p.link}" target="_blank" class="btn btn-proj">
                            <i class="devicon-github-original"></i> Ver Projeto
                        </a>
                    </div>
                </div>
            </div>`;
    });
}

// ── 6. Cursos ────────────────────────────────────────────────
async function carregarCursos() {
    const lista = await get('/cursos');
    hide('loading-cursos');
    if (!lista) return;

    const container = document.getElementById('container-cursos');
    lista.forEach(c => {
        const pdfBtn = c.pdf
            ? `<a href="${c.pdf}" target="_blank" class="btn btn-pdf">📄 Certificado</a>`
            : `<span class="text-muted small">Sem certificado digital</span>`;

        container.innerHTML += `
            <div class="col-md-6 col-lg-4">
                <div class="curso-card">
                    <div class="curso-header">
                        <span class="curso-icone">🏆</span>
                        <div>
                            <h5 class="curso-titulo">${c.titulo}</h5>
                            <p class="curso-entidade">${c.entidade}</p>
                        </div>
                    </div>
                    <div class="curso-info">
                        ${c.horas ? `<span class="info-chip">⏱ ${c.horas}h</span>` : ''}
                        ${c.ano   ? `<span class="info-chip">📅 ${c.ano}</span>`    : ''}
                    </div>
                    <div class="mt-3">${pdfBtn}</div>
                </div>
            </div>`;
    });
}

// ============================================================
//  TOGGLE CARD TECH (interação)
// ============================================================
function toggleCard(el) {
    document.querySelectorAll('.card-tech').forEach(c => {
        if (c !== el) c.classList.remove('active');
    });
    el.classList.toggle('active');
}

// ============================================================
//  UTILITÁRIO – fetch wrapper com tratamento de erro
// ============================================================

/** GET  /api/{rota} → retorna JSON ou null */
async function get(rota) {
    try {
        const res = await fetch(`${API}${rota}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return await res.json();
    } catch (e) {
        console.error(`[GET ${rota}]`, e.message);
        return null;
    }
}

/** POST  /api/{rota} com body JSON */
async function post(rota, dados) {
    try {
        const res = await fetch(`${API}${rota}`, {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify(dados)
        });
        return await res.json();
    } catch (e) {
        console.error(`[POST ${rota}]`, e.message);
        return null;
    }
}

/** PUT  /api/{rota}/{id} com body JSON */
async function put(rota, id, dados) {
    try {
        const res = await fetch(`${API}${rota}/${id}`, {
            method:  'PUT',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify(dados)
        });
        return await res.json();
    } catch (e) {
        console.error(`[PUT ${rota}/${id}]`, e.message);
        return null;
    }
}

/** DELETE  /api/{rota}/{id} */
async function del(rota, id) {
    try {
        const res = await fetch(`${API}${rota}/${id}`, { method: 'DELETE' });
        return await res.json();
    } catch (e) {
        console.error(`[DELETE ${rota}/${id}]`, e.message);
        return null;
    }
}

// ── Helpers DOM ──────────────────────────────────────────────
function setText(id, valor) {
    const el = document.getElementById(id);
    if (el) el.textContent = valor || '';
}
function setAttr(id, attr, valor) {
    const el = document.getElementById(id);
    if (el) el.setAttribute(attr, valor || '#');
}
function hide(id) {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
}
