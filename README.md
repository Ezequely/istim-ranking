# istim-ranking
[![Build Status](https://travis-ci.org/istim/istim-ranking.png?branch=master)](https://travis-ci.org/istim/istim-ranking)

Rank API for Istim plataform

## Services
### Rank
  - Create a new object in model Rank. How to use:
    - ```create?userId=100&game='2048'&point=71464```
  - Update info of an object from userId of the model Rank. How to use
    - ```update?userId=100&point=0```
  - Show info of an object from userId of the model Rank. How to use:
    - ```show?userId=100```
  - Destroy an object from userId of the model Rank. How to use:
    - ```destroy?userId=100```

## Dependencies
### Game API
  - Games avaliable

### User API
  - Authentication

## Exemple of rank
``` 
var rank = {
  userId: 100
  game: '2048'
  point: 71464
}
``` 