# alexcu.me

My new personal website, middlemanified

## Intentions

A single, one-page website ([following KISS](https://en.wikipedia.org/wiki/KISS_principle)) to detail:

1. Summary about me (including a photo)
2. Tech stack I like
3. Portfolio of my work (include image gallery)
4. Research I've done
5. Rocky!
6. Contact methods

Host my blog using [Ghost](https://ghost.org); why re-invent the wheel?

## Workflow

Get started by running:

```bash
$ bundle install
$ bower install
```

Then develop using:

```bash
$ bundle exec middleman
```

And when you're done, deploy with:

```bash
$ bundle exec middleman deploy
```

## TODOs

[ ] Lazy load images using Base64 encoded placeholders, fade to loaded on open of modal
[ ] Switch to Google CDN for font (faster than shipping)
[ ] Fix referral using link with id
[ ] Reduce size of the research section? Perhaps expand it out
[ ] Frosted video header of code being written?
[ ] Rethink the gallery. Vertical to horizontal scrollbar is icky
[ ] Fix the scroll view scrollbar showing on iOS on gallery modals

## License

None. Copyright &copy; 2015 Alex Cummaudo. All rights reserved.
