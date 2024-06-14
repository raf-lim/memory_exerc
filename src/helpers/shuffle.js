export function shuffle(elems) {
  for (let i = elems.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [elems[i], elems[j]] = [elems[j], elems[i]];
  }
  return elems;
}
