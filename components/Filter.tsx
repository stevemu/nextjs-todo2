export enum FilterEnum {
  ALL = 'ALL',
  COMPLETED = 'COMPLETED',
  UNCOMPLETED = 'UNCOMPLETED',
}

export const Filter = ({
  value,
  onChange,
}: {
  value: FilterEnum;
  onChange: (filterType: FilterEnum) => void;
}) => {
  return (
    <select
      value={value}
      onChange={(e) => {
        onChange(e.target.value as unknown as FilterEnum);
      }}>
      <option value={FilterEnum.ALL}>all</option>
      <option value={FilterEnum.COMPLETED}>completed</option>
      <option value={FilterEnum.UNCOMPLETED}>uncompleted</option>
    </select>
  );
};
