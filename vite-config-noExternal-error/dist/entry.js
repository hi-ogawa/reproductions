function slash(path) {
  const isExtendedLengthPath = path.startsWith("\\\\?\\");
  if (isExtendedLengthPath) {
    return path;
  }
  return path.replace(/\\/g, "/");
}
console.log(slash);
