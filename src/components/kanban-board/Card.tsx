import { motion } from 'framer-motion';
import { formatISODate } from '../../utils/datetime.utils';
import DropIndicatior from './DropIndicatior';
import Task from '../../common/models/task';
import { TaskStatusEnum } from '../../common/enum/TaskStatusEnum';
import React from 'react';

interface Props {
  data: Task;
  borderColors: string;
  column: TaskStatusEnum;
  handleDragStart: any;
  onClickEdit: (data: Task) => void;
}

const CardComponent = ({ data, borderColors, column, handleDragStart, onClickEdit }: Props) => {
  return (
    <>
      <DropIndicatior beforeId={String(data.id)} column={column} />
      <motion.div
        layout
        layoutId={String(data.id)}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, { ...data, column })}
        className={`cursor-grab rounded-lg border grid p-4 gap-2 active:cursor-grabbing shadow-md bg-white border-l-4 ${borderColors}`}
        onClick={() => {
          onClickEdit(data);
        }}
      >
        <p className="text-md text-neutral-800 font-bold text-start">{data.title}</p>
        {data.description && <p className="text-md text-neutral-800 line-clamp-4 text-start">{data.description}</p>}
        <div>
          <p className="text-sm text-neutral-400 text-start">{`สร้างวันที่: ${formatISODate(data.createdAt)}`}</p>
          <p className="text-sm text-neutral-400 text-start">{`แก้ไขวันที่: ${formatISODate(data.updatedAt)}`}</p>
        </div>
      </motion.div>
    </>
  );
};

const Card = React.memo(CardComponent);
export default Card;
