const kalydProjects = [
  {
    id: 'fmedchoices',
    slug: 'fmedchoices',
    name: 'FMEDCHOICES',
    category: 'Sistema/Web App',
    type: 'Plataforma de estudos',
    status: 'Finalizado',
    filters: ['Sistema/Web App', 'Landing Page'],
    shortDescription: 'Plataforma de estudos para estudantes de medicina na Argentina.',
    fullDescription:
      'Plataforma de estudos criada para estudantes de medicina na Argentina, com landing page, dashboard, choices, pomodoro, flashcards, biblioteca, ranking e área de login.',
    description:
      'Plataforma de estudos criada para estudantes de medicina na Argentina, com landing page, dashboard, choices, pomodoro, flashcards, biblioteca, ranking e área de login.',
    objective:
      'Centralizar ferramentas de estudo em uma plataforma visualmente clara, organizada e responsiva para estudantes de medicina.',
    challenge:
      'Criar uma experiência clara para estudantes que precisam centralizar perguntas, materiais, tempo de estudo e progresso em um só lugar.',
    solution:
      'Uma plataforma responsiva com página comercial, área interna e módulos de estudo organizados em uma navegação simples.',
    result:
      'Um produto digital com aparência profissional, foco em conversão na landing page e usabilidade dentro da plataforma.',
    coverImage: 'assets/images/projects/fmedchoices/desktop.png',
    image: 'assets/images/projects/fmedchoices/desktop.png',
    imageAlt: 'Página inicial do FMEDCHOICES',
    onlineUrl: 'https://medarena.vercel.app/es-AR',
    link: 'https://medarena.vercel.app/es-AR',
    tags: ['Landing Page', 'Dashboard', 'Estudos', 'Medicina', 'Responsivo', 'Plataforma'],
    metrics: [
      ['+500', 'estudantes cadastrados'],
      ['+50.000', 'questões respondidas'],
      ['+12.000', 'flashcards criados'],
      ['+8.000', 'sessões de estudo'],
    ],
    developed: ['Landing page comercial', 'Dashboard do estudante', 'Choices', 'Pomodoro', 'Flashcards', 'Biblioteca', 'Ranking', 'Área de login', 'Interface responsiva'],
    features: ['Landing page comercial', 'Dashboard do estudante', 'Choices', 'Pomodoro', 'Flashcards', 'Biblioteca', 'Ranking', 'Área de login', 'Interface responsiva'],
    gallery: [
      {
        src: 'assets/images/projects/fmedchoices/desktop.png',
        alt: 'Screenshot desktop do FMEDCHOICES',
        label: 'Desktop',
      },
      {
        src: 'assets/images/projects/fmedchoices/mobile.png',
        alt: 'Screenshot mobile do FMEDCHOICES',
        label: 'Mobile',
      },
    ],
    featured: true,
  },
  {
    id: 'imoveis-jota',
    slug: 'imoveis-jota',
    name: 'Imóveis Jota',
    category: 'Imobiliário',
    type: 'Site imobiliário',
    status: 'Finalizado',
    filters: ['Imobiliário', 'Institucional'],
    shortDescription: 'Site imobiliário desenvolvido para apresentação de imóveis.',
    fullDescription:
      'Site imobiliário desenvolvido para apresentar imóveis de forma profissional, com navegação simples, visual moderno, foco em credibilidade e experiência responsiva.',
    description:
      'Site imobiliário desenvolvido para apresentar imóveis de forma profissional, com navegação simples, visual moderno, foco em credibilidade e experiência responsiva.',
    objective:
      'Criar uma presença digital profissional para uma imobiliária, facilitando a apresentação de imóveis e o contato de possíveis clientes.',
    challenge:
      'Apresentar imóveis com clareza, fortalecer a percepção profissional da marca e facilitar o acesso às informações principais.',
    solution:
      'Um site objetivo, responsivo e visualmente organizado para destacar imóveis, contato e navegação sem excesso de etapas.',
    result:
      'Uma presença digital mais confiável para quem precisa mostrar imóveis com bom acabamento visual e leitura rápida.',
    coverImage: 'assets/images/projects/imoveis-jota/desktop.png',
    image: 'assets/images/projects/imoveis-jota/desktop.png',
    imageAlt: 'Página inicial do Imóveis Jota',
    onlineUrl: 'https://imoveisjota.xyz/',
    link: 'https://imoveisjota.xyz/',
    tags: ['Site Imobiliário', 'Catálogo', 'Responsivo', 'Institucional', 'Imóveis'],
    metrics: [
      ['100%', 'responsivo'],
      ['1', 'site institucional'],
      ['+5', 'seções objetivas'],
      ['24h', 'acesso online'],
    ],
    developed: ['Página inicial', 'Apresentação de imóveis', 'Layout responsivo', 'Visual institucional', 'Navegação simples', 'Estrutura voltada para credibilidade e contato'],
    features: ['Página inicial', 'Apresentação de imóveis', 'Layout responsivo', 'Visual institucional', 'Navegação simples', 'Estrutura voltada para credibilidade e contato'],
    gallery: [
      {
        src: 'assets/images/projects/imoveis-jota/desktop.png',
        alt: 'Screenshot desktop do Imóveis Jota',
        label: 'Desktop',
      },
      {
        src: 'assets/images/projects/imoveis-jota/mobile.png',
        alt: 'Screenshot mobile do Imóveis Jota',
        label: 'Mobile',
      },
    ],
    featured: true,
  },
];

window.kalydProjects = kalydProjects;
window.findKalydProject = (id) => kalydProjects.find((project) => project.id === id);
