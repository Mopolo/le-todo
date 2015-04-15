# node-todo
A simple cli todo tool.

### Version
0.1.0

### Installation

This package can be installed using npm:

```sh
$ [sudo] npm install -g le-todo
```

### Usage

#### List all todos

```sh
$ todo

# it will display the list like this:

The todo status ([x]: not done, [•]: done)
 |
 v
[x][1] explore space
[x][2] buy some beer
    ^
    |
   The todo id (use it to mark a todo as done, or to remove a todo)

```

#### Add a todo

```sh
$ todo This is a todo
```

#### Mark a todo as done

```sh
$ todo do <id>
```

#### Remove a todo as done

```sh
$ todo rm <id>
```

#### Help

```sh
$ todo -h
```

#### Version

```sh
$ todo --version
```

#### License

The MIT License (MIT)

Copyright (c) 2015 Nathan Boiron

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

