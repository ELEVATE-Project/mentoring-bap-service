# Elevate Mentoring Bap

## Setup Guide

1.  Install Ngrok & Docker Compose

    Ngrok: https://ngrok.com/

    Docker-compose: https://docs.docker.com/compose/

2.  Expose localhost port 3015 with Ngrok

    ```
    $ngrok http 3015
    ```

    While keeping the ngrok port forwarding active, keep a note of the "forwarding" address from the terminal.

3.  In the src folder of this project, create a new .env file and paste the following content:

    ```
    APPLICATION_PORT=3015
    NODE_ENV = development
    BECKN_BG_URI=https://gateway.becknprotocol.io/bg
    DOMAIN=dsep:mentoring
    BAP_ID='osl-bap'
    BAP_URI=https://1625-202-164-138-112.ngrok-free.app/osl-bap/dsep
    REDIS_HOST=redis://redis:6379
    MONGODB_URL=mongodb://mongo:27017/osl-bap
    ACCESS_TOKEN_EXPIRY=1D
    BAP_TTL='PT10M'
    SCHEMA_CORE_VERSION='1.0.0'

    SEARCH_ACTION='search'
    SEARCH_ROUTE='/search'

    SELECT_ACTION='select'
    SELECT_ROUTE='/select'

    INIT_ACTION='init'
    INIT_ROUTE='/init'

    CONFIRM_ACTION='confirm'
    CONFIRM_ROUTE='/confirm'

    SEARCH_MINIMUM_WAIT_TIME=5000
    CALLBACK_MAXIMUM_WAIT_TIME=3000
    ```

4.  Replace BAP_URI in .env with your new ngrok forwarding address while still keeping "/osl-bap/dsep"

5.  Run docker-compose up from the root of the project directory

    ```
    $docker-compose up
    ```

6.  Use the provided postman collection (in the root) for making requests to now running BAP.
