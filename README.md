# Welcome ! - Outdated

## Détails du projet

## Structure du projet :

```
| - - . env
| - - package . json
`-- src
     | - - config
     |       `-- db . js
     | - - index . js
     | - - middleware
     |         |- - auth . js
     |         `-- notFound . js
     ` - - routes
              | - - auth
              |       `-- auth . js
              | - - todos
              |       |- - todos . js
              |       `- - todos . query . js
              ` - - user
                   | - - user . js
                   ` - - user . query . js
```

Voilà les détails qu'on donne dans le sujet : 

 - **src:** your main folder.
 - **package.json:** your app package file, it must be filled with all the necessary informations, dependencies and have a start script.
 - **config:** contains the files that deal with the connection to the database.
 - **index.js:** the main file, the one that starts everything (it calls and runs the app).
 - **middleware:** contains all the middlewares created
 - **routes:** contains all the subfolders that contain the routes needed for the project

## Démarrer le projet

### Lancer le MySQL server

Voilà la commande pour importer le .sql dans le MySQL server à partir du **epytodo.sql**

```sudo mysql -u root -p epytodo < epytodo.sql```

### Lancer le serveur

```npm start```
