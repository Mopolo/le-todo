#!/usr/bin/env node

var path = require('path');
var pkg = require(path.join(__dirname, 'package.json'));
var program = require('commander');
var TodoManager = require('./dist/TodoManager');

program
    .version(pkg.version);

program
    .command('do [id]')
    .description('Mark a todo as done')
    .action(function(id) {
        TodoManager.done(id);
        process.exit();
    });

program
    .command('rm [id]')
    .description('Removes a todo')
    .action(function(id) {
        TodoManager.rm(id);
        process.exit();
    });

program
    .command('cleanup')
    .description('Remove all done todos')
    .action(function() {
        TodoManager.cleanup();
        process.exit();
    });

program.on('--help', function(){
    console.log('  To add a todo:');
    console.log('');
    console.log('    $ todo drink beer at 4pm');
    console.log('    (The first word cannot be one of these: do, rm, cleanup)');
    console.log('');
});

program
    .parse(process.argv);

if (process.argv.length >= 3) {
    TodoManager.add();
    process.exit();
}

console.log('Help: todo -h');
TodoManager.list();

process.exit();
