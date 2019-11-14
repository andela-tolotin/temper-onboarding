<?php

namespace Tests\Browser;

use Tests\DuskTestCase;
use Laravel\Dusk\Browser;
use Tests\Stubs\DataTrait;
use Illuminate\Foundation\Testing\DatabaseMigrations;

class HomePageTest extends DuskTestCase
{
    use DataTrait;
    /**
     * A basic browser test example.
     *
     * @return void
     */
    public function testThatRententionChartIsLoaded()
    {
        $seriesData = json_decode($this->getWeeklyOnBoardingPercentages(), true);

        $this->browse(function (Browser $browser) use ($seriesData) {
            $browser->visit('/')
                ->assertSee('Tempr')
                ->assertSee('2016-07-19')
                ->assertSee('2016-07-26')
                ->assertSee('2016-08-02')
                ->assertSee('2016-08-09')
                ->assertVue('chartOptions.title.text', 'Tempr Weekly Retention Chart', '@app')
                // test that the loaded data is viewed on the vue component
                ->assertVue('chartOptions.series', $seriesData, '@app');
        });
    }
}
