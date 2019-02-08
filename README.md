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
    - [accounting-records](#4.1-examples)
    - [add-group](#4.2-examples)
    - [dcacct-pg](#4.3-examples)
    - [list-groups](#4.4-examples)

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
```

Run the example from its directory, for example to run the `list-groups` example, do ths following from the root of the project:

```
node list-groups/index.js
```

[Top](#toc)<br>
<a id="4.-examples"></a>
## 4. Examples


<a id="#4.1-examples"></a>
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






[Top](#toc)<br>
<a id="#4.2-examples"></a>
### add-group

##### Summary:

This example shows how to add a Group to the Device Cloud.  The Group ID must be a 32 character string using a-f or 0-9 (i.e. base16 values for a UUID...).  It also must be unique in the Avimesa Device Cloud instance, so one could use a UUID generator to make the Group ID.

In response to a successful Group addition, you get a 32 character string (base16, UUID) authentication key.  

The combination of the Group ID and Authentication key can then be used by a client application, such as the Node.js Group SDK [here](https://www.npmjs.com/package/@avimesa/group-api-amqp). 




[Top](#toc)<br>
<a id="#4.3-examples"></a>
### dcacct-pg

##### Summary:

This is basically the same as the 'accounting-record' example above.  But it stores the records to a Postgres database!

Check out the /scripts/db directory for utilities used to create the database.

Postgres 10 with TimescaleDB are required.

 

[Top](#toc)<br>
<a id="#4.4-examples"></a>
### list-groups

##### Summary:

This example shows how to list the Groups that belong to this Avimesa Device Cloud instance, for example a Group added through the 'add-group' example.
