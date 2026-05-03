// ============================================================
//  server.js  –  API REST do Portfólio de Yuri Gonçalves
//  Rotas: GET / POST / PUT / DELETE
//  Iniciar: node server.js   (porta 3000)
// ============================================================

const express = require('express');
const cors    = require('cors');
const path    = require('path');

const app  = express();
const PORT = 3000;

// ── Middlewares ──────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));   // serve o front-end

// ============================================================
//  BANCO DE DADOS EM MEMÓRIA (arrays/objetos)
// ============================================================

let perfil = {
    nome:      "Yuri Gonçalves de Souza",
    subtitulo: "Desenvolvedor de Software Multiplataforma",
    foto:      "img/yuri.png",
    bio:       "Sou Yuri Gonçalves de Souza, estudante de Desenvolvimento de Software Multiplataforma na Fatec São José dos Campos. Entusiasta de tecnologia e hardware, busco aplicar meus conhecimentos em análise de dados e desenvolvimento web para criar soluções eficientes. Atualmente estou focado em conquistar minha primeira oportunidade profissional na área da computação.",
    email:     "yurigoncalvesds@gmail.com",
    whatsapp:  "(12) 9 7408-8598",
    local:     "São José dos Campos – SP",
    github:    "https://github.com/Yuri-Dev-OH",
    linkedin:  "https://www.linkedin.com/in/yurigonçalvesds"
};

let formacoes = [
    {
        id: 1,
        tipo:        "Superior",
        curso:       "Desenvolvimento de Software Multiplataforma (DSM)",
        instituicao: "Fatec São José dos Campos",
        periodo:     "08/2025 – 07/2028 (cursando)"
    },
    {
        id: 2,
        tipo:        "Técnico",
        curso:       "Técnico em Desenvolvimento de Sistemas",
        instituicao: "Etec São José dos Campos",
        periodo:     "02/2024 – 06/2025 (concluído)"
    }
];

let projetos = [
    {
        id: 1,
        titulo:       "Gráficos Demográficos de SJC",
        descricao:    "Plataforma para filtrar e exibir dados demográficos e estatísticos de São José dos Campos, com busca por bairro, período e indicadores. Interface com gráficos interativos e tabelas.",
        tecnologias:  ["Python", "Flask", "Pandas"],
        link:         "https://github.com/guilhermefpo/CodeWave",
        imagem:       "img/codewave.png"
    },
    {
        id: 2,
        titulo:       "Cadastro de Normas Técnicas Aeronáuticas",
        descricao:    "Plataforma web para centralizar, organizar e correlacionar requisitos normativos aeronáuticos, com autenticação de usuários e gestão de requisitos.",
        tecnologias:  ["React", "TypeScript", "Node.js", "Prisma", "MySQL"],
        link:         "https://github.com/Giommn/CodeWave-2DSM-API",
        imagem:       "img/akaer.png"
    }
];

let cursos = [
    {
        id: 1,
        titulo:  "Escola de Inovadores",
        entidade: "Inova CPS / Centro Paula Souza",
        horas:   40,
        ano:     2025,
        pdf:     "arquivos/CERTIFICADO_-_2025-2.pdf"
    },
    {
        id: 2,
        titulo:  "Introdução ao Scrum",
        entidade: "FGV Online",
        horas:   6,
        ano:     2025,
        pdf:     "arquivos/14502219_certificado_Fgv.pdf"
    },
    {
        id: 3,
        titulo:  "Fundamentos da Informática (Hardware & Software)",
        entidade: "Fundação Bradesco",
        horas:   7,
        ano:     2025,
        pdf:     ""
    }
];

let hardSkills = [
    { id: 1, nome: "HTML5",      icone: "devicon-html5-plain",      descricao: "Estruturas web semânticas e acessíveis." },
    { id: 2, nome: "CSS3",       icone: "devicon-css3-plain",        descricao: "Design responsivo e animações modernas." },
    { id: 3, nome: "JavaScript", icone: "devicon-javascript-plain",  descricao: "Interatividade e lógica no navegador." },
    { id: 4, nome: "Python",     icone: "devicon-python-plain",      descricao: "Análise de dados e back-end com Flask." },
    { id: 5, nome: "MySQL",      icone: "devicon-mysql-plain",       descricao: "Modelagem e gerenciamento de bancos de dados." },
    { id: 6, nome: "Git/GitHub", icone: "devicon-github-original",   descricao: "Versionamento de código e colaboração." }
];

