# Stage 1: Build

FROM mcr.microsoft.com/dotnet/sdk:8.0-alpine AS build
WORKDIR /src

# Install build dependencies
RUN apk add --no-cache ca-certificates tzdata && update-ca-certificates

# Copy csproj and restore
COPY src/backend/Backend.csproj ./backend/
RUN dotnet restore ./backend/Backend.csproj

# Copy source and publish
COPY src/backend/ ./backend/
WORKDIR /src/backend

# Simplified publish (removed --runtime flag)
RUN dotnet publish -c Release --no-restore -o /app/publish \
    --self-contained false

# Stage 2: Runtime

FROM mcr.microsoft.com/dotnet/aspnet:8.0-alpine AS final

# Create distinct non-root user
RUN addgroup --gid 1001 -S backenduser && \
    adduser --uid 1001 -S backenduser -G backenduser

# Install runtime dependencies
RUN apk add --no-cache ca-certificates tzdata && \
    cp /usr/share/zoneinfo/UTC /etc/localtime

WORKDIR /app
RUN chown -R backenduser:backenduser /app

# Switch to non-root
USER backenduser
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080

# Copy published application
COPY --from=build --chown=backenduser:backenduser /app/publish .

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:8080/health || exit 1

ENTRYPOINT ["dotnet", "Backend.dll"]