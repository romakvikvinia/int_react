export function groupMyArray(amount: any) {
  return (array: any) =>
    array.reduce((array: any, element: any, index: number) => {
      if (index % amount > 0) {
        array.push(array.pop().concat([element]));
      } else {
        array.push([element]);
      }

      return array;
    }, []);
}
