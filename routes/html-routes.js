const path = require("path");
const db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      db.Project.findAll({
        where: {
          UserId: req.user.id
        }
      }).then((project) => {
        res.render("index", { project: project })
      })
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      db.Project.findAll({
        where: {
          UserId: req.user.id
        }
      }).then((project) => {
        res.render("index", { project: project })
      })
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, (req, res) => {
    db.Project.findAll({
      where: {
        UserId: req.user.id
      }
    }).then((project) => {
      res.render("index", { project: project })
    })
  });
};
