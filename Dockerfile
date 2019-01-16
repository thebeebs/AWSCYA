FROM microsoft/dotnet:2.2-sdk AS build-env
WORKDIR /app

RUN dotnet tool install -g Microsoft.Web.LibraryManager.CLI
ENV PATH="$PATH:/root/.dotnet/tools"

COPY *.csproj ./
COPY libman.json ./
RUN dotnet restore
RUN libman restore

COPY . ./
RUN dotnet publish -c Release -o out

FROM microsoft/dotnet:2.2-aspnetcore-runtime
WORKDIR /app
COPY --from=build-env /app/out .
ENTRYPOINT ["dotnet", "AWSCYA.dll"]