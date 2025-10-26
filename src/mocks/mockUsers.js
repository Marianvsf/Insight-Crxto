let users = [
  {
    id: 1,
    email: "test@exchange.com",
    password: "password123",
    username: "AliceTrader",
    firstName: "Alice",
    lastName: "Smith",
    role: "user",
    cryptoBalances: [
      {
        id: "bitcoin",
        symbol: "btc",
        name: "Bitcoin",
        balance: 0.52345678,
      },
      {
        id: "ethereum",
        symbol: "eth",
        name: "Ethereum",
        balance: 3.12345,
      },
      {
        id: "tether",
        symbol: "usdt",
        name: "Tether",
        balance: 1500.0,
      },
    ],
  },
  {
    id: 2,
    email: "bob@exchange.com",
    password: "securepwd",
    username: "BobCrypto",
    firstName: "Bob",
    lastName: "Marshall",
    role: "user",
    cryptoBalances: [
      {
        id: "bitcoin",
        symbol: "btc",
        name: "Bitcoin",
        balance: 0.0123,
      },
      {
        id: "solana",
        symbol: "sol",
        name: "Solana",
        balance: 50.75,
      },
      {
        id: "cardano",
        symbol: "ada",
        name: "Cardano",
        balance: 1250.0,
      },
    ],
  },
  {
    id: 3,
    email: "adn@exchange.com",
    password: "adminpwd",
    username: "AdminX",
    firstName: "Antony",
    lastName: "Johnson",
    role: "user",
    cryptoBalances: [
      {
        id: "ethereum",
        symbol: "eth",
        name: "Ethereum",
        balance: 3.12345,
      },
      {
        id: "tether",
        symbol: "usdt",
        name: "Tether",
        balance: 1500.0,
      },
    ],
  },
];
export const getMockUsers = () => users;
export const addMockUser = ({ firstName, lastName, email, password }) => {
  const newUserId = users.length + 1;
  const newUser = {
    id: newUserId,
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName,
    username: `${firstName} ${lastName}`.trim(),
    role: "user",
  };

  users.push(newUser);
  console.log(
    `Nuevo usuario registrado: ${newUser.username} (${newUser.email})`
  );
};
