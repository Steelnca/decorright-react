
export const slugify = (text:string) => {
  return text
    .toString()                     // Cast to string
    .toLowerCase()                  // Convert the string to lowercase letters
    .trim()                         // Remove whitespace from both sides
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^a-z0-9-]+/g, '')   // Remove all non-alphanumeric chars except hyphens
    .replace(/-+/g, '-');           // Replace multiple - with single -
};
