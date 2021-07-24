<?php
/**
 * General Configuration
 *
 * All of your system's general configuration settings go in here. You can see a
 * list of the available settings in vendor/craftcms/cms/src/config/GeneralConfig.php.
 *
 * @see \craft\config\GeneralConfig
 */

use craft\helpers\App;

return [
    // Global settings
    '*' => [
        // Default Week Start Day (0 = Sunday, 1 = Monday...)
        'defaultWeekStartDay' => 1,

        // Whether generated URLs should omit "index.php"
        'omitScriptNameInUrls' => true,

        // Control Panel trigger word
        'cpTrigger' => 'admin',

        // The secure key Craft will use for hashing and encrypting data
        'securityKey' => App::env('SECURITY_KEY'),

        // Whether to save the project config out to config/project.yaml
        // (see https://docs.craftcms.com/v3/project-config.html)
        'useProjectConfigFile' => true,

        'defaultSearchTermOptions' => array(
            'subLeft' => true,
            'subRight' => true,
        ),

        'aliases' => [
            '@web' => App::env('DEFAULT_SITE_URL'),
            '@webroot' => dirname(__DIR__) . '/www',
        ],

        'allowUpdates' => (bool)App::env('ALLOW_UPDATES'),
        'allowAdminChanges' => (bool)App::env('ALLOW_ADMIN_CHANGES'),
        'convertFilenamesToAscii' => true,
        'devMode' => (bool)App::env('DEV_MODE'),
        'defaultCpLanguage' => 'nl',
        'defaultSearchTermOptions' => array(
            'subLeft' => true,
            'subRight' => true,
        ),
        'defaultWeekStartDay' => 1,
        'enableGql' => false,
        'enableTemplateCaching' => (bool)App::env('ENABLE_TEMPLATE_CACHING'),
        'errorTemplatePrefix' => '_views/errors/',
        'extraAllowedFileExtensions' => 'json',
        'extraFileKinds' => [
            'svg' => [
                'label' => 'SVG',
                'extensions' => ['svg']
            ]
        ],
        'isSystemLive' => (bool)App::env('IS_SYSTEM_LIVE'),
        'limitAutoSlugsToAscii' => true,
        'maxUploadFileSize' => '100M',
        'omitScriptNameInUrls' => true,
        'securityKey' => App::env('SECURITY_KEY'),
        'timezone' => 'Europe/Brussels',
        'useEmailAsUsername' => true,
        'usePathInfo' => true,
    ],
    'dev' => [
        'enableTemplateCaching' => false,
        'disallowRobots' => true,
    ],
    'staging' => [
        'disabledPlugins' => [
            'seeder',
            'cp-field-inspect'
        ],
        'disallowRobots' => true,
    ],
    'production' => [
        'disabledPlugins' => [
            'seeder',
            'cp-field-inspect'
        ]
    ],
];
