import { Grid, makeStyles, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Icon, Form } from "semantic-ui-react";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import WOW from "wow.js";
import { send } from "emailjs-com";
import { message } from "antd";
import { LoadingButton } from "@mui/lab";

const Contact = () => {
  const width = window.innerWidth;
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const wow = new WOW();
    wow.init();
  }, []);

  const sendEmail = (e) => {
    setLoading(true);
    e.preventDefault();
    const infos = {
      from_name: name,
      to_name: "Erhan Yaylali",
      message: content,
      reply_to: "erhanyaylali9@gmail.com",
    };

    const {
      REACT_APP_EMAIL_SERVICE_ID,
      REACT_APP_EMAIL_TEMPLATE_ID,
      REACT_APP_EMAIL_USER_ID,
    } = process.env;

    send(
      REACT_APP_EMAIL_SERVICE_ID,
      REACT_APP_EMAIL_TEMPLATE_ID,
      infos,
      REACT_APP_EMAIL_USER_ID
    )
      .then(() => {
        message.success("Email Sent Successfully!");
        setName("");
        setEmail("");
        setContent("");
      })
      .catch(() => {
        message.error("Email Could not Sent!");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Grid
      container
      alignItems="flex-start"
      justifyContent="center"
      className={classes.root}
      id="Contact"
      style={{ paddingTop: width < 450 ? "20px" : "20px" }}
    >
      <Grid
        container
        item
        xs={10}
        md={6}
        justifyContent="center"
        className="wow bounceInLeft"
        data-wow-duration="1s"
        data-wow-delay="0.5s"
      >
        <Form className={classes.form} onSubmit={sendEmail}>
          <Grid
            className="wow bounceInLeft"
            data-wow-duration="1s"
            data-wow-delay="0.5s"
          >
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              className={classes.contact}
            >
              <ContactSupportIcon className={classes.icon} fontSize="large" />
              <Typography
                className={classes.title}
                align="center"
                style={{ fontSize: width < 450 ? "25px" : "35px" }}
              >
                Contact Me
              </Typography>
            </Grid>
          </Grid>
          <Form.Input
            label="Name Surname"
            placeholder="Name"
            value={name}
            required
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Input
            label="Email Address"
            placeholder="Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.TextArea
            label="Content"
            placeholder="Content"
            value={content}
            required
            onChange={(e) => setContent(e.target.value)}
          />
          <LoadingButton
            variant="contained"
            className={classes.sendbutton}
            type="submit"
            color="info"
            loading={loading}
          >
            Send
          </LoadingButton>
        </Form>
      </Grid>
      <Grid
        container
        item
        xs={12}
        justifyContent="center"
        className={classes.infos}
      >
        <Grid
          item
          container
          xs={12}
          justifyContent="center"
          className="wow bounceInLeft"
          data-wow-duration="1s"
          data-wow-delay="0.5s"
        >
          <Typography
            style={{ fontSize: width < 450 ? "12px" : "16px" }}
            className={classes.socialInfo}
            variant="overline"
          >
            E-Mail: erhanyaylali9@gmail.com
          </Typography>
        </Grid>
        <Grid
          item
          container
          xs={12}
          justifyContent="center"
          className="wow bounceInLeft"
          data-wow-duration="1s"
          data-wow-delay="0.5s"
        >
          <Typography
            style={{ fontSize: width < 450 ? "12px" : "16px" }}
            className={classes.socialInfo}
            variant="overline"
          >
            Mobile Phone: +45 50 23 19 14
          </Typography>
        </Grid>
      </Grid>
      <Grid
        container
        item
        xs={12}
        justifyContent="center"
        className={classes.socials}
      >
        <Grid
          container
          item
          xs={6}
          lg={6}
          className="wow bounceInLeft"
          data-wow-duration="1s"
          data-wow-delay="0.5s"
        >
          <Grid xs={12} md={3} item className={classes.items}>
            <a
              href="mailto:erhanyaylali9@gmail.com"
              className={classes.button}
              style={{ fontSize: width < 450 ? "1.3rem" : "1.3rem" }}
            >
              <Icon name="mail" />
              <p>GMAIL</p>
            </a>
          </Grid>
          <Grid xs={12} md={3} item className={classes.items}>
            <a
              href="https://www.linkedin.com/in/erhanyaylali/"
              className={classes.button}
              style={{ fontSize: width < 450 ? "1.3rem" : "1.3rem" }}
            >
              <Icon name="linkedin" />
              <p>LinkedIn</p>
            </a>
          </Grid>
          <Grid xs={12} md={3} item className={classes.items}>
            <a
              href="https://github.com/erhanyaylali1/"
              className={classes.button}
              style={{ fontSize: width < 450 ? "1.3rem" : "1.3rem" }}
            >
              <Icon name="github" />
              <p>Github</p>
            </a>
          </Grid>
          <Grid xs={12} md={3} item className={classes.items}>
            <a
              href="https://www.instagram.com/erhanyaylali/"
              className={classes.button}
              style={{ fontSize: width < 450 ? "1.3rem" : "1.3rem" }}
            >
              <Icon name="instagram" />
              <p>Instagram</p>
            </a>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Contact;

const useStyles = makeStyles(() => ({
  icon: {
    color: "white",
    marginRight: "10px",
  },
  contact: {
    margin: "30px 0",
  },
  socials: {
    marginTop: "20px",
    marginBottom: "20px",
  },
  socialInfo: {
    color: "white",
    textTransform: "initial",
  },
  title: {
    color: "white",
  },
  form: {
    width: "100%",
    "& label": {
      color: "white !important",
      marginBottom: "15px !important",
      fontSize: "16px !important",
    },
  },
  root: {
    height: "95vh",
    backgroundColor: "#3D138D",
  },
  sendbutton: {
    float: "right",
    marginTop: "10px",
  },
  button: {
    color: "#bbb",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "10px",
    "&:hover": {
      transform: "scale(1.1)",
      color: "#fff",
    },
    "& > i": {
      marginRight: "15px",
    },
  },
  items: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    fontSize: "1.5rem",
  },
}));
