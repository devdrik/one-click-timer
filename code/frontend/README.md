# Frontend for the OneClickTimer Application

This is the frontend. It is a react frontend. Use standard react workflow to develop.

## Deployment

There is a ```nginx.conf```and a ```Dockerfile```that are interesting for your deployment.
The Dockerfile will build the app with node container and run the build in a leightweight nginx container. 
Thus, you can configure the nginx.conf to your needs.