"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var fs = require("fs");
var path = require("path");
var colors = require("colors");

function getUserHome() {
    return process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
}

var mkdirSync = function mkdirSync(path) {
    try {
        fs.mkdirSync(path);
    } catch (e) {
        if (e.code != "EEXIST") throw e;
    }
};

var TodoManager = (function () {
    function TodoManager() {
        _classCallCheck(this, TodoManager);

        this.debug = false;

        this.todoDir = path.join(getUserHome(), ".todo");

        if (!fs.existsSync(this.todoDir)) {
            mkdirSync(this.todoDir);
        }
    }

    _createClass(TodoManager, {
        list: {
            value: function list() {
                var self = this;
                var todos = self.getAllTodos();
                var todo = {};

                console.log();

                if (!todos.length) {
                    console.log("Nothing to do here...");
                    process.exit();
                }

                todos.forEach(function (file) {
                    todo = require(path.join(self.todoDir, file));

                    var id = file.replace(".json", "");

                    var done = todo.done ? "•".green : "x".red;

                    console.log("[" + done + "][" + id.blue + "] " + todo.text);
                });

                console.log();
            }
        },
        add: {
            value: function add() {
                if (process.argv.length < 3) {
                    console.log("Usage");
                    process.exit();
                }

                var text = [];

                for (var i = 2; i < process.argv.length; i++) {
                    text.push(process.argv[i]);
                }

                var today = new Date();

                var todo = {
                    text: text.join(" "),
                    created_at: today
                };

                fs.writeFileSync(this.getTodoFile(this.getNextTodoId()), JSON.stringify(todo, undefined, 2));

                this.list();
            }
        },
        done: {
            value: function done(id) {
                if (!fs.existsSync(this.getTodoFile(id))) {
                    console.log("This todo does not exist");
                    process.exit();
                }

                var todo = require(this.getTodoFile(id));

                todo.done = true;

                fs.writeFileSync(this.getTodoFile(id), JSON.stringify(todo, undefined, 2));

                this.list();
            }
        },
        rm: {
            value: function rm(id) {
                var todo = require(this.getTodoFile(id));

                if (!todo) {
                    console.log("This todo does not exist");
                    process.exit();
                }

                fs.unlinkSync(this.getTodoFile(id));

                this.list();
            }
        },
        cleanup: {
            value: function cleanup() {
                var self = this;
                var todos = self.getAllTodos();
                var todo = {};

                todos.forEach(function (file) {
                    todo = require(path.join(self.todoDir, file));
                    var id = file.replace(".json", "");

                    if (todo.done) {
                        self.rm(id);
                    }
                });
            }
        },
        getAllTodos: {
            value: function getAllTodos() {
                return fs.readdirSync(this.todoDir);
            }
        },
        getNextTodoId: {
            value: function getNextTodoId() {
                var todos = this.getAllTodos();
                var lastId = 0;

                if (todos.length) {
                    todos.forEach(function (todo) {
                        lastId = todo.replace(".json", "");
                    });
                }

                return ++lastId;
            }
        },
        getTodoFile: {
            value: function getTodoFile(id) {
                return path.join(this.todoDir, id + ".json");
            }
        }
    });

    return TodoManager;
})();

module.exports = new TodoManager();