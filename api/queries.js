const { Pool } = require('pg');
const axios = require('axios');
const pool = new Pool({
  user: 'chat',
  host: 'localhost',
  database: 'chat_app',
  password: '1234',
  port: 5432,
});

const createUser = (request, response) => {
  const { username, email, gender, password } = request.body;
  const image_user = request.file ? request.file.buffer.toString('base64') : null;
  pool.query(
    'INSERT INTO users (username, email, gender, password, image_user) VALUES ($1, $2, $3, $4, $5) RETURNING id_user',
    [username, email, gender, password, image_user],
    (error, results) => {
      if (error) {
        console.error(error);
        return response.status(500).json({ error: 'Error inserting user' });
      }
      response.status(201).json({ id_user: results.rows[0].id_user });
    }
  );
};

const listUsers = (req, res) => {
  pool.query(
    'SELECT username, status_user, image_user FROM users ORDER BY id_user ASC',
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred while fetching users' });
      }
      res.status(200).json(result.rows);
    }
  );
};

async function getImage(id) {
  const result = await pool.query('SELECT image_user FROM users WHERE id_user = $1', [id]);
  return result.rows[0] ? result.rows[0].image_user : null;
}

const readImage = async (req, res) => {
  const image = await getImage(req.params.id);
  if (!image) {
    return res.status(404).send('Image not found');
  }
  res.send(`data:image/png;base64,${image}`);
};

const getUsers = (req, res) => {
  pool.query('SELECT * FROM users ORDER BY id_user ASC', (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'An error occurred while fetching users' });
    }
    res.status(200).json(result.rows);
  });
};

const login = (req, res) => {
  const { username, password } = req.body;
  pool.query(
    'SELECT * FROM users WHERE username = $1 AND password = $2',
    [username, password],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'An error occurred while logging in' });
      }
      if (result.rows.length === 0) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      res.status(200).json(result.rows[0]);
    }
  );
};

const getAllMessage = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query(
    'SELECT messages, sending_date FROM messages WHERE id_user = $1',
    [id],
    (error, results) => {
      if (error) {
        console.error(error);
        return response.status(500).json({ error: 'Error fetching messages' });
      }
      response.status(200).json(results.rows);
    }
  );
};

const createMessage = (request, response) => {
  const { messages, id_user, sending_date, date_created, type_message } = request.body;
  pool.query(
    'INSERT INTO messages (messages, id_user, sending_date, date_created, type_message) VALUES ($1, $2, $3, $4, $5) RETURNING id_message',
    [messages, id_user, sending_date, date_created, type_message],
    (error, results) => {
      if (error) {
        console.error(error);
        return response.status(500).json({ error: 'Error creating message' });
      }
      response.status(201).send(`Message added with ID: ${results.rows[0].id_message}`);
    }
  );
};

const updatePassword = (request, response) => {
  const id = parseInt(request.params.id);
  const { password } = request.body;
  pool.query(
    'UPDATE users SET password = $1 WHERE id_user = $2',
    [password, id],
    (error, results) => {
      if (error) {
        console.error(error);
        return response.status(500).json({ error: 'Error updating password' });
      }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

const updateStatus = (request, response) => {
  const id = parseInt(request.params.id);
  const { status_user } = request.body;
  pool.query(
    'UPDATE users SET status_user = $1 WHERE id_user = $2',
    [status_user, id],
    (error, results) => {
      if (error) {
        console.error(error);
        return response.status(500).json({ error: 'Error updating status' });
      }
      response.status(200).send(`User modified with ID: ${id}`);
    }
  );
};

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query('DELETE FROM users WHERE id_user = $1', [id], (error, results) => {
    if (error) {
      console.error(error);
      return response.status(500).json({ error: 'Error deleting user' });
    }
    response.status(200).send(`User deleted with ID: ${id}`);
  });
};

const deleteMessage = (request, response) => {
  const id = parseInt(request.params.id);
  pool.query('DELETE FROM messages WHERE id_message = $1', [id], (error, results) => {
    if (error) {
      console.error(error);
      return response.status(500).json({ error: 'Error deleting message' });
    }
    response.status(200).send(`Message deleted with ID: ${id}`);
  });
};

const readImageAndConvertToBase64 = async (imageUrl) => {
  try {
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data, 'binary');
    const base64Image = buffer.toString('base64');
    return base64Image;
  } catch (error) {
    console.error('Error reading or converting image:', error);
    throw error;
  }
};

const insertUserData = async (username, email, gender, statusUser, password, imageBase64) => {
  try {
    const query = `
      INSERT INTO users (username, email, gender, status_user, password, image_user)
      VALUES ($1, $2, $3, $4, $5, $6)
    `;
    await pool.query(query, [username, email, gender, statusUser, password, imageBase64]);
    console.log('Data inserted successfully');
  } catch (error) {
    console.error('Error inserting data:', error);
  }
};

const addUserWithImage = async (username, email, gender, statusUser, password, imageUrl) => {
  try {
    const imageBase64 = await readImageAndConvertToBase64(imageUrl);
    await insertUserData(username, email, gender, statusUser, password, imageBase64);
  } catch (error) {
    console.error('Error adding user with image:', error);
    throw error;
  }
};

module.exports = {
  getImage,
  getUsers,
  createUser,
  deleteUser,
  getAllMessage,
  createMessage,
  updatePassword,
  updateStatus,
  deleteMessage,
  login,
  listUsers,
  addUserWithImage,
  readImage,
};
