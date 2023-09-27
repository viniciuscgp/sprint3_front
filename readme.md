# CleanIDE

CleanIDE é uma ambiente de desenvolvimento integrado (IDE) construída com Python e Flask, que permite aos desenvolvedores escrever, compilar e armazenar códigos-fonte em três linguagens populares: C, Java e Python.

![Imagem da Interface](https://github.com/viniciuscgp/sprint3_front/blob/main/app/static/images/clean_ide.png) 

## 📁 Estrutura do Projeto

O projeto está organizado em três APIs backend e uma interface frontend:
[Estrutura no Figma](https://www.figma.com/file/JJIe2fnt54zFJec0kABbbL/CleanIDE?type=design&node-id=0%3A1&mode=design&t=iXowJw1r0zspK2bS-1)

## Chamadas de API feitas pelo Front: ##
- ``1``-USER: Registro do usuario
- ``2``-USER: Login do usuario
- ``3``-FILE: Listar arquivos do usuário
- ``4``-FILE: Salvar/Atualizar codigo fonte do usuário
- ``5``-FILE: Excluir codigo fonte do usuário
- ``6``-FILE: Obter codigo fonte do usuario
- ``7``-COMPILE: Compilar codigo

### 1. 📂 API Files

- **Responsabilidade**: Armazenar o código-fonte dos usuários.
- **Autenticação**: Autenticação via JWT é necessária para armazenar arquivos. Usuários sem autenticação podem usar a CleanIDE, mas não podem salvar seus arquivos.
- **Documentação**: Acesse a documentação Swagger pelo endpoint `/`. 
+ **Roda na porta 5000**

### 2. 📂 API Compiler

- **Responsabilidade**: Interface com um serviço externo de compilação, proporcionando compilação em tempo real nas linguagens suportadas. Atualmente tem suporte pra 2 serviços, configurados via .env
- **Documentação**: Acesse a documentação Swagger pelo endpoint `/`. 
+ **Roda na porta 5001**

### 3. 📂 API Users

- **Responsabilidade**: Gerenciamento de usuários, incluindo registro, login e outras funcionalidades de perfil.
- **Documentação**: Acesse a documentação Swagger pelo endpoint `/`. 
+ **Roda na porta 5002**
+ Utilize o **EMAIL**: ``admin@teste.com`` e **SENHA**: ``1234`` para teste.
### 4. 📂 CleanIDE Funcionamento

- **Responsabilidade**: Interface gráfica para interação com as APIs, oferecendo uma experiência de codificação fluída e intuitiva. 
+ **Roda sempre na porta 5006**

## 🚀 Configurando o ambiente
1. **Clone dos Repositório**:
1.1 *🚨 ATENÇÃO 🚨 Os repostóríos devem ser clonados dentro da mesma pasta 'pai' para que os script (.bat) funcionem corretamente.*
+ Clone do Frontend
   ```bash
   git clone https://github.com/viniciuscgp/sprint3_front.git

+ Clone da API Compiler   
    ```bash
    git clone https://github.com/viniciuscgp/sprint3_api_compiler.git
    ```

+ Clone da API Files
    ```bash
    git clone https://github.com/viniciuscgp/sprint3_api_files.git
    ```

+ Clone da API Users
    ```bash
    git clone https://github.com/viniciuscgp/sprint3_api_users.git
    ```

2. **Construa as Imagens Docker**:
+ Navegue até cada pasta do projeto do front e execute o script:
    ```bash
    recria_imagens.bat
    ```
3. **Inicie os Serviços**:
+ Navegue até cada pasta do projeto do front e execute o script:
    ```bash
    sobe_servicos.bat
    ```

4. **Acesse a CleanIDE**:
    Abra seu navegador e acesse `http://127.0.0.1:5006`.

6. **Resumindo, são 3 scripts pra lhe ajudar:**
    São provendiados 3 scripts:
    - **sobe_servicos.bat**
        + Esse script carrega TODOS os containers automaticamente. 
    - **para_servicos.bat**
        + Esse script para TODOS os containers
    - **recria_imagens.bat**
        + Esse script para TODOS os containers, RECRIA todos e depois INICIA todos novamente.

## 🔒 Segurança

    As APIs utilizam JSON Web Tokens (JWT) como mecanismo principal de autenticação e autorização, garantindo transações seguras e protegidas. 

``Estou enviando os .env para ajudar na avaliação, mas normalmente esse arquivo não seria enviado``

## 🤝 Contribuições

    Contribuições são bem-vindas! 

## 📜 Licença

    Ainda não deu tempo de fazer.

## 📞 Contato

Se tiver dúvidas ou sugestões, entre em contato: [vinians2006@yahoo.com.br](mailto:vinians2006@yahoo.com.br)

