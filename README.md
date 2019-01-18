# typescript-jwt-manager
A Small Typescript Utility to help manage creation of JWT, full typescript.

# Librairies externes

S'assurer que ces librairies sont ajoutées au projet : (yarn add <librairie>)
- https://www.npmjs.com/package/crypto-js

# Fonctionnement

Cette utilitaire se base sur la librairie crypto-js.

La classe JwtManager permet entre autre :
- l'ajout d'attributs au header / body du jeton.
- La génération du JWT encodé selon l'algorythme HS256 (uniquement pour le moment)

## Code

    jm.addHeaderProperty("alg", "HS256");
    jm.addHeaderProperty("typ", "JWT");

    jm.addDataProperty("id", "1337");
    jm.addDataProperty("firstname", "toto");
    jm.addDataProperty("lastname", "titi");
    jm.addDataProperty("email", "toto@gmail.com");
    
    jm.setSecret("Super secret !!!");
    jm.generateEncodedJwt();
    
    console.log(jm.getEncodedJwt());
    
=> eyInYWxnJyI6IkhTMjU2IiwiJ3R5cCciOiJKV1QifQ.eyInaWQnIjoiMTMzNyIsIidmaXJzdG5hbWUnIjoidG90byIsIidsYXN0bmFtZSciOiJ0aXRpIiwiJ2VtYWlsJyI6InRvdG9AZ21haWwuY29tIn0.s7UDiFfbnTveShhyIsc676c3Sxz8Mg76pL4xTbff8bM
