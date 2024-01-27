import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import React from 'react';
import { Link } from 'react-router-dom';

export const AdminArticles = () => {
  return (
    <>
      <Grid container spacing={2} sx={{ mt: 4 }}>
        <Grid xs={9}>
          <Typography variant={'h4'} gutterBottom>
            Партнерские статьи
          </Typography>
        </Grid>
        <Grid xs={3}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" color="success" component={Link} to="/admin/create">
              Добавить новую
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {[1, 2, 3, 4, 5, 6, 7].map((item) => (
          <Grid item xs={3} key={item}>
            <Card sx={{ maxWidth: 345 }} key={item}>
              <CardActionArea component={Link} to={`/admin/edit/${item}`}>
                <CardMedia component="img" height="140" image={'https://loremflickr.com/320/240/dog/all'} alt="dog" />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    Красивый Пес
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Какой-то текст о том какие красивые бывают песики и какие они умнички Этот текст в несколько строк,
                    а может быть в три строки
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};
