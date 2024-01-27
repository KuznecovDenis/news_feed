import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, CardActionArea } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import React from 'react';
import { useParams } from 'react-router-dom';

export const AdminArticleItem = () => {
  const { id } = useParams();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid xs={9}>
          <Typography variant={'h4'} gutterBottom>
            {id ? 'Редактирование статьи «Как ухаживать за собакой»' : 'Новая статья'}
          </Typography>
        </Grid>
        <Grid xs={3}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" color="success" sx={{ mr: 1 }}>
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
                  <MenuItem onClick={handleClose}>Удалить</MenuItem>
                </Menu>
              </div>
            )}
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid xs={6}>
          <TextField fullWidth label="Компания" variant="outlined" margin="normal" />
          <TextField fullWidth label="Название статьи" variant="outlined" margin="normal" />
          <TextField fullWidth multiline maxRows={4} label="Подводка" variant="outlined" margin="normal" />
          <TextField fullWidth multiline maxRows={12} label="Текст" variant="outlined" margin="normal" />
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={'https://loremflickr.com/320/240/dog/all'}
                alt="green iguana"
              />
              <CardContent>
                <input type="file" />
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};
