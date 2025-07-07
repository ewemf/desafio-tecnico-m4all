# 🖨️ Desafio Técnico - Sistema de Gestão de Impressoras

## 🎯 Sobre o Projeto

Uma plataforma completa para a gestão de impressoras corporativas. Este projeto foi desenvolvido como um desafio técnico full-stack para a media4all usando **React (Next.js)** e **Spring Boot**. O sistema oferece uma interface moderna e intuitiva para as operações essenciais de CRUD (Criação, Leitura, Atualização e Exclusão) de impressoras. 

## 🛠️ Stack Tecnológicas

### Frontend

- **Next.js 14** com App Router
- **Tailwind CSS** para estilização
- **TanStack Query (React Query)** para cache e sincronização de dados
- **React Hook Form + Zod** para formulários e validação
- **shadcn/ui** para biblioteca de componentes
- **Axios ou Fetch** para comunicação HTTP

### Backend

- **Spring Boot 3** com Java 17+
- **Spring Web + Spring Data JPA** para camada de persistência
- **MySQL** como sistema de banco de dados
- **RestTemplate/WebClient** para consumo de APIs externas
- **Bean Validation** para validação de dados

## ✨ Principais Funcionalidades
✅ Gestão Completa de Impressoras: Realize o cadastro, edição, listagem e exclusão de impressoras de forma eficiente.

✅ Sincronização automática das impressoras com a API a cada 1 hora e registro de estatísticas da última sincronização.

## 🖥️ Como Executar Localmente

Pré-requisitos
Node.js v18+
JDK 17+

- Clone o repositório
```
git clone https://github.com/ewemf/desafio-tecnico-m4all.git
```

- Backend (Spring Boot)
```
cd printer-management-system/backend
mvn clean install
./mvnw spring-boot:run
```

- Frontend (Next.js)
```
cd printer-management-system/frontend
npm install
npm run dev
```

- Banco de dados (MySql)
```
MYSQL_DATABASE=printerdb
MYSQL_USER=root
MYSQL_PASSWORD=root
```

### Interface de Programação (Backend)

**Endpoints da API**

```http
GET    /api/v1/printers                    # Listagem com paginação e filtros
POST   /api/v1/printers                    # Criação de nova impressora
GET    /api/v1/printers/{id}               # Busca por identificador
PUT    /api/v1/printers/{id}               # Atualização completa
DELETE /api/v1/printers/{id}               # Exclusão lógica ou física
GET    /api/v1/printers/{id}/status        # Status operacional (mock)
GET    /api/v1/sync/statistics             # Métricas de sincronização
```

- **API Externa**: `https://mt.tracerly.net`

  ![image](https://github.com/user-attachments/assets/7e82916c-60fc-4d76-93d3-dc76956490d7)

