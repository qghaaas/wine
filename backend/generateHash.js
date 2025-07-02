const bcrypt = require('bcrypt');

async function generateHash() {
  const password = 'admin'; 
  const saltRounds = 10; 
  
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    console.log(hash);
    console.log();
  } catch (err) {
    console.error(err);
  }
}

generateHash();