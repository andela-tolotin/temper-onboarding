## Tmpr Weekly OnBoarding Retention Chart Using Highcharts

### How to Install
- Clone this repository by running `git clone https://github.com/andela-tolotin/temper-onboarding.git` on your terminal
- The run `composer install` on your terminal or follow https://getcomposer.org/ on how to setup one 
- This application uses docker for the development environment. Download Docker[https://www.docker.com/] if you do not have it installed on your local machine
- After installation, lauch docker
- Go to your terminal and run
`docker-compose up --build`
- After the successful build then
- Run `npm install` and `npm run dev` to boot up the vue instance for the highchart
- Finally, go to your browser and type `http://localhost:9000` you should see the weekly chart loaded into your browser

### Screenshots
![Alt text](https://github.com/andela-tolotin/temper-onboarding/blob/master/public/screenshots/OnBoarding%20Retention%20Chart.png?raw=true "OnBoarding Retention Chart")

### Running the Tests
- Testing Highcharts. The chart rendering uses the Vue component and the test was carried out using Laravel Dusk.
- Run `php artisan dusk`. If the chromedriver failed to start follow https://medium.com/@olotintemitope/eating-end-to-end-testing-in-laravel-like-noodles-5848a3cf941c to learn how to configure it properly

- For the unit test Run `vendor/bin/phpunit`
