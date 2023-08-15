

export function hashUUID(uuid: string) {
  let hash = 5381;

  for (let i = 0; i < uuid.length; i++) {
    const char = uuid.charCodeAt(i);
    hash = ((hash << 5) + hash) + char; /* hash * 33 + char */
  }

  return hash;
}
