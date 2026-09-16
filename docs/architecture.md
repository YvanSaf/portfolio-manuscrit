# Architecture

## Vue runtime (comment un visiteur charge le site)

![Vue runtime ou user](./1_Architecture_logical_view.png)

Un visiteur ouvre son navigateur, tape l'URL du site. La requête passe par
Internet jusqu'à Amazon CloudFront, qui va chercher le fichier demandé
dans le bucket S3 s'il n'est pas déjà en cache, puis le renvoie en HTTPS
au navigateur.

## Vue déploiement (comment le code arrive sur AWS)

![Vue déploiement](./2_Architecture_deployment_view.png)

Le développeur pousse son code sur GitHub. Ça déclenche GitHub Actions,
qui assume un rôle IAM via OIDC (authentification par jeton signé, sans
clé AWS stockée en secret), synchronise les fichiers buildés vers S3, puis
invalide le cache CloudFront pour que les visiteurs voient immédiatement
la nouvelle version.

> Note de correction : le premier jet de ce diagramme utilisait le
> libellé "IAM Roles Anywhere" sur l'icône du rôle assumé. C'est une
> erreur de terminologie à corriger dans le fichier source. IAM Roles
> Anywhere est un service distinct, pensé pour authentifier des charges
> de travail hors AWS via des certificats X.509. Ce que ce projet utilise
> réellement est un IAM Role assumé via un fournisseur d'identité OIDC
> (`aws_iam_openid_connect_provider` + `AssumeRoleWithWebIdentity`). Le
> libellé correct est simplement "IAM Role".

Toute l'infrastructure vit dans la région us-east-1, y compris le
certificat ACM utilisé par CloudFront (une contrainte AWS stricte pour
CloudFront, pas un choix arbitraire), donc rester sur cette région
partout simplifie le projet.

## Les services, et pourquoi ils sont là

### Amazon S3, stockage du site

Contient les fichiers buildés (`dist/` après `npm run build`) : HTML, JS,
CSS, images, polices. Le bucket est entièrement privé, aucun accès public
direct, même en connaissant l'URL. Seul CloudFront peut y lire, via un
Origin Access Control (OAC). Détail et justification dans
[ADR 0001](./decisions/0001-s3-prive-cloudfront-oac.md).

Le versioning est activé, chaque déploiement garde les fichiers
précédents, ce qui permet un rollback sans avoir à rebuilder quoi que ce
soit en cas de déploiement cassé.

### Amazon CloudFront, CDN et HTTPS

Fait trois choses qu'un bucket S3 seul ne fait pas correctement : HTTPS
natif, mise en cache géographique, et point d'accès unique autorisé au
bucket privé.

### AWS IAM (rôle et fournisseur OIDC)

Permet à GitHub Actions de déployer sur AWS sans qu'aucune clé d'accès
longue durée ne soit stockée dans les secrets du repo. Le rôle n'est
assumable que depuis ce repo précis, sur la branche `main`. Voir
[ADR 0002](./decisions/0002-oidc-vs-cles-statiques.md) pour le détail du
mécanisme et pourquoi c'est préférable aux clés statiques.

### GitHub Actions, CI puis CD

CI (sur chaque pull request) : lint, vérification TypeScript, build de
test. Bloque le merge si quelque chose casse.

CD (sur push vers `main`) : build de production, synchronisation vers S3,
invalidation du cache CloudFront.

## Ce qui n'est volontairement pas là

Pas de base de données, le site est entièrement statique, aucune donnée
dynamique à stocker côté serveur.

Pas de serveur (EC2, Lambda...), rien ne s'exécute côté back, tout le
rendu (animations, curseur, canvas) se fait dans le navigateur du
visiteur.

Pas de nom de domaine custom pour l'instant, le site tourne sur l'URL
`*.cloudfront.net` par défaut. L'infra est prête à en accueillir un (voir
la variable `custom_domain` dans `infra/variables.tf`), mais ce n'est pas
nécessaire pour démarrer.

## Liens utiles

[Décisions d'architecture (ADR)](./decisions/)

[Estimation des coûts](./costs.md)

[Ce que j'ai appris en construisant ça](./lessons-learned.md)
