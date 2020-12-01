const blacklist = require('metro-config/src/defaults/blacklist'); //#.createBlacklist;

module.exports = {
  resolver: {
    blacklistRE: blacklist([/spec\/.*/])
  }
};


//const blacklist = require('metro-config/src/defaults/blacklist');

// blacklist is a function that takes an array of regexes and combines
// them with the default blacklist to return a single regex.

// module.exports = {
//   resolver: {
//     blacklistRE: blacklist([/dist\/.*/])
//   }
//};