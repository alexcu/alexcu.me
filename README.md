Get started by running:

```bash
$ bundle install
```

Then develop using:

```bash
$ bundle exec middleman
```

Deploy with:

```bash
$ rm -rf docs
$ bundle exec middleman build 
$ mv build docs
$ git add docs
$ git push origin master
```
