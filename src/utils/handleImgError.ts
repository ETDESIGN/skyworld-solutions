export const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>, fallback?: string) => {
  const img = e.currentTarget;
  if (fallback && img.src !== fallback) {
    img.src = fallback;
  } else {
    img.style.display = 'none';
  }
};
