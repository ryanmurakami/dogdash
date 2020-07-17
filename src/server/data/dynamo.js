const AWS = require('aws-sdk')
const axios = require('axios')

let res
let client

axios.get('http://169.254.169.254/latest/dynamic/instance-identity/document')
  .then(response => {
    res = response
    AWS.config.update({ region: response.data.region })
    client = new AWS.DynamoDB.DocumentClient()
  })

const table = 'dogs'

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