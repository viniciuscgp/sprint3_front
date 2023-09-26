# CleanIDE

CleanIDE é uma ambiente de desenvolvimento integrado (IDE) construída com Python e Flask, que permite aos desenvolvedores escrever, compilar e armazenar códigos-fonte em três linguagens populares: C, Java e Python.

![Imagem da Interface](app\static\images\clean_ide.png) 

## 📁 Estrutura do Projeto

O projeto está organizado em três APIs backend e uma interface frontend:

### 1. 📂 API Files

- **Responsabilidade**: Armazenar o código-fonte dos usuários.
- **Autenticação**: Autenticação via JWT é necessária para armazenar arquivos. Usuários sem autenticação podem usar a CleanIDE, mas não podem salvar seus arquivos.
- **Documentação**: Acesse a documentação Swagger pelo endpoint `/`. Roda na porta 5000.

### 2. 📂 API Compiler

- **Responsabilidade**: Interface com um serviço externo de compilação, proporcionando compilação em tempo real nas linguagens suportadas. 
- **Documentação**: Acesse a documentação Swagger pelo endpoint `/`. Roda na porta 5001.

### 3. 📂 API Users

- **Responsabilidade**: Gerenciamento de usuários, incluindo registro, login e outras funcionalidades de perfil.
- **Documentação**: Acesse a documentação Swagger pelo endpoint `/`. Roda na porta 5002.

### 4. 📂 CleanIDE Frontend

- **Responsabilidade**: Interface gráfica para interação com as APIs, oferecendo uma experiência de codificação fluída e intuitiva. Roda sempre na porta 5006. 

## 🚀 Início Rápido

1. **Clone o Repositório**:
   ```bash
   git clone url_do_repositorio.git

2. **Construa as Imagens Docker**:
Navegue até cada pasta de projeto e construa as imagens Docker:
    ```bash
    docker build -t nome_da_imagem .

3. **Inicie os Serviços**:
    Use o comando a seguir para cada serviço:
    ```bash
    docker run -p PORTA_HOST:5000 nome_da_imagem


4. **Acesse a CleanIDE**:
    Abra seu navegador e acesse `http://127.0.0.1:5006`.

## 🔒 Segurança

    As APIs utilizam JSON Web Tokens (JWT) como mecanismo principal de autenticação e autorização, garantindo transações seguras e protegidas.

## 🤝 Contribuições

    Contribuições são bem-vindas! Por favor, leia o arquivo `CONTRIBUTING.md` para detalhes sobre o processo de submissão de pull requests.

## 📜 Licença

    Ainda não deu tempo de fazer.

## 📞 Contato

Se tiver dúvidas ou sugestões, entre em contato: [vinians2006@yahoo.com.br](mailto:vinians2006@yahoo.com.br)

