const path = require("path");
const Utility = require("./util/Utility");
const rootDir = Utility.projectDir;
const paths = {
    src: path.resolve(rootDir, "src"),
    ts: path.resolve(rootDir, "config/config.test.json"),
    modules: [path.resolve(rootDir, "node_modules")]
};

const webpackSettings = {
    entry: 'index.ts',
    devtool: 'inline-source-map',
    resolve: {
        root: [paths.src],
        extensions: ["", ".ts", ".js"],
        modulesDirectories: ["node_modules"]
    },
    ts: {
        configFileName: paths.ts
    },
    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
            { test: /\.ts$/, loader: 'ts-loader'}
        ],
        postLoaders: [
            {
                test: /\.ts$/,
                loader: 'istanbul-instrumenter-loader',
                exclude: [
                    'node_modules',
                    /\.spec\.ts$/
                ]
            }
        ]
    }
};

module.exports = function(config) {
    config.set({
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: "../",
        // enable / disable colors in the output (reporters and logs)
        colors: true,
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,
        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,
        captureTimeout: 3000,
        browserDisconnectTimeout: 3000,
        browserDisconnectTolerance: 1,
        browserNoActivityTimeout: 60000,
        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ["Chrome_travis_ci"],
        customLaunchers: {
            Chrome_travis_ci: {
                base: "Chrome",
                flags: ["--no-sandbox"]
            }
        },
        plugins: [
            "karma-typescript",
            "karma-webpack",
            "karma-sourcemap-loader",
            "karma-mocha-reporter",
            "karma-mocha",
            "karma-chai",
            "karma-chrome-launcher",
            "karma-remap-coverage",
            "karma-coverage"
        ],
        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false ,
        frameworks: ["mocha"],
        // list of files / patterns to load in the browser
        files: [
            "src/index.ts",
            "src/**/*.spec.ts"
        ],
        // list of files to exclude
        exclude: [
        ],
        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            "src/index.ts": ["webpack"],
            "src/**/*.spec.ts": ["webpack"]
        },
        webpack: webpackSettings,
        webpackServer: {
            colors: true,
            hash: false,
            version: false,
            timings: false,
            assets: false,
            chunks: false,
            modules: false,
            reasons: false,
            children: false,
            source: false,
            errors: true,
            errorDetails: true,
            warnings: true,
            publicPath: false
        },
        webpackMiddleware: {
            // webpack-dev-middleware configuration
            // i. e.
            stats: "errors-only"
        },
        // test results reporter to use
        // possible values: "dots", "progress"
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ["mocha", "coverage"],
        coverageReporter: {
            // specify a common output directory
            dir: 'coverage',
            reporters: [
                // reporters not supporting the `file` property
                { type: 'html', subdir: 'report-html' },
                { type: 'lcov', subdir: 'report-lcov' }
            ]
        },
        client: {
            mocha: {
                timeout: 15000
            }
        }
    });
};
