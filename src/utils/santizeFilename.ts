export function sanitizeFilename(filename: string) {
  return filename.replace(/\s+/g, '_');
}
