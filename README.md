# Controle de Despesas Pessoais

Aplicação web moderna, intuitiva e segura para gestão de finanças e despesas pessoais com isolamento estrito entre contas de usuários.
Link: https://controle-de-despesas-q6yd.onrender.com

---

## 1. Visão Geral e Objetivo

O **Controle de Despesas** foi desenvolvido para atender aos requisitos de um projeto acadêmico completo com CRUD, validação de dados, persistência na nuvem, interface responsiva e documentação detalhada. Ao mesmo tempo, foi desenhado com qualidade visual e de usabilidade suficientes para ser utilizado no dia a dia por diferentes pessoas e famílias.

### Princípios do Projeto:
- **Simplicidade:** Fluxos objetivos e interface limpa sem excesso de configurações.
- **Segurança Rigorosa:** Cada usuário tem acesso estrito e exclusivo aos seus próprios lançamentos via **Row Level Security (RLS)** diretamente no banco de dados.
- **Gratuidade Total:** Desenvolvido para funcionar 100% em planos gratuitos (Supabase Free, Render Static Site Free e GitHub).
- **Design Moderno:** Visual agradável e acolhedor construído com Tailwind CSS e ícones do Lucide.

---

## 2. Funcionalidades Implementadas

### 2.1. Autenticação e Segurança
- Cadastro de novos usuários com nome, e-mail e senha.
- Login e logout seguros com Supabase Auth.
- Recuperação de senha com envio de e-mail de redefinição.
- Persistência automática da sessão do usuário.
- Proteção de rotas no frontend (`ProtectedRoute`) e blindagem no banco via RLS.

### 2.2. Gestão de Despesas (CRUD Completo)
- **Cadastrar:** Registro com descrição, valor (R$), categoria, data e observações opcionais.
- **Consultar:** Visualização detalhada das informações de cada despesa.
- **Listar:** Exibição em tabela responsiva no desktop e cards adaptados para smartphones.
- **Editar:** Alteração ágil de dados de lançamentos existentes.
- **Excluir:** Remoção com diálogo de confirmação obrigatório para evitar exclusões acidentais.

### 2.3. Categorias Suportadas
- Alimentação
- Transporte
- Moradia
- Saúde
- Educação
- Lazer
- Compras
- Contas e serviços
- Outros

### 2.4. Filtros e Organização
- Filtro por período (data inicial e data final).
- Filtro por categoria.
- Busca textual em tempo real por descrição ou observações.
- Ordenação dinâmica por mais recente, mais antiga, maior valor ou menor valor.
- Botão de redefinição rápida de filtros.

### 2.5. Dashboard e Indicadores
- Total de despesas acumulado no mês selecionado.
- Quantidade total de lançamentos registrados.
- Identificação da maior categoria de gastos (com valor e porcentagem).
- Navegação entre meses (mês atual, anteriores e posteriores).
- Gráfico de pizza/rosquinha interativo mostrando a distribuição percentual dos gastos por categoria.
- Lista resumida das despesas mais recentes com atalhos de visualização.

---

## 3. Tecnologias Utilizadas

