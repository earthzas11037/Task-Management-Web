import { TaskStatusEnum } from '../../common/enum/TaskStatusEnum';

interface Props {
  beforeId: string | null;
  column: TaskStatusEnum;
}

const DropIndicatior = ({ beforeId, column }: Props) => {
  return <div data-before={beforeId || '-1'} data-column={column} className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0" />;
};

export default DropIndicatior;
