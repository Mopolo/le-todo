var fs = require('fs');
var path = require('path');
var colors = require('colors');

function getUserHome() {
  return process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;
}

var mkdirSync = function (path) {
    try {
        fs.mkdirSync(path);
    } catch(e) {
        if ( e.code != 'EEXIST' ) throw e;
    }
}

class TodoManager {
    constructor() {
        this.debug = false;

        this.todoDir = path.join(getUserHome(), '.todo');

        if (!fs.existsSync(this.todoDir)) {
            mkdirSync(this.todoDir);
        }
    }

    list(includeDate) {
        var self = this;
        var todos = self.getAllTodos();
        var todo = {};

        console.log();

        if (!todos.length) {
            console.log('Nothing to do here...');
            process.exit();
        }

        todos.forEach(function(file) {
            todo = require(path.join(self.todoDir, file));

            var id = file.replace('.json', '');
            var done = todo.done ? '•'.green : 'x'.red;
            var date = '';

            if (includeDate) {
                var d = new Date(todo.created_at);
                date = {
                    year: d.getFullYear(),
                    month: d.getMonth() + 1,
                    day: d.getDate()
                };

                if (date.month < 10) {
                    date.month = '0' + date.month;
                }

                if (date.day < 10) {
                    date.day = '0' + date.day;
                }

                date = '[' + date.year + '-' + date.month + '-' + date.day + ']';
            }

            console.log('[' + done + '][' + id.blue + ']' + date + ' ' + todo.text);
        });

        console.log();
    }

    add() {
        if (process.argv.length < 3) {
            console.log('Usage');
            process.exit();
        }

        var text = [];

        for (var i = 2; i < process.argv.length; i++) {
            text.push(process.argv[i]);
        }

        var today = new Date();

        var todo = {
            text: text.join(' '),
            created_at: today
        };

        fs.writeFileSync(this.getTodoFile(this.getNextTodoId()), JSON.stringify(todo, undefined, 2));

        this.list();
    }

    done(id) {
        if (!fs.existsSync(this.getTodoFile(id))) {
            console.log('This todo does not exist');
            process.exit();
        }

        var todo = require(this.getTodoFile(id));

        todo.done = true;

        fs.writeFileSync(this.getTodoFile(id), JSON.stringify(todo, undefined, 2));

        this.list();
    }

    rm(id) {
        var todo = require(this.getTodoFile(id));

        if (!todo) {
            console.log('This todo does not exist');
            process.exit();
        }

        fs.unlinkSync(this.getTodoFile(id));

        this.list();
    }

    cleanup() {
        var self = this;
        var todos = self.getAllTodos();
        var todo = {};

        todos.forEach(function(file) {
            todo = require(path.join(self.todoDir, file));
            var id = file.replace('.json', '');

            if (todo.done) {
                self.rm(id);
            }
        });
    }

    getAllTodos() {
        return fs.readdirSync(this.todoDir);
    }

    getNextTodoId() {
        var todos = this.getAllTodos();
        var lastId = 0;

        if (todos.length) {
            todos.forEach(function(todo) {
                lastId = todo.replace('.json', '');
            });
        }

        return ++lastId;
    }

    getTodoFile(id) {
        return path.join(this.todoDir, id + '.json');
    }
}

module.exports = new TodoManager();
