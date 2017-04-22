// Copyright (c) 2017 Authenticity Checker Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Get the current URL.
 *
 * @param {function(string)} callback - called when the URL of the current tab
 *   is found.
 */
function getCurrentTabUrl(callback) {
  // Query filter to be passed to chrome.tabs.query - see
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    var tab = tabs[0];

    // A tab is a plain object that provides information about the tab.
    // See https://developer.chrome.com/extensions/tabs#type-Tab
    var url = tab.url;

    // tab.url is only available if the "activeTab" permission is declared.
    // If you want to see the URL of other tabs (e.g. after removing active:true
    // from |queryInfo|), then the "tabs" permission is required to see their
    // "url" properties.
    console.assert(typeof url == 'string', 'tab.url should be a string');

    callback(url);
  });

  // Most methods of the Chrome extension APIs are asynchronous. This means that
  // you CANNOT do something like this:
  //
  // var url;
  // chrome.tabs.query(queryInfo, function(tabs) {
  //   url = tabs[0].url;
  // });
  // alert(url); // Shows "undefined", because chrome.tabs.query is async.
}
/**
 * @param {string} searchTerm - Search term for Google Image search.
 * @param {function(string,number,number)} callback - Called when an image has
 *   been found. The callback gets the URL, width and height of the image.
 * @param {function(string)} errorCallback - Called when the image is not found.
 *   The callback gets a string that describes the failure reason.
 */

/**
Initializing Global score Variables i.e. Scored and Total
Based on which the application is going to genrate the
Complete Score wherein the Dinominator and Numerator
both can vary depending upon the requirements
fulfilled by the URL
*/
var Score = 0;
var Score_Demoninator = 1;
var Score_Numerator = 0;
//Topics included in 
var contentTopicArray = ['iOS', 'Technical'];

function renderStatus(statusText, statusImage) {
  document.getElementById('status').textContent = statusText;

  var elem = document.createElement("img");
  var img_src = statusImage;
  elem.setAttribute("src", img_src);
  elem.setAttribute("height", "20");
  elem.setAttribute("width", "20");
  elem.setAttribute("alt", "gesture");
  document.getElementById('status').appendChild(elem);

}

/*
This Event Listener returns the processed url and with that displays the score
and the trust factor icon, this function is called when the user clicks on the
extension and then the output code is generated
*/
document.addEventListener('DOMContentLoaded', function() {
  getCurrentTabUrl(function(url) {
    // Put the image URL in Google search.
    renderStatus('Url is: ' + url);
    extractDomain(url);

    var score = (Score_Numerator/Score_Demoninator)*100;
    score = Math.round(score * 100) / 100
    var domain = extractDomain(url);
    var image = 'yellow.png';
    if(score>75)
      image = 'green.png';
    if(score<40)
      image = 'red.png';
    renderStatus('Score is: ' + score + '%' ,image);
  });
});

/*
This Event Listener returns the score which is processed by certain diferent algorithms
and then sum up to form a cumulative score and then passes the overall score 
generated from different algorithms and rates the url.
*/
 function processUrl(url){
  //This is sample code just for testing, no logic embedded 
  //Dummy code
    if (url.length <50){
      var len = url.length*2;
    }
    else if (url.length >100){
      var len = url.length/2;
    }
    else{
      var len = url.length;
    }
    return len;
  //Actual implementation starts from here. 

  //Add Code Here!!!!!!!!!!

 }

 function extractDomain(url) {
    var domain;
    var score_domain = 0;

    //find & remove protocol (http, ftp, etc.) and get domain
    if (url.indexOf("://") > -1) {
        domain = url.split('/')[2];
        //domain = url.split('/')[0];
    }
    else {
        domain = url.split('/')[0];
    }

    //find & remove port number
//    domain = domain.split(':')[0];
    //getting the .com or .edu part
    var end = domain.split(".");
    var dom = end[end.length-1];
    if(dom == 'edu' || dom == 'org')
    {
      Score_Numerator += 100;
      Score_Demoninator += 100;
    }
    else
      Score_Numerator += 0.56;
    return dom;
}

function fullcontactScore(url) {
  var email = url;
  var text = "NULL";
  var match = 0;
  email = "brat@fullcontact.com";
  var json_url = "https://api.fullcontact.com/v2/person.json?apiKey=7f66d2ef946b6f06&email="+email;

        $.getJSON(
          json_url,
          function(data){

            if(data.status == 200){
                if(data.organizations){
                    fLen = data.organizations.length;
                    for (i = 0; i < fLen; i++) {
//                        text += data.organizations[i].name + " --> " + data.organizations[i].title;

                    }
                }
            }
            else{
                text = "ELSE-NULL";
            }
        });
        return text;
}
