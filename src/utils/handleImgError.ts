export const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>, fallback?: string) => {
  const img = e.currentTarget;
  if (fallback && img.src !== fallback) {
    img.src = fallback;
  } else if (!fallback) {
    img.style.display = 'none';
  }
  // If fallback is provided but already showing the fallback (i.e., fallback itself failed), do nothing.
};
