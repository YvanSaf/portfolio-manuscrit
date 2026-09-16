# 0001. Bucket S3 privé derrière CloudFront (OAC), plutôt que S3 Static Website Hosting public

## Contexte

Il fallait choisir comment servir les fichiers statiques du site (HTML,
JS, CSS, images). AWS propose une fonctionnalité native "S3 Static
Website Hosting", qui expose directement un bucket en HTTP public, la
solution la plus simple et la plus documentée pour un premier projet.

## Décision

Le bucket reste **entièrement privé** (aucun accès public, ni ACL ni
policy publique). CloudFront accède seul au bucket via un **Origin
Access Control (OAC)**, le mécanisme actuellement recommandé par AWS
(remplace l'ancien Origin Access Identity, désormais déprécié).

## Pourquoi pas la solution la plus simple (S3 website hosting public) ?

- **Pas de HTTPS natif** : l'endpoint "website hosting" de S3 ne sert
  qu'en HTTP. Pour du HTTPS, il faudrait de toute façon ajouter
  CloudFront devant, donc autant faire les choses bien dès le départ.
- **Surface d'attaque plus large** : un bucket public reste accessible
  directement par son URL S3, en plus de l'URL CloudFront, deux points
  d'entrée à sécuriser au lieu d'un seul.
- **Coût de correction plus tard** : migrer un bucket public vers un
  bucket privé après coup implique de revoir les policies existantes et
  de risquer une interruption de service. Partir privé dès le début coûte
  la même chose en configuration Terraform, mais évite ce risque.

## Conséquences / compromis acceptés

- Légèrement plus de configuration initiale (OAC + policy conditionnelle
  sur l'ARN de la distribution, dans `s3.tf`).
- Toute nouvelle distribution CloudFront pointant vers ce bucket doit être
  explicitement autorisée dans la policy, ce n'est pas un vrai
  inconvénient ici (un seul site, une seule distribution), mais à garder
  en tête si le bucket devait un jour être partagé entre plusieurs
  distributions.
