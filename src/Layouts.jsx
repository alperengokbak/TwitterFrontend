import { Container, Grid } from "@mui/material";
import { Widget } from "./MainPage/Home/Widget";
import { Sidebar } from "./MainPage/Sidebar/Sidebar";

export const Layouts = ({ children }) => {
  return (
    <Container maxWidth="lg">
      <Grid container justifyContent={"center"} height="100vh">
        <Grid item xs={1} sm={1} md={2} lg={3} xl={2.2}>
          <Sidebar />
        </Grid>
        <Grid
          item
          xs={11}
          sm={11}
          md={6.5}
          lg={5.5}
          xl={children.type.name === "Message" ? 9.8 : 6.3}
        >
          {children}
        </Grid>
        {children.type.name === "Message" ? null : (
          <Grid
            item
            sx={{
              display: {
                lg: "block",
              },
            }}
            md={3.5}
            lg={3.5}
            xl={3.5}
          >
            <Widget />
          </Grid>
        )}
      </Grid>
    </Container>
  );
};
