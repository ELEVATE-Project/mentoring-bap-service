<div align="center">

# Mentoring BAP Service

<a href="https://shikshalokam.org/elevate/">
<img
    src="https://shikshalokam.org/wp-content/uploads/2021/06/elevate-logo.png"
    height="140"
    width="300"
  />
</a>

</br>
The Mentoring building block enables effective mentoring interactions between mentors and mentees. The capability aims to create a transparent eco-system to learn, connect, solve, and share within communities.MentorED is an open source mentoring application that facilitates peer learning and professional development by creating a community of mentors and mentees.

</div>

# Setup Options

Mentoring BAP service can be setup in local using two methods:

<details><summary>Dockerized service with local dependencies(Intermediate)</summary>

## A. Dockerized Service With Local Dependencies

**Expectation**: Run single docker containerized service with existing local (in host) or remote dependencies.

-   Clone the **Mentoring BAP service** repository.

    ```console
    /ELEVATE$ git clone https://github.com/ELEVATE-Project/mentoring-bap-service.git
    ```

### Local Dependencies Steps

1.  Update dependency (Redis etc) IP addresses in .env with "**host.docker.internal**".

    Eg:

    ```properties
    #Redis Host Server URL
    REDIS_HOST = host.docker.external:6379

    ```

2.  Build the docker image.
    ```console
    /ELEVATE/mentoring-bap-service$ docker build -t elevate/mentoring-bap:1.0 .
    ```
3.  Run the docker container.

    -   For Mac & Windows with docker v18.03+:

        ```console
        $ docker run --name mentoring-bap:1.0 elevate/mentoring-bap:1.0
        ```

    -   For Linux:

        ```console
        $ docker run --name mentoring-bap --add-host=host.docker.internal:host-gateway elevate/mentoring-bap:1.0`
        ```

        Refer [this](https://stackoverflow.com/a/24326540) for more information.

### Remote Dependencies Steps

1.  Update dependency (Mongo, Kafka etc) Ip addresses in .env with respective remote server IPs.


    Eg:

    ```properties

    #Redis Host Server URL
    REDIS_HOST = 11.2.3.45:6379

    ```

2.  Build the docker image.


    ```console
    /ELEVATE/mentoring-bap-service$ docker build -t elevate/mentoring-bap:1.0 .
    ```

3.  Run the docker container.


    ```console
    $ docker run --name mentoring-bap:1.0 elevate/mentoring-bap:1.0 .
    ```

</details>

<details><summary>Local Service with local dependencies(Hardest)</summary>

## B. Local Service With Local Dependencies

**Expectation**: Run a single service with existing local dependencies in the host (**Non-Docker Implementation**).

### Steps

1.  Install required tools & dependencies

    Install any IDE (eg: VScode)

    Install Nodejs: https://nodejs.org/en/download/

    Install Redis: https://redis.io/docs/getting-started/installation/

2.  Clone the **Mentoring BAP service** repository.

    ```console
    /ELEVATE$ git clone https://github.com/ELEVATE-Project/mentoring-bap-service.git
    ```

3.  Add **.env** file to the project directory

        Create a **.env** file in **src** directory of the project and copy these environment variables into it.

    ```properties
        APPLICATION_PORT=3004
        NODE_ENV = development
        BECKN_BG_URI=https://gateway.becknprotocol.io/bg
        BECKN_REGISTRY_URI=https://registry.becknprotocol.io/subscribers
        CITY=std:080
        COUNTRY=IND
        DOMAIN=nic2004:85491
        BAP_ID='bap12345'
        BAP_URI=http://bap:3004/bap
        REDIS_HOST=redis://redis:6379
        SUBSCRIBER_ID='bap12345'
        UNIQUE_ID='sl23rws98uf09s8u'
        PRIVATE_KEY='//=='
        PUBLIC_KEY='+='
        AUTH_ENABLED=false
    ```

4.  Install Npm packages

    ```console
    ELEVATE/mentoring-bap-service/src$ npm install
    ```

5.  Start Mentoring server

    ```console
    ELEVATE/mentoring-bap-service/src$ npm start
    ```

</details>

</br>

# Tech stack

-   Node - 16.0.0
-   Kafka - 7.3.0
-   Redis - 7.0.0

# Team

<a href="https://github.com/ELEVATE-Project/mentoring-bpp-catalog-service/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=ELEVATE-Project/mentoring-bpp-service" />
</a>

# Open Source Dependencies

Several open source dependencies that have aided Mentoring's development:

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Apache Kafka](https://img.shields.io/badge/Apache%20Kafka-000?style=for-the-badge&logo=apachekafka)
![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)
![Redis](https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white)
