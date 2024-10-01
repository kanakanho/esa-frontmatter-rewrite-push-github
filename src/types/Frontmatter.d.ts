export type Frontmatter = {
  isActive: boolean;
  number: number;
  title: string;
  date: string;
  options?: options;
};

export type options = {
  tags?: string[];
  description?: string;
  repository?: string;
  youtube?: string;
  website?: string;
  image?: string;
};

export type YamlParse = {
  isActive: boolean;
} & options;
