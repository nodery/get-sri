declare function getSRI(
  string: string,
  algorithm?: string,
  prefix?: boolean
): string;

declare namespace getSRI {
  const SHA256: string;
  const SHA384: string;
  const SHA512: string;
}

export = getSRI;
