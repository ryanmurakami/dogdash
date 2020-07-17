const AWS = require('aws-sdk')
AWS.config.update({ region: process.env.AWS_REGION })

const table = 'dogs'

const client = new AWS.DynamoDB.DocumentClient()

async function get (id) {
  let dog
  const params = {
    TableName: table,
    Key: {
      id
    }
  }
  dog = await client.get(params).promise()
  return dog
}

async function test () {
  let status
  try {
    dog = await get('1')
    status = {
      connected: true
    }
  } catch (e) {
    status = {
      connected: false,
      error: e
    }
  }

  return status
}

module.exports = {
  get,
  test
}