# OneClickTimer deployment section

This is the deplyoment section for the OneClickTimer.
All you need is the backend, the frontend, and a database.

There are different options to deploy the app

## Using helm in kubernetes

Easiest ist to use the provided helm charts. Install the backend and the frontend and you are good to go. The backend will deploy a database automagically.

backend deployment from deployment folder:
```
helm upgrade --install -n oneclicktimer --create-namespace oneclicktimer-backend ./oneclicktimer-backend -f ./oneclicktimer-backend/customValues.yaml
```

frontend deployment from deployment folder:
```
helm upgrade --install -n oneclicktimer --create-namespace oneclicktimer-frontend ./oneclicktimer-frontend -f ./oneclicktimer-frontend/customValues.yaml
```

## Using docker-compose

There is also a docker-compose that might work. Try it with
```
docker-compose up
```

## Plain deployment

You can also run the apps directly on your machine. You are on your own here, only you know your machine.