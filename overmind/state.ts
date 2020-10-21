type State = {
    client: {
      firstName: string,
      lastName: string,
      cedula: string,
      email: string,
      cellphone: string,
      address: string,
      id: number,
    };
  };
  
  export const state: State = {
    client: {
      firstName: '',
      lastName: '',
      cedula: '',
      email: '',
      cellphone: '',
      address: '',
      id: 0,
    },
  };