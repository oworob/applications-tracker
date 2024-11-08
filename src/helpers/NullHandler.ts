export default function NullHandler(val?: any): string {
  if (!val) return "- - -";
  else return val;
}
