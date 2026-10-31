

# Briefing do Projeto — Controle de Despesas Pessoais

**Nome provisório:** Controle de Despesas  
**Tipo:** Aplicação web responsiva  
**Idioma:** Português do Brasil (pt-BR)  
**Objetivo:** Projeto acadêmico funcional, organizado e utilizável por diferentes pessoas com contas individuais.

---

## 1. Visão geral

Desenvolver uma aplicação web simples e intuitiva para controle de despesas pessoais. Cada usuário deverá possuir sua própria conta, cadastrar suas despesas e acompanhar seus gastos por meio de indicadores e filtros.

O projeto deve atender aos requisitos acadêmicos de CRUD, validação, persistência de dados, interface responsiva e documentação, mas também deve ter qualidade suficiente para ser utilizado no cotidiano por familiares.

**Princípios do projeto:**
- Simplicidade: evitar funcionalidades desnecessárias.
- Boa experiência visual: interface moderna, profissional e intuitiva.
- Organização: código limpo, estrutura coerente e documentação.
- Segurança: cada usuário acessa exclusivamente seus próprios dados.
- Gratuidade: utilizar somente serviços e recursos que possam ser usados sem pagamento.
- Eficiência: evitar implementações excessivamente complexas e consumo desnecessário de tokens.

## 2. Funcionalidades

### 2.1. Autenticação e contas individuais

Cada pessoa terá uma conta própria.

Funcionalidades:
- Cadastro com nome, e-mail e senha.
- Login e logout.
- Recuperação de senha.
- Proteção das páginas internas.
- Persistência da sessão.
- Associação automática das despesas ao usuário autenticado.

**Regra fundamental de segurança:** um usuário nunca poderá visualizar, editar ou excluir despesas pertencentes a outra conta.

### 2.2. Cadastro de despesas

Cada despesa deverá possuir:

| Campo | Descrição |
|---|---|
| Descrição | Nome ou identificação da despesa |
| Valor | Valor monetário em reais |
| Categoria | Categoria da despesa |
| Data | Data em que ocorreu |
| Observações | Campo opcional |

Categorias iniciais:
- Alimentação
- Transporte
- Moradia
- Saúde
- Educação
- Lazer
- Compras
- Contas e serviços
- Outros

### 2.3. Gerenciamento de despesas (CRUD)

Implementar todas as operações:

- **Cadastrar:** registrar uma nova despesa.
- **Consultar:** visualizar os detalhes de uma despesa.
- **Listar:** visualizar as despesas cadastradas.
- **Editar:** alterar informações de uma despesa.
- **Excluir:** remover uma despesa, solicitando confirmação antes da exclusão.

### 2.4. Filtros e organização

Permitir:
- Filtrar despesas por período.
- Filtrar por categoria.
- Visualizar despesas mais recentes.
- Ordenar por data e valor.
- Consultar o histórico de despesas.

### 2.5. Dashboard

Criar uma página inicial com indicadores objetivos:

- Total de despesas no mês.
- Quantidade de despesas registradas.
- Total gasto por categoria.
- Histórico das despesas recentes.
- Representação visual dos gastos por categoria.

Os indicadores devem respeitar o usuário autenticado e os filtros aplicados quando pertinente.

## 3. Regras e validações

- Descrição obrigatória.
- Valor obrigatório e maior que zero.
- Categoria obrigatória.
- Data válida e obrigatória.
- Observações opcionais.
- Impedir valores negativos ou inválidos.
- Utilizar uma representação monetária consistente, evitando problemas de precisão em cálculos financeiros.
- Exibir mensagens claras de sucesso e erro.
- Solicitar confirmação antes de excluir registros.
- Não permitir operações sobre registros de outros usuários.

## 4. Arquitetura e tecnologias

Adotar uma arquitetura simples, sem desenvolver um backend próprio.

**Frontend**
- React
- TypeScript
- Vite
- CSS ou solução de estilização compatível com o projeto.

**Backend como serviço e banco de dados**
- Supabase Auth: autenticação de usuários.
- Supabase PostgreSQL: armazenamento centralizado.
- Supabase Row Level Security (RLS): isolamento e proteção dos dados.

**Repositório e versionamento**
- Git
- GitHub

**Hospedagem**
- Render Static Site, utilizando o plano gratuito.

### 4.1. Estrutura básica do banco de dados

Criar uma estrutura enxuta, com as tabelas necessárias.

**Tabela `profiles`**
- `id`: identificador vinculado ao usuário do Supabase Auth.
- `name`: nome do usuário.
- `created_at`: data de criação.

