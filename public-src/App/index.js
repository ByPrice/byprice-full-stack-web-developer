/* eslint-disable react/jsx-filename-extension */

import React, { Fragment, PureComponent } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';
import TurnedIn from '@material-ui/icons/TurnedIn';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      taskName: '',
    };

    this.handleChangeTaskName = this.handleChangeTaskName.bind(this);
    this.handleClickAddNewTodo = this.handleClickAddNewTodo.bind(this);
  }

  handleChangeTaskName(event) {
    this.setState({ taskName: event.target.value });
  }

  handleClickAddNewTodo() {
    this.setState((prevState) => {
      const prevTodos = prevState.todos;
      const todo = prevState.taskName;
      const newTodos = [...prevTodos, todo];

      return { todos: newTodos, taskName: '' };
    });
  }

  render() {
    const { taskName, todos } = this.state;

    return (
      <Fragment>
        <Grid>
          <Grid>
            <Typography variant='h4'>Add New Todo</Typography>
          </Grid>

          <Grid>
            <Grid>
              <TextField
                id='outlined-name'
                label='Task'
                margin='normal'
                variant='outlined'
                value={taskName}
                onChange={this.handleChangeTaskName}
              />
            </Grid>

            <Grid>
              <Button
                variant='contained'
                color='primary'
                onClick={this.handleClickAddNewTodo}
              >
                Add
              </Button>
            </Grid>
          </Grid>

          <Grid>
            <List dense={false}>
              {todos.map((todo, key) => (
                // eslint-disable-next-line react/no-array-index-key
                <ListItem key={key}>
                  <ListItemIcon>
                    <TurnedIn />
                  </ListItemIcon>
                  <ListItemText primary='Single-line item'>{todo}</ListItemText>
                  <ListItemSecondaryAction>
                    <IconButton aria-label='Delete'>
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default App;
