//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const homeStartingContent = "Journal what you love, what you hate, what's in your head, what's important. Journaling organizes your thoughts; allows you to see things in a concrete way that otherwise you might not see. Focus on what you think you need to find in your art..Read daily great articles which enhance your knowledge and brings much more Confident.";
const aboutContent = "Daily Journal Corporation publishes newspapers and Websites reporting California and Arizona news and produces several specialized information services. The Company operates through two segments: Traditional Business and Journal Technologies.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
var _=require("lodash")
var posts=[];
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  res.render("home",{StartingContent:homeStartingContent,posts:posts})
})
app.get("/about",function(req,res){
  res.render("about",{about:aboutContent})
})
app.get("/contact",function(req,res){
  res.render("contact",{contact:contactContent})
})
app.get("/compose",function(req,res){
  res.render("compose")
})

app.post("/compose",function(req,res){
 const post={
  Title: req.body.postTitle,
  Description:req.body.postDescription

};
posts.push(post)
res.redirect("/")
})

app.get("/posts/:postName",function(req,res){
 var requestedTitle= _.lowerCase(req.params.postName);

 posts.forEach(function(post){
  var storedTitle=_.lowerCase(post.Title)

  if(requestedTitle===storedTitle){

      res.render("post",{
        title:post.Title,
        content:post.Description
      });
   
  }
 
 })
})










app.listen(3000, function() {
  console.log("Server started on port 3000");
});
