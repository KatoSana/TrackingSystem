import 'date-fns';
import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    flexDirection: 'row',
    display: 'flex'
  }
}));

export default function Form(props) {
  const classes = useStyles();
  const [openingTime, setOpeningTime] = useState(new Date());
  const [closingTime, setClosingTime] = useState(new Date());
  const [roomList, setRoomList] = useState([]);
  const [roomForm, setRoomForm] = useState('');

  const submitSchedule = () => {
    const scheduleURL = `${process.env.REACT_APP_API_URL}/api/schedule`;
    fetch(scheduleURL, {
      method: 'POST',
      headers: { 'content-type': 'application/json; charset=utf-8' },
      body: JSON.stringify(props.newSchedule)
    });
  };

  const setOpTime = date => {
    let schedule = props.newSchedule;
    schedule.openingTime = date;
    props.setNewSchedule(schedule);
  };

  const setClTime = date => {
    let schedule = props.newSchedule;
    schedule.closingTime = date;
    props.setNewSchedule(schedule);
  };

  const setRoom = e => {
    const unit = props.unitList.find(unit => unit.name === e.target.value);
    let roomList = [];
    for (let mapID of unit.mapIDList) {
      let room = props.roomList.find(room => room.mapID === mapID);
      roomList.push(room);
    }
    setRoomList(roomList);
  };

  const setMapID = e => {
    const room = props.roomList.find(room => room.name === e.target.value);
    const target = e.target;
    const name = target.name;
    setRoomForm(e.target.value);
    props.setNewSchedule(prevState => ({ ...prevState, [name]: room.mapID }));
  };

  const handleInputChange = e => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    props.setNewSchedule(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <div className={classes.root}>
      <FormControl>
        <TextField
          className="schedule-name"
          name="name"
          label="Schedule"
          margin="normal"
          onChange={handleInputChange}
        />
        <FormControl>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <KeyboardTimePicker
                margin="normal"
                id="openingtime-picker"
                label="開始時間"
                name="openingTime"
                value={openingTime}
                onChange={date => {
                  setOpeningTime(date);
                  setClosingTime(date);
                  setOpTime(date);
                }}
                KeyboardButtonProps={{
                  'aria-label': 'change time'
                }}
              />
            </Grid>

            <Grid container justify="space-around">
              <KeyboardTimePicker
                margin="normal"
                id="closingtime-picker"
                label="終了時間"
                value={closingTime}
                onChange={date => {
                  setClosingTime(date);
                  setClTime(date);
                }}
                KeyboardButtonProps={{
                  'aria-label': 'change time'
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </FormControl>

        <FormControl>
          <InputLabel id="unit">Unit</InputLabel>
          <Select
            labelid="unit"
            id="unit"
            name="unit"
            value={props.newSchedule.unit ? props.newSchedule.unit : ''}
            onChange={e => {
              handleInputChange(e);
              setRoom(e);
            }}
          >
            {props.unitList.map(value => (
              <MenuItem value={value.name} key={value.name}>
                {value.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel id="room">Room</InputLabel>
          <Select
            labelid="room"
            id="room"
            name="room"
            value={roomForm ? roomForm : ''}
            onChange={e => {
              handleInputChange(e);
              setMapID(e);
            }}
          >
            {roomList.map(value => (
              <MenuItem value={value.name} key={value.name}>
                {value.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          size="medium"
          className="submit"
          onClick={submitSchedule}
        >
          登録
        </Button>
      </FormControl>
    </div>
  );
}
