export function testId(id: string) {
  return process.env.NODE_ENV === "test" ? { "data-testid": id } : {};
}
