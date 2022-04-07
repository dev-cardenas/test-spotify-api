
interface IListNicknames {
  names: string[];
  order: 'ASC' | 'DESC';
}

export function ListNicknames({ names, order }: IListNicknames) {
  return (
    <ul>
      {
        order === 'ASC' ?
          names.sort().map(name => (<li key={name}>{name}</li>))
        : order === 'DESC' && names.sort().reverse().map(name => (<li key={name}>{name}</li>))
      }
    </ul>
  );
}
