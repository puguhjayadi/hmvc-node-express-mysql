const sql = require("../models/db.js");

module.exports = function(table) {

  return {

    getAll : function(result) {
      sql.query("SELECT * FROM "+table, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        result(null, res);
      });
    },

    store : function (object, result) {
      sql.query("INSERT INTO "+table+" SET ?", object, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }

        console.log("created object: ", { id: res.insertId, ...object });
        result(null, { id: res.insertId, ...object });
      });
    },

    
    show : function(id, result) {
      sql.query("SELECT * FROM "+table+" WHERE id = ?", [id], (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        if (res.length) {
          console.log("found object: ", res[0]);
          result(null, res[0]);
          return;
        }

        result(null, { message: "not found" });

      });
    },

    update : function (id, object, result) {
      sql.query( "UPDATE "+table+" SET ? WHERE id = ?", [object, id], (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }

        if (res.affectedRows == 0) {
          result(null, { message: "not found" });
          return;
        }

        console.log("updated object: ", { id: id, ...object });
        result(null, { id: id, ...object });
      }
      );
    },

    destroy : function(id, result) {
      sql.query("DELETE FROM "+table+" WHERE id = ?", id, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }

        if (res.affectedRows == 0) {
          result(null, { message: "not found" });
          return;
        }

        console.log("deleted object with id: ", id);
        result(null, res);
      });
    },


  }
};




