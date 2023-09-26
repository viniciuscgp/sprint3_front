cd ..\api_compiler
docker run -d -p 5001:5001 sprint3_api_compiler

cd ..\api_files
docker run -d -p 5000:5000 sprint3_api_files

cd ..\api_users
docker run -d -p 5002:5002 sprint3_api_users

cd ..\front
docker run -d -p 5006:5006 sprint3_front




