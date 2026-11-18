// Tout le contenu du site est ici : modifiez les textes sans toucher aux composants.
export const company = {
  name: 'TWCM',
  email: 'contact@twcm.mu',        // à remplacer
  phone: '+230 0000 0000',          // à remplacer
  whatsapp: '23000000000',          // numéro sans « + », à remplacer
  address: 'Maurice',               // à compléter
  hours: 'Lundi au vendredi, 8 h 30 à 17 h 00 (heure de Maurice)',
  linkedin: 'https://www.linkedin.com/',
}

export const nav = [
  { to: '/', label: 'Accueil' },
  { to: '/a-propos', label: 'À propos' },
  { to: '/activites', label: 'Activités' },
  { to: '/realisations', label: 'Réalisations' },
  { to: '/partenaires', label: 'Partenaires' },
]

export const activities = [
  {
    slug: 'trading', title: 'Trading', cta: 'Demander un devis', need: 'Trading',
    intro: 'Nous achetons en Asie et livrons dans l’océan Indien : fournisseurs identifiés, prix négociés, marchandises contrôlées.',
    points: ['Spécialisation Asie vers océan Indien', 'Familles de produits traitées'],
    steps: ['Recherche de fournisseurs', 'Négociation', 'Contrôle qualité', 'Logistique', 'Livraison'],
  },
  {
    slug: 'conseil', title: 'Conseil en business', cta: 'Prendre rendez-vous', need: 'Conseil',
    intro: 'Nous accompagnons les dirigeants dans l’organisation de leurs équipes et dans la conduite de leurs projets.',
    points: ['Assistance RH et management', 'Réalisation de projets : pilotage, suivi, livraison', 'Études d’investissement et gestion de projet'],
    steps: ['Diagnostic', 'Plan d’action', 'Mise en œuvre', 'Suivi'],
  },
  {
    slug: 'distribution', title: 'Distribution d’équipements électriques', cta: 'Demander une offre', need: 'Distribution',
    intro: 'Nous fournissons du matériel électrique aux professionnels, aux collectivités et aux porteurs de projets.',
    points: ['Gamme de matériel proposée', 'Marques distribuées, dont Holley Tech', 'Clients et zones desservis'],
    steps: [],
  },
]

export const projects = [
  {
    slug: 'electrification', title: 'Projet d’électrification', pole: 'Conseil en business', country: 'Madagascar',
    context: 'Un projet d’électrification nécessitait une équipe structurée et un pilotage rigoureux.',
    mission: 'Assistance RH et management, puis réalisation du projet.',
    result: 'Résultats et photos à compléter.',
  },
  {
    slug: 'madagascar', title: 'Étude d’investissement à Madagascar', pole: 'Conseil en business', country: 'Madagascar',
    context: 'Un investisseur souhaitait évaluer une implantation à Madagascar.',
    mission: 'Étude d’investissement, puis gestion de projet.',
    result: 'Résultats à compléter.',
  },
]

export const partners = [
  { name: 'Holley Tech', text: 'Partenaire pour les solutions et équipements électriques. Nature du partenariat et produits concernés à compléter.' },
  { name: 'Partenaire industriel chinois', text: 'Partenaire industriel en Chine. Nom et nature du partenariat à compléter.' },
]

export const values = ['Rigueur dans le choix des fournisseurs', 'Transparence avec nos clients', 'Engagement jusqu’à la livraison']

// Parcours d'une opération de trading, affiché sur l'accueil
export const parcours = [
  { title: 'Recherche de fournisseurs', text: 'Nous identifions en Asie les fabricants et fournisseurs adaptés à votre besoin.' },
  { title: 'Négociation', text: 'Nous négocions prix, quantités et conditions de livraison pour vous.' },
  { title: 'Contrôle qualité', text: 'Nous vérifions la conformité des marchandises avant leur expédition.' },
  { title: 'Logistique', text: 'Nous organisons le transport et les formalités jusqu’à l’océan Indien.' },
  { title: 'Livraison', text: 'Vos marchandises arrivent chez vous, à Maurice ou à Madagascar.' },
]