**Tabela `expenses`**
- `id`: identificador da despesa.
- `user_id`: identificador do proprietário da despesa.
- `description`: descrição.
- `amount`: valor.
- `category`: categoria.
- `date`: data da despesa.
- `notes`: observações opcionais.
- `created_at`: data de criação do registro.
- `updated_at`: data da última atualização.

O campo `user_id` deverá estabelecer a relação entre cada despesa e seu proprietário.

### 4.2. Segurança do banco de dados

Configurar políticas RLS para garantir que:

- O usuário só consulte suas próprias despesas.
- O usuário só cadastre despesas vinculadas à sua conta.
- O usuário só edite suas próprias despesas.
- O usuário só exclua suas próprias despesas.

A segurança não deve depender apenas das verificações feitas no frontend.

Nunca expor a chave `service_role` do Supabase no frontend. Utilizar somente a chave pública apropriada e manter credenciais e variáveis de ambiente fora do repositório.

## 5. Gratuidade e infraestrutura

A gratuidade é um requisito obrigatório, não apenas uma preferência.

Utilizar:
- Supabase Free.
- Render Static Site Free.
- GitHub Free.
- Ferramentas gratuitas de desenvolvimento.

**Restrições obrigatórias:**
- Não contratar planos pagos.
- Não cadastrar cartão de crédito para habilitar serviços.
- Não ativar recursos que possam gerar cobranças.
- Não implementar dependências que exijam assinatura.
- Não utilizar serviços com cobrança obrigatória para executar o projeto.

É aceitável que serviços gratuitos tenham limites, períodos de inatividade ou indisponibilidade temporária. Se um limite gratuito for atingido, priorizar a manutenção do projeto sem custos, mesmo que seja necessário aguardar a renovação da franquia ou reativar um serviço.

Documentar as limitações relevantes do plano gratuito e explicar como configurar os serviços.

## 6. Interface e experiência visual

A qualidade visual é uma prioridade do projeto.

A aplicação deve transmitir organização, confiança, simplicidade e profissionalismo.

Diretrizes:
- Design moderno e minimalista.
- Hierarquia visual bem definida.
- Tipografia consistente.
- Espaçamento equilibrado.
- Cores harmoniosas.
- Cards e indicadores bem apresentados.
- Gráficos de leitura simples.
- Formulários intuitivos.
- Feedback visual para ações.
- Responsividade para computadores e celulares.

Evitar uma aparência genérica de sistema administrativo.

Priorizar a qualidade da experiência visual sem introduzir bibliotecas ou componentes desnecessários.

## 7. Organização do projeto e GitHub

A organização do Git é um requisito do projeto.

O agente deverá atuar também como responsável pelo controle de versão, mantendo o histórico organizado e o repositório apresentável.

### 7.1. Organização do repositório

Manter uma estrutura clara e coerente, adaptada à arquitetura escolhida.


### 7.2. Boas práticas de Git

O agente deverá:

1. Inicializar e configurar o Git caso ainda não esteja configurado.
2. Verificar o estado do repositório antes de realizar alterações.
3. Criar commits pequenos, objetivos e relacionados a mudanças concluídas.
4. Utilizar mensagens de commit claras e padronizadas, preferencialmente em português.
5. Não acumular todas as alterações em um único commit gigante.
6. Não realizar commits de código quebrado ou em estado inconsistente.
7. Não sobrescrever alterações existentes sem verificar sua origem.
8. Não executar comandos destrutivos sem autorização.
9. Manter o histórico de alterações compreensível.
10. Verificar o estado do Git ao finalizar cada etapa relevante.

Exemplos de mensagens:

```text
chore: inicializa estrutura do projeto
feat: implementa cadastro de usuários
feat: adiciona cadastro de despesas
feat: implementa filtros por período
feat: adiciona indicadores no dashboard
fix: corrige validação de valores
style: aprimora responsividade da interface
docs: atualiza documentação do projeto
```

### 7.3. GitHub

O repositório deverá apresentar:
- Nome claro e profissional.
- Descrição objetiva do projeto.
- README completo e bem formatado.
- Estrutura de pastas organizada.
- Histórico de commits coerente.
- `.gitignore` adequado.
- `.env.example` sem informações secretas.
- Instruções para instalação e execução.
- Documentação das configurações do Supabase.
- Imagens ou capturas de tela da aplicação, quando disponíveis.

Não publicar senhas, tokens, chaves privadas, arquivos `.env` ou dados pessoais de usuários.

## 8. README e documentação

O README deverá estar em português do Brasil e conter:

