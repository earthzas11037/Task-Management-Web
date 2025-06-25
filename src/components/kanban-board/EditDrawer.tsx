import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Box,
  Button,
  Divider,
  Drawer,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { CgClose } from 'react-icons/cg';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Task from '../../common/models/task';
import { TaskStatusEnum } from '../../common/enum/TaskStatusEnum';
import { formatISODate } from '../../utils/datetime.utils';
import { useTaskStore } from '../../stores/task/useTaskStore';
import Files from '../../common/models/files';
import { IconTrash } from '@tabler/icons-react';
import { uploadFilesImage } from '../../services/api/task';
import { CreateTaskBody } from '../../services/api-request/task/CreateTaskAPIRequest';
import { showErrorToast, showSuccessToast } from '../../utils/toast';
import useAppStore from '../../stores/app/useAppStore';

interface Props {
  open: boolean;
  data: Task;
  status: TaskStatusEnum[];
  // onSubmit: (data: Task) => void;
  onClose: () => void;
}

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'space-between',
}));

const EditDrawer = ({ open, data, status, onClose }: Props) => {
  const { setLoading } = useAppStore();
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
    control,
    setValue,
    watch,
  } = useForm<Task>({
    defaultValues: useMemo(() => data, [data]),
  });
  const { updateTask } = useTaskStore();
  const uploadImage = useTaskStore((s) => s.uploadImage);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [pendingFiles, setPendingFiles] = useState<File[]>([]); // สำหรับ preview ไฟล์ที่เลือก
  const existingImages = watch('images') || [];

  useEffect(() => {
    reset(data);
    setPendingFiles([]);
  }, [data]);

  const handleFinalSubmit: SubmitHandler<Task> = async (formData) => {
    try {
      setLoading(true);
      const uploaded: Files[] = [];

      for (const file of pendingFiles) {
        console.log(file);
        const result = await uploadFilesImage(file);
        if (result) uploaded.push(result);
      }

      const mergedImages = [...existingImages, ...uploaded];

      console.log(mergedImages);
      const value = {
        ...formData,
        images: mergedImages,
      };
      const updateBody: CreateTaskBody = {
        title: value.title,
        description: value.description,
        status: value.status,
        imageIds: value.images.map((x) => x.id),
      };
      await updateTask(updateBody, value.id);
      showSuccessToast('บันทึกข้อมูลสำเร็จ');
      onClose();
    } catch (err) {
      showErrorToast('บันทึกข้อมูลไม่สำเร็จ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      variant="temporary"
      PaperProps={{
        sx: (theme) => ({
          width: '100%',
          maxWidth: '400px',
          [theme.breakpoints.down('sm')]: {
            width: '100vw',
          },
          boxShadow: theme.shadows[8],
        }),
      }}
    >
      <div>
        <DrawerHeader className="py-2 px-6">
          <Typography variant="h4">แก้ไข Task</Typography>
          <IconButton onClick={onClose}>
            <CgClose />
          </IconButton>
        </DrawerHeader>
        <Divider />

        <form onSubmit={handleSubmit(handleFinalSubmit)}>
          <div className="flex flex-col gap-4 p-6">
            <TextField
              {...register('title', { required: 'Title is required' })}
              label="Title"
              error={!!errors.title?.message}
              helperText={errors.title?.message}
            />
            <TextField
              {...register('description', { required: 'Description is required' })}
              label="Description"
              multiline
              rows={4}
              error={!!errors.description?.message}
              helperText={errors.description?.message}
            />

            <FormControl fullWidth error={!!errors.status?.message}>
              <InputLabel id="status-label">สถานะ</InputLabel>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select {...field} labelId="status-label" label="Status">
                    {status.map((item) => (
                      <MenuItem value={item} key={`status-${item}`}>
                        {item.toUpperCase()}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {!!errors.status?.message && <FormHelperText>{errors.status?.message}</FormHelperText>}
            </FormControl>

            {/* Preview: existing images */}
            {(existingImages.length > 0 || pendingFiles.length > 0) && (
              <div className="grid grid-cols-3 gap-3">
                {[
                  ...existingImages.map((img) => ({ type: 'existing' as const, data: img })),
                  ...pendingFiles.map((file) => ({ type: 'new' as const, data: file })),
                ].map((item, idx) => {
                  const imageUrl = item.type === 'existing' ? item.data.url : URL.createObjectURL(item.data);

                  return (
                    <div key={idx} className="relative group">
                      <img src={imageUrl} className="rounded-lg border max-h-32 w-full object-cover" />
                      <div
                        className="absolute top-0 right-0 cursor-pointer p-2"
                        onClick={() => {
                          if (item.type === 'existing') {
                            const updated = existingImages.filter((img) => img !== item.data);
                            setValue('images', updated);
                          } else {
                            const updated = pendingFiles.filter((file) => file !== item.data);
                            setPendingFiles(updated);
                          }
                        }}
                      >
                        <IconTrash size={20} className="text-red-500" />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Preview: new images */}
            {/* {pendingFiles.length > 0 && (
              <div>
                <Typography className="text-sm text-neutral-500 mb-2">รูปภาพใหม่ที่ยังไม่อัปโหลด</Typography>
                <div className="grid grid-cols-3 gap-3">
                  {pendingFiles.map((file, idx) => (
                    <div key={idx} className="relative group">
                      <img src={URL.createObjectURL(file)} className="rounded-lg border max-h-32 w-full object-cover" />
                      <div
                        className="absolute top-0 right-0 cursor-pointer p-2"
                        onClick={() => {
                          const updated = [...pendingFiles];
                          updated.splice(idx, 1);
                          setPendingFiles(updated);
                        }}
                      >
                        <IconTrash size={20} className="text-red-500" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )} */}

            {/* Image Upload */}
            <input
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              ref={fileInputRef}
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                setPendingFiles((prev) => [...prev, ...files]);
              }}
            />

            <Button variant="outlined" onClick={() => fileInputRef.current?.click()}>
              เลือกรูปภาพ
            </Button>

            {/* Timestamp */}
            <div>
              <p className="text-base text-neutral-400">{`สร้างวันที่: ${formatISODate(data.createdAt)}`}</p>
              <p className="text-base text-neutral-400">{`แก้ไขวันที่: ${formatISODate(data.updatedAt)}`}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-row gap-x-3">
              <Button variant="contained" type="submit" size="large">
                ยืนยัน
              </Button>
              <Button color="error" variant="outlined" size="large" onClick={onClose}>
                ยกเลิก
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Drawer>
  );
};

export default EditDrawer;
