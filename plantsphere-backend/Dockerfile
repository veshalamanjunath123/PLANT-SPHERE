# Build stage
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Run stage
FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
# Convert postgresql:// to jdbc:postgresql:// for Spring Boot
CMD sh -c 'if [ "$JDBC_DATABASE_URL" != "" ]; then export SPRING_DATASOURCE_URL=$(echo $JDBC_DATABASE_URL | sed "s/postgresql:/jdbc:postgresql:/"); fi && java -jar app.jar'
