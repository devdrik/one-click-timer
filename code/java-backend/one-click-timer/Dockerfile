ARG APP_NAME=one-click-timer
ARG APP_VERSION=1.0.3-SNAPSHOT

FROM maven:3.8.3-openjdk-17 AS build
COPY src /usr/src/app/src
COPY pom.xml /usr/src/app
RUN mvn -f /usr/src/app/pom.xml clean package

FROM openjdk:17-slim
ARG APP_NAME
ARG APP_VERSION
COPY --from=build /usr/src/app/target/${APP_NAME}-${APP_VERSION}.jar /usr/app/application.jar 
EXPOSE 8080
ENTRYPOINT ["java","-jar","/usr/app/application.jar"]