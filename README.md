TimeSync
========

![travis](https://travis-ci.org/osuosl/timesync-node.svg?branch=develop) [![Dependency Status](https://david-dm.org/osuosl/timesync-node.svg)](https://david-dm.org/osuosl/timesync-node)

<img align="right" style="padding: 5px;" src="/timesync.png?raw=true" />

TimeSync is the OSU Open Source Lab's time tracking system. It's designed to be
simple, have a sane API, and make sense while allowing users to track their
time spent on various projects and activities.

Usage
-----

To start a local instance running on port 8000, just run:

```
$ npm install
$ npm start
```

To run the test suite and linter run:

```
$ npm test
$ npm run linter
```

To make a quick request on the dev instance, first run the database migrations
and load the fixtures:

```
$ npm run migrations
$ npm run fixtures
```

Next, run the application:

```
$ npm start
```

Then, in another terminal, make a request to the application with curl.

(*Piping it to python makes the output pretty.*)

```
$ curl -XGET -s localhost:8000/v1/times | python -m json.tool
[
    {
        "activity": [
            "dev"
        ],
        "created_at": null,
        "date_worked": null,
        "duration": 12,
        "id": 1,
        "issue_uri": "https://github.com/osu-cass/whats-fresh-api/issues/56",
        "notes": "",
        "project": [
            "wf"
        ],
        "updated_at": null,
        "user": "tschuy"
    }
]

```

Your output should look something like the above.


More in-depth documentation can be found inside the ``docs/`` folder. To build
the docs, build them with sphinxdocs by running the following:

```
$ pip install -r requirements.txt
$ cd docs
[docs]$ make html
[docs]$ <browser> build/html/index.html
```
