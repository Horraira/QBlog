# Django Setup

## Requirements
- 3.8 <= Stable Python version 
- Elasticsearch Server Running

## Change Elasticsearch auth info
```python
# settings.py
ELASTICSEARCH_DSL = {
    'default': {
        'hosts': 'http://127.0.0.1:9200', 
        'http_auth': ('sohan', 'AbuHorraira:)17')
    },
}
```

## Create and activate venv
```bash
  python -m venv env
```

## Installation
```bash
  pip install -r requirements.txt
```
if any package conflicts arise, install
```bash
  pip install -r base_requirements.txt
```
## Migrate and Populate the database
```bash
  python manage.py migrate
  python manage.py populate_blogs
```
## Run server
```bash
  # should run on http://127.0.0.1:8000/
  python manage.py runserver
```

# React Setup

## Change directory
```bash
  # on a new terminal
  cd QBlog\blog-frontend
```

## Install and Run
```bash
  npm i
  # should run on http://127.0.0.1:3000
  npm start
```

# Django urls
## Information urls
- [@Swagger](http://127.0.0.1:8000/swagger)
- [@Silk](http://127.0.0.1:8000/silk)
## Admin Page
- [@Dashboard](http://127.0.0.1:8000/)
- [@Blog List](http://127.0.0.1:8000/blogList)

# React urls
😊 Feel free to explore after registration and login
