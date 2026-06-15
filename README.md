# MON POINT DE VUE — CIANNEY

> Plateforme personnelle premium pour la marque **CIANNEY / MON POINT DE VUE** — combinant média personnel, portfolio professionnel et plateforme de contenu.

---

## Aperçu

**MON POINT DE VUE** est une plateforme web full-stack premium conçue pour centraliser l'identité, le contenu et l'activité publique de CIANNEY. Elle intègre un blog, des vidéos YouTube/TikTok, des événements, une boutique, un espace membre et un panneau d'administration complet.

**Réseaux sociaux :**
- Facebook : https://www.facebook.com/cianney.haddock2025
- YouTube : https://youtube.com/@monpointdevue-k1u
- TikTok : https://tiktok.com/@monpointdevue6

---

## Stack Technique

| Couche | Technologie |
|--------|-------------|
| Frontend | React 18 + Vite 6, TypeScript 5.9 |
| Styling | Tailwind CSS 4, Framer Motion |
| Routing | Wouter |
| State | TanStack React Query |
| Backend | Express 5, Node.js 24 |
| Base de données | PostgreSQL + Drizzle ORM |
| Validation | Zod v4 |
| API | REST (OpenAPI 3.1 + Orval codegen) |
| Build | esbuild (serveur), Vite (client) |
| Package Manager | pnpm workspaces |

---

## Architecture du Projet

```
.
├── artifacts/
│   ├── api-server/          # Serveur Express (API REST)
│   │   └── src/
│   │       ├── routes/      # Routes API (articles, events, videos, etc.)
│   │       ├── middlewares/ # Auth, logging
│   │       └── app.ts       # Configuration Express
│   └── mon-point-de-vue/    # Frontend React + Vite
│       └── src/
│           ├── pages/       # Pages de l'application
│           ├── components/  # Composants réutilisables
│           └── contexts/    # AuthContext, LanguageContext, ThemeContext
├── lib/
│   ├── api-spec/            # Spec OpenAPI (source de vérité)
│   ├── api-client-react/    # Hooks React Query générés
│   ├── api-zod/             # Schémas Zod générés
│   └── db/                  # Schéma Drizzle + config
└── scripts/                 # Scripts utilitaires
```

---

## Prérequis

- Node.js >= 24
- pnpm >= 10
- PostgreSQL 14+

---

## Installation

### 1. Cloner le dépôt

```bash
git clone https://github.com/votre-username/mon-point-de-vue.git
cd mon-point-de-vue
```

### 2. Installer les dépendances

```bash
pnpm install
```

### 3. Configurer les variables d'environnement

Copier le fichier d'exemple :

```bash
cp .env.example .env
```

Renseigner les variables dans `.env` :

```env
DATABASE_URL=postgresql://user:password@localhost:5432/monpointdevue
SESSION_SECRET=votre-secret-ultra-securise-minimum-32-caracteres
NODE_ENV=development
PORT=8080
BASE_PATH=/
```

### 4. Créer la base de données

```bash
# Créer la base PostgreSQL
createdb monpointdevue

# Appliquer le schéma
pnpm --filter @workspace/db run push
```

### 5. Lancer le projet en développement

**Serveur API :**
```bash
pnpm --filter @workspace/api-server run dev
```

**Frontend (dans un second terminal) :**
```bash
pnpm --filter @workspace/mon-point-de-vue run dev
```

L'application est accessible sur : http://localhost:5173

---

## Commandes Disponibles

| Commande | Description |
|----------|-------------|
| `pnpm run typecheck` | Vérifie les types TypeScript |
| `pnpm run build` | Build complet (typecheck + toutes les apps) |
| `pnpm --filter @workspace/api-server run dev` | Serveur API en développement |
| `pnpm --filter @workspace/mon-point-de-vue run dev` | Frontend en développement |
| `pnpm --filter @workspace/api-spec run codegen` | Régénère les hooks API et schémas Zod |
| `pnpm --filter @workspace/db run push` | Applique les migrations (développement) |

---

## Fonctionnalités

### Pages Publiques
- **Accueil** — Hero animé, stats en temps réel, dernières vidéos, événements à venir
- **À Propos** — Histoire, vision, mission, valeurs, timeline
- **Blog** — Articles multilingues (FR/EN), recherche, filtres par catégorie
- **Vidéos** — Intégration YouTube + TikTok, filtres par plateforme
- **Événements** — Calendrier, réservation en ligne
- **Galerie** — Albums photos avec lightbox
- **Réalisations** — Timeline des succès et jalons
- **Médias** — Interviews, podcasts, articles de presse
- **Partenaires** — Logo wall, formulaire de partenariat
- **Boutique** — Ebooks, formations, services
- **Contact** — Formulaire multi-type, carte, WhatsApp
- **Livre d'Or** — Témoignages de visiteurs
- **FAQ** — Accordéon catégorisé
- **Newsletter** — Inscription multilingue

### Espace Membre
- Inscription / Connexion sécurisée
- Profil membre personnalisé
- Système de badges

### Panneau Administrateur
- Dashboard avec statistiques globales
- Gestion : articles, événements, vidéos, galerie, boutique
- Modération : commentaires, témoignages, livre d'or
- Gestion : partenaires, newsletter, messages de contact

### Fonctionnalités Transversales
- Mode sombre/clair (défaut : sombre)
- Multilingue Français/Anglais
- Responsive mobile complet
- Animations Framer Motion
- SEO optimisé (Open Graph, meta tags)
- PWA installable

---

## API REST

La documentation complète de l'API est disponible dans `lib/api-spec/openapi.yaml`.

### Endpoints principaux

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/stats/summary` | Statistiques globales |
| GET | `/api/articles` | Liste des articles |
| GET | `/api/articles/featured` | Articles mis en avant |
| GET | `/api/videos/latest` | Dernières vidéos |
| GET | `/api/events/upcoming` | Événements à venir |
| GET | `/api/testimonials` | Témoignages approuvés |
| GET | `/api/products` | Produits de la boutique |
| POST | `/api/auth/register` | Inscription |
| POST | `/api/auth/login` | Connexion |

### Authentification

L'API utilise des tokens JWT-like (AES-256-CBC). Inclure dans les headers :

```
Authorization: Bearer <token>
```

---

## Sécurité

- Passwords hashés avec `scrypt` (résistant aux attaques par force brute)
- Tokens chiffrés avec AES-256-CBC
- Validation de toutes les entrées avec Zod
- Protection CSRF via SameSite cookies
- Rate limiting recommandé en production
- Variables sensibles jamais exposées côté client

---

## Compte Administrateur par Défaut

Après seeding initial :
- **Email :** admin@monpointdevue.com
- **Mot de passe :** admin123

> **Important :** Changer ce mot de passe immédiatement en production.

---

## Déploiement

Voir `DEPLOYMENT.md` pour les instructions détaillées de déploiement.

### Déploiement rapide sur Replit

1. Cliquer sur "Publish" dans l'interface Replit
2. Replit gère automatiquement les migrations de base de données
3. L'application est disponible sur votre domaine `.replit.app`

---

## Contribuer

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/ma-fonctionnalite`)
3. Commiter (`git commit -m 'feat: ajouter ma fonctionnalité'`)
4. Pusher (`git push origin feature/ma-fonctionnalite`)
5. Ouvrir une Pull Request

---

## Licence

Ce projet est la propriété exclusive de CIANNEY / MON POINT DE VUE. Tous droits réservés.

---

*Développé avec passion pour la marque MON POINT DE VUE — CIANNEY*