- **Frontend:** [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vitejs.dev/)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Roteamento:** [React Router v6](https://reactrouter.com/)
- **Ícones:** [Lucide React](https://lucide.dev/)
- **Gráficos:** [Recharts](https://recharts.org/)
- **Backend as a Service (BaaS):** [Supabase](https://supabase.com/) (Auth + PostgreSQL com RLS)
- **Hospedagem:** [Render Static Site](https://render.com/)

---

## 4. Estrutura de Pastas

```text
Controle_de_Despesas/
├── public/
│   ├── _redirects              # Regra de roteamento SPA para o Render
│   └── favicon.svg             # Favicon da aplicação
├── src/
│   ├── components/
│   │   ├── common/             # Button, Input, Modal, ConfirmDialog, Card, Badge
│   │   ├── dashboard/          # StatCard, ExpenseChart
│   │   ├── expenses/           # ExpenseTable, ExpenseFilterBar, ExpenseFormModal, ExpenseDetailModal
│   │   └── layout/             # Navbar, Layout, ProtectedRoute
│   ├── contexts/
│   │   └── AuthContext.tsx     # Gerenciamento global de autenticação e sessão
│   ├── lib/
│   │   ├── constants.ts        # Lista e cores das categorias
│   │   └── supabase.ts         # Conexão com o Supabase Client
│   ├── services/
│   │   └── expenseService.ts   # Chamadas de banco de dados e regras de negócio
│   ├── types/
│   │   └── index.ts            # Tipagens TypeScript para despesas, perfis e filtros
│   ├── utils/
│   │   ├── formatters.ts       # Formatação de moeda BRL (R$) e datas
│   │   └── validators.ts       # Validações de campos obrigatórios e valores positivos
│   ├── views/
│   │   ├── auth/               # LoginView, RegisterView, ForgotPasswordView
│   │   ├── DashboardView.tsx   # Painel com métricas e gráfico
│   │   └── ExpensesView.tsx    # Listagem completa com filtros e ações de CRUD
│   ├── App.tsx                 # Rotas da aplicação
│   ├── main.tsx                # Entrada React
│   └── index.css               # Estilos globais e Tailwind
├── .env.example                # Exemplo das variáveis de ambiente necessárias
├── .gitignore                  # Arquivos ignorados pelo Git
├── index.html                  # HTML base
├── package.json
├── supabase-schema.sql         # Script SQL pronto para rodar no Supabase
├── tsconfig.json
└── vite.config.ts
```

---

## 5. Pré-requisitos

Para executar o projeto localmente, certifique-se de possuir:
- **Node.js** (versão 18 ou superior, recomendado v20+)
- **npm** (incluso com o Node.js) ou gerenciador de pacotes equivalente
- Uma conta gratuita no [Supabase](https://supabase.com/)

---

## 6. Configuração do Banco de Dados no Supabase

1. Crie uma conta gratuita em [supabase.com](https://supabase.com/) e crie um novo projeto (ex: `controle-despesas`).
2. Aguarde a inicialização do banco de dados (leva cerca de 1 a 2 minutos).
3. No menu lateral do Supabase, clique em **SQL Editor**.
4. Abra o arquivo [`supabase-schema.sql`](./supabase-schema.sql) deste repositório, copie todo o seu conteúdo e cole no SQL Editor do Supabase.
5. Clique em **Run** (Executar). O script irá:
   - Criar as tabelas `public.profiles` e `public.expenses`.
   - Configurar o trigger para sincronizar novos usuários com a tabela `profiles`.
   - Ativar o **Row Level Security (RLS)** em ambas as tabelas.
   - Criar as políticas que garantem que cada usuário só pode ler, criar, editar e excluir seus próprios registros.
6. Vá em **Project Settings** > **API** no Supabase e copie:
   - **Project URL**
   - **Project API Keys** (a chave `anon` `public`).

---

## 7. Instalação e Execução Local

1. Clone o repositório ou navegue até o diretório do projeto:
   ```bash
   cd Controle_de_Despesas
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Crie um arquivo `.env` na raiz do projeto copiando o modelo `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Abra o arquivo `.env` e preencha com as suas credenciais do Supabase:
   ```env
   VITE_SUPABASE_URL=https://seu-projeto.supabase.co
   VITE_SUPABASE_ANON_KEY=sua-chave-anon-publica
   ```

5. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

6. Acesse a aplicação no seu navegador:
   `http://localhost:5173`

---

## 8. Políticas de Segurança e Isolamento (RLS)

A segurança da aplicação **não depende exclusivamente do frontend**. Mesmo que um usuário mal-intencionado tente chamar o endpoint do Supabase diretamente:

1. **Leitura:** A política `using (auth.uid() = user_id)` impede qualquer usuário de ler despesas de outra conta.
2. **Inserção:** A regra `with check (auth.uid() = user_id)` rejeita tentativas de forjar lançamentos para outros usuários.
3. **Edição e Exclusão:** As políticas limitam alterações estritamente aos registros cujo `user_id` seja igual ao token JWT do usuário ativo.
4. **Proteção de Chaves:** Somente a chave pública (`anon`) é utilizada no frontend. A chave `service_role` **nunca** é exposta.

---

## 9. Instruções para Publicação no Render (Plano Gratuito)

Para publicar o projeto gratuitamente no Render como **Static Site**:

1. Suba o código para o seu repositório no **GitHub**.
2. Acesse [render.com](https://render.com/) e faça login com sua conta do GitHub.
3. Clique em **New +** e selecione **Static Site**.
4. Conecte o repositório do projeto.
5. Defina as seguintes configurações:
   - **Name:** `controle-de-despesas` (ou o nome de sua preferência)
   - **Branch:** `main`
   - **Build Command:** `npm run build`
   - **Publish Directory:** `dist`
6. Em **Environment Variables**, adicione as seguintes variáveis:
   - `VITE_SUPABASE_URL`: sua URL do Supabase
   - `VITE_SUPABASE_ANON_KEY`: sua chave anônima do Supabase
7. Em **Redirects/Rewrites**, verifique que o arquivo `public/_redirects` já garante que qualquer rota não encontrada seja direcionada para `/index.html` (com status `200`), essencial para SPAs.
8. Clique em **Create Static Site**. O Render iniciará a compilação e fornecerá uma URL pública gratuita (ex: `https://controle-de-despesas.onrender.com`).

---

## 10. Limitações Relevantes dos Serviços Gratuitos

- **Supabase Free Tier:** Projetos gratuitos que passam mais de 7 dias sem atividade podem entrar em modo de pausa temporário. Para reativá-los, basta acessar o painel do Supabase e clicar em *Restore project*.
- **Render Static Site Free:** Os sites estáticos no Render são rápidos e gratuitos, possuindo limite mensal de banda de 100 GB, perfeitamente adequado para uso pessoal e acadêmico.
- **E-mails de Autenticação:** No plano padrão do Supabase, o serviço de envio de e-mails possui uma cota horária de até 30 e-mails por hora (suficiente para projetos individuais e acadêmicos).

---

## 11. Licença

Este projeto é de código aberto, desenvolvido para fins acadêmicos e pessoais.
