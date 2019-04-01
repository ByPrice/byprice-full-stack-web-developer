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
import shortid from 'shortid';

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      taskName: '',
    };

    this.handleChangeTaskName = this.handleChangeTaskName.bind(this);
    this.handleClickAddNewTodo = this.handleClickAddNewTodo.bind(this);
    this.handleClickRemoveTodo = this.handleClickRemoveTodo.bind(this);
  }

  handleChangeTaskName(event) {
    this.setState({ taskName: event.target.value });
  }

  handleClickAddNewTodo() {
    const { taskName } = this.state;

    if (taskName.trim()) {
      this.setState((prevState) => {
        const prevTodos = prevState.todos;
        const todoName = prevState.taskName;
        const newTodos = [
          ...prevTodos,
          { name: todoName, id: shortid.generate() },
        ];

        return { todos: newTodos, taskName: '' };
      });
    }
  }

  handleClickRemoveTodo(todoId) {
    this.setState((prevState) => {
      const todosWithoutTodo = prevState.todos.filter(
        (todo) => todo.id !== todoId,
      );

      return { todos: todosWithoutTodo };
    });
  }

  render() {
    const { taskName, todos } = this.state;

    return (
      <Fragment>
        <Grid
          container
          direction='column'
          justify='center'
          alignItems='center'
          spacing={40}
        >
          <Grid item>
            <Typography variant='h4'>Add New Todo</Typography>
          </Grid>

          <Grid
            item
            container
            direction='row'
            justify='center'
            alignItems='center'
            spacing={40}
          >
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

            <Grid item>
              <Button
                variant='contained'
                color='primary'
                onClick={this.handleClickAddNewTodo}
              >
                Add
              </Button>
            </Grid>
          </Grid>

          <Grid item>
            <List dense={false}>
              {todos.length < 1 && <Typography variant='h6'>Empty</Typography>}
              {todos.map((todo) => (
                <ListItem key={todo.id}>
                  <ListItemIcon>
                    <TurnedIn />
                  </ListItemIcon>
                  <ListItemText primary={todo.name} />
                  <ListItemSecondaryAction>
                    <IconButton
                      aria-label='Delete'
                      onClick={() => {
                        this.handleClickRemoveTodo(todo.id);
                      }}
                    >
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
