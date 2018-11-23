# Avimesa Infrastructure API Examples, Node.js and AMQP
Infrastructure API examples using Node.js abd AMQP (0-9-1)

## Introduction

This project contains simple example of how to interface with the Avimesa Device Cloud's Infrastructure API using Node.js and AMQP.


<a id="toc"></a>
## Table of Contents
- [1. Overview](#1.-overview)
- [2. Prerequisites](#2.-prerequisites)
- [3. Usage](#3.-usage)
- [4. Examples](#4.-examples)
    - [accounting-records](#accounting-records)

<a id="1.-overview"></a>
## 1. Overview

[Top](#toc)<br>
<a id="2.-prerequisites"></a>
## 2. Prerequisites

- Node.js
- A valid Avimesa Device Cloud Infrastructure ID and Authentication Key


[Top](#toc)<br>
<a id="3.-usage"></a>
## 3. Usage


Install:
wget https://s3-us-west-2.amazonaws.com/grafana-releases/release/grafana-5.3.4-1.x86_64.rpm 
sudo yum localinstall grafana-5.3.4-1.x86_64.rpm

Start:
sudo service grafana-server start



Checkout and initialize the project:

```
git clone https://github.com/Avimesa/examples-nodejs-infrastructure-api-amqp.git
cd examples-nodejs-infrastructure-api-amqp

npm init
```

Update the credentials in the .env file in the root of the project:

```
# RMQ Server Hostname
RMQ_HOSTNAME=rmqserv001.avimesa.com

# RMQ Server Port
RMQ_PORT=5672

# RMQ Group ID / Vhost
RMQ_GROUP_ID= *<TODO>*

# RMQ Authentication Key
RMQ_AUTH_KEY= *<TODO>*

# Set this to 0 to allow certless TLS
NODE_TLS_REJECT_UNAUTHORIZED=0
```

Run the example from its directory, for example to run the `accounting-records` example, do ths following from the root of the project:

```
node accounting-records/index.js
```

[Top](#toc)<br>
<a id="4.-examples"></a>
## 4. Examples


<a id="accounting-records"></a>
### accounting-records

##### Summary:

On each device transaction, an accounting record is generated.  This example shows how to subscribe to these events.

The format of the record is as follows:

```
{
    "gid" : 013400000, 
    "did" : "20010db800000000603156fffec70000",
    "dts" : 1541804057,
    "msg" : 1,
    "jif" : 0
}
```


| Name     | Type           | Required | Notes |
| ---      | ---            | --- | --- |
| gid      | Number, uint32 | Yes | The Linux Group ID for the Device |
| did      | String, UUID   | Yes | The Device ID |
| dts      | Number, uint32 | Yes | Linux Time of the event |
| msg      | Number, uint32 | Yes | Amount of messages consumed during the transaction |
| jif      | Number, uint32 | Yes | Amount of computation consumed during the transaction |


<a id="list-groups"></a>
### list-groups

##### Summary:

This example shows how to list the Groups that belong to this Avimesa Device Cloud instance.
