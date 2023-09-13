import { Container, Grid } from "@mui/material";
import { Widget } from "./MainPage/Home/Widget";
import { Sidebar } from "./MainPage/Sidebar/Sidebar";

export const Layouts = ({ children }) => {
  return (
    <Container maxWidth="lg">
      <Grid container justifyContent={"center"} height="100vh">
        <Grid item xs={2} sm={2} md={3.5} lg={2.2} xl={2.2}>
          <Sidebar />
        </Grid>
        <Grid
          item
          xs={10}
          sm={10}
          md={8.5}
          lg={children.type.name === "Message" ? 9.8 : 6.3}
          xl={children.type.name === "Message" ? 9.8 : 6.3}
        >
          {children}
        </Grid>
        {children.type.name === "Message" ? null : (
          <Grid
            item
            sx={{
              display: {
                md: "none",
                lg: "block",
              },
            }}
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
