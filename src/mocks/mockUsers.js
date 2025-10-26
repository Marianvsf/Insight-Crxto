let users = [
  {
    id: 1,
    email: "test@exchange.com",
    password: "password123",
    username: "AliceTrader",
    role: "user",
  },
  {
    id: 2,
    email: "bob@exchange.com",
    password: "securepwd",
    username: "BobCrypto",
    role: "user",
  },
  {
    id: 3,
    email: "admin@exchange.com",
    password: "adminpwd",
    username: "AdminX",
    role: "admin",
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
