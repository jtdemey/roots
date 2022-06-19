export const sortObjectsByPropName = (objects: any[], propName: string) =>
  objects.sort((a: any, b: any) => {
    if (!a[propName] || !b[propName]) {
      return -1;
    }
    const firstProp = a[propName];
    const secondProp = b[propName];
    return firstProp < secondProp ? -1 : firstProp > secondProp ? 1 : 0;
  });
