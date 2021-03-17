const { db, Job, Company } = require('./server/db');
const linkedin = {
  name: 'Linkedin',
  location: 'Sunnyvale',
  imageUrl:
    'https://images.unsplash.com/photo-1611944212129-29977ae1398c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1567&q=80',
};
const apprenticeshipBE = {
  title: 'REACH Backend',
  deadline: '2020-03-18',
  link: 'https://careers.linkedin.com/reach/Backend',
  jobType: 'apprenticeship',
  priority: 1,
  completed: false,
  description: 'Complete 3 essays questions',
};
const apprenticeshipSRE = {
  title: 'REACH Site Reliability',
  deadline: '2020-03-18',
  link: 'https://careers.linkedin.com/reach/SRE',
  jobType: 'apprenticeship',
  priority: 7,
  completed: false,
  description: 'Complete 3 essays questions',
};

const apprenticeshipAI = {
  title: 'REACH Artificial Intelligence',
  deadline: '2020-03-18',
  link: 'https://careers.linkedin.com/reach/AI',
  jobType: 'apprenticeship',
  priority: 7,
  completed: false,
  description: 'Complete 3 essays questions',
};

const seed = async () => {
  try {
    await db.sync({ force: true });

    const linkedIn = await Company.create(linkedin);
    const appBE = await Job.create(apprenticeshipBE);
    const appSRE = await Job.create(apprenticeshipSRE);
    const appAI = await Job.create(apprenticeshipAI);

    await linkedIn.addJobs([appBE, appSRE, appAI]);
    await appBE.setCompany(linkedIn);
    await appSRE.setCompany(linkedIn);
    await appAI.setCompany(linkedIn);
  } catch (err) {
    console.log(err);
  }
};

module.exports = seed;

if (require.main === module) {
  seed()
    .then(() => {
      console.log('Seeding success!');
      db.close();
    })
    .catch((err) => {
      console.error('Oh noes! Something went wrong!');
      console.error(err);
      db.close();
    });
}
