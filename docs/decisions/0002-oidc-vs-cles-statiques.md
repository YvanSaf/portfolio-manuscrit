# 0002. Authentification GitHub Actions → AWS via OIDC, plutôt que des clés statiques

## Contexte

GitHub Actions a besoin de droits sur AWS pour déployer (écrire dans S3,
invalider le cache CloudFront). La méthode historique consiste à créer
un utilisateur IAM, générer une paire de clés (`AWS_ACCESS_KEY_ID` /
`AWS_SECRET_ACCESS_KEY`), et les coller dans les secrets du repo GitHub.

## Décision

Utiliser **OIDC** (OpenID Connect) : GitHub Actions génère un jeton
signé et éphémère à chaque exécution de workflow ; AWS le vérifie via un
`aws_iam_openid_connect_provider`, et délivre des identifiants
**temporaires** (le temps du run) si le jeton correspond aux conditions
définies dans la trust policy du rôle (repo + branche précis).

## Pourquoi pas des clés statiques (la méthode la plus répandue en tutoriel) ?

- **Une clé statique ne expire jamais tant qu'on ne la révoque pas à la
  main.** Si elle fuite (mauvais commit, capture d'écran, log mal
  filtré), elle reste valide jusqu'à ce que quelqu'un s'en aperçoive et
  la révoque manuellement.
- **Rotation manuelle** : bonne pratique de sécurité veut qu'on tourne
  les clés régulièrement, en pratique, personne ne le fait sur un
  projet perso, ce qui allonge la fenêtre de risque en cas de fuite.
- **Portée difficile à restreindre finement** : une clé IAM classique
  est valide depuis n'importe où (ton PC, un fork malveillant du repo
  s'il avait les secrets, etc.). La trust policy OIDC restreint l'usage
  à *ce repo précis*, *cette branche précise*.

## Conséquences / compromis acceptés

- Mise en place légèrement plus complexe au départ (provider OIDC +
  trust policy avec conditions), documentée dans `iam-github-oidc.tf`.
- Fonctionne uniquement depuis GitHub Actions (ou un autre CI supportant
  OIDC), si le déploiement devait un jour se faire depuis un poste
  local, il faudrait quand même prévoir un accès classique (profil AWS
  CLI local), ce qui est déjà le cas pour lancer Terraform soi-même.
