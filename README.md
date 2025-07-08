# World Beauty 🌸

Este projeto foi desenvolvido como parte da disciplina **Técnicas de Programação I** do curso de **Desenvolvimento de Software Multiplataforma**, com o objetivo de construir um sistema completo de gerenciamento para o salão de beleza fictício **World Beauty**.

<br>

O sistema permite o controle e gerenciamento de:

- 📇 Cadastro de **Clientes**;
- 🛍️ Cadastro de **Produtos** e **Serviços**;
- 📦 Registro de **Consumos** (produtos/serviços utilizados por clientes);
- 📊 **Métricas e Relatórios**. 

---

<br>

## 🔧 Tecnologias Utilizadas

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) 
![Express](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white) 
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white) ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Bootstrap](https://img.shields.io/badge/-boostrap-0D1117?style=for-the-badge&logo=bootstrap&labelColor=0D1117) ![Postman](https://img.shields.io/badge/Postman-FF6C37.svg?style=for-the-badge&logo=Postman&logoColor=white)

<br>

## ⬇ Guia de Instalação

Este guia oferece instruções detalhadas sobre como baixar, configurar e executar este projeto em sua máquina local.

### Pré-requisitos

- **VSCode**: Editor de código para visualização e edição do projeto. [Baixe o VSCode](https://code.visualstudio.com/download)
- **MySQL**: Banco de dados para armazenar informações necessárias ao sistema. [Baixe o MYSQL](https://dev.mysql.com/downloads/installer/)

#### 🌐 Compatibilidade de Ambiente

Para garantir o funcionamento correto do projeto, recomenda-se utilizar:

- **NPM:** versão 8.x ou superior
- **Node.js** entre **v16.0.0 e v20.0.0**: Ambiente de execução de JavaScript open-source. [Baixe o Node.js](https://nodejs.org/en/download)

#### 📌 Observações
O uso de versões mais recentes, como Node v22.x, pode causar incompatibilidades com pacotes como `react-scripts`.  
Este projeto foi testado com Node v22.13.0 e funcionou corretamente, mas o suporte oficial de algumas bibliotecas pode não estar garantido ainda.

---

### 🔁 Clonando o Repositório

```bash
git clone https://github.com/abeatrizdscoelho/T5.git
  ```

---

### ⚙️ Configurando o Backend

#### 1. Abrindo um Terminal
> Abra um terminal no VSCode para configurar o backend.

#### 2. Configuração e Execução do Backend
> Navegue até a pasta do backend:
```bash
cd backend
  ```

> Instale as dependências do backend:
```bash
npm install
  ```

#### Configure o Banco de Dados
Crie um banco no MySQL (ex: ```world_beauty```).
Crie um arquivo ```.env``` e insira suas credenciais:
```bash
DATABASE_URL="mysql://usuario:senha@localhost:3306/world_beauty"
  ```

> Rode as migrações:
```bash
npx prisma migrate dev
  ```

> Inicie o servidor:
```bash
npm run dev
  ```

O back-end estará disponível em: http://localhost:3000

---

### 💻 Configurando o Frontend

#### 1. Abrindo um Novo Terminal
> Abra um novo terminal no VSCode para configurar o frontend.

#### 2. Configuração e Execução do Frontend
> Navegue até a pasta do frontend:
```bash
cd frontend
  ```

> Instale as dependências:
```bash
npm install
  ```

> Inicie a aplicação
```bash
npm start
  ```

O front-end estará disponível em: http://localhost:3001

---

### 🔗 Acessando a Aplicação
> No terminal, copie o link que aparece e abra-o no navegador de sua preferência para acessar a aplicação.
