'use strict';

module.exports = function (grunt) {

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Automatically load required grunt tasks
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin',
        s3: 'grunt-aws',
        replace: 'grunt-text-replace'
    });

    // configurable paths
    var config = {
        app: 'app',
        dist: 'dist'
    };

    grunt.initConfig({

        // Project settings
        config: config,
        credentials: grunt.file.readJSON('credentials.json'),
        package: grunt.file.readJSON('package.json'),

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            assemble: {
                files: [
                    '<%= config.app %>/data/{,*/}*.{yml,json}',
                    '<%= config.app %>/{layouts,pages,partials}/{,**/}*.hbs'
                ],
                tasks: ['assemble']
            },
            js: {
                files: [
                    '<%= config.app %>/scripts/{,*/}*.js'
                ],
                tasks: [
                    'browserify',
                    'jshint'
                ]
            },
            sass: {
                files: ['<%= config.app %>/styles/{,*/}*.scss'],
                tasks: [
                    'sass:server',
                    'postcss'
                ]
            },
            webfont: {
                files: [
                    '<%= config.app %>/media/icons/*.svg'
                ],
                tasks: ['webfont']
            },
        },

        browserSync: {
            options: {
                port: 0,
                notify: false,
                background: true,
                timestamps: false
            },
            livereload: {
                options: {
                    files: [
                        '.tmp/{,*/}*.html',
                        '.tmp/styles/{,*/}*.css',
                        '.tmp/scripts/main.js',
                        '<%= config.app %>/media/{,**/}*',
                        '!<%= config.app %>/media/icons/*'
                    ],
                    server: {
                        baseDir: ['.tmp', config.app],
                        routes: {
                            '/app/styles': './app/styles'
                        }
                    }
                }
            },
            dist: {
                options: {
                    background: false,
                    server: '<%= config.dist %>'
                }
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '.sass-cache',
                        '<%= config.dist %>/*',
                        '!<%= config.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },

        // Generate pages
        assemble: {
            options: {
                root: '.tmp',
                layout: 'default',
                layoutext: '.hbs',
                layoutdir: '<%= config.app %>/layouts',
                assets: '<%= config.app %>',
                data: '<%= config.app %>/data/*.{json,yml}',
                partials: '<%= config.app %>/partials/{,*/}*.hbs',
                plugins: ['grunt-assemble-sitemap'],
                sitemap: {
                    relativedest: '.tmp'
                }
            },
            pages: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/pages',
                    dest: '.tmp',
                    src: '{,**/}*.hbs'
                }]
            }
        },

        // Compile Sass
        sass: {
            options: {
                sourceMap: true,
                includePaths: [
                    '<%= config.app %>',
                    'node_modules'
                ]
            },
            server: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>',
                    src: ['styles/{,*/}*.scss'],
                    dest: '.tmp',
                    ext: '.css'
                }]
            }
        },

        // JavaScript
        browserify: {
            options: {
                transform: [
                    ['babelify', {
                        'presets': ['es2015']
                    }]
                ]
            },
            server: {
                src: '<%= config.app %>/scripts/main.js',
                dest: '.tmp/scripts/main.js',
            }
        },

        // Process CSS
        postcss: {
            options: {
                map: {
                    inline: false
                },
                processors: [
                    require('postcss-flexbugs-fixes'),
                    require('autoprefixer')({
                        browsers: [
                            'Chrome >= 35',
                            'Firefox >= 38',
                            'Edge >= 12',
                            'Explorer >= 9',
                            'iOS >= 8',
                            'Safari >= 8',
                            'Android 2.3',
                            'Android >= 4',
                            'Opera >= 12'
                        ]
                    })
                ]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/',
                    src: '{,*/}*.css',
                    dest: '.tmp/'
                }]
            }
        },

        // Generate custom icon font
        webfont: {
            icons: {
                src: '<%= config.app %>/media/icons/*.svg',
                dest: '.tmp/media/fonts',
                destCss: '.tmp/',
                options: {
                    engine: 'node',
                    hashes: false,
                    stylesheet: 'css',
                    relativeFontPath: '/media/fonts',
                    templateOptions: {
                        classPrefix: 'icon-',
                    }
                }
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            options: {
                dest: '<%= config.dist %>'
            },
            html: '.tmp/index.html'
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            options: {
                assetsDirs: ['<%= config.dist %>']
            },
            html: ['<%= config.dist %>/{,**/}*.html'],
            css: ['<%= config.dist %>/{,*/}*.css']
        },

        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/media',
                    src: '{,**/}*.{png,jpg,jpeg}',
                    dest: '<%= config.dist %>/media'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.app %>/media',
                    src: '{,**/}*.svg',
                    dest: '<%= config.dist %>/media'
                }]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    removeAttributeQuotes: true,
                    removeCommentsFromCDATA: true,
                    removeEmptyAttributes: true,
                    removeOptionalTags: true,
                    removeRedundantAttributes: false,
                    useShortDoctype: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.dist %>',
                    src: '{,**/}*.html',
                    dest: '<%= config.dist %>'
                }]
            }
        },

        // Put files not handled in other tasks here
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.app %>',
                    dest: '<%= config.dist %>',
                    src: [
                        '.htaccess',
                        '*.txt',
                        'media/{,**/}*.{webp,gif,ico}',
                        'media/fonts/*'
                    ]
                },{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.app %>',
                    dest: '<%= config.dist %>',
                    flatten: true,
                    src: [
                        'media/favicon.ico'
                    ]
                },{
                    expand: true,
                    dot: true,
                    cwd: '.tmp',
                    dest: '<%= config.dist %>',
                    src: [
                        'media/fonts/*',
                        'robots.txt',
                        'sitemap.xml'
                    ]
                },{
                    expand: true,
                    dot: true,
                    cwd: '.tmp',
                    dest: '<%= config.dist %>',
                    src: [
                        '{,**/}*.html',
                        '!icons.html'
                    ]
                }]
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                force: true,
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= config.app %>/scripts/{,*/}*.js'
            ]
        },

        // Pick an unused port for livereload
        portPick: {
            browserSync: {
                options: {
                    port: 9000
                },
                targets: ['browserSync.options.port']
            }
        },

        // Renames files for browser caching purposes
        filerev: {
            dist: {
                src: [
                    '<%= config.dist %>/scripts/{,*/}*.js',
                    '<%= config.dist %>/styles/{,*/}*.css',
                    '<%= config.dist %>/media/{,**/}*.{png,jpg,jpeg,gif,webp,svg,eot,ttf,woff,woff2}'
                ]
            }
        },

        // Run some tasks in parallel to speed up build process
        concurrent: {
            server: [
                'webfont',
                'sass:server',
                'browserify'
            ],
            dist: [
                'webfont',
                'sass',
                'browserify',
                'imagemin',
                'svgmin'
            ]
        },

        // Deploy to AWS S3
        s3: {
            options: {
                accessKeyId: '<%= credentials.aws.accessKeyId %>',
                secretAccessKey: '<%= credentials.aws.secretAccessKey %>',
                signatureVersion: 'v4',
                headers: {
                    CacheControl: 'public, no-cache'
                }
            },
            dist: {
                options: {
                    bucket: 'yw-test-bucket',
                },
                cwd: '<%= config.dist %>',
                src: '**'
            }
        },

        // Increment version number, create and push tag
        bump: {
            options: {
                files: ['package.json'],
                commitFiles: '<%= bump.options.files %>',
                pushTo: 'origin'
            }
        },

        // Text replacements
        replace: {
            openGraphTag: {
                src: [
                    '<%= config.dist %>/{,**/}*.html',
                ],
                overwrite: true,
                replacements: [{
                    from: /<meta property=og:(image|url) content="?(\/[^"?>]+)"?/g,
                    to: '<meta property=og:$1 content=<%= package.homepage %>$2'
                }]
            },
            relCanonical: {
                src: [
                    '<%= config.dist %>/{,**/}*.html',
                ],
                overwrite: true,
                replacements: [{
                    from: /<link rel=canonical href="?(\/[^"?>]+)"?/g,
                    to: '<link rel=canonical href=<%= package.homepage %>$1'
                }]
            },
            sitemap: {
                src: [
                    '<%= config.dist %>/sitemap.xml',
                ],
                overwrite: true,
                replacements: [
                    {
                        from: 'index.html',
                        to: ''
                    }, {
                        from: /\s+<changefreq>[a-z]+<\/changefreq>/g,
                        to: ''
                    }, {
                        from: /\s+<priority>[0-9\.]+<\/priority>/g,
                        to: ''
                    }

                ]
            }
        },

    });

    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'portPick:browserSync', 'browserSync:dist']);
        }

        grunt.task.run([
            'clean:server',
            'assemble',
            'portPick',
            'concurrent:server',
            'postcss',
            'browserSync:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('test', [
        'jshint'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'assemble',
        'useminPrepare',
        'concurrent:dist',
        'postcss',
        'concat',
        'cssmin',
        'uglify',
        'copy:dist',
        'filerev',
        'usemin',
        'htmlmin'
    ]);

    grunt.registerTask('deploy', [
        'build',
        'replace',
        's3'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'build'
    ]);
};