let softSkills = [
    { id: 1, emoji: "🤝", nome: "Trabalho em Equipe",   descricao: "Experiência com metodologias ágeis (Scrum)." },
    { id: 2, emoji: "💬", nome: "Comunicação",           descricao: "Clara e objetiva em ambientes técnicos." },
    { id: 3, emoji: "📋", nome: "Organização",           descricao: "Gestão de tarefas e prioridades." },
    { id: 4, emoji: "🔍", nome: "Resolução de Problemas", descricao: "Análise lógica e pensamento crítico." },
    { id: 5, emoji: "📚", nome: "Aprendizado Contínuo",  descricao: "Curiosidade e adaptação a novas tecnologias." }
];

// ── Helper: próximo ID ────────────────────────────────────────
const nextId = arr => (arr.length ? Math.max(...arr.map(i => i.id)) + 1 : 1);

// ============================================================
//  ROTAS – /api/perfil
// ============================================================

/** GET  /api/perfil  →  retorna o perfil */
app.get('/api/perfil', (req, res) => {
    res.json(perfil);
});

/** PUT  /api/perfil  →  atualiza o perfil */
app.put('/api/perfil', (req, res) => {
    const campos = ['nome','subtitulo','foto','bio','email','whatsapp','local','github','linkedin'];
    campos.forEach(c => { if (req.body[c] !== undefined) perfil[c] = req.body[c]; });
    res.json({ mensagem: 'Perfil atualizado com sucesso.', perfil });
});

// ============================================================
//  ROTAS – /api/formacoes
// ============================================================

app.get('/api/formacoes', (req, res) => res.json(formacoes));

app.post('/api/formacoes', (req, res) => {
    const { tipo, curso, instituicao, periodo } = req.body;
    if (!tipo || !curso || !instituicao || !periodo)
        return res.status(400).json({ erro: 'Campos obrigatórios: tipo, curso, instituicao, periodo.' });
    const nova = { id: nextId(formacoes), tipo, curso, instituicao, periodo };
    formacoes.push(nova);
    res.status(201).json({ mensagem: 'Formação adicionada.', formacao: nova });
});

app.put('/api/formacoes/:id', (req, res) => {
    const id  = parseInt(req.params.id);
    const idx = formacoes.findIndex(f => f.id === id);
    if (idx === -1) return res.status(404).json({ erro: 'Formação não encontrada.' });
    formacoes[idx] = { ...formacoes[idx], ...req.body, id };
    res.json({ mensagem: 'Formação atualizada.', formacao: formacoes[idx] });
});

app.delete('/api/formacoes/:id', (req, res) => {
    const id  = parseInt(req.params.id);
    const idx = formacoes.findIndex(f => f.id === id);
    if (idx === -1) return res.status(404).json({ erro: 'Formação não encontrada.' });
    const removida = formacoes.splice(idx, 1)[0];
    res.json({ mensagem: 'Formação removida.', formacao: removida });
});

// ============================================================
//  ROTAS – /api/projetos
// ============================================================

app.get('/api/projetos', (req, res) => res.json(projetos));

app.post('/api/projetos', (req, res) => {
    const { titulo, descricao, tecnologias, link, imagem } = req.body;
    if (!titulo || !descricao)
        return res.status(400).json({ erro: 'Campos obrigatórios: titulo, descricao.' });
    const novo = {
        id: nextId(projetos),
        titulo,
        descricao,
        tecnologias: tecnologias || [],
        link:        link || '#',
        imagem:      imagem || ''
    };
    projetos.push(novo);
    res.status(201).json({ mensagem: 'Projeto adicionado.', projeto: novo });
});

app.put('/api/projetos/:id', (req, res) => {
    const id  = parseInt(req.params.id);
    const idx = projetos.findIndex(p => p.id === id);
    if (idx === -1) return res.status(404).json({ erro: 'Projeto não encontrado.' });
    projetos[idx] = { ...projetos[idx], ...req.body, id };
    res.json({ mensagem: 'Projeto atualizado.', projeto: projetos[idx] });
});

app.delete('/api/projetos/:id', (req, res) => {
    const id  = parseInt(req.params.id);
    const idx = projetos.findIndex(p => p.id === id);
    if (idx === -1) return res.status(404).json({ erro: 'Projeto não encontrado.' });
    const removido = projetos.splice(idx, 1)[0];
    res.json({ mensagem: 'Projeto removido.', projeto: removido });
});

// ============================================================
//  ROTAS – /api/cursos
// ============================================================

app.get('/api/cursos', (req, res) => res.json(cursos));

app.post('/api/cursos', (req, res) => {
    const { titulo, entidade, horas, ano, pdf } = req.body;
    if (!titulo || !entidade)
        return res.status(400).json({ erro: 'Campos obrigatórios: titulo, entidade.' });
    const novo = { id: nextId(cursos), titulo, entidade, horas: horas || 0, ano: ano || null, pdf: pdf || '' };
    cursos.push(novo);
    res.status(201).json({ mensagem: 'Curso adicionado.', curso: novo });
});

