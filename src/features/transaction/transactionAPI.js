import axios from '../../utils/axios';

export const getTransaction = async (
  { currentPage, search, type, limit } = { currentPage: 1, limit: 5 }
) => {
  let queryString = '';
  if (search) {
    queryString = queryString + `&name_like=${search}`;
  }
  if (type) {
    queryString = queryString + `&type=${type}`;
  }

  const response = await axios.get(
    `/transactions?_sort=id&_order=desc&_page=${currentPage}&_limit=${limit}${queryString}`
  );
  console.log(response);

  const balanceResponse = await axios.get('/balance');
  return {
    transaction: response.data,
    balance: balanceResponse.data.totalBalance,
    totalCount: response.headers['x-total-count'],
  };
};

export const addTransaction = async (data) => {
  const balanceResponse = await axios.get('/balance');
  const response = await axios.post('/transactions', data);
  const newBalance =
    data.type === 'income'
      ? Number(balanceResponse.data.totalBalance) + Number(data.amount)
      : Number(balanceResponse.data.totalBalance) - Number(data.amount);
  const updateBalance = await axios.put('/balance', {
    totalBalance: newBalance,
  });

  return {
    transactions: response.data,
    balance: updateBalance.data.totalBalance,
  };
};

export const editTransaction = async (id, data) => {
  const balanceResponse = await axios.get('/balance');
  const itemResponse = await axios.get(`/transactions/${id}`);
  const response = await axios.put(`/transactions/${id}`, data);
  let newBalance;
  if (itemResponse.data.type === data.type) {
    const actionBalance =
      Number(response.data.amount) - Number(itemResponse.data.amount);
    if (data.type === 'income') {
      newBalance = balanceResponse.data.totalBalance + actionBalance;
    } else {
      newBalance = balanceResponse.data.totalBalance - actionBalance;
    }
  } else {
    let actionBalance = Number(itemResponse.data.amount) + Number(data.amount);
    if (itemResponse.data.type === 'income' && data.type !== 'income') {
      newBalance = balanceResponse.data.totalBalance - actionBalance;
    } else {
      newBalance = balanceResponse.data.totalBalance + actionBalance;
    }
  }

  const updateBalance = await axios.put('/balance', {
    totalBalance: newBalance,
  });

  return {
    transaction: response.data,
    balance: updateBalance.data.totalBalance,
  };
};

export const deleteTransaction = async (id) => {
  const balanceResponse = await axios.get('/balance');
  const itemResponse = await axios.get(`/transactions/${id}`);
  const response = await axios.delete(`/transactions/${id}`);

  const newBalance =
    itemResponse.data.type === 'income'
      ? Number(balanceResponse.data.totalBalance) -
        Number(itemResponse.data.amount)
      : Number(balanceResponse.data.totalBalance) +
        Number(itemResponse.data.amount);
  const updateBalance = await axios.put('/balance', { balace: newBalance });

  return {
    deletedTransaction: response.data,
    balance: updateBalance.data.totalBalance,
  };
};
