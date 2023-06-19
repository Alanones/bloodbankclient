import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box, Skeleton } from "@mui/material";
import Unit from "../components/Units";
import { ClientContext } from "../contexts/client";

export default function MediaCard() {
  const { banks, open, setUnitsOpen, setBankId, setRequestUnits, requestUnits } = React.useContext(ClientContext);
  const [bankName, setBankName] = React.useState("");

  const handleOpen = () => setUnitsOpen(true);
  const handleClose = () => setUnitsOpen(false);

  if (!banks.length) {
    return (
      <div style={{ display: "flex", gap: "2rem" }}>
        <Skeleton variant="rectangular" width={410} height={118} />
        <Skeleton variant="rectangular" width={410} height={118} />
      </div>
    );
  }
  return (
    <Box sx={{ display: "flex", gap: "2.2rem", flexWrap: "wrap", justifyContent: "center", alignItems: "center" }}>
      {banks?.map((bank, index) => {
        return (
          <Card sx={{ maxWidth: 300 }} key={index}>
            <CardMedia
              sx={{ height: 140 }}
              image="https://images.pexels.com/photos/247786/pexels-photo-247786.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {bank?.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {bank?.name} is a regional bank serving hospitals within {bank?.name.split(" ")[0]} and neighboring
                areas. You can order blood units today.
              </Typography>
            </CardContent>
            <CardActions>
              {/* Modal to display all units */}
              <Unit
                name={bankName}
                open={open}
                setOpen={setUnitsOpen}
                handleOpen={handleOpen}
                handleClose={handleClose}
              />
              <Button
                size="small"
                onClick={() => {
                  handleOpen();
                  setBankName(bank?.name);
                  setRequestUnits((prev) => {
                    return { ...prev, bank: bank._id };
                  });
                  setBankId(bank._id);
                }}
              >
                See availeble Units
              </Button>
            </CardActions>
          </Card>
        );
      })}
    </Box>
  );
}
