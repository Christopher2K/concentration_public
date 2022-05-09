# Concentration - Public version

Voici la version open source de mon app Concentration réalisée en live sur [ma chaine Twitch](https://twitch.tv/LLCoolChris_). C'est un projet expo qui nécéssite EAS.

Ce code n'est absolument pas production ready. C'est un honnête snapshot de l'état du code afin de:

1. Donner un aperçu du WIP qu'il y avait pendant les lives
2. Fournir un proof of concept de timer en background poure React native

## Comment utiliser ce projet

1. Se faire un compte sur [expo.dev](https://expo.dev)
2. Installer le client EAS `yarn global add eas-cli@0.47`
3. Installer les dépendances du projet `yarn install`
4. Ajouter un bundle identifier pour le projet ios dans le `app.json`, [voir la documentation d'Expo](https://docs.expo.dev/versions/latest/config/app/#bundleidentifier)
5. Pour build l'application, deux moyens:
   - Remote sur les serveurs d'Expo: `eas build --profile=developmement`
   - Local sur votre machine: `eas build --profile=developmement`
6. Le resultat du build sera un IPA (iOS simulator) ou un APK (Android)

## Maintenance

Ce projet n'est pas maintenu. Je ne ferais aucun bugfix/aide sur le code fonctionnel de l'appli!

Amusez-vous bien!
