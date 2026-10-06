// ✏️ Edit this block to make it yours.
var CONFIG = {
  name: "",                       // her name, e.g. "Amina". Leave empty to skip.
  note: "If I could give you one thing in this world, it would be the ability to see yourself through my eyes, so you could understand just how precious you are to me. You make my world softer, my heart happier, and my life more beautiful just by being in it. And no matter how many birthdays come and go, I'll always be grateful that this world gave me you. ❤️",
  reasons: [
    "You're my favorite person to do nothing with.",
    "your smile can instantly make my worst days a little better.",
    "Home is wherever you are.",
    "you make even the ordinary moments feel special",
    "And most of all, I love you simply because you're you—and I wouldn't want anyone else. ❤️"
  ],
  plans: [
    "Morning: breakfast, no phones",
    "Evening: dinner, and a surprise",
  ],
  signoff: "With all my love"
};

var MONTH = 10, DAY = 22; // November 22
var $ = function(id){return document.getElementById(id)};

function target(){
  var n = new Date(), y = n.getFullYear();
  if (n >= new Date(y, MONTH, DAY + 1)) y++;
  return new Date(y, MONTH, DAY);
}
var T = target();

function tick(){
  var now = new Date(), d = T - now;
  if (d <= 0 && now < new Date(T.getFullYear(), MONTH, DAY + 1)){
    $("days").textContent = "🎂";
    $("unit").textContent = "Happy birthday" + (CONFIG.name ? ", " + CONFIG.name : "") + "!";
    $("hello").textContent = "Today is your day.";
    document.querySelector(".clock").style.display = "none";
    return;
  }
  var s = Math.floor(d / 1000);
  var days = Math.floor(s / 86400);
  $("days").textContent = days;
  $("unit").textContent = (days === 1 ? "day" : "days") + " until your birthday";
  $("h").textContent = Math.floor(s % 86400 / 3600);
  $("m").textContent = Math.floor(s % 3600 / 60);
  $("s").textContent = s % 60;
}
tick(); setInterval(tick, 1000);

if (CONFIG.name) $("hello").textContent = "Hey " + CONFIG.name + ", don't forget.";
$("note").textContent = CONFIG.note;
$("foot").textContent = CONFIG.signoff;
$("calTitle").textContent = "November " + T.getFullYear();

// November calendar with the 22nd circled
var g = $("grid"), html = "";
["S","M","T","W","T","F","S"].forEach(function(x){html += '<span class="dow">' + x + '</span>'});
var first = new Date(T.getFullYear(), MONTH, 1).getDay();
for (var i = 0; i < first; i++) html += "<span></span>";
for (var d = 1; d <= 30; d++) html += '<span' + (d === DAY ? ' class="on"' : '') + '>' + d + '</span>';
g.innerHTML = html;

// Reasons
var idx = 0;
$("next").onclick = function(){
  $("reason").textContent = CONFIG.reasons[idx % CONFIG.reasons.length];
  idx++;
  $("count").textContent = Math.min(idx, CONFIG.reasons.length) + " of " + CONFIG.reasons.length;
  if (idx >= CONFIG.reasons.length) $("next").textContent = "Start over";
  if (idx > CONFIG.reasons.length){ idx = 1; $("reason").textContent = CONFIG.reasons[0]; $("count").textContent = "1 of " + CONFIG.reasons.length; $("next").textContent = "Give me a reason"; }
};

$("plan").innerHTML = CONFIG.plans.map(function(p){return "<li>" + p + "</li>"}).join("");
