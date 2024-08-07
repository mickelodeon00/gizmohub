import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'mikel',
      email: 'mikel@gmail.com',
      password: bcrypt.hashSync('12345'),
      role: 'ADMIN',
    },
    {
      name: 'ayo',
      email: 'ayo@gmail.com',
      password: bcrypt.hashSync('12345'),
      role: 'VENDOR',
    },
    {
      name: 'victor',
      email: 'victor@gmail.com',
      password: bcrypt.hashSync('12345'),
    },
  ],
};

export default data;
