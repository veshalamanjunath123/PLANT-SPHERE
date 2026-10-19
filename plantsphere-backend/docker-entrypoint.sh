#!/bin/sh

# Convert Render's postgresql:// URL to jdbc:postgresql:// for Spring Boot
if [ -n "$JDBC_DATABASE_URL" ]; then
    export SPRING_DATASOURCE_URL=$(echo "$JDBC_DATABASE_URL" | sed 's/^postgresql:/jdbc:postgresql:/')
fi

# Start the application
exec java -jar app.jar
