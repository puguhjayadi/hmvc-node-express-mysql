const connection = require("../core/core.connection.js");
const PORT = process.env.PORT || 3000;

module.exports = function(table) {

  return {

    paginate : function(object, result) {
      const host      = object.protocol+"://"+object.hostname+":"+PORT;
      const per_page  = (object.query.per_page) ? parseInt(object.query.per_page) : 10;
      const page      = (object.query.page) ? parseInt(object.query.page) : 1;
      const search    = (object.query.search) ? object.query.search : '';
      const offset    = (page - 1) * per_page;
      const whereLike = this.whereLike(object.column, search);
      const queryBase = "SELECT * FROM "+table;
      const queryLimit = queryBase+" WHERE "+ whereLike.columns +" limit "+per_page+" OFFSET "+offset;
      
      if(search != ''){
        querySearch= queryBase+" WHERE "+whereLike.columns;
      } else {
        querySearch= queryBase;
      }

      connection.query(querySearch, whereLike.search, (err, rows) => {
        let tot = parseInt(rows.length);
        let first_page = 1;
        let previous_page = page > 0 ? page - 1 : "null";
        let next_page = page < Math.ceil(tot / per_page) ? page + 1 : "null";
        let last_page = Math.ceil(tot / per_page);

        connection.query(queryLimit, whereLike.search, (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
          }

          response = {
            search : search,
            total : tot,
            per_page : per_page,
            previous_page : previous_page,
            current_page : page,
            last_page : last_page,
            first_page_url: host+object.path + "?search="+search+"&page="+first_page+"&per_page="+per_page,
            last_page_url: host+object.path + "?search="+search+"&page="+last_page+"&per_page="+per_page,
            previous_page_url: (previous_page != 0) ? host+object.path + "?search="+search+"&page="+previous_page+"&per_page="+per_page : "null",
            next_page_url: (next_page != "null") ? host+object.path + "?search="+search+"&page="+next_page+"&per_page="+per_page : "null",
            path : host + object.path,
            from : offset + 1,
            to : offset + res.length,
            data : res
          }

          result(null, response);
        });
      });
    },


    all : function(result) {
      connection.query("SELECT * FROM "+table, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        result(null, res);
      });
    },

    nums : function(result) {
      connection.query("SELECT COUNT(*) AS nums FROM "+table, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        result(null, res);
      });
    },

    store : function (object, result) {
      connection.query("INSERT INTO "+table+" SET ?", object, (err, res) => {
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
      connection.query("SELECT * FROM "+table+" WHERE id = ?", [id], (err, res) => {
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
      connection.query( "UPDATE "+table+" SET ? WHERE id = ?", [object, id], (err, res) => {
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
      connection.query("DELETE FROM "+table+" WHERE id = ?", id, (err, res) => {
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

    whereLike : function(columns, search) {
      return {
        columns : columns.join(" LIKE ? OR ")+" LIKE ?",
        search : Array(columns.length).fill('%'+search+'%')
      }
    },


  }
};




