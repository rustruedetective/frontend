import React, { useState } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FileOpenIcon from "@mui/icons-material/FileOpen";

function BookItem({ id, name, author }) {
  return (
    <div key={id}>
      <Box display="flex" justifyContent="center" alignItems="center" key={id}>
        <Card sx={{ minWidth: 400, margin: 2 }}>
          <CardContent>
            <Typography
              sx={{ fontSize: 14, textAlign: "left", paddingLeft: 17 }}
              color="text.secondary"
              gutterBottom
            >
              Name : {name}
            </Typography>
            <Typography
              sx={{ fontSize: 14, textAlign: "left", paddingLeft: 17 }}
              color="text.secondary"
              gutterBottom
            >
              Author: {author}
            </Typography>
          </CardContent>
          <Box display="flex" justifyContent="center" alignItems="center">
            <CardActions>
              <Link to={`/book/${id}`} style={{ textDecoration: "none" }}>
                <Button
                  sx={{ margin: 2, marginTop: 0, width: "100px" }}
                  variant="contained"
                  startIcon={<FileOpenIcon />}
                >
                  View
                </Button>
              </Link>
            </CardActions>
          </Box>
        </Card>
      </Box>
    </div>
  );
}

export default BookItem;
