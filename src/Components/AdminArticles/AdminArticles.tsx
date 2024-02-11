import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IPartnerArticle } from '../../types';
import { getPartnersArticles } from '../../api';

export const AdminArticles = () => {
  const [articles, setArticles] = useState<IPartnerArticle[]>([]);

  useEffect(() => {
    (async () => {
      const articles = await getPartnersArticles();

      setArticles(articles);
    })();
  }, []);

  return (
    <>
      <Grid container spacing={2} sx={{ mt: 4 }}>
        <Grid item xs={9}>
          <Typography variant={'h4'} gutterBottom>
            Партнерские статьи
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" color="success" component={Link} to="/admin/create">
              Добавить новую
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {articles.map((item) => (
          <Grid item xs={3} key={item.id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea component={Link} to={`/admin/edit/${item.id}`}>
                <CardMedia component="img" height="140" image={item.image} alt={item.title} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
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
