const bcrypt = require('bcryptjs');
const inquirer = require('inquirer');
const { uuid } = require('uuidv4');
const chalk = require('chalk');

const model = require('./Models/index');

const confirmPasswordInput = async (input) => {
  if (input.length < 8) {
    return 'Password must be at least 8 characters long';
  }

  return true;
};

const generateData = () => {
  const result = [];
  const categories = ['Graphics & Design', 'Programming & Technology',
    'Marketing', 'Health',
    'Agriculture', 'Finance',
    'Video & Animation',
  ];
  for (let i = 0; i < categories.length; i += 1) {
    const id = uuid();
    result.push({ category_id: id, category_name: categories[i] });
  }

  return result;
};

const seedSuperAdmin = async () => {
  const rolesExists = await model.Role.findOne({ where: { role_id: 'ROL-SUPERADMIN' } });
  if (rolesExists) {
    const logInit = chalk.green('[✔] Super admin already initialized');

    // eslint-disable-next-line no-console
    console.log(logInit);
    return;
  }

  const logInit = chalk.yellowBright('[!] Initializing Super Admin!');

  // eslint-disable-next-line no-console
  console.log(logInit);
  const rolesCreated = await model.Role.bulkCreate([
    { role_name: 'super_admin', role_id: 'ROL-SUPERADMIN' },
    { role_name: 'admin', role_id: 'ROL-ADMIN' },
    { role_name: 'employer', role_id: 'ROL-EMPLOYER' },
    { role_name: 'employee', role_id: 'ROL-EMPLOYEE' },
  ]);

  await model.Company_category.bulkCreate(generateData());

  if (rolesCreated) {
    const userExists = await model.User.findOne({ where: { role_id: 'ROL-SUPERADMIN' } });
    if (userExists) return;

    inquirer
      .prompt([
        {
          name: 'first_name',
          message: 'First Name (default: admin)',
          default: 'admin',
        },
        {
          name: 'last_name',
          message: 'Last Name (default: admin)',
          default: 'admin',
        },
        {
          type: 'password',
          name: 'password',
          message: 'password:',
          mask: '*',
          validate: confirmPasswordInput,
        },
        {
          name: 'email',
          message: 'email (default: email@example.com)',
          default: 'email@example.com',
        },
        {
          name: 'phone_no',
          type: 'input',
          message: 'Phone Number',
        },
      ])
      .then(async (answers) => {
        // hash password
        const salt = bcrypt.genSaltSync(10);
        const userId = uuid();

        // eslint-disable-next-line no-param-reassign
        answers.password = await bcrypt.hashSync(answers.password, salt);
        const superAdminAccount = {
          email: answers.email,
          password: answers.password,
          user_id: userId,
          role_id: 'ROL-SUPERADMIN',
          verification_token: 'super-admin',
          status: '1',
          Admin: {
            firstName: answers.first_name,
            lastName: answers.last_name,
            phoneNumber: answers.phone_no,
            user_id: userId,
          },
        };

        await model.User.create(
          superAdminAccount,
          {
            include: [model.Admin],
          },
        );
        const log = chalk.green('[✔] Super admin created successfully');

        // eslint-disable-next-line no-console
        console.log(log);
      });
  }
};

module.exports.seedSuperAdmin = seedSuperAdmin;
