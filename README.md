# Django Setup

## Requirements
- 3.8 <= Python version <= 3.10
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

## Create venv
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
## Run server
```bash
  python manage.py runserver
```
## Populate the database
```bash
  python manage.py populate_blogs
```
