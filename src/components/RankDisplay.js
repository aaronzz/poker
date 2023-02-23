import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
const RankDisplay = ({ players, calculateRank,communityCards, isEnabled }) => {
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const input = {
    Community: communityCards?.map((i)=>i.code)
  };
  
  for (let i = 0; i < players.length; i++) {
    const player = players[i];
    let hands = player?.hand?.map((item)=>item.code);
    input[player.name] = hands;
  }
  const ranks = calculateRank(input);

  return (

    <div>
    <Button variant="contained" color="primary" onClick={handleClickOpen} disabled={!isEnabled}>
      calculate winner
    </Button>
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Winnder board</DialogTitle>
      <DialogContent>
        <DialogContentText>
        <div>
          {ranks?.map((rank, index) => (
            <p key={index}>
              {rank}
            </p>
          ))}
        </div>        
      </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" data-testid={`dialogOk`}>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  </div>
   
  );
};

export default RankDisplay;


