# Correios Tracker (Non Official)

This is a Brazilian National Post (Correios) tracker.

It makes a request in the official website, and parses the HTML into a javascript object.

**Warning:** It might break when Correios change their payload result.

## Installation

```
npm install correios-tracker
```

## Usage

```javascript
const correiosTracker = require('correios-tracker');

correiosTracker('AA123456789BR')
  .then(result => {
    console.log(result);
  })
  .catch(error => {
    console.error(error);
  });
```

## Response Payload

```javascript
[
  {
    date: 'DD/MM/YYYY hh:mm',
    location: 'CITY / STATE',
    description: 'Detailed description'
  }
]
```
