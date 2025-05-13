# 🎨 Milestone 1 - Maquettage & Setup projet

## ✏️ Créer une maquette simple du site
- Définir l’arborescence des pages.
- Esquisser un design rapide sur Figma ou papier.

## ⚙️ Initialiser le projet Vue 3 + Vue Router + TailwindCSS
- Créer le projet avec Vue CLI ou Vite.
- Ajouter Vue Router pour la navigation.
- Installer et configurer TailwindCSS.

## 🧩 Créer les pages principales
- Accueil (liste des produits).
- Connexion.
- Détail d’un produit.
- Formulaire produit (création/modification).

---

# 🔐 Milestone 2 - Authentification

## 🔐 Créer un formulaire de connexion
- Champ email + mot de passe.
- Bouton de validation.

## 🛠️ Intégrer l’appel API POST `/auth/login`
- Utiliser `fetch` pour envoyer les identifiants.
- Gérer les erreurs et affichage.

## 💾 Stocker le token JWT dans `localStorage`
- Sauvegarder le token reçu à la connexion.
- Lire le token à l’initialisation de l’app.

## 🔁 Injecter le token dans les appels API
- Créer une fonction utilitaire `fetchWithAuth`.
- Ajouter automatiquement le header `Authorization`.

---

# 📦 Milestone 3 - Gestion des produits

## 📥 Afficher la liste des produits
- GET `/products`
- Créer un composant `ProductCard`.

## 🔍 Afficher les détails d’un produit
- GET `/products/:id`
- Page dédiée avec infos produit.

## 📝 Créer un produit
- Formulaire avec validation.
- POST `/products`

## ✏️ Modifier un produit
- Remplir un formulaire avec les données existantes.
- PUT `/products/:id`

## ❌ Supprimer un produit
- Bouton "Supprimer" dans la liste ou détail.
- DELETE `/products/:id`

## 🧩 Créer des composants personnalisés
- ProductCard.vue
- Button.vue
- ProductForm.vue

---

# 💅 Milestone 4 - UI/UX : Design & responsive

## 💡 Améliorer le design avec Tailwind
- Couleurs, typographies, ombres, etc.
- Layout clair et structuré.

## 📱 Rendre le site responsive
- Mobile-first.
- Breakpoints Tailwind : sm, md, lg…

## ✨ Ajouter des transitions
- Animations d’apparition, hover, navigation entre vues.

---

# 🧪 Milestone 5 - Tests unitaires

## ⚙️ Installer Vitest
- Ajouter les dépendances et config initiale.

## 🧪 Écrire un test unitaire pour `ProductCard`
- Vérifier le rendu du titre, prix, etc.

## 🧪 Écrire un test de logique métier
- Exemple : fonction qui formate un prix / valide un formulaire.

---

# 🚀 Milestone 6 - Mise en production

## 🧹 Optimiser le projet pour la prod
- `npm run build`
- Nettoyer les console.log inutiles.

## 🐧 Déployer sur ton VPS
- Copier les fichiers `dist/` sur le serveur (via scp).
- Configurer Nginx ou équivalent.

## 🔁 Ajouter une GitHub Action pour CI/CD
- Build et déploiement automatique sur push main/master.

## 🧑‍🏫 Préparer la présentation
- Démo live fluide.
- Points forts du projet.
- Réponse aux questions du jury.

---

# 🎁 BONUS

## 🌍 Ajouter un système de traduction (i18n)
- Exemple : anglais / français.
- Utiliser `vue-i18n`.

## 🧱 Ajouter une bibliothèque de composants
- (Optionnel) Ex : HeadlessUI, VueUse, etc.

## 🐳 Conteneuriser le projet avec Docker
- Dockerfile + config Nginx.
