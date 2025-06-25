import { useEffect, useState } from 'react';
import { styled } from '@mui/material';
import Task from '../../common/models/task';
import { TaskStatusEnum } from '../../common/enum/TaskStatusEnum';
import Column from './Column';
import EditDrawer from './EditDrawer';
import { useTaskStore } from '../../stores/task/useTaskStore';
import { showErrorToast, showSuccessToast } from '../../utils/toast';
import { CreateTaskBody } from '../../services/api-request/task/CreateTaskAPIRequest';

interface Props {
  cards: Task[];
  status: TaskStatusEnum[];
  setCards: (data: any[]) => void;
}

const Board = ({ cards, status, setCards }: Props) => {
  const { updateTask } = useTaskStore();
  const [dataEdit, setDataEdit] = useState<Task>(new Task({}));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const colors = ['text-yellow-400', 'text-green-500'];
  const borderColors = ['border-l-yellow-400', 'border-l-green-500'];

  const toggleDrawer = () => {
    setDrawerOpen((value) => !value);
  };

  const openDrawer = (data: Task) => {
    // console.log(data)
    setDataEdit({ ...data });
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    setDataEdit(new Task(null));
  };

  return (
    <div className="flex h-full w-full gap-3 overflow-scroll p-12 pt-0 items-start justify-start">
      {status.map((item, index) => {
        return (
          <Column
            key={'column-' + index}
            title={item.toUpperCase()}
            column={item}
            color={colors[index] || 'neutral-500'}
            borderColors={borderColors[index] || 'border-l-neutral-500'}
            // headingColor={'neutral-600'}
            cards={cards}
            setCards={setCards}
            onClickEdit={openDrawer}
            onCloseEdit={closeDrawer}
          />
        );
      })}

      <EditDrawer open={drawerOpen} onClose={closeDrawer} data={dataEdit} status={status} />
    </div>
  );
};

export default Board;
