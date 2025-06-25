import React, { useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { TextField } from '@mui/material';
import { TaskStatusEnum } from '../../common/enum/TaskStatusEnum';
import { motion } from 'framer-motion';
import { useTaskStore } from '../../stores/task/useTaskStore';
import { showErrorToast, showSuccessToast } from '../../utils/toast';

interface Props {
  column: TaskStatusEnum;
  setCards: (data: any) => void;
}

const AddCard = ({ column, setCards }: Props) => {
  const { createTask } = useTaskStore();
  const [text, setText] = useState('');
  const [adding, setAdding] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!text.trim().length) return;

    create();
  };

  const create = async () => {
    try {
      const newCard = {
        status: column,
        title: text.trim(),
      };

      await createTask(newCard);
      showSuccessToast('บันทึกข้อมูลสำเร็จ');
      // setCards((pv: any) => [...pv, result]);

      setAdding(false);
    } catch (err) {
      showErrorToast('บันทึกข้อมูลไม่สำเร็จ');
    }
  };

  return (
    <>
      {adding ? (
        <motion.form layout onSubmit={handleSubmit} className="mt-3">
          <TextField onChange={(e) => setText(e.target.value)} autoFocus label="Add Task" placeholder="Add new Task..." className="w-full" />
          <div className="mt-1.5 flex items-center justify-end gap-1.5">
            <button onClick={() => setAdding(false)} className="px-3 py-1.5 text-xs text-neutral-400 transition-colors">
              Close
            </button>
            <button type="submit" className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors">
              <span>Add</span>
              <FiPlus />
            </button>
          </div>
        </motion.form>
      ) : (
        <motion.button
          layout
          onClick={() => setAdding(true)}
          className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors"
        >
          <span>Add card</span>
          <FiPlus />
        </motion.button>
      )}
    </>
  );
};

export default AddCard;
