<a href="http://anmolmalik.me"><img src="https://cfcdnpull-creativefreedoml.netdna-ssl.com/wp-content/uploads/2017/06/Twitter-featured.png?s=200" title="Anmol malik" alt="Anmol Malik"></a>

# Twitter Streaming Api.. 
![Build Status](http://img.shields.io/travis/badges/badgerbadgerbadger.svg?style=flat-square) <a href="https://innovaccer-backend-assignment.herokuapp.com/search?text=modi&perPage=100" target="_blank">`Live Demo for api`</a>
## Soundex with reverse indexing to search word from the tweet text in O(1) time complexity -> 
> User can search for similar sounding words from the tweet text...eg -> srsly and seriously will yield same results

![Recordit GIF](http://g.recordit.co/Ftln25crlZ.gif)


## Api's are paginated..
> User can send the queries for documents per page,page to be viewed etc..

![Recordit GIF](http://g.recordit.co/5Ldm5cFkhw.gif)

## tweet Streaming..
> User can start and stop streaming for tweets with a keyword..

![Recordit GIF](http://g.recordit.co/aSujtEDzJq.gif)

## Csv export
> User can export the filtered data to a csv file (just go to /csv route it will be downloaded automatically)

![Recordit GIF](http://g.recordit.co/bdMu4fIlrO.gif)

---

## Key features
> Queries can be filtered by passing extra queries. (sort by date,filter by retweet Count, followers count etc..)
> Csv export (go to /csv) it will be downloaded.
> Live stream of tweets
> Name search by monogDb naitve indexing in O(1) time
> Text search by soundex and reverse Indexing in O(1) time (similar sounding words will yield same results)
> No sql DataBase (MongoDb)

## How to Use

##### Clone repo

###### Install Dependencies

```npm install```

### Streaming

> POST GET req to /stream/start to start streaming with term to be searched (term: Keyword to be searched)

> POST GET req to /stream/stop to stop streaming

### Csv Export

> Send GET req to /csv after selecting the filtered Data

### Search

> Send GET req to /search with query Params
### Query Params
- text : For text search
- user : For user name search
- screenName -> for screen name search
> following can be added to filter the search
- startDate : For filtering Start Date
- endDate : For filtering end Date
- rtCountMax : For filtering retweets
- rtCountMin : For filtering retweets
- favCountMax : For filtering favourites
- favCountMin : For filtering favourites
- language : For filtering languages
- followersCountMax : For filtering followers count 
- followersCountMin : For filtering followers count 
- verified: For filtering verified users 
---
## Tech Stack
- Node js
- MongoDB
- Express


