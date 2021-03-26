import React, { useState } from 'react';
import Button from './Button/Button';
import './style.scss';

function Calculator() {
  const [state, setState] = useState({
    operation: '',
    result: '0',
    preResult: '0',
    evaluated: false,
  });

  const endsWithOperator = /[x+/-]$/;
  const endsWithNegativeSign = /\d[x+/-]{1}-$/;
  const isOperator = /[x/+-]/;

  const isCalculation = (exp) => {
    return /^[*/+-]$/g.test(exp);
  };

  const isNumber = (sign) => {
    return !isNaN(parseInt(sign)) || !isNaN(parseFloat(sign));
  };

  const maxDigiWarning = () => {
    setState((newState) => ({
      ...newState,
      result: 'DIGIT LIMIT MET',
      preResult: newState.result,
    }));

    setTimeout(() => {
      setState((newState) => ({
        ...newState,
        result: newState.preResult,
      }));
    }, 1000);
  };

  const handleEvaluate = () => {
    if (!state.result.includes('LIMIT')) {
      let exp = state.operation;
      if (endsWithOperator.test(exp)) {
        exp = exp.slice(0, -1);
      }
      let expReplace = exp
        .replace(/⋅/g, ' * ')
        .replace(/\//g, ' / ')
        .replace(/--/, ' + 0 + 0 + ')
        .replace(/\+/g, ' + ')
        .replace(/-/g, ' -')
        .replaceAll('  ', ' ')
        .split(' ');
      let newExp = [];
      expReplace = expReplace.map((sign) => {
        return isCalculation(sign)
          ? sign
          : sign.includes('.')
          ? parseFloat(sign)
          : parseInt(sign);
      });

      for (let i = 0; i < expReplace.length; i++) {
        let expLength = newExp.length;
        if (isNumber(expReplace[i])) {
          newExp.push(expReplace[i]);
        } else if (expReplace[i] === '/') {
          let current = newExp[expLength - 1];
          let quotient = current / expReplace[i + 1];
          newExp[expLength - 1] =
            Math.round(Math.pow(10, 12) * quotient) / Math.pow(10, 12);
          expReplace[i + 1] = '';
          expReplace[i] = '';
          expReplace[i - 1] = '';
          i++;
        } else if (expReplace[i] === '*') {
          let current = newExp[expLength - 1];
          let product = current * expReplace[i + 1];
          newExp[expLength - 1] = product;
          expReplace[i + 1] = '';
          expReplace[i] = '';
          expReplace[i - 1] = '';
          i++;
        }
      }
      if (newExp.length === 0) return 'NaN';

      //eslint-disable-next-line
      let answer = newExp.reduce((total, current) => {
        return total + current;
      }, 0);

      answer = Math.round(Math.pow(10, 12) * answer) / Math.pow(10, 12);
      setState((newState) => ({
        ...newState,
        result: answer.toString(),
        operation:
          exp
            .replace(/\*/g, '.')
            .replace(/-/g, '-')
            .replace(/(x|\/|\+)-/, '$1-')
            .replace('+ 0 + 0 +', '--')
            .replace(/^-/, '-') +
          '=' +
          answer,
        preResult: answer,
        evaluated: true,
      }));
    }
  };

  const handleOperators = (e) => {
    if (!state.result.includes('LIMIT')) {
      const value = e.target.value;
      const { operation, preResult, evaluated } = state;
      setState({
        ...state,
        result: value,
        evaluated: false,
      });
      if (evaluated) {
        setState((newState) => ({
          ...newState,
          operation: preResult + value,
        }));
      } else if (!endsWithOperator.test(operation)) {
        setState((newState) => ({
          ...newState,
          preResult: operation,
          operation: operation + value.replace('x', '⋅'),
        }));
      } else if (!endsWithNegativeSign.test(operation)) {
        setState((newState) => ({
          ...newState,
          operation:
            (endsWithNegativeSign.test(operation + value)
              ? operation
              : preResult) + value,
        }));
      } else if (value !== '-') {
        setState((newState) => ({
          ...newState,
          operation: preResult + value,
        }));
      }
    }
  };

  const handleNumbers = (e) => {
    if (!state.result.includes('LIMIT')) {
      const { result, operation, evaluated } = state;
      const value = e.target.value;
      setState((newState) => ({
        ...newState,
        evaluated: false,
      }));
      if (result.length > 21) {
        maxDigiWarning();
      } else if (evaluated) {
        setState((newState) => ({
          ...newState,
          result: value,
          operation: value !== '0' ? value : '',
        }));
      } else {
        setState((newState) => ({
          ...newState,
          result:
            result === '0' || isOperator.test(result) ? value : result + value,
          operation:
            result === '0' && value === '0'
              ? operation === ''
                ? value
                : operation
              : /([^.0-9]0|^0)$/.test(operation)
              ? operation.slice(0, -1) + value
              : operation + value,
        }));
      }
    }
  };

  const handleDecimal = () => {
    if (state.evaluated === true) {
      setState({
        ...state,
        result: '0.',
        operation: '0.',
        evaluated: false,
      });
    } else if (!state.result.includes('.') && !state.result.includes('LIMIT')) {
      setState({ ...state, evaluated: false });
      if (state.result.length > 21) {
        maxDigiWarning();
      } else if (
        endsWithOperator.test(state.operation) ||
        (state.result === '0' && state.operation === '')
      ) {
        setState({
          ...state,
          result: '0.',
          operation: state.operation + '0.',
        });
      } else {
        setState({
          ...state,
          result: state.operation.match(/(-?\d+\.?\d*)$/)[0] + '.',
          operation: state.operation + '.',
        });
      }
    }
  };

  const initialize = () => {
    setState({
      ...state,
      result: '0',
      preResult: '0',
      operation: '',
      currentSign: 'pos',
      lastClicked: '',
      evaluated: false,
    });
  };

  return (
    <div className='wrap h-screen flex justify-center items-center'>
      <div className='cal bg-black p-2'>
        <div className='cal__operationScreen leading-8 text-yellow-500 text-right'>
          {state.operation}
        </div>
        <div className='cal__resultScreen leading-8 text-white text-right mb-3'>
          {state.result}
        </div>
        <Button
          handleNumbers={handleNumbers}
          initialize={initialize}
          handleEvaluate={handleEvaluate}
          handleOperators={handleOperators}
          handleDecimal={handleDecimal}
        />
      </div>
    </div>
  );
}

export default Calculator;
