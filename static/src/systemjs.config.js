/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      //'npm:': 'node_modules/' //for angular debug
      'npm:': 'static/node_modules/' // for django debug
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      //'app': 'app/js', //for angular debug
      'app': 'static/src/app/js', // for django debug

      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',

      '@alicloud/sms-sdk': 'npm:@alicloud/sms-sdk/index.js',

      // other libraries
      'core.js': 'npm:core.js',
      'rxjs': 'npm:rxjs',
      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
      'systemjs': 'npm:systemjs',
      'zone.js': 'npm:zone.js'
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      'app': {main: 'main.js', defaultExtension: 'js'},
      'core.js': {main: 'client/shim.js', defaultExtension: 'js'},
      'rxjs': {main: 'bundles/Rx.min.js', defaultExtension: 'js'},
      'systemjs': {main: 'dist/system.src.js', defaultExtension: 'js',
      'zone.js': {main: 'dist/zone.js', defaultExtension: 'js'}}
    }
  });
})(this);
