export default function serialize<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}
