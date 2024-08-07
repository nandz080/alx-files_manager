const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';
    const url = `mongodb://${host}:${port}/${database}`;

    this.client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    this.client.on('error', (err) => console.error('MongoDB Client Error:', err));
  }

  isAlive() {
    return this.client.isConnected();
  }

  async nbUsers() {
    try {
      const connection = await this.client.connect();
      const db = connection.db();
      const userCount = await db.collection('users').countDocuments();
      connection.close();
      return userCount;
    } catch (error) {
      console.error('Error counting users:', error);
      return 0;
    }
  }

  async nbFiles() {
    try {
      const connection = await this.client.connect();
      const db = connection.db();
      const fileCount = await db.collection('files').countDocuments();
      connection.close();
      return fileCount;
    } catch (error) {
      console.error('Error counting files:', error);
      return 0;
    }
  }
}

const dbClient = new DBClient();
module.exports = dbClient;
