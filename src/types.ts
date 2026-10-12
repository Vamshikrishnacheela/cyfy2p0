export interface FirestoreErrorInfo {
  error: string;
  operationType: 'create' | 'update' | 'delete' | 'list' | 'get' | 'write';
  path: string | null;
  authInfo: {
    userId: string;
    email: string;
    emailVerified: boolean;
    isAnonymous: boolean;
    providerInfo: { providerId: string; displayName: string; email: string; }[];
  }
}

export interface BlogPost {
  id?: string | number;
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  author: string;
  category: string;
  image: string;
  featured: boolean;
  readCount: number;
  link?: string;
}
