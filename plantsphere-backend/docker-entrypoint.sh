#!/bin/sh

# Convert Render's postgresql:// URL to jdbc:postgresql:// for Spring Boot
# Render format: postgresql://user:pass@host/database
# Spring Boot needs: jdbc:postgresql://host:5432/database?user=user&password=pass
if [ -n "$JDBC_DATABASE_URL" ]; then
    # Extract components from Render URL
    DB_USER=$(echo "$JDBC_DATABASE_URL" | sed -n 's/.*:\/\/\([^:]*\):.*/\1/p')
    DB_PASS=$(echo "$JDBC_DATABASE_URL" | sed -n 's/.*:\/\/[^:]*:\([^@]*\)@.*/\1/p')
    DB_HOST=$(echo "$JDBC_DATABASE_URL" | sed -n 's/.*@\([^/]*\).*/\1/p')
    DB_NAME=$(echo "$JDBC_DATABASE_URL" | sed -n 's/.*\/\([^?]*\).*/\1/p')

    # Construct JDBC URL for Spring Boot
    export SPRING_DATASOURCE_URL="jdbc:postgresql://${DB_HOST}:5432/${DB_NAME}"
    export SPRING_DATASOURCE_USERNAME="$DB_USER"
    export SPRING_DATASOURCE_PASSWORD="$DB_PASS"
fi

# Start the application
exec java -jar app.jar
