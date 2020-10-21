import {Action} from 'overmind';

export const clienteEditar: Action<{}> = ({state}, client) => {
  state.client = client;
};