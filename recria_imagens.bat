@echo off

REM 1. Parar os containers em execução
FOR /F "tokens=*" %%i IN ('docker ps -q -f "ancestor=sprint3_api_compiler"') DO docker stop %%i
FOR /F "tokens=*" %%i IN ('docker ps -q -f "ancestor=sprint3_api_files"') DO docker stop %%i
FOR /F "tokens=*" %%i IN ('docker ps -q -f "ancestor=sprint3_api_users"') DO docker stop %%i
FOR /F "tokens=*" %%i IN ('docker ps -q -f "ancestor=sprint3_front"') DO docker stop %%i

REM 2. Remover os containers antigos
docker rm $(docker ps -a -q -f "ancestor=sprint3_api_compiler")
docker rm $(docker ps -a -q -f "ancestor=sprint3_api_files")
docker rm $(docker ps -a -q -f "ancestor=sprint3_api_users")
docker rm $(docker ps -a -q -f "ancestor=sprint3_front")

REM 3. Reconstruir as imagens
cd ..\api_compiler
docker build -t sprint3_api_compiler .

cd ..\api_files
docker build -t sprint3_api_files .

cd ..\api_users
docker build -t sprint3_api_users .

cd ..\front
docker build -t sprint3_front .

REM 4. Iniciar novos containers a partir das imagens atualizadas
docker run -d -p 5001:5001 sprint3_api_compiler
docker run -d -p 5000:5000 sprint3_api_files
docker run -d -p 5002:5002 sprint3_api_users
docker run -d -p 5006:5006 sprint3_front
