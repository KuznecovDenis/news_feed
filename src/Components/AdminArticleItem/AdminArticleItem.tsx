import React, { useRef, useState, ChangeEvent, FormEvent, FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, CardActionArea } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

import { InputErrors, InputName, InputRefs, InputValues } from './types';
import { getErrors, getImage } from './helpers';
import {
  createPartnerArticle,
  deletePartnerArticle,
  getPartnerArticle,
  updatePartnerArticle,
  uploadFile,
} from '../../api';

export const AdminArticleItem: FC = () => {
  const { id } = useParams();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const closeSnackbar = () => {
    setSnackbarMessage(null);
  };

  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);
  const inputRefs: InputRefs = {
    'company-name': useRef<HTMLInputElement>(),
    title: useRef<HTMLInputElement>(),
    description: useRef<HTMLTextAreaElement>(),
    text: useRef<HTMLTextAreaElement>(),
    image: useRef<HTMLInputElement>(),
  };

  const [inputErrors, setInputErrors] = useState<InputErrors>({
    'company-name': '',
    title: '',
    description: '',
    text: '',
    image: '',
  });
  const [inputValues, setInputValues] = useState<InputValues>({
    'company-name': '',
    title: '',
    description: '',
    text: '',
    image: '',
  });
  const onChangeInput = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const input = event.currentTarget;
    const name = input.name;
    const value = input.value;

    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const deleteArticle = async () => {
    if (!id) {
      return;
    }

    deletePartnerArticle(id)
      .then(() => {
        setSnackbarMessage('✅ Статья удалена');
      })
      .catch((error) => {
        setSnackbarMessage(`❌ ${error.message}`);
      });
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // 1. Собрать данные
    const data = new FormData();

    Object.entries(inputValues).forEach(([name, value]) => {
      data.append(name, value);
    });

    // 2. Проверить данные
    const errors = await getErrors(Array.from(data.entries()) as [InputName, FormDataEntryValue][]);
    const errorsEntries = Object.entries(errors);

    // 3.1 Подстветить ошибки
    setInputErrors(errors);

    // 3.2 Сфокусироваться на первом ошибочном инпуте
    const errorInput = errorsEntries.find(([, value]) => value.length > 0);

    if (errorInput) {
      const name = errorInput[0] as InputName;
      const inputRef = inputRefs[name];

      if (inputRef.current) {
        inputRef.current.focus();
      }

      return;
    }

    // 4. Если все ок, отправить данные
    if (id) {
      updatePartnerArticle(id, inputValues)
        .then(() => {
          setSnackbarMessage('✅ Статья обновлена');
        })
        .catch((error) => {
          setSnackbarMessage(`❌ ${error.message}`);
        });
    } else {
      createPartnerArticle(inputValues)
        .then(() => {
          setSnackbarMessage('✅ Статья создана');
        })
        .catch((error) => {
          setSnackbarMessage(`❌ ${error.message}`);
        });
    }
  };

  const showFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.currentTarget.files;

    if (files === null || !files.length) {
      return;
    }

    const file = files[0];

    if (file.size === 0 || !file.type.startsWith('image/')) {
      return;
    }

    const image = await getImage(file);

    if (image.width < 200 || image.height < 200) {
      setInputErrors({
        ...inputErrors,
        image: 'Изображение должно быть минимум 200×200',
      });

      return;
    }

    try {
      const url = await uploadFile(file);

      setInputValues({
        ...inputValues,
        image: url,
      });
    } catch (error: any) {
      setSnackbarMessage(`❌ ${error.message}`);
    }
  };

  useEffect(() => {
    if (!id) {
      return;
    }

    (async () => {
      const data = await getPartnerArticle(id);

      setInputValues({
        'company-name': data['company-name'],
        title: data.title,
        description: data.description,
        text: data.text,
        image: data.image,
      });
    })();
  }, [id]);

  return (
    <Box component="form" noValidate onSubmit={onSubmit}>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={9}>
          <Typography variant={'h4'} gutterBottom>
            {id ? `Редактирование статьи «${inputValues.title}»` : 'Новая статья'}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="submit" variant="contained" color="success" sx={{ mr: 1 }}>
              Сохранить
            </Button>

            {id && (
              <div>
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls={open ? 'long-menu' : undefined}
                  aria-expanded={open ? 'true' : undefined}
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="long-menu"
                  MenuListProps={{
                    'aria-labelledby': 'long-button',
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={deleteArticle}>Удалить</MenuItem>
                </Menu>
              </div>
            )}
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            label="Компания"
            variant="outlined"
            margin="normal"
            name="company-name"
            value={inputValues['company-name']}
            onChange={onChangeInput}
            ref={inputRefs['company-name']}
            error={Boolean(inputErrors['company-name'].length)}
            helperText={inputErrors['company-name']}
          />
          <TextField
            fullWidth
            label="Название статьи"
            variant="outlined"
            margin="normal"
            name="title"
            value={inputValues.title}
            onChange={onChangeInput}
            ref={inputRefs.title}
            error={Boolean(inputErrors.title.length)}
            helperText={inputErrors.title}
          />
          <TextField
            fullWidth
            multiline
            maxRows={4}
            label="Подводка"
            variant="outlined"
            margin="normal"
            name="description"
            value={inputValues.description}
            onChange={onChangeInput}
            ref={inputRefs.description}
            error={Boolean(inputErrors.description.length)}
            helperText={inputErrors.description}
          />
          <TextField
            fullWidth
            multiline
            maxRows={12}
            label="Текст"
            variant="outlined"
            margin="normal"
            name="text"
            value={inputValues.text}
            onChange={onChangeInput}
            ref={inputRefs.text}
            error={Boolean(inputErrors.text.length)}
            helperText={inputErrors.text}
          />
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardActionArea>
              <CardMedia component="img" height="140" image={inputValues.image} />
              <CardContent>
                <TextField
                  type="file"
                  name="image"
                  fullWidth
                  variant="outlined"
                  onChange={showFile}
                  ref={inputRefs.image}
                  error={Boolean(inputErrors.image.length)}
                  helperText={inputErrors.image}
                />
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>

      <Snackbar
        open={typeof snackbarMessage === 'string'}
        autoHideDuration={6000}
        onClose={closeSnackbar}
        message={snackbarMessage}
      />
    </Box>
  );
};
