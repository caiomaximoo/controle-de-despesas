/**
 * Mapeia mensagens técnicas de erro do Supabase e do PostgreSQL
 * para mensagens claras e amigáveis em português do Brasil (pt-BR).
 */
export function translateErrorMessage(error: any): string {
  if (!error) return 'Ocorreu um erro inesperado.';

  const message: string =
    typeof error === 'string'
      ? error
      : error?.message || error?.error_description || String(error);

  const lower = message.toLowerCase();

  // Autenticação - Credenciais e Usuário
  if (lower.includes('invalid login credentials')) {
    return 'E-mail ou senha incorretos.';
  }
  if (lower.includes('user already registered') || lower.includes('already exists')) {
    return 'Já existe uma conta cadastrada com este e-mail.';
  }
  if (lower.includes('email not confirmed')) {
    return 'Por favor, confirme seu e-mail antes de acessar.';
  }
  if (lower.includes('password should be at least') || lower.includes('password is too short')) {
    return 'A senha deve conter no mínimo 6 caracteres.';
  }
  if (lower.includes('signup requires a valid password')) {
    return 'Por favor, digite uma senha válida.';
  }
  if (lower.includes('user not found')) {
    return 'Não encontramos nenhum usuário com este e-mail.';
  }

  // URL / Configuração / Rede
  if (lower.includes('invalid path specified in request url')) {
    return 'Erro de conexão: a URL do Supabase está incorreta no arquivo .env (não deve conter /rest/v1).';
  }
  if (lower.includes('failed to fetch') || lower.includes('networkerror') || lower.includes('load failed')) {
    return 'Não foi possível conectar ao servidor. Verifique sua conexão com a internet ou as credenciais do Supabase.';
  }

  // Limite de Requisições / Rate Limit
  if (lower.includes('rate limit') || lower.includes('over_request_rate_limit') || lower.includes('too many requests')) {
    return 'Muitas tentativas em pouco tempo. Por favor, aguarde alguns minutos antes de tentar novamente.';
  }

  // Sessão e Tokens
  if (lower.includes('jwt expired') || lower.includes('token is expired')) {
    return 'Sua sessão expirou. Por favor, faça login novamente.';
  }

  // Políticas de Segurança e Banco de Dados (RLS)
  if (lower.includes('row-level security') || lower.includes('violates row-level security policy')) {
    return 'Operação não permitida pela política de segurança da sua conta.';
  }
  if (lower.includes('duplicate key value') || lower.includes('unique constraint')) {
    return 'Já existe um registro com estas informações.';
  }

  // Mensagem genérica caso nenhuma regra bata
  return message;
}