1. Nome e descrição do projeto.
2. Objetivo da aplicação.
3. Funcionalidades implementadas.
4. Tecnologias utilizadas.
5. Estrutura do projeto.
6. Pré-requisitos.
7. Passo a passo de instalação.
8. Configuração das variáveis de ambiente.
9. Configuração do Supabase.
10. Instruções para executar localmente.
11. Instruções para publicação no Render.
12. Explicação da estrutura do banco e das políticas RLS.
13. Limitações dos serviços gratuitos.

A documentação deve refletir o que realmente foi implementado. Não declarar funcionalidades como concluídas se ainda não estiverem funcionando.

## 9. Testes e critérios de conclusão

Verificar:

- Cadastro e login de usuários.
- Logout e persistência da sessão.
- Recuperação de senha.
- Cadastro de despesas.
- Consulta e listagem.
- Edição e exclusão.
- Filtros e indicadores.
- Validação dos campos.
- Persistência após atualizar a página.
- Isolamento entre duas contas diferentes.
- Proteção das operações no banco de dados.
- Responsividade.
- Ausência de erros relevantes no console.
- Instalação e execução seguindo o README.

**Teste de isolamento obrigatório:** cadastrar duas contas diferentes e verificar que cada uma consegue visualizar e gerenciar somente suas próprias despesas.

## 10. Escopo: o que não implementar agora

Para evitar complexidade e consumo desnecessário de tokens, não implementar nesta primeira versão:

- Controle de receitas.
- Cartões de crédito.
- Contas bancárias.
- Investimentos.
- Integração com bancos.
- Planejamento financeiro avançado.
- Metas e orçamentos complexos.
- Aplicativo nativo para celular.
- Compartilhamento de despesas entre usuários.
- Inteligência artificial.
- Notificações avançadas.

O foco é entregar um sistema de despesas pessoais funcional, seguro, visualmente bem construído e fácil de utilizar.

---

# 11. Orientações de execução para o agente de IA

O agente deverá trabalhar de forma organizada, econômica e incremental.

**Não começar implementando tudo de uma vez.**

### Etapa 1 — Análise e planejamento

- Inspecionar os arquivos e o estado atual do projeto.
- Ler este briefing integralmente.
- Identificar se já existe estrutura ou configuração aproveitável.
- Definir arquitetura e organização de pastas.
- Planejar a estrutura do banco de dados.
- Definir as políticas RLS.
- Apresentar o plano de execução.
- Identificar riscos e dependências.

Nesta etapa, não implementar funcionalidades. Aguardar aprovação do planejamento.

### Etapa 2 — Identidade visual e estrutura

- Definir a direção visual.
- Criar os componentes fundamentais.
- Implementar layout, navegação e responsividade.
- Preparar as páginas de autenticação e a estrutura do dashboard.
- Priorizar consistência visual.

### Etapa 3 — Banco de dados e autenticação

- Configurar o Supabase.
- Criar as tabelas e relacionamentos.
- Configurar RLS.
- Implementar cadastro, login, logout e recuperação de senha.
- Testar o isolamento entre usuários.

### Etapa 4 — Funcionalidades

- Implementar CRUD de despesas.
- Implementar filtros.
- Implementar dashboard e indicadores.
- Implementar validações e mensagens de feedback.

### Etapa 5 — Testes e refinamento

- Testar os fluxos principais.
- Corrigir erros.
- Verificar responsividade.
- Testar segurança e isolamento dos dados.
- Revisar a experiência visual.

### Etapa 6 — GitHub, documentação e publicação

- Revisar o histórico de commits.
- Organizar o repositório.
- Atualizar o README.
- Verificar arquivos sensíveis.
- Publicar no GitHub.
- Configurar o Render Static Site.
- Validar a aplicação publicada.

## 12. Primeira instrução ao agente

Ao receber este briefing, execute somente a Etapa 1.

Apresente:

1. Diagnóstico do projeto e do ambiente.
2. Arquitetura recomendada.
3. Estrutura de pastas proposta.
4. Modelo de banco de dados.
5. Estratégia de autenticação e segurança.
6. Direção visual sugerida.
7. Estratégia de Git e organização do GitHub.
8. Etapas de implementação e principais riscos.

**Não comece a desenvolver antes da aprovação.**

Durante todo o projeto, priorize soluções simples, gratuitas, seguras e fáceis de manter. Antes de adicionar uma biblioteca, serviço ou funcionalidade, avalie se ela é realmente necessária.

Evite reescrever arquivos inteiros quando uma alteração pontual for suficiente. Preserve o que já estiver funcionando, faça commits por etapas e mantenha o projeto sempre em um estado organizado.

**Resultado esperado:** uma aplicação web de controle de despesas pessoais, com contas individuais, dados persistidos em banco de dados, interface profissional, código organizado, histórico Git consistente e repositório GitHub pronto para apresentação.

