export default function NullHandler(val?: any): string {
  if (val === undefined || val === null || val.length === 0) return "- - -";
  else return val;
}
