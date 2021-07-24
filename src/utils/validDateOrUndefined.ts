export function validDateOrUndefined(dateString?: string) {
  if (dateString) {
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) {
      return undefined;
    }
    return date;
  }
  return undefined;
}

export default validDateOrUndefined;
