import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
// import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
// import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
// import Typography from "@material-ui/core/Typography";
// import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import Pagination from '@mui/material/Pagination';
import { useContext, useEffect, useState } from "react";
import { LoginContext, BlogContext } from "../App.js";

// import * as React from 'react';
import Box from "@mui/material/Box";
// import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from '@mui/material/Alert';

const axios = require("axios");

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#fff",
  },

  hero: {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://www.salesforce.com/content/dam/blogs/ca/Blog%20Posts/anatomy-of-a-blog-post-deconstructed-header.jpg')`,
    height: "500px",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontSize: "4rem",
    [theme.breakpoints.down("sm")]: {
      height: 300,
      fontSize: "3em",
    },
  },

  blogsContainer: {
    paddingTop: theme.spacing(3),
  },

  blogTitle: {
    fontWeight: 800,
    paddingBottom: theme.spacing(3),
  },

  card: {
    maxWidth: "100%",
  },

  media: {
    height: 240,
  },

  cardActions: {
    display: "flex",
    margin: "0 10px",
    justifyContent: "space-between",
  },

  author: {
    display: "flex",
  },

  paginationContainer: {
    display: "flex",
    justifyContent: "center",
  },
}));

export default function Blogs() {
  // const data = useContext(AppContext);
  // console.log('context data',data)

  const [showError, setShowError] = useState(false);
  const [messageText, setMessageText] = useState('');

  const {username} = useContext(LoginContext);
  // const username = 'cooluser';
  console.log('username: ', username);

  const {
    content,
    addContent,
    title,
    addTitle,
    userBlogs,
    setUserBlogs,
    allUserBlogs,
    setAllUserBlogs,
  } = useContext(BlogContext);

  // const url = "http://localhost:8080";
  // const url = "https://z-prefix-server.herokuapp.com"
  const dev = process.env.NODE_ENV !== 'production';
  const url = dev ? 'http://localhost:8080' : 'https://z-prefix-server.herokuapp.com';
  
  useEffect(() => {
      const getBlogs = async () => {
        console.log('getting blogs for user:', username)
        axios.get(`${url}/blogs/${username}`).then((userBlogs) => {
            setUserBlogs(userBlogs.data);
        });
    };
    getBlogs();
  }, [username]);

  useEffect(() => {
    const getAllBlogs = async () => {
      axios
        .get(`${url}/blogs`)
        // .then((allUserBlogs) => {console.log('allUserBlogs: ', allUserBlogs.data)})
        .then((allUserBlogs) => setAllUserBlogs(allUserBlogs.data));
    };
    getAllBlogs();
  }, []);

  const classes = useStyles();

//   const userBlogs= [
//       {username: '$user1', title: 'How to Skin a Cat', content:'Thats rough', updated_at: 'December 17, 1995 03:24:00'},
//       {username: '$user1', title: 'How to Ride a Dog', content:'Now thats better', updated_at: 'December 17, 1995 03:24:00'},
//       {username: '$user1', title: 'How to Pet a Giraffe', content:'Jump high. Lorem ipsum. aoreet lectus a, sodales diam. Curabitur arcu massa, pretium eu ornare at, mattis et elit. In tincidunt.', updated_at: 'December 17, 1995 03:24:00'}
//   ];

  // async function postBlog(username, title, content) {
  //   // let blog_username = username;
  //   axios({
  //     method: "post",
  //     url: `${url}/blogs`,
  //     data: {
  //       blog_username: username,
  //       title: title,
  //       content: content,
  //     },
  //   });
  // }

  async function postBlog(username, title, content) {
    console.log('posting', username);
    axios({
      method: 'post',
      url: `${url}/blogs`,
      data: {
        blog_username: username,
        title: title,
        content: content
      }
    })
    .then(res => {
      setMessageText(res.data.message)
    })
  }

  // async function editBlog(username, title, content) {
  //   let blog_username = username;
  //   axios({
  //     method: "put",
  //     url: `${url}/blogs`,
  //     data: {
  //       blog_username: username,
  //       title: title,
  //       content: content,
  //     },
  //   });
  // }

  // async function deleteBlog(title) {
  //   return new Promise((resolve, reject) => {
  //     fetch(`${url}/blogs/${title}`, {
  //       method: "DELETE",
  //     });
  //   });
  // }

  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);

  // const handleOpen1 = (e) => {    
  //   e.preventDefault();
  //   setOpen1(true);
  // }
  // const handleOpen = (e) => {
  //   e.preventDefault();
  //   setOpen(true);
  // }
  // const handleClose = (e) => {
  //   e.preventDefault();
  //   setOpen(false);
  // }
  // const handleClose1 = (e) => {
  //   e.preventDefault();
  //   setOpen1(false);
  // }

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   postBlog(username, title, content);
  //   setOpen(false);
  // };

  // const handleEditSubmit = (e) => {
  //   e.preventDefault();
  //   editBlog(username, title, content);
  //   setOpen(false);
  // };

  // const handleClickOpen = (e) => {
  //   e.preventDefault();
  //   setOpen(true);
  // }
  // const handleClickOpen1 = (e) => {
  //   e.preventDefault();
  //   setOpen1(true);
  // }
  const reload=()=>window.location.reload();

  const handleOpen1 = () => setOpen1(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false)
    reload();
  };
  const handleClose1 = () => {
    setOpen1(false)
    reload();
  };

  const handleSubmit = () => {
    postBlog(username, title, content);
    setOpen(false);
    reload();
  };

  // const handleEditSubmit = () => {
  //   editBlog(username, title, content);
  //   setOpen(false);
  //   reload();
  // };

  const handleClickOpen = () => setOpen(true);
  const handleClickOpen1 = () => setOpen1(true);

  return (
    <div className="Blogs">
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <Typography variant="h6" color="primary">
            Blog
          </Typography>
        </Toolbar>
      </AppBar>
      Results from database:
      {JSON.stringify(allUserBlogs)}
      <br></br>
      <br></br>
      <div>
      {showError ? <Alert severity="error">{messageText}</Alert> : <></>}
      </div>
      <div>
        {username ? (
          <div>
            <Box className={classes.hero}>
              <Box>{username} BlogZ</Box>
            </Box>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button onClick={handleOpen}>
                CREATE
              </Button>
            </div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <div>
                  <Button variant="outlined" onClick={handleClickOpen}>
                    Open form dialog
                  </Button>
                  <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>New Post</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Submit a new blog post now!
                      </DialogContentText>
                      <TextField
                        autoFocus
                        margin="dense"
                        id="title"
                        label="Title"
                        type="title"
                        fullWidth
                        variant="standard"
                        onChange={(e) => addTitle(e.target.value)}
                      />
                      <TextField
                        autoFocus
                        margin="dense"
                        id="content"
                        label="Write something worth posting"
                        type="Text"
                        fullWidth
                        multiline
                        onChange={(e) => addContent(e.target.value)}
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button onClick={handleSubmit}>Submit</Button>
                    </DialogActions>
                  </Dialog>
                </div>
              </Box>
            </Modal>
            <Container maxWidth="lg" className={classes.blogsContainer}>
              <Typography variant="h4" className={classes.blogTitle}>
                Your Blogs
              </Typography>
              <Grid container spacing={3}>
                {userBlogs.map((blog, value) => (
                  <Grid item xs={12} sm={6} md={4} key={value}>
                    <Card className={classes.card}>
                      <CardActionArea>
                        <CardMedia
                          className={classes.media}
                          image="https://www.bbvaapimarket.com/wp-content/uploads/2018/04/blogsapis.jpg"
                          title="Contemplative Reptile"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            {blog.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            {blog.content}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions className={classes.cardActions}>
                        <Box className={classes.author}>
                          <Avatar src="http://usafataekwondo.weebly.com/uploads/8/5/4/7/8547743/2866307.jpg" />
                          <Box ml={2}>
                            <Typography variant="subtitle2" component="p">
                              {blog.blog_username}
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              color="textSecondary"
                              component="p"
                            >
                              {blog.updated_at}
                            </Typography>
                          </Box>
                        </Box>
                        {/* <Box>
                          <BookmarkBorderIcon />
                        </Box> */}
                        {/* <Box>
                          <Button
                              variant="outlined"
                              color="inherit"
                              startIcon={<EditIcon style={{ color: "orange" }} />}
                              onClick={handleOpen1}
                          >
                          </Button>
                          
                          <Modal
                            open={open1}
                            onClose={handleClose1}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                          >
                            <Box sx={style}>
                              <div>
                                <Button
                                  variant="outlined"
                                  onClick={handleClickOpen1}
                                >
                                  Open form dialog
                                </Button>
                                <Dialog open={open1} onClose={handleClose1}>
                                  <DialogTitle>{blog.title}</DialogTitle>
                                  <DialogContent>
                                    <DialogContentText>
                                      Edit blog post!
                                    </DialogContentText>
                                    <TextField
                                      autoFocus
                                      margin="dense"
                                      id="content"
                                      label="Write something worth posting"
                                      type="Text"
                                      fullWidth
                                      multiline
                                      onChange={(e) =>
                                        addContent(e.target.value)
                                      }
                                    />
                                  </DialogContent>
                                  <DialogActions>
                                    <Button onClick={handleClose1}>
                                      Cancel
                                    </Button>
                                    <Button onClick={()=>handleEditSubmit(blog.title)}>
                                      Submit
                                    </Button>
                                  </DialogActions>
                                </Dialog>
                              </div>
                            </Box>
                          </Modal>
                        </Box> */}

                        {/* <Box>
                            <Button
                                variant="outlined"
                                color="inherit"
                                startIcon={<DeleteIcon style={{ color: "gray" }} />}
                                onClick={deleteBlog(blog.title)}
                            >
                            </Button>
                        </Box> */}
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              <Box my={4} className={classes.paginationContainer}>
                <Pagination count={10} />
              </Box>
            </Container>

            <Container maxWidth="lg" className={classes.blogsContainer}>
              <Typography variant="h4" className={classes.blogTitle}>
                Browse Blogs
              </Typography>
              <Grid container spacing={3}>
                {allUserBlogs.map((blog, value) => (
                  <Grid item xs={12} sm={6} md={4} key={value}>
                    <Card className={classes.card}>
                      <CardActionArea>
                        <CardMedia
                          className={classes.media}
                          image="https://www.bbvaapimarket.com/wp-content/uploads/2018/04/blogsapis.jpg"
                          title="Contemplative Reptile"
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                            {blog.title}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                          >
                            {blog.content}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      <CardActions className={classes.cardActions}>
                        <Box className={classes.author}>
                          <Avatar src="http://usafataekwondo.weebly.com/uploads/8/5/4/7/8547743/2866307.jpg" />
                          <Box ml={2}>
                            <Typography variant="subtitle2" component="p">
                              {blog.blog_username}
                            </Typography>
                            <Typography
                              variant="subtitle2"
                              color="textSecondary"
                              component="p"
                            >
                              {blog.updated_at}
                            </Typography>
                          </Box>
                        </Box>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
              <Box my={4} className={classes.paginationContainer}>
                <Pagination count={10} />
              </Box>
            </Container>
          </div>
        ) : (
          <Container maxWidth="lg" className={classes.blogsContainer}>
            <Typography variant="h4" className={classes.blogTitle}>
              Browse Blogs
            </Typography>
            <Grid container spacing={3}>
              {allUserBlogs.map((blog, value) => (
                <Grid item xs={12} sm={6} md={4} key={value}>
                  <Card className={classes.card}>
                    <CardActionArea>
                      <CardMedia
                        className={classes.media}
                        image="https://www.bbvaapimarket.com/wp-content/uploads/2018/04/blogsapis.jpg"
                        title="Contemplative Reptile"
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                          {blog.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          component="p"
                        >
                          {blog.content}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                    <CardActions className={classes.cardActions}>
                      <Box className={classes.author}>
                        <Avatar src="http://usafataekwondo.weebly.com/uploads/8/5/4/7/8547743/2866307.jpg" />
                        <Box ml={2}>
                          <Typography variant="subtitle2" component="p">
                            {blog.blog_username}
                          </Typography>
                          <Typography
                            variant="subtitle2"
                            color="textSecondary"
                            component="p"
                          >
                            {blog.updated_at}
                          </Typography>
                        </Box>
                      </Box>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
            <Box my={4} className={classes.paginationContainer}>
              <Pagination count={10} />
            </Box>
          </Container>
        )}
      </div>
    </div>
  );
}
