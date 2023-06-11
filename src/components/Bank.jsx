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
  const { banks, open, setUnitsOpen, getBankUnits, setBankId, setRequestUnits, requestUnits } =
    React.useContext(ClientContext);

  const handleOpen = () => setUnitsOpen(true);
  const handleClose = () => setUnitsOpen(false);

  // React.useEffect(()=>{
  //   getBankUnits()
  // },[])

  if (!banks.length) {
    return (
      <div style={{ display: "flex", gap: "2rem" }}>
        <Skeleton variant="rectangular" width={410} height={118} />
        <Skeleton variant="rectangular" width={410} height={118} />
      </div>
    );
  }
  return (
    <Box sx={{ display: "flex", gap: "1.2rem", flexWrap: "wrap" }}>
      {banks?.map((bank, index) => {
        return (
          <Card sx={{ maxWidth: 345 }} key={index}>
            <CardMedia sx={{ height: 140 }} image="https://picsum.photos/200" title="green iguana" />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {bank?.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odio ex est nisi debitis doloremque minima.
              </Typography>
            </CardContent>
            <CardActions>
              {/* Modal to display all units */}
              <Unit open={open} setOpen={setUnitsOpen} handleOpen={handleOpen} handleClose={handleClose} />
              <Button
                size="small"
                onClick={() => {
                  handleOpen();
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
