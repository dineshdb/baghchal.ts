export function IndexToXY(index: number): Array<number> {
  const y = index % 5;
  const x = Math.floor(index / 5);
  return [x, y];
}

export function Distance(first: number, second: number): number {
  const [x1, y1] = IndexToXY(first);
  const [x2, y2] = IndexToXY(second);
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

export function MidPoint(first: number, second: number): number {
  const [x1, y1] = IndexToXY(first);
  const [x2, y2] = IndexToXY(second);
  const x = (x1 + x2) / 2;
  const y = (y1 + y2) / 2;
  return x * 5 + y;
}
