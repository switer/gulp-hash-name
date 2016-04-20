# gulp-hash-name
Rename file with hash, replace of "gulp-hash".

# Usage

```bash
npm install gulp-hash-name --save-dev
```

```js
var hashName = require('gulp-hash-name')

gulp.src('*.js')
    .pipe(hashName({
            hashLength: 8,
            template: '{name}_{has}{ext}'
        }))
    .pipe(gulp.dest('./dist'))
```

# License

MIT