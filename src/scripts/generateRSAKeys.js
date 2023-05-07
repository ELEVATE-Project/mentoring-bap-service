'use strict'
const forge = require('node-forge')
const fs = require('fs')
const path = require('path')

const keyPair = forge.pki.rsa.generateKeyPair(2048)

const privateKeyPem = forge.pki.privateKeyToPem(keyPair.privateKey)
const publicKeyPem = forge.pki.publicKeyToPem(keyPair.publicKey)

const keysDir = path.join(__dirname, '../', 'keys')
fs.mkdirSync(keysDir, { recursive: true })

const accessPrivateKeyPath = path.join(keysDir, 'access_rsa_priv.pem')
fs.writeFileSync(accessPrivateKeyPath, privateKeyPem, 'utf8')

const accessPublicKeyPath = path.join(keysDir, 'access_rsa_pub.pem')
fs.writeFileSync(accessPublicKeyPath, publicKeyPem, 'utf8')
