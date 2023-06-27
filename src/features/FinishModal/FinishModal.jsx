import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styles from './FinishModal.module.scss';
import * as snakeActions from '../snake.actions';
import { fetchResultsList, updateResults } from '../snakeGateway';
import { Button, TextField } from '@mui/material';
import ResultTable from '../ResultTable/ResultTable';

const FinishModal = ({ score, onReset }) => {
  const [stateResults, setResults] = useState();
  const [name, setName] = useState('');
  const onSubmitButton = () => {
    let updatedResults = {
      results: [...stateResults, { name: name, score: score }],
    };
    console.log(updatedResults);
    updateResults(updatedResults).then(() => {
      fetchResultsList().then(({ results }) => {
        setResults(results);
      });
    });
    setName('');
  };
  useEffect(() => {
    fetchResultsList().then(({ results }) => {
      setResults(results);
    });
  }, []);
  return (
    <>
      <label id="popup" className={styles.overlay}>
        <div className={styles.popup}>
          <TextField
            required
            id="outlined-required"
            label="Enter your name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <h2>Your score is</h2>
          <h2>{score}</h2>
          <Button variant="outlined" disabled={!name} onClick={onSubmitButton}>
            Submit
          </Button>

          <Button variant="outlined" color="error" onClick={onReset}>
            Reset game
          </Button>
        </div>
        <div className={styles.row}>
          {stateResults && <ResultTable data={stateResults} />}
        </div>
      </label>
    </>
  );
};

const mapstate = (state) => ({
  score: state.snake.score,
});

const mapDispatch = {
  onReset: snakeActions.resetGame,
};

export default connect(mapstate, mapDispatch)(FinishModal);
