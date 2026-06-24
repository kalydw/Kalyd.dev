const kalydProjects = [
  {
    id: 'fmedchoices',
    name: 'FMEDCHOICES',
    category: 'Sistema/Web App',
    filters: ['Sistema/Web App', 'Landing Page'],
    shortDescription: 'Plataforma de estudos para estudantes de medicina na Argentina.',
    description:
      'Plataforma de estudos criada para estudantes de medicina na Argentina, com landing page, dashboard, choices, pomodoro, flashcards, biblioteca, ranking e área de login.',
    challenge:
      'Criar uma experiência clara para estudantes que precisam centralizar perguntas, materiais, tempo de estudo e progresso em um só lugar.',
    solution:
      'Uma plataforma responsiva com página comercial, área interna e módulos de estudo organizados em uma navegação simples.',
    result:
      'Um produto digital com aparência profissional, foco em conversão na landing page e usabilidade dentro da plataforma.',
    image: 'https://medarena.vercel.app/_next/image?url=%2Fimages%2Fhero-mockup.png&w=1200&q=85',
    imageAlt: 'Mockup do dashboard do FMEDCHOICES',
    link: 'https://medarena.vercel.app/es-AR',
    tags: ['Landing Page', 'Dashboard', 'Estudos', 'Medicina', 'Responsivo', 'Plataforma'],
    metrics: [
      ['+500', 'estudantes cadastrados'],
      ['+50.000', 'questões respondidas'],
      ['+12.000', 'flashcards criados'],
      ['+8.000', 'sessões de estudo'],
    ],
    features: ['Landing page comercial', 'Dashboard do estudante', 'Choices', 'Pomodoro', 'Flashcards', 'Biblioteca', 'Ranking', 'Área de login'],
    featured: true,
  },
  {
    id: 'imoveis-jota',
    name: 'Imóveis Jota',
    category: 'Imobiliário',
    filters: ['Imobiliário', 'Institucional'],
    shortDescription: 'Site imobiliário desenvolvido para apresentação de imóveis.',
    description:
      'Site imobiliário desenvolvido para apresentar imóveis de forma profissional, com navegação simples, visual moderno, foco em credibilidade e experiência responsiva.',
    challenge:
      'Apresentar imóveis com clareza, fortalecer a percepção profissional da marca e facilitar o acesso às informações principais.',
    solution:
      'Um site objetivo, responsivo e visualmente organizado para destacar imóveis, contato e navegação sem excesso de etapas.',
    result:
      'Uma presença digital mais confiável para quem precisa mostrar imóveis com bom acabamento visual e leitura rápida.',
    image: '',
    imageAlt: 'Representação visual do projeto Imóveis Jota',
    link: 'https://imoveisjota.xyz/',
    tags: ['Site Imobiliário', 'Catálogo', 'Responsivo', 'Institucional', 'Imóveis'],
    metrics: [
      ['100%', 'responsivo'],
      ['1', 'site institucional'],
      ['+5', 'seções objetivas'],
      ['24h', 'acesso online'],
    ],
    features: ['Página institucional', 'Apresentação de imóveis', 'Navegação simples', 'Layout responsivo', 'Contato direto'],
    featured: true,
  },
];

window.kalydProjects = kalydProjects;
window.findKalydProject = (id) => kalydProjects.find((project) => project.id === id);
