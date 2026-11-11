export function filterTopicsByQuery(topics, query) {
  if (!Array.isArray(topics)) return [];
  const q = String(query || '').trim().toLowerCase();
  if (!q) return topics;
  return topics.filter((topic) => {
    const title = String(topic?.title || '').toLowerCase();
    const desc = String(topic?.description || '').toLowerCase();
    return title.includes(q) || desc.includes(q);
  });
}

export function shouldShowMobileWorkspaceNotice(pathname, viewportWidth) {
  const width = Number(viewportWidth || 1280);
  const path = String(pathname || '/');
  // Only show compact screen advisory inside the Monaco split-screen code editor (/curve/:id) on very narrow screens
  return path.startsWith('/curve/') && width < 640;
}

export function getTopicInitials(title) {
  const words = String(title || 'Curve')
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (words.length === 0) return 'CV';
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[1][0]).toUpperCase();
}
