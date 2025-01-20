export const getImageUrl = (url: string | null): string | undefined => {
  if (url == null) {
    return undefined;
  } else if (url.startsWith('https://')) {
    return url;
  } else {
    return import.meta.env.VITE_API_IMAGE_ACCESS + url;
  }
};
