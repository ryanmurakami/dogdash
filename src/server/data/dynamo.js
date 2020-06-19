const AWS = require('aws-sdk')
AWS.config.update({ region: process.env.AWS_REGION })

const table = 'dogs'

const client = new AWS.DynamoDB.DocumentClient()

async function get (id) {
  let dog
  const params = {
    TableName: table,
    Key: {
      HashKey: id
    }
  }
  try {
    dog = await client.get(params).promise()
  } catch (e) {
    console.error(e)
  }
  return dog
}

module.exports = {
  get
}