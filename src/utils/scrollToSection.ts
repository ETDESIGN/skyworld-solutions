export const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
  e.preventDefault();
  const section = document.getElementById(sectionId);
  if (section) {
    window.scrollTo({ top: section.offsetTop - 80, behavior: 'smooth' });
  }
};
