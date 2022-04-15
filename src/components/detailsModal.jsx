import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function DetailsModal({currentCity,fiveDays,currentCondition,metric}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>More...</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <h1 id="transition-modal-title" variant="h6" component="h2">
              {currentCity.LocalizedName} <span>({currentCity.Country.LocalizedName})</span>
            </h1>
            <small>({currentCity.Key})</small>
            <div>
                <img src={`./images/${currentCondition.WeatherIcon}.png`} alt="" />
                <h3>{currentCondition.WeatherText}</h3>
                {metric ? 
                <h4>{currentCondition.Temperature.Metric.Value}&deg;{currentCondition.Temperature.Metric.Unit}</h4> 
                : 
                <h4>{currentCondition.Temperature.Imperial.Value}&deg;{currentCondition.Temperature.Imperial.Unit}</h4>
                } 
            </div>
            <div>
                <h5>This Night</h5>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