app.put('/api/cursos/:id', (req, res) => {
    const id  = parseInt(req.params.id);
    const idx = cursos.findIndex(c => c.id === id);
    if (idx === -1) return res.status(404).json({ erro: 'Curso não encontrado.' });
    cursos[idx] = { ...cursos[idx], ...req.body, id };
    res.json({ mensagem: 'Curso atualizado.', curso: cursos[idx] });
});

app.delete('/api/cursos/:id', (req, res) => {
    const id  = parseInt(req.params.id);
    const idx = cursos.findIndex(c => c.id === id);
    if (idx === -1) return res.status(404).json({ erro: 'Curso não encontrado.' });
    const removido = cursos.splice(idx, 1)[0];
    res.json({ mensagem: 'Curso removido.', curso: removido });
});

// ============================================================
//  ROTAS – /api/hardskills
// ============================================================

app.get('/api/hardskills', (req, res) => res.json(hardSkills));

app.post('/api/hardskills', (req, res) => {
    const { nome, icone, descricao } = req.body;
    if (!nome) return res.status(400).json({ erro: 'Campo obrigatório: nome.' });
    const nova = { id: nextId(hardSkills), nome, icone: icone || '', descricao: descricao || '' };
    hardSkills.push(nova);
    res.status(201).json({ mensagem: 'Hard skill adicionada.', skill: nova });
});

app.put('/api/hardskills/:id', (req, res) => {
    const id  = parseInt(req.params.id);
    const idx = hardSkills.findIndex(s => s.id === id);
    if (idx === -1) return res.status(404).json({ erro: 'Hard skill não encontrada.' });
    hardSkills[idx] = { ...hardSkills[idx], ...req.body, id };
    res.json({ mensagem: 'Hard skill atualizada.', skill: hardSkills[idx] });
});

app.delete('/api/hardskills/:id', (req, res) => {
    const id  = parseInt(req.params.id);
    const idx = hardSkills.findIndex(s => s.id === id);
    if (idx === -1) return res.status(404).json({ erro: 'Hard skill não encontrada.' });
    const removida = hardSkills.splice(idx, 1)[0];
    res.json({ mensagem: 'Hard skill removida.', skill: removida });
});

// ============================================================
//  ROTAS – /api/softskills
// ============================================================

app.get('/api/softskills', (req, res) => res.json(softSkills));

app.post('/api/softskills', (req, res) => {
    const { emoji, nome, descricao } = req.body;
    if (!nome) return res.status(400).json({ erro: 'Campo obrigatório: nome.' });
    const nova = { id: nextId(softSkills), emoji: emoji || '💡', nome, descricao: descricao || '' };
    softSkills.push(nova);
    res.status(201).json({ mensagem: 'Soft skill adicionada.', skill: nova });
});

app.put('/api/softskills/:id', (req, res) => {
    const id  = parseInt(req.params.id);
    const idx = softSkills.findIndex(s => s.id === id);
    if (idx === -1) return res.status(404).json({ erro: 'Soft skill não encontrada.' });
    softSkills[idx] = { ...softSkills[idx], ...req.body, id };
    res.json({ mensagem: 'Soft skill atualizada.', skill: softSkills[idx] });
});

app.delete('/api/softskills/:id', (req, res) => {
    const id  = parseInt(req.params.id);
    const idx = softSkills.findIndex(s => s.id === id);
    if (idx === -1) return res.status(404).json({ erro: 'Soft skill não encontrada.' });
    const removida = softSkills.splice(idx, 1)[0];
    res.json({ mensagem: 'Soft skill removida.', skill: removida });
});

// ── Iniciar servidor ─────────────────────────────────────────
app.listen(PORT, () => {
    console.log(`\n✅  Servidor rodando em http://localhost:${PORT}`);
    console.log(`📋  Rotas disponíveis:`);
    console.log(`    GET/PUT         http://localhost:${PORT}/api/perfil`);
    console.log(`    GET/POST/PUT/DELETE  http://localhost:${PORT}/api/formacoes`);
    console.log(`    GET/POST/PUT/DELETE  http://localhost:${PORT}/api/projetos`);
    console.log(`    GET/POST/PUT/DELETE  http://localhost:${PORT}/api/cursos`);
    console.log(`    GET/POST/PUT/DELETE  http://localhost:${PORT}/api/hardskills`);
    console.log(`    GET/POST/PUT/DELETE  http://localhost:${PORT}/api/softskills\n`);
});