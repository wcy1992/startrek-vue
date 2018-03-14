var gulp = require('gulp');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');
var merge = require('merge2');
var fs = require('fs');
var child_process = require('child_process');
var stripJsonComments = require("strip-json-comments");
var project = fs.readFileSync('project.json').toString();
project = JSON.parse(stripJsonComments(project));


var getSTLibPath = function (name) {
    return project.stlibs[name]
}

var getDependencyPaths = function (module) {
    module.dependencies = module.dependencies || [];
    var result = [];
    for (var i = 0; i < module.dependencies.length; i++) {
        var element = getSTLibPath(module.dependencies[i]);
        result.push(element)
    }
    return result;
}
var taskNames = [];
var taskSourcePaths = [];
var createProject = function (options) {
    options = options || {};
    return ts.createProject('tsconfig.json', options);
}

var createWatch = function (glob, task) {
    var tasks = [];
    tasks.push(task);
    gulp.watch(glob, tasks);
    console.log('[starting watch]', task)
}

var createTask = function (task) {
    return function () {
        var taskName = task.name;
        var taskSourcePath = task.path;
        var outFile = `${taskName}.js`;
        var options = { outFile: outFile };
        task.declaration && (options.declaration = true);
        var tsProject = createProject(options);
        // console.log('[options]', JSON.stringify(tsProject.options));
        console.log(`[build] module ${task.name} is building...`);
        var globs = [];
        globs.push(taskSourcePath);
        globs = globs.concat(project.libs);//添加第三方库声明文件
        globs = globs.concat(getDependencyPaths(task));//添加模块依赖的声明文件
        var tsResult = gulp.src(globs)
            .pipe(sourcemaps.init())
            .pipe(tsProject());
        var streams = [];
        var js_stream;
        if (project.sourceMap)
            js_stream = tsResult.js
                .pipe(sourcemaps.mapSources(function (sourcePath, file) {
                    return '../../../' + sourcePath;
                }))
                .pipe(sourcemaps.write('.'))
                .pipe(gulp.dest(project.outDir)).pipe(gulp.dest(project.publishDir))
        else
            js_stream = tsResult.js.pipe(gulp.dest(project.outDir));
        streams.push(js_stream);
        if (task.declaration)
            streams.push(tsResult.dts.pipe(gulp.dest(project.declarationDir)));
        return merge(streams);
    }
}

var buildTask= function(task)
{
        var taskName = task.name;
        var taskSourcePath = task.path;
        var outFile = `${taskName}.js`;
        var options = { outFile: outFile };
        task.declaration && (options.declaration = true);
        var tsProject = createProject(options);
        // console.log('[options]', JSON.stringify(tsProject.options));
        console.log(`[build] module ${task.name} is building...`);
        var globs = [];
        globs.push(taskSourcePath);
        globs = globs.concat(project.libs);//添加第三方库声明文件
        globs = globs.concat(getDependencyPaths(task));//添加模块依赖的声明文件
        var tsResult = gulp.src(globs)
            .pipe(sourcemaps.init())
            .pipe(tsProject());
        var streams = [];
        var js_stream;
        if (project.sourceMap)
            js_stream = tsResult.js
                .pipe(sourcemaps.mapSources(function (sourcePath, file) {
                    return '../../../' + sourcePath;
                }))
                .pipe(sourcemaps.write('.'))
                .pipe(gulp.dest(project.outDir)).pipe(gulp.dest(project.publishDir))
        else
            js_stream = tsResult.js.pipe(gulp.dest(project.outDir));
        streams.push(js_stream);
        if (task.declaration)
            streams.push(tsResult.dts.pipe(gulp.dest(project.declarationDir)));
        return merge(streams);

}

project.modules.forEach(function (task) {
    // console.log('[info]', JSON.stringify(task));
    if (task.disabled) return;
    taskNames.push(task.name);
    taskSourcePaths.push(task.path);
    gulp.task(task.name, createTask(task));
}, this);

project.apps.names.forEach(function (name) {
    // console.log('[info]', name);
    taskNames.push(name);
    const path = project.apps.path.replace('{{name}}', name);
    taskSourcePaths.push(path);
    const task = { "name": name, "path": path, "dependencies": project.apps.dependencies };
    gulp.task(task.name, createTask(task));

}, this);

gulp.task('default', ['livereload'], function () {

    for (var index = 0; index < taskNames.length; index++) {
        var name = taskNames[index];
        var path = taskSourcePaths[index];
        createWatch(path, name);
    }
});

gulp.task('livereload', [], function () {
    livereload({ start: true });

    gulp.watch('./h5/js/**/*.js', (file) => {
        // console.info(`changed file`, file.path);
        livereload.changed(file.path);
    });
});

// 导出静态数据
gulp.task('data', function () {
    var command = 'fet export --rootpath=./ --config=./tools/config/dataexporter.json'
    var child = child_process.exec(command);
    child.stdout.on('data', function(data) {
        console.log(data);
    });
    child.stderr.on('data', function(data) {
        console.log('stderr: ' + data);
    });
    child.on('close', function(code) {
    });
});

gulp.task('build', taskNames);