# meme_create
this is right now completely backend nodejs <br>
<b> what you cna do in this </b><br>
right now it support <br>
<ol>
  <li>new registration, login, logout</li>
  <li> create new post(meme)</li>
  <li>delete user</li>
  <li>make comment on post</li>
  <li>delete comment on post(right now it is a bug)</li>
  <li>jwt authentication</li>
  <li>make a new group to chat with friends</li>
  <li>only those who joined can message on group</li>
</ol>

<h2>Tech Stack</h2>
<ul>
<li>Nodejs(backend)</li>
<li>Mongodb(database)</li>
<li>Postman(to test the get and post request i.e. my application)</li>
</ul>

<br>
<b> How to start with </b><br>
clone the repository <br>
navigate to root folder<br>
run `npm install` <br>
create a `.env` file on root directory<br>
inside `.env` file insert <br>
<pre>
MONGO_URI: "mongodb uri connection or localhost connection"
JWT_TOKEN: "anything i.e. "sjdsn" "
</pre>
now run `node index` <br>
open <a href="https://www.postman.com/"> postman </a> <br>
make a post request with <b>http://localhost:3000/api/auth/register</b> <br>
<b>DATA</b><br>
<pre>
"username": "your desired username"
"email": "email"
"password":"password"
</pre>
press enter
