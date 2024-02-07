export type User = {
    userId: number;
    username: string;
    password: string;
    provider: 'local' | 'auth0';
    provider_id?: string;
  };
  