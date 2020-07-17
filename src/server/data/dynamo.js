const AWS = require('aws-sdk')
const axios = require('axios')

const res = await axios.get('http://169.254.169.254/latest/dynamic/instance-identity/document')
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
      error: e,
      res
    }
  }

  return status
}

module.exports = {
  get,
  test
}