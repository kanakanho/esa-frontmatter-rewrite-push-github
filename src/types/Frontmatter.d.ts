export type Frontmatter = {
  isActive: boolean;
  number: number;
  title: string;
  date: string;
  tags: string[];
  options?: options;
};

export type options = {
  description?: string;
  repository?: string;
  youtube?: string;
  website?: string;
  image?: string;
};

export type YamlParse = {
  isActive: boolean;
  tags: string[];
} & options;
