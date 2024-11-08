export default function ShortURL(url: string): string {
  const split_url = url.replace("http://", "").replace("https://", "").split("/");
  const shorter = split_url[0];
  return shorter;
}
