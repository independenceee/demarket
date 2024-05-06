Demarket

# How to set up database for demarket

```yaml
version: "3.9"

services:
    demarket-database:
        container_name: demarket-database
        image: postgres:12
        restart: always
        environment:
            POSTGRES_USER: postgres
            POSTGRES_PASSWORD: postgres
            POSTGRES_DB: demarket-database
        ports:
            - 5432:5432
        volumes:
            - pgdata:/var/lib/postgresql/data

volumes:
    pgdata: {}
```

# How to set up backend for demarket

# How to set up frontend for demarket

# How to set up smart contract for demarket
