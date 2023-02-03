
# Projet : Système de gestion de température et d'humidité contrôlé via une palteforme web

# Description du projet :

C'est un système qui permet de détecter la température ambiante etl’humidité puis 
afficher ses informations via une page web. Ce dernier peut être contrôlé soit via
une plateforme web, soit physiquement soit naturellement en fonction des conditions
prédéfinies . Par exemple : un ventilateur s'allume si la température est supérieure
à 30°C sinon elle reste éteinte et un buzzer qui sonne aussi si la température est
supérieure à 30°C .Les données de la température et de l’humidité sont collectées 
en temps réel mais sont stockées en différés dans la base de données selon les horaires 
suivants :précises: à 8h 00 à 12h00 et à 19h00.C'est ce qui va permettre d'afficher
via un tableau de bord sur le site web les données en temps réel, la température et
l'humidité en moyenne, l'historique de semaine et les données en fonction des heures 
de stockage des données. Pour utiliser l'application il faut avoir un compte dont seul 
le super administrateur est habilité de créer.

 # Dépendance nécessaire à la réalisation du projet:

 - 👍 nodejs
 - 👍 npm
 - 👍angular/cli
 - 👍 moongoose
 - 👍 express
 - 👍 socketio
 - 👍 le reste des packages sont disponible dans les fichiers packagejson (server et client)
 A noter aussi que les version des dépendances peuvent être vérifier sur le même fichier.

 # NB : 
 Si voun venez à cloner le projet, il faut tapez la commande : 

 - 👍 npm install

 pour mettre à jour l'ensemble des dépendance permettant la réalisation du projet.
 Aussi c'est bien de savoir que certains librerie sont utiliser au côté frontend 
 et d'autres au côté server.

 # côté interface (frontend)

 Cela dit dit il faut bien vous positionner dans le dossier interface qui est par défaut
  la racine du projet puis : 

 - 👍 npm install 

 pour mettre à jour les dépendances enseuite : 

 - 👍 ng serve

 pour lancer l'application sur le nagateur. 
 le point d'accer est ceci : 

 - 👍 http://localhost:4200/

 # côté server (backend)

 Pour démarrer le server, il faut à partir de la racine du projet se déplacer
  dans le dossier : backend ; EX:

 - 👍 cd backend

 Une fois ici, il faut aussi mettre à jour les dépendances en cours d'utilisation 
 comme-ci:

 - 👍 npm install

 une fois cela fait, nous devez aussi lancer le server pour faciliter la communication 
 client server de l'applicatrion par cette commande : 
 
 - 👍 npm start 

 # Utilisation de l'application

 Par défaut un super administrateur est crée il est seul habilité à créer d'autre utilisateur.
 Donc nous pouvons dire à premier usage c'est le super administrateur qui peut se 
 connecter dans l'application mais s'il crée des utilisateurs, ces derniers pourront 
 se servir des identifiants (Mail, Mot de passe) pour accéderà leur page utilsateur 
 ou dashboard à partir d'où il pourront eux auusi controler le système évoquer dans 
 la description. Sauf que ces utilisateurs créer, qu'ils soient administrateur ou 
 utilisateur simple n'auront pas le prérogatif d'ajouter d'autres utilisateurs mais 
 à part ça, ils auront toutes les fonctionnalité que confert l'application.

 # Arduino

 Le bon fonctionnement de l'application necessite aussi les objets connectés. Cela dit
 nous avons utilisés certains matériaux physiques pour collecter, enregistrer, afficher les 
 données (temperature et humidité) pour afin contrôler le système. il s'agit : 

 - 👍 Capteur DHT11
 - 👍 VENTILATEUR
 - 👍 BUZZUR
 - 👍 carte arduino
 - 👍 capteur infrarouge avec commande, 
 - 👍fils conducteurs,
 - 👍 breatbord

 # Nb : 
    
 En Plus d'un bon cablage, vous aurrez aussi besoin d'un code Arduino pour contrôler le microprocesseur.
 C'est d'ailleurs, ce qui permettra de conditionner les actions avec une touche d'automatisation.
 Le code est disponible dans un dossier nommé code_arduino sur un fichier d'extension .ino.
