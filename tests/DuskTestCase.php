<?php

namespace Tests;

use Laravel\Dusk\TestCase as BaseTestCase;
use Facebook\WebDriver\Chrome\ChromeOptions;
use Facebook\WebDriver\Remote\RemoteWebDriver;
use Facebook\WebDriver\Remote\DesiredCapabilities;
use Facebook\WebDriver\Remote\WebDriverCapabilityType;

abstract class DuskTestCase extends BaseTestCase
{
    use CreatesApplication;

    /**
     * Prepare for Dusk test execution.
     *
     * @beforeClass
     * @return void
     */
    public static function prepare()
    {
        static::startChromeDriver();
    }

    /**
     * Create the RemoteWebDriver instance.
     *
     * @return \Facebook\WebDriver\Remote\RemoteWebDriver
     */
    protected function driver()
    {
        $host = 'http://localhost:9515';

        $options = (new ChromeOptions)->addArguments([
            '--headless',
            '--disable-gpu',
            '--no-sandbox',
            '--ignore-certificate-errors',
        ]);

        return RemoteWebDriver::create(
            $host,
            DesiredCapabilities::chrome()->setCapability(ChromeOptions::CAPABILITY, $options)
                ->setCapability(WebDriverCapabilityType::ACCEPT_SSL_CERTS, true)
                ->setCapability('acceptInsecureCerts', true),
            5000,
            10000
        );
    }
}
