export const getUrl = <T>(path: string, params: T): string => {
  let url = path;

  for (const key in params) {
    url += url.replace(`:${key}`, `${params[key]}`);
  }

  return url;
};
