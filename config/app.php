<?php
/**
 * Yii Application Config
 *
 * Edit this file at your own risk!
 *
 * The array returned by this file will get merged with
 * vendor/craftcms/cms/src/config/app.php and app.[web|console].php, when
 * Craft's bootstrap script is defining the configuration for the entire
 * application.
 *
 * You can define custom modules and system components, and even override the
 * built-in system components.
 *
 * If you want to modify the application config for *only* web requests or
 * *only* console requests, create an app.web.php or app.console.php file in
 * your config/ folder, alongside this one.
 */

use craft\helpers\App;
use craft\mail\transportadapters\Smtp;

return [
    '*' => [
        'id' => App::env('APP_ID') ?: 'CraftCMS',
        'modules' => [
            'clécodée-base' => \clécodée\base\CléCodée::class,
            'component-preview' => \clécodée\componentpreview\ComponentPreview::class,
        ],
        'components' => [
            'deprecator' => [
                'throwExceptions' => YII_DEBUG,
            ],
            'mailer' => function() {
                $settings = App::mailSettings();
                $settings->transportType = Smtp::class;
                $settings->transportSettings = [
                    'host' => App::env('MAIL_HOST'),
                    'port' => App::env('MAIL_PORT'),
                    'username' => App::env('MAIL_USERNAME'),
                    'password' => App::env('MAIL_PASSWORD'),
                    'useAuthentication' => true,
                ];
                $config = App::mailerConfig($settings);
                try {
                    return Craft::createObject($config);
                } catch(Exception $exception) {
                    return null;
                }
            }
        ],
        'bootstrap' => [
            'clécodée-base',
            'component-preview'
        ],
    ],

    'staging' => [
        'components' => [
            'mailer' => function() {
                $settings = App::mailSettings();
                $settings->fromEmail = 'cappelleniels@hotmail.com';
                $config = App::mailerConfig($settings);
                return Craft::createObject($config);
            }
        ]
    ]
];
