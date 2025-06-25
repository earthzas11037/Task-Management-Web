import { Box, CircularProgress, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import { TaskStatusEnum } from '../../common/enum/TaskStatusEnum';
import Board from '../../components/kanban-board/Board';
import { useTaskStore } from '../../stores/task/useTaskStore';

export default function TaskListPage() {
  const { tasks, fetchTasks, isInitLoading } = useTaskStore();

  const status = [TaskStatusEnum.INCOMPLETED, TaskStatusEnum.COMPLETED];

  useEffect(() => {
    fetchTasks({ page: 1, pageSize: 100, sort: 'id:ASC' });
  }, []);

  return (
    <Box mt={3}>
      <Grid container spacing={3}>
        <Grid>
          <div className="h-[calc(100vh-100px)] w-full overflow-y-auto text-neutral-50">
            {isInitLoading ? (
              <div className="w-full flex items-center justify-center p-4">
                <CircularProgress />
              </div>
            ) : (
              <Board cards={tasks} status={status} setCards={() => {}} />
            )}
          </div>
        </Grid>
      </Grid>
    </Box>
  );
}
